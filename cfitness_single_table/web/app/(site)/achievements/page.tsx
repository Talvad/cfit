import type { Metadata } from 'next';
import { fmtDate, getAchievements } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Achievements' };

export default async function AchievementsPage() {
  const items = await getAchievements();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Hall of fame</div>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Our <span className="red">achievements</span>
          </h1>
          <p className="lead" style={{ marginTop: 18 }}>
            Podiums, personal bests and life-changing transformations from the C-FIT family.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container timeline">
          {items.length === 0 && <p className="empty">Our first wins are being added. Check back soon.</p>}
          {items.map((a, i) => (
            <article key={a.id} className="ach">
              <div className="ach__media">
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt={a.title} loading="lazy" />
                ) : (
                  <span className="ach__medal">{String(i + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className="ach__body">
                <div className="ach__meta">
                  <span className="chip">{a.category}</span>
                  <span>{fmtDate(a.date)}</span>
                  {a.person && <span>· {a.person}</span>}
                </div>
                <h2 className="display" style={{ fontSize: '2rem' }}>{a.title}</h2>
                {a.description && <p className="muted" style={{ marginTop: 10 }}>{a.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
