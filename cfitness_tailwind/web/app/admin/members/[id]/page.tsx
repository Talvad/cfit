'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import MemberForm from '@/components/admin/MemberForm';
import PaymentModal from '@/components/admin/PaymentModal';
import { Badge, ErrorBox, Loading, PageTitle, useToast } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { fmtDate, inr, monthLabel, waLink } from '@/lib/helpers';
import type { Member, PaymentRecord } from '@/lib/types';
import { useLoad } from '@/lib/helpers';

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const { data, loading, error, reload } = useLoad(
    () => api<{ member: Member; payments: PaymentRecord[] }>(`/members/${id}`),
    [id]
  );
  const [editing, setEditing] = useState(false);
  const [paying, setPaying] = useState(false);

  async function removeMember() {
    if (!data) return;
    if (!confirm(`Delete ${data.member.name} and all their payment history? This cannot be undone.\n\nTip: set status to "Left" instead to keep records.`)) return;
    try {
      await api(`/members/${id}`, { method: 'DELETE' });
      toast('Member deleted');
      router.replace('/admin/members');
    } catch (e: any) {
      toast(e.message, 'error');
    }
  }

  async function removeEntry(month: string, entryId: string) {
    if (!confirm('Remove this payment entry?')) return;
    try {
      await api(`/payments/${month}/${id}/${entryId}`, { method: 'DELETE' });
      toast('Payment removed');
      reload();
    } catch (e: any) {
      toast(e.message, 'error');
    }
  }

  if (loading && !data) return <Loading />;
  if (!data) return <ErrorBox msg={error || 'Member not found'} />;
  const { member: m, payments } = data;
  const totalPaid = payments.reduce((s, p) => s + p.paid, 0);

  return (
    <>
      <PageTitle title={m.name} sub={`${m.id} · joined ${fmtDate(m.joiningDate)}`}>
        <Link href="/admin/members" className="a-btn a-btn--ghost">← Members</Link>
        <a className="a-btn a-btn--ghost" href={waLink(m.phone, `Hi ${m.name}, `)} target="_blank" rel="noreferrer">WhatsApp</a>
        <button className="a-btn a-btn--ghost" onClick={() => setEditing(true)}>Edit</button>
        <button className="a-btn a-btn--green" onClick={() => setPaying(true)}>Record payment</button>
      </PageTitle>
      <ErrorBox msg={error} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4" style={{ marginBottom: 20 }}>
        <div className="a-card">
          <h3>Profile <Badge tone={m.status === 'active' ? 'green' : m.status === 'paused' ? 'amber' : 'gray'}>{m.status}</Badge></h3>
          <dl className="a-kv">
            <dt>Phone</dt><dd><a href={`tel:${m.phone}`}>{m.phone}</a></dd>
            <dt>Email</dt><dd>{m.email || '–'}</dd>
            <dt>Address</dt><dd>{m.address}</dd>
            <dt>Gender / DOB</dt><dd>{m.gender || '–'} / {fmtDate(m.dob)}</dd>
            <dt>Emergency</dt><dd>{m.emergencyContact || '–'}</dd>
            <dt>Trainer</dt><dd>{m.trainer || '–'}</dd>
            <dt>Notes</dt><dd>{m.notes || '–'}</dd>
          </dl>
        </div>
        <div className="a-card">
          <h3>Membership</h3>
          <dl className="a-kv">
            <dt>Program</dt><dd>{m.program}</dd>
            <dt>Plan</dt><dd>{m.planName || 'Custom'}</dd>
            <dt>Monthly fee</dt><dd><b>{inr(m.amount)}</b></dd>
            <dt>Fee due day</dt><dd>{m.feeDay} of every month</dd>
            <dt>Joined</dt><dd>{fmtDate(m.joiningDate)}</dd>
            <dt>Total paid</dt><dd><b style={{ color: '#4ade80' }}>{inr(totalPaid)}</b></dd>
          </dl>
          <button className="a-btn a-btn--danger a-btn--sm" style={{ marginTop: 18 }} onClick={removeMember}>Delete member</button>
        </div>
      </div>

      <div className="a-card">
        <h3>Payment history</h3>
        {payments.length === 0 ? (
          <p className="text-mute">No payments recorded yet.</p>
        ) : (
          <div className="a-tablewrap" style={{ border: 0 }}>
            <table className="a-table">
              <thead><tr><th>Month</th><th className="num">Due</th><th className="num">Paid</th><th className="num">Balance</th><th>Received</th></tr></thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.month}>
                    <td><b>{monthLabel(p.month)}</b></td>
                    <td className="num">{inr(p.due)}</td>
                    <td className="num">{inr(p.paid)}</td>
                    <td className="num">{p.due - p.paid > 0 ? <Badge tone="amber">{inr(p.due - p.paid)}</Badge> : <Badge tone="green">Cleared</Badge>}</td>
                    <td>
                      {p.entries.map((e) => (
                        <div key={e.id} className="sub" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span>{inr(e.amount)} · {e.mode} · {fmtDate(e.paidOn)}{e.note ? ` · ${e.note}` : ''}</span>
                          <button className="a-btn a-btn--danger a-btn--sm" onClick={() => removeEntry(p.month, e.id)} aria-label="Remove payment">×</button>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && <MemberForm member={m} onClose={() => setEditing(false)} onSaved={reload} />}
      {paying && <PaymentModal memberId={m.id} memberName={m.name} amount={m.amount} onClose={() => setPaying(false)} onSaved={reload} />}
    </>
  );
}
