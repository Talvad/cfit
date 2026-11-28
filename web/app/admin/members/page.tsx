'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import MemberForm from '@/components/admin/MemberForm';
import { Badge, ErrorBox, Loading, PageTitle } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { downloadCsv, fmtDate, inr, useLoad } from '@/lib/helpers';
import { PROGRAMS, type Member } from '@/lib/types';

const tone = { active: 'green', paused: 'amber', left: 'gray' } as const;

export default function MembersPage() {
  const { data, loading, error, reload } = useLoad(() => api<{ items: Member[] }>('/members'), []);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('active');
  const [program, setProgram] = useState('');
  const [adding, setAdding] = useState(false);

  const members = data?.items || [];
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return members.filter(
      (m) =>
        (!status || m.status === status) &&
        (!program || m.program === program) &&
        (!s || [m.name, m.id, m.phone].some((x) => (x || '').toLowerCase().includes(s)))
    );
  }, [members, q, status, program]);

  function exportCsv() {
    downloadCsv('cfitness-members.csv', [
      ['ID', 'Name', 'Phone', 'Address', 'Program', 'Plan', 'Monthly fee', 'Joining date', 'Fee day', 'Status', 'Trainer'],
      ...shown.map((m) => [m.id, m.name, m.phone, m.address, m.program, m.planName || '', m.amount, m.joiningDate, m.feeDay, m.status, m.trainer || '']),
    ]);
  }

  return (
    <>
      <PageTitle title="Members" sub={`${shown.length} of ${members.length} shown`}>
        <button className="a-btn a-btn--ghost" onClick={exportCsv} disabled={!shown.length}>Export CSV</button>
        <button className="a-btn" onClick={() => setAdding(true)}>+ New member</button>
      </PageTitle>

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <input className="a-input" placeholder="Search name, ID or phone…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 240 }} />
        <select className="a-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option><option value="active">Active</option><option value="paused">Paused</option><option value="left">Left</option>
        </select>
        <select className="a-select" value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">All programs</option>
          {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <ErrorBox msg={error} />
      {loading && !data ? <Loading /> : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead>
              <tr><th>ID</th><th>Member</th><th>Program</th><th className="num">Fee</th><th>Joined</th><th>Due day</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {shown.length === 0 && <tr><td colSpan={8} className="a-empty">No members found.</td></tr>}
              {shown.map((m) => (
                <tr key={m.id}>
                  <td><b>{m.id}</b></td>
                  <td>{m.name}<div className="sub">{m.phone}</div></td>
                  <td>{m.program}{m.trainer && <div className="sub">Trainer: {m.trainer}</div>}</td>
                  <td className="num">{inr(m.amount)}</td>
                  <td>{fmtDate(m.joiningDate)}</td>
                  <td>{m.feeDay}</td>
                  <td><Badge tone={tone[m.status]}>{m.status}</Badge></td>
                  <td><Link className="a-btn a-btn--ghost a-btn--sm" href={`/admin/members/${m.id}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && <MemberForm onClose={() => setAdding(false)} onSaved={reload} />}
    </>
  );
}
