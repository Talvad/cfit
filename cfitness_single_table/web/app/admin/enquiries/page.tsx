'use client';
import { Badge, ErrorBox, Loading, PageTitle, useToast } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { fmtDate, useLoad, waLink } from '@/lib/helpers';
import type { Enquiry } from '@/lib/types';

const STATUSES: Enquiry['status'][] = ['new', 'contacted', 'converted', 'closed'];
const tone = { new: 'red', contacted: 'amber', converted: 'green', closed: 'gray' } as const;

export default function EnquiriesPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useLoad(() => api<{ items: Enquiry[] }>('/enquiries'), []);

  async function setStatus(e: Enquiry, status: string) {
    try {
      await api(`/enquiries/${e.id}`, { method: 'PUT', body: { status } });
      reload();
    } catch (err: any) {
      toast(err.message, 'error');
    }
  }

  async function remove(e: Enquiry) {
    if (!confirm(`Delete the enquiry from ${e.name}?`)) return;
    try {
      await api(`/enquiries/${e.id}`, { method: 'DELETE' });
      reload();
    } catch (err: any) {
      toast(err.message, 'error');
    }
  }

  return (
    <>
      <PageTitle title="Enquiries" sub="People who asked for a free trial on the website." />
      <ErrorBox msg={error} />
      {loading && !data ? <Loading /> : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr><th>Received</th><th>Name</th><th>Interest</th><th>Message</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {(data?.items.length ?? 0) === 0 && <tr><td colSpan={6} className="a-empty">No enquiries yet.</td></tr>}
              {data?.items.map((e) => (
                <tr key={e.id}>
                  <td>{fmtDate(e.createdAt)}</td>
                  <td><b>{e.name}</b><div className="sub"><a href={`tel:${e.phone}`}>{e.phone}</a></div></td>
                  <td>{e.interest || '–'}</td>
                  <td className="sub" style={{ maxWidth: 280 }}>{e.message || '–'}</td>
                  <td>
                    <select className="a-select" value={e.status} onChange={(ev) => setStatus(e, ev.target.value)}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>{' '}
                    {e.status === 'new' && <Badge tone={tone.new}>new</Badge>}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <a className="a-btn a-btn--ghost a-btn--sm" target="_blank" rel="noreferrer" href={waLink(e.phone, `Hi ${e.name}, thanks for your interest in CFitness! `)}>WhatsApp</a>{' '}
                    <button className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(e)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
