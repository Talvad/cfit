'use client';
import Link from 'next/link';
import { useState } from 'react';
import PaymentModal from '@/components/admin/PaymentModal';
import { ErrorBox, Loading, PageTitle, feeBadge } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { downloadCsv, fmtDate, inr, monthLabel, reminderText, thisMonth, useLoad, waLink } from '@/lib/helpers';
import type { FeeRow, FeesResponse } from '@/lib/types';

type Tab = 'pending' | 'paid' | 'all';

export default function FeesPage() {
  const [month, setMonth] = useState(thisMonth());
  const [tab, setTab] = useState<Tab>('pending');
  const [paying, setPaying] = useState<FeeRow | null>(null);
  const { data, loading, error, reload } = useLoad(() => api<FeesResponse>(`/fees?month=${month}`), [month]);

  const rows = (data?.rows || []).filter((r) =>
    tab === 'all' ? true : tab === 'paid' ? r.status === 'paid' : r.balance > 0
  );
  const t = data?.totals;

  function exportCsv() {
    downloadCsv(`cfitness-fees-${month}.csv`, [
      ['Member ID', 'Name', 'Phone', 'Program', 'Due date', 'Due', 'Paid', 'Balance', 'Status'],
      ...rows.map((r) => [r.memberId, r.name, r.phone, r.program, r.dueDate, r.due, r.paid, r.balance, r.status]),
    ]);
  }

  return (
    <>
      <PageTitle title="Fees & Pending" sub={monthLabel(month)}>
        <input type="month" className="a-input" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} />
        <button className="a-btn a-btn--ghost" onClick={exportCsv} disabled={!rows.length}>Export CSV</button>
      </PageTitle>
      <ErrorBox msg={error} />

      {t && (
        <div className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
          <div className="a-stat a-stat--green"><div className="a-stat__label">Collected</div><div className="a-stat__value">{inr(t.collected)}</div><div className="a-stat__sub">{t.paidCount} fully paid</div></div>
          <div className="a-stat a-stat--amber"><div className="a-stat__label">Pending</div><div className="a-stat__value">{inr(t.pending)}</div><div className="a-stat__sub">{t.pendingCount} members</div></div>
          <div className="a-stat a-stat--red"><div className="a-stat__label">Overdue</div><div className="a-stat__value">{t.overdueCount}</div><div className="a-stat__sub">past their due date</div></div>
          <div className="a-stat"><div className="a-stat__label">Expected</div><div className="a-stat__value">{inr(t.expected)}</div><div className="a-stat__sub">for the month</div></div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <div className="a-tabs">
          {(['pending', 'paid', 'all'] as Tab[]).map((x) => (
            <button key={x} className={tab === x ? 'active' : ''} onClick={() => setTab(x)}>
              {x === 'pending' ? `Pending${t ? ` (${t.pendingCount})` : ''}` : x === 'paid' ? 'Paid' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? <Loading /> : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr><th>Member</th><th>Program</th><th>Due date</th><th className="num">Due</th><th className="num">Paid</th><th className="num">Balance</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={8} className="a-empty">{tab === 'pending' ? '🎉 Nobody is pending for this month.' : 'Nothing to show.'}</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.memberId}>
                  <td><Link href={`/admin/members/${r.memberId}`}><b>{r.name}</b></Link><div className="sub">{r.memberId} · {r.phone}</div></td>
                  <td>{r.program}</td>
                  <td>{fmtDate(r.dueDate)}</td>
                  <td className="num">{inr(r.due)}</td>
                  <td className="num">{inr(r.paid)}</td>
                  <td className="num"><b>{inr(r.balance)}</b></td>
                  <td>{feeBadge(r.status, r.overdue)}</td>
                  <td style={{ whiteSpace: 'nowrap', display: 'flex', gap: 6 }}>
                    {r.balance > 0 && (
                      <>
                        <button className="a-btn a-btn--green a-btn--sm" onClick={() => setPaying(r)}>Received</button>
                        <a className="a-btn a-btn--ghost a-btn--sm" target="_blank" rel="noreferrer" href={waLink(r.phone, reminderText(r.name, r.balance, month, r.dueDate))}>Remind</a>
                      </>
                    )}
                    {r.balance === 0 && <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => setPaying(r)}>Add</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paying && (
        <PaymentModal
          memberId={paying.memberId}
          memberName={paying.name}
          month={month}
          amount={paying.balance || undefined}
          onClose={() => setPaying(null)}
          onSaved={reload}
        />
      )}
    </>
  );
}
