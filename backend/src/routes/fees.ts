import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Ctx } from '../lib/http';
import { COLLECTION, ENTITY, keys, paymentsInMonth, pk } from '../lib/keys';
import * as u from '../lib/util';
import { buildFeeMonth } from '../services/fees';
import type { Enquiry, Member, PaymentEntry, PaymentRecord } from '../types';

// All payment records for a month: one indexed query (GSI1PK = PAYMONTH#yyyy-mm)
const paymentsForMonth = (month: string) => db.queryIndex<PaymentRecord>(paymentsInMonth(month));

// Every member who owes fees for `month`, with how much has been received.
async function buildMonth(month: string) {
  const [members, payments] = await Promise.all([
    db.queryIndex<Member>(COLLECTION.members),
    paymentsForMonth(month),
  ]);
  return buildFeeMonth(month, members, payments, u.todayStr());
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
  const member = await db.getItem<Member>(pk.member(params.id));
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
  const k = keys.payment({ memberId: member.id, month });

  // Atomic upsert: creates the month's record on the first payment, appends to it afterwards.
  // (month and entity are DynamoDB reserved words, hence the #name placeholders.)
  const res = await db.update({
    Key: { PK: k.PK, SK: k.SK },
    UpdateExpression:
      'SET entries = list_append(if_not_exists(entries, :empty), :e), ' +
      `paid = if_not_exists(paid, :zero) + :a, ${dueExpr}, memberName = :n, updatedAt = :u, ` +
      '#mo = :mo, memberId = :mid, #ent = :ent, GSI1PK = :g1, GSI1SK = :g2',
    ExpressionAttributeNames: { '#mo': 'month', '#ent': 'entity' },
    ExpressionAttributeValues: {
      ':e': [entry],
      ':empty': [],
      ':zero': 0,
      ':a': amount,
      ':d': customDue ?? member.amount,
      ':n': member.name,
      ':u': u.nowIso(),
      ':mo': month,
      ':mid': member.id,
      ':ent': ENTITY.payment,
      ':g1': k.GSI1PK,
      ':g2': k.GSI1SK,
    },
    ReturnValues: 'ALL_NEW',
  });
  return reply(201, db.strip<PaymentRecord>(res.Attributes ?? {}));
}

export async function removeEntry({ params }: Ctx) {
  const month = u.month(params.month);
  const key = pk.payment(params.memberId, month);
  const rec = await db.getItem<PaymentRecord>(key);
  if (!rec) throw new HttpError(404, 'Payment record not found');

  const entries = rec.entries.filter((e) => e.id !== params.entryId);
  if (entries.length === rec.entries.length) throw new HttpError(404, 'Payment entry not found');

  if (entries.length === 0) {
    await db.deleteItem(key);
    return { ok: true, removedRecord: true };
  }
  const next: PaymentRecord = {
    ...rec,
    entries,
    paid: entries.reduce((s, e) => s + e.amount, 0),
    updatedAt: u.nowIso(),
  };
  await db.putItem(keys.payment(next), ENTITY.payment, next);
  return next;
}

export async function dashboard({ query }: Ctx) {
  const month = u.month(query.month ?? u.currentMonth());
  const [members, current, newEnquiries] = await Promise.all([
    db.queryIndex<Member>(COLLECTION.members),
    buildMonth(month),
    db.queryIndex<Enquiry>(COLLECTION.enquiries, {
      filter: { expression: '#s = :new', names: { '#s': 'status' }, values: { ':new': 'new' } },
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
    newEnquiries: newEnquiries.length,
    programs,
    trend,
    recentPayments,
  };
}
