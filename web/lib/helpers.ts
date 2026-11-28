'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export const inr = (n: number) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export function getErrorMessage(error: unknown, fallback = 'Something went wrong') {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function thisMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function today() {
  const d = new Date();
  return `${thisMonth()}-${String(d.getDate()).padStart(2, '0')}`;
}

export function monthLabel(m: string) {
  const [y, mo] = m.split('-').map(Number);
  return new Date(y, mo - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

export function shortMonth(m: string) {
  const [y, mo] = m.split('-').map(Number);
  return new Date(y, mo - 1, 1).toLocaleDateString('en-IN', { month: 'short' });
}

export function fmtDate(iso?: string) {
  if (!iso) return '–';
  return new Date(iso.length === 10 ? iso + 'T00:00:00' : iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function waLink(phone: string, text: string) {
  let digits = (phone || '').replace(/\D/g, '');
  if (digits.length === 10) digits = '91' + digits; // India default
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function reminderText(name: string, balance: number, month: string, dueDate: string) {
  return `Hi ${name}, a gentle reminder that your CFitness fee of ${inr(balance)} for ${monthLabel(month)} was due on ${fmtDate(dueDate)}. Please pay when you can. Thank you! 💪`;
}

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const esc = (v: string | number) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = rows.map((r) => r.map(esc).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Tiny data-loading hook: load(), reload(), loading and error state.
export function useLoad<T>(fn: () => Promise<T>, key: string) {
  const [requestId, setRequestId] = useState(0);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useRef(fn);

  useEffect(() => {
    load.current = fn;
  });
  const run = useCallback(() => setRequestId((id) => id + 1), []);

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(async () => {
      if (!active) return;
      setLoading(true);
      setError('');
      try {
        const result = await load.current();
        if (active) setData(result);
      } catch (cause) {
        if (active) setError(getErrorMessage(cause));
      } finally {
        if (active) setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [key, requestId]);

  return { data, loading, error, reload: run, setData };
}
