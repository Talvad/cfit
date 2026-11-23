import { randomUUID } from 'node:crypto';
import { HttpError } from './http';
import type { Body } from './http';

export const PROGRAMS = ['Cardio', 'Personal Training', 'Cardio + Personal Training', 'General Fitness'] as const;
export const MEMBER_STATUSES = ['active', 'paused', 'left'] as const;
export const PAY_MODES = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Other'] as const;

export const uid = (): string => randomUUID();
export const nowIso = (): string => new Date().toISOString();

// "Today" in the gym's time zone (default India, UTC+5:30), as YYYY-MM-DD
export const todayStr = (): string =>
  new Date(Date.now() + Number(process.env.GYM_UTC_OFFSET_MINUTES ?? 0) * 60000).toISOString().slice(0, 10);
export const currentMonth = (): string => todayStr().slice(0, 7);

const bad = (msg: string) => new HttpError(400, msg);

export function text(v: unknown, name: string, opts: { required?: boolean; max?: number } = {}): string {
  const { required = false, max = 200 } = opts;
  if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
    if (required) throw bad(`${name} is required`);
    return '';
  }
  if (typeof v !== 'string') throw bad(`${name} must be text`);
  const s = v.trim();
  if (s.length > max) throw bad(`${name} is too long (max ${max})`);
  return s;
}

export function num(
  v: unknown,
  name: string,
  opts: { required?: boolean; min?: number; max?: number; int?: boolean } = {}
): number | undefined {
  const { required = false, min = 0, max = 10_000_000, int = false } = opts;
  if (v === undefined || v === null || v === '') {
    if (required) throw bad(`${name} is required`);
    return undefined;
  }
  const n = Number(v);
  if (!Number.isFinite(n)) throw bad(`${name} must be a number`);
  if (n < min || n > max) throw bad(`${name} must be between ${min} and ${max}`);
  if (int && !Number.isInteger(n)) throw bad(`${name} must be a whole number`);
  return n;
}

/** Like num(), but guarantees a number (use with required: true). */
export function reqNum(v: unknown, name: string, opts: { min?: number; max?: number; int?: boolean } = {}): number {
  return num(v, name, { ...opts, required: true }) as number;
}

export function date(v: unknown, name: string, opts: { required?: boolean } = {}): string {
  if (v === undefined || v === null || v === '') {
    if (opts.required) throw bad(`${name} is required`);
    return '';
  }
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v))) {
    throw bad(`${name} must be a date (YYYY-MM-DD)`);
  }
  return v;
}

export function month(v: unknown, name = 'month'): string {
  if (typeof v !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])$/.test(v)) {
    throw bad(`${name} must look like YYYY-MM`);
  }
  return v;
}

export function oneOf<const L extends readonly string[]>(
  v: unknown,
  list: L,
  name: string,
  opts: { required?: boolean; fallback?: L[number] } = {}
): L[number] {
  if (v === undefined || v === null || v === '') {
    if (opts.required) throw bad(`${name} is required`);
    return (opts.fallback ?? list[0]) as L[number];
  }
  if (typeof v !== 'string' || !list.includes(v)) throw bad(`${name} must be one of: ${list.join(', ')}`);
  return v as L[number];
}

export function strArray(v: unknown, name: string, opts: { maxItems?: number; maxLen?: number } = {}): string[] {
  const { maxItems = 20, maxLen = 120 } = opts;
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) throw bad(`${name} must be a list`);
  if (v.length > maxItems) throw bad(`${name} has too many items`);
  return v
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean)
    .map((x) => {
      if (x.length > maxLen) throw bad(`An item in ${name} is too long`);
      return x;
    });
}

// Image keys must live in an expected folder and can't escape it.
export function mediaKey(v: unknown, folder: string, name = 'key', opts: { required?: boolean } = {}): string {
  if (v === undefined || v === null || v === '') {
    if (opts.required) throw bad(`${name} is required`);
    return '';
  }
  if (typeof v !== 'string' || !v.startsWith(`${folder}/`) || v.includes('..') || v.length > 200) {
    throw bad(`${name} is not a valid ${folder} image`);
  }
  return v;
}

export const has = (obj: Body, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export function addMonths(m: string, delta: number): string {
  const [y, mo] = m.split('-').map(Number);
  const d = new Date(Date.UTC(y, mo - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export const daysInMonth = (m: string): number => {
  const [y, mo] = m.split('-').map(Number);
  return new Date(Date.UTC(y, mo, 0)).getUTCDate();
};

export const mediaUrl = (key?: string): string => (key ? `${process.env.MEDIA_BASE_URL}/${key}` : '');
