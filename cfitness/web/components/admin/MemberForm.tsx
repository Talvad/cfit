'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/admin-api';
import { today } from '@/lib/helpers';
import type { Plan } from '@/lib/seed';
import { PROGRAMS, type Member } from '@/lib/types';
import { ErrorBox, Field, Modal, useToast } from './ui';

const CATEGORY_TO_PROGRAM: Record<string, string> = {
  Cardio: 'Cardio',
  'Personal Training': 'Personal Training',
  Combo: 'Cardio + Personal Training',
  General: 'General Fitness',
};

export default function MemberForm({
  member,
  onClose,
  onSaved,
}: {
  member?: Member;
  onClose: () => void;
  onSaved: (m: Member) => void;
}) {
  const toast = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState({
    name: member?.name || '',
    phone: member?.phone || '',
    email: member?.email || '',
    address: member?.address || '',
    gender: member?.gender || '',
    dob: member?.dob || '',
    program: member?.program || PROGRAMS[0],
    planId: member?.planId || '',
    planName: member?.planName || '',
    amount: member ? String(member.amount) : '',
    joiningDate: member?.joiningDate || today(),
    feeDay: member ? String(member.feeDay) : '',
    status: member?.status || 'active',
    trainer: member?.trainer || '',
    emergencyContact: member?.emergencyContact || '',
    notes: member?.notes || '',
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    api<{ items: Plan[] }>('/pricing').then((r) => setPlans(r.items.filter((p) => p.active !== false))).catch(() => {});
  }, []);

  function pickPlan(id: string) {
    const plan = plans.find((p) => p.id === id);
    if (!plan) {
      setF((p) => ({ ...p, planId: '', planName: '' }));
      return;
    }
    setF((p) => ({
      ...p,
      planId: plan.id,
      planName: plan.name,
      amount: String(plan.price),
      program: CATEGORY_TO_PROGRAM[plan.category] || p.program,
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const day = Number(f.feeDay) || Number(f.joiningDate.slice(8, 10)) || 1;
      const body = { ...f, amount: Number(f.amount), feeDay: day };
      const saved = member
        ? await api<Member>(`/members/${member.id}`, { method: 'PUT', body })
        : await api<Member>('/members', { method: 'POST', body });
      toast(member ? 'Member updated' : `Member ${saved.id} added`);
      onSaved(saved);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal title={member ? `Edit ${member.name}` : 'New member'} onClose={onClose} wide>
      <form className="a-form a-form--2" onSubmit={submit}>
        <div className="full"><ErrorBox msg={error} /></div>
        <Field label="Full name"><input required maxLength={100} value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Phone / WhatsApp"><input required type="tel" maxLength={20} value={f.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
        <Field label="Address" full><input required maxLength={300} value={f.address} onChange={(e) => set('address', e.target.value)} /></Field>
        <Field label="Email (optional)"><input type="email" value={f.email} onChange={(e) => set('email', e.target.value)} /></Field>
        <Field label="Gender">
          <select value={f.gender} onChange={(e) => set('gender', e.target.value)}>
            <option value="">–</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
        </Field>
        <Field label="Date of birth"><input type="date" value={f.dob} onChange={(e) => set('dob', e.target.value)} /></Field>
        <Field label="Emergency contact"><input value={f.emergencyContact} onChange={(e) => set('emergencyContact', e.target.value)} placeholder="Name – phone" /></Field>

        <Field label="Plan (auto-fills amount)">
          <select value={f.planId} onChange={(e) => pickPlan(e.target.value)}>
            <option value="">Custom / no plan</option>
            {plans.map((p) => <option key={p.id} value={p.id}>{p.name} – ₹{p.price}</option>)}
          </select>
        </Field>
        <Field label="Program">
          <select value={f.program} onChange={(e) => set('program', e.target.value)}>
            {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Monthly fee (₹)"><input required type="number" min={0} value={f.amount} onChange={(e) => set('amount', e.target.value)} /></Field>
        <Field label="Joining date"><input required type="date" value={f.joiningDate} onChange={(e) => set('joiningDate', e.target.value)} /></Field>
        <Field label="Fee due day of month" hint="Leave blank to use the joining day">
          <input type="number" min={1} max={31} value={f.feeDay} onChange={(e) => set('feeDay', e.target.value)} />
        </Field>
        {member && (
          <Field label="Status">
            <select value={f.status} onChange={(e) => set('status', e.target.value)}>
              <option value="active">Active</option><option value="paused">Paused</option><option value="left">Left</option>
            </select>
          </Field>
        )}
        <Field label="Assigned trainer"><input value={f.trainer} onChange={(e) => set('trainer', e.target.value)} /></Field>
        <Field label="Notes (health, goals…)" full><textarea rows={3} maxLength={1000} value={f.notes} onChange={(e) => set('notes', e.target.value)} /></Field>

        <div className="a-modal__foot full">
          <button type="button" className="a-btn a-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="a-btn" disabled={busy}>{busy ? 'Saving…' : member ? 'Save changes' : 'Add member'}</button>
        </div>
      </form>
    </Modal>
  );
}
