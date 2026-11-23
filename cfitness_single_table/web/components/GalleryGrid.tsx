'use client';
import { useEffect, useMemo, useState } from 'react';
import type { GalleryItem } from '@/lib/seed';

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const shown = filter === 'All' ? items : items.filter((i) => i.category === filter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (items.length === 0) {
    return (
      <>
        <div className="masonry" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="tile tile--ph"><span>C-FIT</span></div>
          ))}
        </div>
        <p className="empty" style={{ marginTop: 24 }}>Photos from the floor are coming soon.</p>
      </>
    );
  }

  return (
    <>
      <div className="filters">
        {categories.map((c) => (
          <button key={c} className={`filter ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="masonry">
        {shown.map((item) => (
          <button key={item.id} className="tile" onClick={() => setOpen(item)}>
            <img src={item.url} alt={item.caption || 'CFitness gym photo'} loading="lazy" />
            {item.caption && <span className="tile__cap">{item.caption}</span>}
          </button>
        ))}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Close">×</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={open.url} alt={open.caption || ''} />
            {open.caption && <p>{open.caption}</p>}
          </figure>
        </div>
      )}
    </>
  );
}
