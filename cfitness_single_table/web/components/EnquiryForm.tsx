'use client';
import { useState } from 'react';
import { API_URL } from '@/lib/public-api';

const INTERESTS = ['Cardio', 'Personal Training', 'Cardio + Personal Training', 'Just looking around'];

export default function EnquiryForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      if (!API_URL) throw new Error('The website is not connected to its API yet.');
      const res = await fetch(`${API_URL}/public/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || 'Could not send your request');
      }
      form.reset();
      setState('done');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="notice notice--ok">
        <strong>You&apos;re on the list.</strong> We&apos;ll call you soon to book your free trial session.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="interest">I&apos;m interested in</label>
        <select id="interest" name="interest" defaultValue={INTERESTS[0]}>
          {INTERESTS.map((i) => <option key={i}>{i}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Anything we should know? (optional)</label>
        <textarea id="message" name="message" rows={3} maxLength={500} />
      </div>
      {/* honeypot – humans never see or fill this */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === 'error' && <div className="notice">{error}</div>}
      <button className="btn" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Claim free trial'}
      </button>
    </form>
  );
}
