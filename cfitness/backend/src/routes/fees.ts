import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Ctx } from '../lib/http';
import * as u from '../lib/util';
import type { Enquiry, FeeRow, FeeStatus, Member, PaymentEntry, PaymentRecord } from '../types';

const statusOf = (due: number, paid: number): FeeStatus => {
  if (paid >= due && (paid > 0 || due === 0)) return 'paid';
  return paid > 0 ? 'partial' : 'pending';
};

const dueDateFor = (member: Member, month: string): string => {
  const day = Math.min(member.feeDay || Number(member.joiningDate.slice(8, 10)) || 1, u.daysInMonth(month));
  return `${month}-${String(day).padStart(2, '0')}`;
};

interface Totals {
  expected: number;
  collected: number;
  pending: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
}

const paymentsForMonth = (month: string) =>
  db.queryAll<PaymentRecord>({
    TableName: db.T.payments(),
    KeyConditionExpression: '#m = :m',
    ExpressionAttributeNames: { '#m': 'month' },
    ExpressionAttributeValues: { ':m': month },
  });

// Every member who owes fees for `month`, with how much has been received.
async function buildMonth(month: string): Promise<{ month: string; rows: FeeRow[]; totals: Totals }> {
  const [members, payments] = await Promise.all([db.scanAll<Member>(db.T.members()), paymentsForMonth(month)]);
  const payByMember = new Map(payments.map((p) => [p.memberId, p]));
  const today = u.todayStr();

  const rows: FeeRow[] = [];
  for (const m of members) {
    const rec = payByMember.get(m.id);
    const owes = m.status === 'active' && (m.joiningDate ?? '').slice(0, 7) <= month;
    if (!owes && !rec) continue;

    const due = rec ? rec.due : m.amount;
    const paid = rec ? rec.paid : 0;
    const balance = Math.max(due - paid, 0);
    const dueDate = dueDateFor(m, month);
    rows.push({
      memberId: m.id,
      name: m.name,
      phone: m.phone,
      program: m.program,
      memberStatus: m.status,
      dueDate,
      due,
      paid,
      balance,
      status: statusOf(due, paid),
      overdue: balance > 0 && dueDate < today,
      entries: rec ? rec.entries : [],
    });
  }
  rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.name.localeCompare(b.name));

  const totals = rows.reduce<Totals>(
    (t, r) => {
      t.expected += r.due;
      t.collected += r.paid;
      t.pending += r.balance;
      if (r.status === 'paid') t.paidCount += 1;
      else t.pendingCount += 1;
      if (r.overdue) t.overdueCount += 1;
      return t;
    },
    { expected: 0, collected: 0, pending: 0, paidCount: 0, pendingCount: 0, overdueCount: 0 }
  );
  return { month, rows, totals };
}

export async function fees({ query }: Ctx) {
  const month = u.month(query.month ?? u.currentMonth());
  const result = await buildMonth(month);
  if (query.onlyPending === '1' || query.onlyPending === 'true') {
    result.rows = result.rows.filter((r) => r.balance > 0);
  }
  return result;
}

export async function addPayment({ params, body }: Ctx) {
  const member = await db.get<Member>(db.T.members(), { id: params.id });
  if (!member) throw new HttpError(404, 'Member not found');

  const month = u.month(body.month);
  const amount = u.reqNum(body.amount, 'amount', { min: 1 });
  const entry: PaymentEntry = {
    id: u.uid(),
    amount,
    mode: u.oneOf(body.mode, u.PAY_MODES, 'mode', { fallback: 'Cash' }),
    paidOn: u.date(body.paidOn, 'paidOn') || u.todayStr(),
    note: u.text(body.note, 'note', { max: 200 }),
    recordedAt: u.nowIso(),
  };
  const customDue = u.num(body.due, 'due', { min: 0 });

  // A custom "due" (e.g. a discount) overrides the stored due for that month.
  const dueExpr = customDue !== undefined ? 'due = :d' : 'due = if_not_exists(due, :d)';

  const res = await db.update({
    TableName: db.T.payments(),
    Key: { month, memberId: member.id },
    UpdateExpression:
      `SET entries = list_append(if_not_exists(entries, :empty), :e), ` +
      `paid = if_not_exists(paid, :zero) + :a, ${dueExpr}, memberName = :n, updatedAt = :u`,
    ExpressionAttributeValues: {
      ':e': [entry],
      ':empty': [],
      ':zero': 0,
      ':a': amount,
      ':d': customDue ?? member.amount,
      ':n': member.name,
      ':u': u.nowIso(),
    },
    ReturnValues: 'ALL_NEW',
  });
  return reply(201, res.Attributes);
}

export async function removeEntry({ params }: Ctx) {
  const month = u.month(params.month);
  const key = { month, memberId: params.memberId };
  const rec = await db.get<PaymentRecord>(db.T.payments(), key);
  if (!rec) throw new HttpError(404, 'Payment record not found');

  const entries = rec.entries.filter((e) => e.id !== params.entryId);
  if (entries.length === rec.entries.length) throw new HttpError(404, 'Payment entry not found');

  if (entries.length === 0) {
    await db.del(db.T.payments(), key);
    return { ok: true, removedRecord: true };
  }
  const next: PaymentRecord = {
    ...rec,
    entries,
    paid: entries.reduce((s, e) => s + e.amount, 0),
    updatedAt: u.nowIso(),
  };
  await db.put(db.T.payments(), next);
  return next;
}

export async function dashboard({ query }: Ctx) {
  const month = u.month(query.month ?? u.currentMonth());
  const [members, current, enquiries] = await Promise.all([
    db.scanAll<Member>(db.T.members()),
    buildMonth(month),
    db.scanAll<Enquiry>(db.T.enquiries(), {
      FilterExpression: '#s = :new',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':new': 'new' },
    }),
  ]);

  const trendMonths = [5, 4, 3, 2, 1, 0].map((i) => u.addMonths(month, -i));
  const trend = await Promise.all(
    trendMonths.map(async (m) => {
      if (m === month) return { month: m, collected: current.totals.collected };
      const recs = await paymentsForMonth(m);
      return { month: m, collected: recs.reduce((s, r) => s + r.paid, 0) };
    })
  );

  const active = members.filter((m) => m.status === 'active');
  const programs: Record<string, number> = {};
  for (const m of active) programs[m.program] = (programs[m.program] ?? 0) + 1;

  const today = u.todayStr();
  const in3 = new Date(Date.parse(today) + 3 * 86_400_000).toISOString().slice(0, 10);
  const dueSoon = current.rows.filter((r) => r.balance > 0 && r.dueDate >= today && r.dueDate <= in3);

  const recentPayments = current.rows
    .flatMap((r) => r.entries.map((e) => ({ ...e, memberId: r.memberId, name: r.name })))
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
    .slice(0, 8);

  return {
    month,
    members: {
      total: members.length,
      active: active.length,
      paused: members.filter((m) => m.status === 'paused').length,
      left: members.filter((m) => m.status === 'left').length,
      newThisMonth: members.filter((m) => (m.joiningDate ?? '').slice(0, 7) === month).length,
    },
    fees: current.totals,
    dueSoon: dueSoon.length,
    newEnquiries: enquiries.length,
    programs,
    trend,
    recentPayments,
  };
}
