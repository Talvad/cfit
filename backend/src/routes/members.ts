import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Body, Ctx } from '../lib/http';
import { COLLECTION, ENTITY, PAYMENT_PREFIX, keys, memberPartition, pk } from '../lib/keys';
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
    Key: pk.counter('member'),
    UpdateExpression: 'ADD seq :one',
    ExpressionAttributeValues: { ':one': 1 },
    ReturnValues: 'UPDATED_NEW',
  });
  return `CF-${String(res.Attributes?.seq).padStart(4, '0')}`;
}

export async function list({ query }: Ctx) {
  // Members come back ordered by id straight from the index
  let items = await db.queryIndex<Member>(COLLECTION.members);
  if (query.status) items = items.filter((m) => m.status === query.status);
  if (query.program) items = items.filter((m) => m.program === query.program);
  if (query.q) {
    const q = query.q.toLowerCase();
    items = items.filter((m) => [m.name, m.id, m.phone, m.email].some((x) => (x ?? '').toLowerCase().includes(q)));
  }
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
  await db.putItem(keys.member(member), ENTITY.member, member);
  return reply(201, member);
}

// One query returns the member profile AND all their payment records (they share a partition key).
export async function getOne({ params }: Ctx) {
  const rows = await db.queryRaw(memberPartition(params.id));
  const profile = rows.find((r) => r.SK === 'PROFILE');
  if (!profile) throw new HttpError(404, 'Member not found');
  const payments = rows
    .filter((r) => r.SK.startsWith(PAYMENT_PREFIX))
    .map((r) => db.strip<PaymentRecord>(r))
    .reverse(); // newest month first
  return { member: db.strip<Member>(profile), payments };
}

export async function updateOne({ params, body }: Ctx) {
  const existing = await db.getItem<Member>(pk.member(params.id));
  if (!existing) throw new HttpError(404, 'Member not found');
  const member: Member = { ...existing, ...parseMember(body, existing), id: existing.id, updatedAt: u.nowIso() };
  await db.putItem(keys.member(member), ENTITY.member, member);
  return member;
}

export async function remove({ params }: Ctx) {
  const rows = await db.queryRaw(memberPartition(params.id));
  if (!rows.some((r) => r.SK === 'PROFILE')) throw new HttpError(404, 'Member not found');
  await db.deleteMany(rows);
  return { ok: true, deletedPayments: rows.length - 1 };
}
