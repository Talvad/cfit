'use client';
import { useState } from 'react';
import { api } from '@/lib/admin-api';
import { getErrorMessage, inr, thisMonth, today } from '@/lib/helpers';
import { PAY_MODES } from '@/lib/types';
import { ErrorBox, Field, Modal, useToast } from './ui';

export default function PaymentModal({
  memberId,
  memberName,
  month,
  amount,
  onClose,
  onSaved,
}: {
  memberId: string;
  memberName: string;
  month?: string;
  amount?: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const toast = useToast();
  const [form, setForm] = useState({
    month: month || thisMonth(),
    amount: amount ? String(amount) : '',
    mode: 'Cash',
    paidOn: today(),
    note: '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api(`/members/${memberId}/payments`, {
        method: 'POST',
        body: { ...form, amount: Number(form.amount) },
      });
      toast(`Recorded ${inr(Number(form.amount))} from ${memberName}`);
      onSaved();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title={`Fee received · ${memberName}`} onClose={onClose}>
      <form className="grid gap-3.5 sm:grid-cols-2" onSubmit={submit}>
        <div className="col-span-full"><ErrorBox msg={error} /></div>
        <Field label="For month"><input type="month" required value={form.month} onChange={(e) => set('month', e.target.value)} /></Field>
        <Field label="Amount received (₹)"><input type="number" min={1} required value={form.amount} onChange={(e) => set('amount', e.target.value)} autoFocus /></Field>
        <Field label="Payment mode">
          <select value={form.mode} onChange={(e) => set('mode', e.target.value)}>
            {PAY_MODES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Paid on"><input type="date" required value={form.paidOn} onChange={(e) => set('paidOn', e.target.value)} /></Field>
        <Field label="Note (optional)" full><input value={form.note} maxLength={200} onChange={(e) => set('note', e.target.value)} placeholder="e.g. paid by father, balance next week" /></Field>
        <div className="col-span-full mt-5 flex justify-end gap-2.5">
          <button type="button" className="a-btn a-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="a-btn a-btn--green" disabled={busy}>{busy ? 'Saving…' : 'Save payment'}</button>
        </div>
      </form>
    </Modal>
  );
}
