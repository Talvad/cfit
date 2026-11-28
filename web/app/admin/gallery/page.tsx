'use client';
import { useRef, useState } from 'react';
import { ErrorBox, Field, Loading, Modal, PageTitle, useToast } from '@/components/admin/ui';
import { api, uploadImage } from '@/lib/admin-api';
import { getErrorMessage, useLoad } from '@/lib/helpers';
import type { GalleryItem } from '@/lib/seed';
import { GALLERY_CATEGORIES } from '@/lib/types';

export default function GalleryAdminPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useLoad(() => api<{ items: GalleryItem[] }>('/gallery'), '');
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0]);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState('');
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const list = Array.from(files);
    let ok = 0;
    for (let i = 0; i < list.length; i++) {
      setProgress(`Uploading ${i + 1} of ${list.length}…`);
      try {
        const key = await uploadImage(list[i], 'gallery');
        await api('/gallery', { method: 'POST', body: { key, category, caption: list.length === 1 ? caption : '' } });
        ok++;
      } catch (e) {
        toast(getErrorMessage(e), 'error');
      }
    }
    setProgress('');
    setCaption('');
    if (fileRef.current) fileRef.current.value = '';
    if (ok) toast(`${ok} image${ok === 1 ? '' : 's'} added`);
    reload();
  }

  async function remove(item: GalleryItem) {
    if (!confirm('Delete this image permanently?')) return;
    try {
      await api(`/gallery/${item.id}`, { method: 'DELETE' });
      toast('Image deleted');
      reload();
    } catch (e) {
      toast(getErrorMessage(e), 'error');
    }
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      await api(`/gallery/${editing.id}`, { method: 'PUT', body: { caption: editing.caption || '', category: editing.category } });
      toast('Image updated');
      setEditing(null);
      reload();
    } catch (err) {
      toast(getErrorMessage(err), 'error');
    }
  }

  return (
    <>
      <PageTitle title="Gallery" sub="Upload photos for the public Gallery page (JPG, PNG or WebP, up to 8 MB each)." />

      <div className="a-card" style={{ marginBottom: 22 }}>
        <h3>Add images</h3>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {GALLERY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Caption" hint="Used when uploading a single image">
            <input value={caption} maxLength={140} onChange={(e) => setCaption(e.target.value)} />
          </Field>
          <Field label="Choose files" full>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={!!progress} onChange={(e) => onFiles(e.target.files)} />
            {progress && <div className="hint">{progress}</div>}
          </Field>
        </div>
      </div>

      <ErrorBox msg={error} />
      {loading && !data ? <Loading /> : (data?.items.length ?? 0) === 0 ? (
        <div className="a-card a-empty">No images yet. Upload your first photos above.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          {data?.items.map((g) => (
            <div key={g.id} className="a-thumb">
              <img src={g.url} alt={g.caption || ''} loading="lazy" />
              <div className="a-thumb__body">
                <div><b>{g.category}</b><div className="sub text-mute" style={{ fontSize: '0.82rem' }}>{g.caption || 'No caption'}</div></div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => setEditing(g)}>Edit</button>
                  <button className="a-btn a-btn--danger a-btn--sm" onClick={() => remove(g)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal title="Edit image" onClose={() => setEditing(null)}>
          <form className="grid gap-3.5" onSubmit={saveEdit}>
            <img src={editing.url} alt="" style={{ maxHeight: 220, objectFit: 'contain', margin: '0 auto' }} />
            <Field label="Category">
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {GALLERY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Caption"><input maxLength={140} value={editing.caption || ''} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} /></Field>
            <div className="mt-5 flex justify-end gap-2.5">
              <button type="button" className="a-btn a-btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="a-btn">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
