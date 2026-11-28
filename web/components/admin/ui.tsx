'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// ---------------------------------------------------------------- toasts
type Toast = { id: number; msg: string; type: 'ok' | 'error' };
const ToastCtx = createContext<(msg: string, type?: 'ok' | 'error') => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((msg: string, type: 'ok' | 'error' = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-5 right-5 z-200 grid gap-2.5" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`a-toast ${t.type === 'error' ? 'a-toast--error' : ''}`}>{t.msg}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// ----------------------------------------------------------------- modal
export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="a-modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`a-modal ${wide ? 'a-modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[1.6rem] font-bold uppercase tracking-[0.06em]">{title}</h2>
          <button className="text-3xl leading-none text-mute hover:text-snow" onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- bits
export function Field({
  label,
  hint,
  full,
  children,
}: {
  label: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`a-field ${full ? 'col-span-full' : ''}`}>
      <label>{label}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

export function Badge({ tone = 'gray', children }: { tone?: 'green' | 'red' | 'amber' | 'gray' | 'blue'; children: React.ReactNode }) {
  return <span className={`a-badge a-badge--${tone}`}>{children}</span>;
}

export function feeBadge(status: string, overdue?: boolean) {
  if (status === 'paid') return <Badge tone="green">Paid</Badge>;
  if (status === 'partial') return <Badge tone="amber">Partial</Badge>;
  return <Badge tone={overdue ? 'red' : 'gray'}>{overdue ? 'Overdue' : 'Pending'}</Badge>;
}

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[2.4rem] font-extrabold uppercase leading-none tracking-[0.02em]">{title}</h1>
        {sub && <p className="mt-1 text-mute">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  );
}

export const ErrorBox = ({ msg }: { msg: string }) => (msg ? <div className="a-alert">{msg}</div> : null);
export const Loading = () => <div className="a-loading">Loading…</div>;
