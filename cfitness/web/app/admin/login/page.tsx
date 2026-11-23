'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/admin/AdminRoot';
import { authConfigured, completeNewPassword, signIn } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'signin' | 'new-password'>('signin');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function done() {
    if (await refresh()) router.replace('/admin');
    else setError('This account is not an administrator.');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (step === 'signin') {
        const r = await signIn(email, password);
        if (r.status === 'new-password') setStep('new-password');
        else await done();
      } else {
        await completeNewPassword(newPassword);
        await done();
      }
    } catch (err: any) {
      setError(err.message || 'Could not sign in');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="a-login">
      <form className="a-login__box a-form" onSubmit={onSubmit}>
        <img src="/logo.png" alt="CFitness" />
        <h1 className="display" style={{ textAlign: 'center', fontSize: '1.8rem' }}>Admin sign in</h1>

        {!authConfigured && (
          <div className="a-alert">
            Cognito is not configured. Add NEXT_PUBLIC_COGNITO_USER_POOL_ID and NEXT_PUBLIC_COGNITO_CLIENT_ID to
            web/.env.local.
          </div>
        )}

        {step === 'signin' ? (
          <>
            <div className="a-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </div>
            <div className="a-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
          </>
        ) : (
          <div className="a-field">
            <label>Choose a new password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={10} autoComplete="new-password" />
            <div className="hint">At least 10 characters with upper case, lower case and a number.</div>
          </div>
        )}

        {error && <div className="a-alert" style={{ marginBottom: 0 }}>{error}</div>}
        <button className="a-btn" disabled={busy || !authConfigured}>
          {busy ? 'Please wait…' : step === 'signin' ? 'Sign in' : 'Set password & continue'}
        </button>
        <Link href="/" className="muted" style={{ textAlign: 'center', fontSize: '0.85rem' }}>← Back to website</Link>
      </form>
    </div>
  );
}
