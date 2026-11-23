import type { Metadata } from 'next';
import { fmtDate, getAchievements } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Achievements' };

export default async function AchievementsPage() {
  const items = await getAchievements();
  return (
    <>
      <section className="border-b border-edge bg-glow pb-10 pt-20">
        <div className="wrap">
          <div className="eyebrow">Hall of fame</div>
          <h1 className="display text-[clamp(3rem,8vw,6rem)]">
            Our <span className="text-brand">achievements</span>
          </h1>
          <p className="lead mt-4">
            Podiums, personal bests and life-changing transformations from the C-FIT family.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap grid gap-7">
          {items.length === 0 && (
            <p className="border border-dashed border-edge p-12 text-center text-mute">
              Our first wins are being added. Check back soon.
            </p>
          )}
          {items.map((a, i) => (
            <article key={a.id} className="grid border border-edge bg-panel sm:grid-cols-[200px_1fr]">
              <div className="relative grid min-h-[150px] place-items-center overflow-hidden bg-panel2 sm:min-h-[170px]">
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt={a.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="text-outline font-display text-[5rem] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className="px-7 py-7">
                <div className="mb-2 flex flex-wrap items-center gap-3.5 text-sm uppercase tracking-[0.08em] text-mute">
                  <span className="chip">{a.category}</span>
                  <span>{fmtDate(a.date)}</span>
                  {a.person && <span>· {a.person}</span>}
                </div>
                <h2 className="display text-[2rem]">{a.title}</h2>
                {a.description && <p className="mt-2.5 text-mute">{a.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
