/**
 * Single-table key design  (table: PK / SK,  index GSI1: GSI1PK / GSI1SK)
 *
 * Entity        PK                SK                GSI1PK            GSI1SK
 * ----------------------------------------------------------------------------------------
 * Member        MEMBER#<id>       PROFILE           MEMBERS           <id>
 * Payment       MEMBER#<id>       PAYMENT#<yyyy-mm> PAYMONTH#<yyyy-mm> <memberId>
 * Plan          PLAN#<id>         META              PLANS             <order>#<id>
 * Gallery item  GALLERY#<id>      META              GALLERY           <createdAt>#<id>
 * Achievement   ACH#<id>          META              ACHIEVEMENTS      <date>#<id>
 * Enquiry       ENQ#<id>          META              ENQUIRIES         <createdAt>#<id>
 * Counter       COUNTER#<name>    META              -                 -
 *
 * Access patterns (no Scans anywhere):
 *  - Get / update / delete one item ................ GetItem / PutItem / DeleteItem on PK+SK
 *  - Member + whole payment history ................ Query PK = MEMBER#<id>              (one request)
 *  - Member payment history only ................... Query PK = MEMBER#<id>, SK begins_with PAYMENT#
 *  - List all members / plans / gallery / etc. ..... Query GSI1 where GSI1PK = <collection>
 *  - Everyone's fees for one month ................. Query GSI1 where GSI1PK = PAYMONTH#<yyyy-mm>
 *  - Delete a member and their payments ............ Query PK = MEMBER#<id>, then delete each item
 *  - Next member number ............................ UpdateItem ADD on COUNTER#member
 */
import type { Keys, PrimaryKey } from './db';

const pad = (n: number) => String(n).padStart(4, '0');

export const COLLECTION = {
  members: 'MEMBERS',
  plans: 'PLANS',
  gallery: 'GALLERY',
  achievements: 'ACHIEVEMENTS',
  enquiries: 'ENQUIRIES',
} as const;

export const paymentsInMonth = (month: string) => `PAYMONTH#${month}`;
export const memberPartition = (id: string) => `MEMBER#${id}`;
export const PAYMENT_PREFIX = 'PAYMENT#';

export const ENTITY = {
  member: 'MEMBER',
  payment: 'PAYMENT',
  plan: 'PLAN',
  gallery: 'GALLERY',
  achievement: 'ACHIEVEMENT',
  enquiry: 'ENQUIRY',
} as const;

/** Primary key only: for get / delete. */
export const pk = {
  member: (id: string): PrimaryKey => ({ PK: memberPartition(id), SK: 'PROFILE' }),
  payment: (memberId: string, month: string): PrimaryKey => ({
    PK: memberPartition(memberId),
    SK: `${PAYMENT_PREFIX}${month}`,
  }),
  plan: (id: string): PrimaryKey => ({ PK: `PLAN#${id}`, SK: 'META' }),
  gallery: (id: string): PrimaryKey => ({ PK: `GALLERY#${id}`, SK: 'META' }),
  achievement: (id: string): PrimaryKey => ({ PK: `ACH#${id}`, SK: 'META' }),
  enquiry: (id: string): PrimaryKey => ({ PK: `ENQ#${id}`, SK: 'META' }),
  counter: (name: string): PrimaryKey => ({ PK: `COUNTER#${name}`, SK: 'META' }),
};

/** Full keys including index keys: for put. Recomputed from the item so index keys never go stale. */
export const keys = {
  member: (m: { id: string }): Keys => ({ ...pk.member(m.id), GSI1PK: COLLECTION.members, GSI1SK: m.id }),
  payment: (p: { memberId: string; month: string }): Keys => ({
    ...pk.payment(p.memberId, p.month),
    GSI1PK: paymentsInMonth(p.month),
    GSI1SK: p.memberId,
  }),
  plan: (p: { id: string; order: number }): Keys => ({
    ...pk.plan(p.id),
    GSI1PK: COLLECTION.plans,
    GSI1SK: `${pad(p.order)}#${p.id}`,
  }),
  gallery: (g: { id: string; createdAt: string }): Keys => ({
    ...pk.gallery(g.id),
    GSI1PK: COLLECTION.gallery,
    GSI1SK: `${g.createdAt}#${g.id}`,
  }),
  achievement: (a: { id: string; date: string }): Keys => ({
    ...pk.achievement(a.id),
    GSI1PK: COLLECTION.achievements,
    GSI1SK: `${a.date}#${a.id}`,
  }),
  enquiry: (e: { id: string; createdAt: string }): Keys => ({
    ...pk.enquiry(e.id),
    GSI1PK: COLLECTION.enquiries,
    GSI1SK: `${e.createdAt}#${e.id}`,
  }),
};
