'use client';
import { useState } from 'react';
import { Badge, ErrorBox, Field, Loading, Modal, PageTitle, useToast } from '@/components/admin/ui';
import { api, uploadImage } from '@/lib/admin-api';
import { fmtDate, today, useLoad } from '@/lib/helpers';
import type { Achievement } from '@/lib/seed';
import { ACH_CATEGORIES } from '@/lib/types';

type Form = { id?: string; title: string; description: string; date: string; category: string; person: string; imageKey: string; imageUrl: string };
const blank = (): Form => ({ title: '', description: '', date: today(), category: ACH_CATEGORIES[2], person: '', imageKey: '', imageUrl: '' });

export default function AchievementsAdminPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useLoad(() => api<{ items: Achievement[] }>('/achievements'), []);
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');

  const set = (k: keyof Form, v: string) => setForm((f) => (f ? { ...f, [k]: v } : f));

  function openEdit(a: Achievement) {
    setFormError('');
    setForm({
      id: a.id, title: a.title, description: a.description || '', date: a.date, category: a.category,
      person: a.person || '', imageKey: a.imageKey || '', imageUrl: a.imageUrl || '',
    });
  }

  async function onImage(file?: File) {
    if (!file) return;
    setBusy(true);
    setFormError('');
    try {
      const key = await uploadImage(file, 'achievements');
      // Show a local preview; the CloudFront URL is used once saved
      setForm((f) => (f ? { ...f, imageKey: key, imageUrl: URL.createObjectURL(file) } : f));
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setFormError('');
    const body = { title: form.title, description: form.description, date: form.date, category: form.category, person: form.person, imageKey: form.imageKey };
    try {
      if (form.id) await api(`/achievements/${form.id}`, { method: 'PUT', body });
      else await api('/achievements', { method: 'POST', body });
      toast(form.id ? 'Achievement updated' : 'Achievement added');
      setForm(null);
      reload();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(a: Achievement) {
    if (!confirm(`Delete "${a.title}"?`)) return;
    try {
      await api(`/achievements/${a.id}`, { method: 'DELETE' });
      toast('Achievement deleted');
      reload();
    } catch (e: any) {
      toast(e.message, 'error');
    }
  }

  return (
    <>
      <PageTitle title="Achievements" sub="Shown on the public Achievements page, newest first.">
        <button className="a-btn" onClick={() => { setFormError(''); setForm(blank()); }}>+ New achievement</button>
      </PageTitle>
      <ErrorBox msg={error} />
      {loading && !data ? <Loading /> : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr><th></th><th>Achievement</th><th>Category</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {(data?.items.length ?? 0) === 0 && <tr><td colSpan={5} className="a-empty">No achievements yet. The website is showing samples until you add one.</td></tr>}
              {data?.items.map((a) => (
                <tr key={a.id}>
                  <td style={{ width: 70 }}>{a.imageUrl ? <img src={a.imageUrl} alt="" style={{ width: 56, height: 56, objectFit: 'cover' }} /> : null}</td>
                  <td><b>{a.title}</b>{a.person && <span className="sub"> · {a.person}</span>}<div className="sub">{a.description}</div></td>
                  <td><Badge tone="red">{a.category}</Badge></td>
                  <td>{fmtDate(a.date)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => openEdit(a)}>Edit</button>{' '}
                    <button className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(a)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <Modal title={form.id ? 'Edit achievement' : 'New achievement'} onClose={() => setForm(null)} wide>
          <form className="a-form a-form--2" onSubmit={save}>
            <div className="full"><ErrorBox msg={formError} /></div>
            <Field label="Title" full><input required maxLength={120} value={form.title} onChange={(e) => set('title', e.target.value)} /></Field>
            <Field label="Category">
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                {ACH_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Date"><input required type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></Field>
            <Field label="Member / team (optional)" full><input maxLength={100} value={form.person} onChange={(e) => set('person', e.target.value)} /></Field>
            <Field label="Details" full><textarea rows={4} maxLength={800} value={form.description} onChange={(e) => set('description', e.target.value)} /></Field>
            <Field label="Photo (optional)" full>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => onImage(e.target.files?.[0])} disabled={busy} />
              {form.imageUrl && <img src={form.imageUrl} alt="" style={{ marginTop: 10, maxHeight: 140 }} />}
            </Field>
            <div className="a-modal__foot full">
              <button type="button" className="a-btn a-btn--ghost" onClick={() => setForm(null)}>Cancel</button>
              <button className="a-btn" disabled={busy}>{busy ? 'Please wait…' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
