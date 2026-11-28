import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Ctx } from '../lib/http';
import { COLLECTION, ENTITY, keys, pk } from '../lib/keys';
import * as u from '../lib/util';
import type { Enquiry } from '../types';

const STATUSES = ['new', 'contacted', 'converted', 'closed'] as const;

// Public: "Claim your free trial" form on the website
export async function submit({ body }: Ctx) {
  // Honeypot field: real visitors never fill it in, bots usually do.
  if (body.website) return reply(201, { ok: true });

  const phone = u.text(body.phone, 'phone', { required: true, max: 20 });
  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) throw new HttpError(400, 'Please enter a valid phone number');

  const item: Enquiry = {
    id: u.uid(),
    name: u.text(body.name, 'name', { required: true, max: 100 }),
    phone,
    interest: u.text(body.interest, 'interest', { max: 60 }),
    message: u.text(body.message, 'message', { max: 500 }),
    status: 'new',
    createdAt: u.nowIso(),
  };
  await db.putItem(keys.enquiry(item), ENTITY.enquiry, item);
  return reply(201, { ok: true });
}

export async function list() {
  // newest first
  return { items: await db.queryIndex<Enquiry>(COLLECTION.enquiries, { forward: false }) };
}

export async function updateStatus({ params, body }: Ctx) {
  const existing = await db.getItem<Enquiry>(pk.enquiry(params.id));
  if (!existing) throw new HttpError(404, 'Enquiry not found');
  const next: Enquiry = { ...existing, status: u.oneOf(body.status, STATUSES, 'status', { required: true }) };
  await db.putItem(keys.enquiry(next), ENTITY.enquiry, next);
  return next;
}

export async function remove({ params }: Ctx) {
  await db.deleteItem(pk.enquiry(params.id));
  return { ok: true };
}
