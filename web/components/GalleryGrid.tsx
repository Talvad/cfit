'use client';
import { useEffect, useMemo, useState } from 'react';
import type { GalleryItem } from '@/lib/seed';

const PLACEHOLDER_HEIGHTS = ['h-[300px]', 'h-[190px]', 'h-[220px]'];

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
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`mb-4 grid break-inside-avoid place-items-center border border-edge bg-hatch ${PLACEHOLDER_HEIGHTS[i % 3]}`}
            >
              <span className="font-display text-2xl font-extrabold uppercase tracking-[0.2em] text-edge">C-FIT</span>
            </div>
          ))}
        </div>
        <p className="mt-6 border border-dashed border-edge p-12 text-center text-mute">
          Photos from the floor are coming soon.
        </p>
      </>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`border px-[18px] py-2 font-display font-bold uppercase tracking-[0.14em] transition-colors ${
              filter === c
                ? 'border-brand bg-brand text-white'
                : 'border-edge text-mute hover:border-snow hover:text-snow'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item) => (
          <button
            key={item.id}
            onClick={() => setOpen(item)}
            className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden border border-edge bg-panel p-0 text-left"
          >
            <img
              src={item.url}
              alt={item.caption || 'CFitness gym photo'}
              loading="lazy"
              className="w-full transition-transform duration-500 group-hover:scale-105"
            />
            {item.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-3.5 pb-3 pt-9 text-sm opacity-0 transition-opacity group-hover:opacity-100">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-100 grid place-items-center bg-black/95 p-6"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button className="absolute right-5 top-4 text-4xl leading-none text-white" aria-label="Close">×</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={open.url} alt={open.caption || ''} className="max-h-[82vh] max-w-[min(1100px,100%)] object-contain" />
            {open.caption && <figcaption className="mt-3.5 text-center text-mute">{open.caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
