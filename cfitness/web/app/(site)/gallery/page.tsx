import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { getGallery } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Gallery' };

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Inside the gym</div>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            The <span className="red">gallery</span>
          </h1>
          <p className="lead" style={{ marginTop: 18 }}>
            Sweat, steel and celebrations, straight from the floor.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
