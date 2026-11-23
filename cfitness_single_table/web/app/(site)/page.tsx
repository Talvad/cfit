import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';
import PlanCard from '@/components/PlanCard';
import { fmtDate, getAchievements, getPlans } from '@/lib/public-api';
import { SITE } from '@/lib/site';

const PROGRAMS = [
  { n: '01', title: 'Cardio Zone', text: 'Treadmills, rowers, bikes and coach-led conditioning to build an engine that does not quit.' },
  { n: '02', title: 'Personal Training', text: 'One coach, one plan, full attention on your form, your numbers and your goals.' },
  { n: '03', title: 'Strength Floor', text: 'Racks, platforms and free weights set up for serious lifting, from first rep to personal best.' },
  { n: '04', title: 'Transformations', text: 'Structured 100-day challenges with weekly check-ins and a community pushing you forward.' },
];

const MARQUEE = ['Force', 'Flow', 'Finish', 'Lift', 'Sweat', 'Repeat'];

const STANDARDS = [
  { label: 'Consistency', pct: 96 },
  { label: 'Technique', pct: 92 },
  { label: 'Effort', pct: 100 },
];

export default async function HomePage() {
  const [plans, achievements] = await Promise.all([getPlans(), getAchievements()]);
  const topPlans = plans.slice(0, 3);
  const topAch = achievements.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="eyebrow">Strength · Cardio · Coaching</div>
            <h1 className="display">
              Built on <span className="red">iron.</span>
              <br />
              Proven by <span className="red">reps.</span>
            </h1>
            <p className="lead">
              {SITE.name} is a no-nonsense gym for people who want to get stronger, leaner and more
              disciplined, with coaches who actually watch your sets.
            </p>
            <div className="hero__actions">
              <Link href="/#join" className="btn">Start free trial</Link>
              <Link href="/pricing" className="btn btn--ghost">See pricing</Link>
            </div>
          </div>
          <div className="hero__logo">
            <img src="/logo.png" alt="C-FIT logo" />
            <span className="hero__badge">Train hard</span>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="marquee__item">{w}</span>
          ))}
        </div>
      </div>

      <section className="section" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="stats">
            {SITE.stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat__value">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">What we offer</div>
              <h2 className="display">Pick your <span className="red">discipline</span></h2>
            </div>
            <p className="lead" style={{ maxWidth: '40ch' }}>Four ways to train, one standard: show up and work.</p>
          </div>
          <div className="grid grid--3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {PROGRAMS.map((p) => (
              <article key={p.n} className="card">
                <div className="card__num">{p.n}</div>
                <h3 className="display">{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <div className="eyebrow">Why C-FIT</div>
            <h2 className="display">Not a gym.<br />A <span className="red">training ground.</span></h2>
            <p className="lead" style={{ marginTop: 22 }}>
              No gimmicks and no crowded machines with nobody to ask. Just proper equipment, coaches who care
              and a floor full of people working toward something.
            </p>
            <ul className="checklist">
              <li>Coaches who correct your form, not just count your reps</li>
              <li>Programmes built around your goal and your schedule</li>
              <li>Clean, well-maintained equipment, from dumbbells to racks</li>
              <li>A community that celebrates every win, big or small</li>
            </ul>
          </div>
          <div className="panel">
            <div className="eyebrow">Our standards</div>
            {STANDARDS.map((s) => (
              <div key={s.label} className="bar">
                <div className="bar__row"><span>{s.label}</span><span>{s.pct}%</span></div>
                <div className="bar__track"><div className="bar__fill" style={{ width: `${s.pct}%` }} /></div>
              </div>
            ))}
            <p className="muted" style={{ marginTop: 28 }}>
              Open {SITE.hours[0].days}, {SITE.hours[0].time}.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Memberships</div>
              <h2 className="display">Simple <span className="red">pricing</span></h2>
            </div>
            <Link href="/pricing" className="btn btn--ghost btn--sm">All plans</Link>
          </div>
          <div className="grid grid--3">
            {topPlans.map((p) => <PlanCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="eyebrow">Wins</div>
              <h2 className="display">Recent <span className="red">achievements</span></h2>
            </div>
            <Link href="/achievements" className="btn btn--ghost btn--sm">See all</Link>
          </div>
          <div className="grid grid--3">
            {topAch.map((a) => (
              <article key={a.id} className="card">
                <span className="chip">{a.category}</span>
                <h3 className="display" style={{ marginTop: 16 }}>{a.title}</h3>
                <p>{a.description}</p>
                <p style={{ fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{fmtDate(a.date)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="section cta">
        <div className="container split" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <h2 className="display">Ready to<br />start?</h2>
            <p style={{ marginTop: 18, fontSize: '1.15rem', maxWidth: '38ch' }}>
              Leave your number and we&apos;ll book your free trial session. Come in, look around and try a workout on us.
            </p>
            <p style={{ marginTop: 18 }}>
              Prefer WhatsApp?{' '}
              <a style={{ textDecoration: 'underline', fontWeight: 700 }} href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I would like to know more about CFitness')}`}>
                Message us
              </a>
            </p>
          </div>
          <div className="panel" style={{ background: '#0a0a0b', color: 'var(--text)' }}>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
