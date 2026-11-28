'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ErrorBox, Loading, PageTitle } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { fmtDate, inr, monthLabel, shortMonth, thisMonth, useLoad } from '@/lib/helpers';
import type { Dashboard } from '@/lib/types';

export default function DashboardPage() {
  const [month, setMonth] = useState(thisMonth());
  const { data: d, loading, error } = useLoad(() => api<Dashboard>(`/dashboard?month=${month}`), [month]);

  const maxTrend = Math.max(1, ...(d?.trend.map((t) => t.collected) || [1]));
  const programTotal = Object.values(d?.programs || {}).reduce((a, b) => a + b, 0) || 1;

  return (
    <>
      <PageTitle title="Dashboard" sub={monthLabel(month)}>
        <input type="month" className="a-input" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} />
        <Link href="/admin/members" className="a-btn">+ Add member</Link>
      </PageTitle>
      <ErrorBox msg={error} />
      {loading && !d && <Loading />}
      {d && (
        <>
          <div className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
            <div className="a-stat a-stat--red">
              <div className="a-stat__label">Active members</div>
              <div className="a-stat__value">{d.members.active}</div>
              <div className="a-stat__sub">{d.members.newThisMonth} joined this month · {d.members.paused} paused</div>
            </div>
            <div className="a-stat a-stat--green">
              <div className="a-stat__label">Collected</div>
              <div className="a-stat__value">{inr(d.fees.collected)}</div>
              <div className="a-stat__sub">of {inr(d.fees.expected)} expected</div>
            </div>
            <div className="a-stat a-stat--amber">
              <div className="a-stat__label">Pending</div>
              <div className="a-stat__value">{inr(d.fees.pending)}</div>
              <div className="a-stat__sub">{d.fees.pendingCount} member{d.fees.pendingCount === 1 ? '' : 's'} · <Link href="/admin/fees" style={{ color: 'var(--red)' }}>view list</Link></div>
            </div>
            <div className="a-stat">
              <div className="a-stat__label">Overdue</div>
              <div className="a-stat__value">{d.fees.overdueCount}</div>
              <div className="a-stat__sub">{d.dueSoon} more due in the next 3 days</div>
            </div>
            <div className="a-stat">
              <div className="a-stat__label">New enquiries</div>
              <div className="a-stat__value">{d.newEnquiries}</div>
              <div className="a-stat__sub"><Link href="/admin/enquiries" style={{ color: 'var(--red)' }}>open inbox</Link></div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
            <div className="a-card">
              <h3>Fees collected · last 6 months</h3>
              <div className="a-bars">
                {d.trend.map((t) => (
                  <div key={t.month} className="a-bars__col">
                    <span className="a-bars__val">{t.collected ? inr(t.collected) : ''}</span>
                    <div className="a-bars__bar" style={{ height: `${(t.collected / maxTrend) * 100}%` }} />
                    <span className="a-bars__lbl">{shortMonth(t.month)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="a-card">
              <h3>Active members by program</h3>
              {Object.keys(d.programs).length === 0 ? (
                <p className="text-mute">No active members yet.</p>
              ) : (
                <ul className="a-list">
                  {Object.entries(d.programs).map(([name, n]) => (
                    <li key={name} style={{ display: 'block' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{name}</span><b>{n}</b></div>
                      <div className="bar-track" style={{ marginTop: 6 }}>
                        <div className="bar-fill" style={{ width: `${(n / programTotal) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="a-card" style={{ gridColumn: '1 / -1' }}>
              <h3>Recent payments</h3>
              {d.recentPayments.length === 0 ? (
                <p className="text-mute">No payments recorded for {monthLabel(month)} yet.</p>
              ) : (
                <ul className="a-list">
                  {d.recentPayments.map((p) => (
                    <li key={p.id}>
                      <span><Link href={`/admin/members/${p.memberId}`}><b>{p.name}</b></Link> <span className="text-mute">· {p.mode}</span></span>
                      <span><b style={{ color: '#4ade80' }}>{inr(p.amount)}</b> <span className="text-mute">· {fmtDate(p.paidOn)}</span></span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
