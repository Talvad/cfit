'use client';
import { useState } from 'react';
import { Badge, ErrorBox, Field, Loading, Modal, PageTitle, useToast } from '@/components/admin/ui';
import { api } from '@/lib/admin-api';
import { inr, useLoad } from '@/lib/helpers';
import type { Plan } from '@/lib/seed';
import { PLAN_CATEGORIES } from '@/lib/types';

type PlanForm = {
  name: string; category: string; price: string; period: string; description: string;
  features: string; popular: boolean; active: boolean; order: string;
};

const blank: PlanForm = {
  name: '', category: 'General', price: '', period: 'month', description: '',
  features: '', popular: false, active: true, order: '10',
};

export default function PricingAdminPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useLoad(() => api<{ items: Plan[] }>('/pricing'), []);
  const [editing, setEditing] = useState<{ id?: string; form: PlanForm } | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');

  const openNew = () => { setFormError(''); setEditing({ form: blank }); };
  const openEdit = (p: Plan) => {
    setFormError('');
    setEditing({
      id: p.id,
      form: {
        name: p.name, category: p.category, price: String(p.price), period: p.period,
        description: p.description || '', features: p.features.join('\n'),
        popular: !!p.popular, active: p.active !== false, order: String(p.order ?? 100),
      },
    });
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setFormError('');
    const f = editing.form;
    const body = {
      ...f,
      price: Number(f.price),
      order: Number(f.order),
      features: f.features.split('\n').map((x) => x.trim()).filter(Boolean),
    };
    try {
      if (editing.id) await api(`/pricing/${editing.id}`, { method: 'PUT', body });
      else await api('/pricing', { method: 'POST', body });
      toast(editing.id ? 'Plan updated' : 'Plan added');
      setEditing(null);
      reload();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Plan) {
    if (!confirm(`Delete the "${p.name}" plan? Existing members keep their current fee.`)) return;
    try {
      await api(`/pricing/${p.id}`, { method: 'DELETE' });
      toast('Plan deleted');
      reload();
    } catch (e: any) {
      toast(e.message, 'error');
    }
  }

  async function toggleActive(p: Plan) {
    try {
      await api(`/pricing/${p.id}`, { method: 'PUT', body: { active: !(p.active !== false) } });
      reload();
    } catch (e: any) {
      toast(e.message, 'error');
    }
  }

  const set = (k: keyof PlanForm, v: string | boolean) =>
    setEditing((x) => (x ? { ...x, form: { ...x.form, [k]: v } } : x));

  return (
    <>
      <PageTitle title="Pricing" sub="Shown on the public Pricing page. Hidden plans stay here but are not shown to visitors.">
        <button className="a-btn" onClick={openNew}>+ New plan</button>
      </PageTitle>
      <ErrorBox msg={error} />
      {loading && !data ? <Loading /> : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr><th>Order</th><th>Plan</th><th>Category</th><th className="num">Price</th><th>Features</th><th>Visible</th><th></th></tr></thead>
            <tbody>
              {(data?.items.length ?? 0) === 0 && <tr><td colSpan={7} className="a-empty">No plans yet. The website is showing sample plans until you add one.</td></tr>}
              {data?.items.map((p) => (
                <tr key={p.id}>
                  <td>{p.order}</td>
                  <td><b>{p.name}</b> {p.popular && <Badge tone="red">Popular</Badge>}<div className="sub">{p.description}</div></td>
                  <td>{p.category}</td>
                  <td className="num"><b>{inr(p.price)}</b><div className="sub">/ {p.period}</div></td>
                  <td className="sub">{p.features.length} items</td>
                  <td><button className="a-btn a-btn--ghost a-btn--sm" onClick={() => toggleActive(p)}>{p.active !== false ? 'Visible' : 'Hidden'}</button></td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => openEdit(p)}>Edit</button>{' '}
                    <button className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? 'Edit plan' : 'New plan'} onClose={() => setEditing(null)} wide>
          <form className="a-form a-form--2" onSubmit={save}>
            <div className="full"><ErrorBox msg={formError} /></div>
            <Field label="Plan name"><input required maxLength={80} value={editing.form.name} onChange={(e) => set('name', e.target.value)} /></Field>
            <Field label="Category">
              <select value={editing.form.category} onChange={(e) => set('category', e.target.value)}>
                {PLAN_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (₹)"><input required type="number" min={0} value={editing.form.price} onChange={(e) => set('price', e.target.value)} /></Field>
            <Field label="Per" hint="e.g. month, quarter, year"><input maxLength={30} value={editing.form.period} onChange={(e) => set('period', e.target.value)} /></Field>
            <Field label="Short description" full><input maxLength={300} value={editing.form.description} onChange={(e) => set('description', e.target.value)} /></Field>
            <Field label="Features (one per line)" full><textarea rows={5} value={editing.form.features} onChange={(e) => set('features', e.target.value)} /></Field>
            <Field label="Display order" hint="Lower numbers appear first"><input type="number" min={0} max={9999} value={editing.form.order} onChange={(e) => set('order', e.target.value)} /></Field>
            <div className="a-field" style={{ display: 'grid', gap: 10, alignContent: 'center' }}>
              <label className="a-check"><input type="checkbox" checked={editing.form.popular} onChange={(e) => set('popular', e.target.checked)} /> Mark as “Most popular”</label>
              <label className="a-check"><input type="checkbox" checked={editing.form.active} onChange={(e) => set('active', e.target.checked)} /> Visible on website</label>
            </div>
            <div className="a-modal__foot full">
              <button type="button" className="a-btn a-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="a-btn" disabled={busy}>{busy ? 'Saving…' : 'Save plan'}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
