import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { getGallery } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Gallery' };

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <section className="border-b border-edge bg-glow pb-10 pt-20">
        <div className="wrap">
          <div className="eyebrow">Inside the gym</div>
          <h1 className="display text-[clamp(3rem,8vw,6rem)]">
            The <span className="text-brand">gallery</span>
          </h1>
          <p className="lead mt-4">Sweat, steel and celebrations, straight from the floor.</p>
        </div>
      </section>
      <section className="py-24">
        <div className="wrap">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
