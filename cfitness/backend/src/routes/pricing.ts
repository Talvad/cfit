import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Body, Ctx } from '../lib/http';
import * as u from '../lib/util';
import type { Plan } from '../types';

const CATEGORIES = ['General', 'Cardio', 'Personal Training', 'Combo'] as const;

function parse(b: Body, existing?: Plan): Partial<Plan> {
  const create = !existing;
  const want = (k: string) => create || u.has(b, k);
  const out: Partial<Plan> = {};
  if (want('name')) out.name = u.text(b.name, 'name', { required: true, max: 80 });
  if (want('description')) out.description = u.text(b.description, 'description', { max: 300 });
  if (want('category')) out.category = u.oneOf(b.category, CATEGORIES, 'category');
  if (want('price')) out.price = u.reqNum(b.price, 'price', { min: 0 });
  if (want('period')) out.period = u.text(b.period, 'period', { max: 30 }) || 'month';
  if (want('features')) out.features = u.strArray(b.features, 'features');
  if (want('popular')) out.popular = Boolean(b.popular);
  if (want('active')) out.active = b.active === undefined ? true : Boolean(b.active);
  if (want('order')) out.order = u.num(b.order, 'order', { min: 0, max: 9999, int: true }) ?? 100;
  return out;
}

const sortPlans = (a: Plan, b: Plan) => a.order - b.order || a.price - b.price;

export async function listPublic() {
  const items = (await db.scanAll<Plan>(db.T.pricing())).filter((p) => p.active);
  return { items: items.sort(sortPlans) };
}

export async function listAdmin() {
  return { items: (await db.scanAll<Plan>(db.T.pricing())).sort(sortPlans) };
}

export async function create({ body }: Ctx) {
  const now = u.nowIso();
  const item = { id: u.uid(), ...parse(body), createdAt: now, updatedAt: now } as Plan;
  await db.put(db.T.pricing(), item);
  return reply(201, item);
}

export async function updateOne({ params, body }: Ctx) {
  const existing = await db.get<Plan>(db.T.pricing(), { id: params.id });
  if (!existing) throw new HttpError(404, 'Plan not found');
  const item: Plan = { ...existing, ...parse(body, existing), id: existing.id, updatedAt: u.nowIso() };
  await db.put(db.T.pricing(), item);
  return item;
}

export async function remove({ params }: Ctx) {
  await db.del(db.T.pricing(), { id: params.id });
  return { ok: true };
}
