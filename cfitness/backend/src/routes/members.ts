import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Body, Ctx } from '../lib/http';
import * as u from '../lib/util';
import type { Member, PaymentRecord } from '../types';

function parseMember(b: Body, existing?: Member): Partial<Member> {
  const create = !existing;
  const want = (k: string) => create || u.has(b, k);
  const out: Partial<Member> = {};

  if (want('name')) out.name = u.text(b.name, 'name', { required: true, max: 100 });
  if (want('phone')) {
    out.phone = u.text(b.phone, 'phone', { required: true, max: 20 });
    if (!/^[0-9+\-\s()]{7,20}$/.test(out.phone)) throw new HttpError(400, 'phone looks invalid');
  }
  if (want('email')) out.email = u.text(b.email, 'email', { max: 120 });
  if (want('address')) out.address = u.text(b.address, 'address', { required: true, max: 300 });
  if (want('gender')) out.gender = b.gender ? u.oneOf(b.gender, ['Male', 'Female', 'Other'] as const, 'gender') : '';
  if (want('dob')) out.dob = u.date(b.dob, 'dob');
  if (want('program')) out.program = u.oneOf(b.program, u.PROGRAMS, 'program', { required: true });
  if (want('planId')) out.planId = u.text(b.planId, 'planId', { max: 60 });
  if (want('planName')) out.planName = u.text(b.planName, 'planName', { max: 100 });
  if (want('amount')) out.amount = u.reqNum(b.amount, 'amount', { min: 0 });
  if (want('joiningDate')) out.joiningDate = u.date(b.joiningDate, 'joiningDate', { required: true });
  if (want('feeDay')) {
    const joining = out.joiningDate ?? existing?.joiningDate ?? '';
    const fallbackDay = Number(joining.slice(8, 10)) || 1;
    out.feeDay = u.num(b.feeDay, 'feeDay', { min: 1, max: 31, int: true }) ?? fallbackDay;
  }
  if (want('status')) out.status = u.oneOf(b.status, u.MEMBER_STATUSES, 'status', { fallback: 'active' });
  if (want('trainer')) out.trainer = u.text(b.trainer, 'trainer', { max: 100 });
  if (want('emergencyContact')) out.emergencyContact = u.text(b.emergencyContact, 'emergencyContact', { max: 120 });
  if (want('notes')) out.notes = u.text(b.notes, 'notes', { max: 1000 });
  return out;
}

async function nextMemberId(): Promise<string> {
  const res = await db.update({
    TableName: db.T.counters(),
    Key: { name: 'member' },
    UpdateExpression: 'ADD seq :one',
    ExpressionAttributeValues: { ':one': 1 },
    ReturnValues: 'UPDATED_NEW',
  });
  return `CF-${String(res.Attributes?.seq).padStart(4, '0')}`;
}

export async function list({ query }: Ctx) {
  let items = await db.scanAll<Member>(db.T.members());
  if (query.status) items = items.filter((m) => m.status === query.status);
  if (query.program) items = items.filter((m) => m.program === query.program);
  if (query.q) {
    const q = query.q.toLowerCase();
    items = items.filter((m) => [m.name, m.id, m.phone, m.email].some((x) => (x ?? '').toLowerCase().includes(q)));
  }
  items.sort((a, b) => a.id.localeCompare(b.id));
  return { items };
}

export async function create({ body }: Ctx) {
  const data = parseMember(body);
  const now = u.nowIso();
  const member = {
    ...data,
    id: await nextMemberId(),
    status: data.status ?? 'active',
    createdAt: now,
    updatedAt: now,
  } as Member;
  await db.put(db.T.members(), member);
  return reply(201, member);
}

async function paymentsFor(memberId: string, newestFirst = false): Promise<PaymentRecord[]> {
  return db.queryAll<PaymentRecord>({
    TableName: db.T.payments(),
    IndexName: 'MemberIndex',
    KeyConditionExpression: 'memberId = :m',
    ExpressionAttributeValues: { ':m': memberId },
    ScanIndexForward: !newestFirst,
  });
}

export async function getOne({ params }: Ctx) {
  const member = await db.get<Member>(db.T.members(), { id: params.id });
  if (!member) throw new HttpError(404, 'Member not found');
  return { member, payments: await paymentsFor(params.id, true) };
}

export async function updateOne({ params, body }: Ctx) {
  const existing = await db.get<Member>(db.T.members(), { id: params.id });
  if (!existing) throw new HttpError(404, 'Member not found');
  const member: Member = { ...existing, ...parseMember(body, existing), id: existing.id, updatedAt: u.nowIso() };
  await db.put(db.T.members(), member);
  return member;
}

export async function remove({ params }: Ctx) {
  const existing = await db.get<Member>(db.T.members(), { id: params.id });
  if (!existing) throw new HttpError(404, 'Member not found');
  const payments = await paymentsFor(params.id);
  for (const p of payments) await db.del(db.T.payments(), { month: p.month, memberId: p.memberId });
  await db.del(db.T.members(), { id: params.id });
  return { ok: true, deletedPayments: payments.length };
}
