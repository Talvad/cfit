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

const sectionHead = 'mb-13 flex flex-wrap items-end justify-between gap-6';

export default async function HomePage() {
  const [plans, achievements] = await Promise.all([getPlans(), getAchievements()]);
  const topPlans = plans.slice(0, 3);
  const topAch = achievements.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden pb-28 pt-20">
        <div className="absolute inset-0 bg-hero" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="eyebrow">Strength · Cardio · Coaching</div>
            <h1 className="display text-[clamp(3.4rem,9vw,7.4rem)]">
              Built on <span className="text-brand">iron.</span>
              <br />
              Proven by <span className="text-brand">reps.</span>
            </h1>
            <p className="lead my-6 mb-8">
              {SITE.name} is a no-nonsense gym for people who want to get stronger, leaner and more
              disciplined, with coaches who actually watch your sets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#join" className="btn">Start free trial</Link>
              <Link href="/pricing" className="btn btn--ghost">See pricing</Link>
            </div>
          </div>
          <div className="relative order-first grid place-items-center md:order-none">
            <img
              src="/logo.png"
              alt="C-FIT logo"
              className="w-60 mix-blend-lighten drop-shadow-[0_0_40px_rgba(229,32,47,0.35)] md:w-[min(440px,100%)]"
            />
            <span className="absolute bottom-[4%] right-[2%] -rotate-4 bg-snow px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-black">
              Train hard
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- marquee */}
      <div
        className="relative z-2 -mx-2.5 -mt-6 -rotate-1 overflow-hidden border-y-[3px] border-black bg-brand text-white"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-7 py-3 font-display text-[1.7rem] font-extrabold uppercase tracking-[0.12em] after:ml-14 after:opacity-70 after:content-['✦']"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------- stats */}
      <section className="pb-24 pt-20">
        <div className="wrap grid grid-cols-2 border-y border-edge md:grid-cols-4">
          {SITE.stats.map((s) => (
            <div
              key={s.label}
              className="border-edge px-6 py-8 max-md:odd:border-r max-md:[&:nth-child(-n+2)]:border-b md:border-r md:last:border-r-0"
            >
              <div className="font-display text-[3.4rem] font-extrabold leading-none">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-mute">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ programs */}
      <section className="bg-panel py-24">
        <div className="wrap">
          <div className={sectionHead}>
            <div>
              <div className="eyebrow">What we offer</div>
              <h2 className="display text-[clamp(2.4rem,5vw,4rem)]">Pick your <span className="text-brand">discipline</span></h2>
            </div>
            <p className="lead max-w-[40ch]">Four ways to train, one standard: show up and work.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {PROGRAMS.map((p) => (
              <article key={p.n} className="card">
                <div className="text-outline mb-4 font-display text-[4.6rem] font-extrabold leading-[0.9]">{p.n}</div>
                <h3 className="display text-[1.7rem] leading-[1.05]">{p.title}</h3>
                <p className="mt-2.5 text-mute">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- why us */}
      <section className="py-24">
        <div className="wrap grid items-center gap-9 md:grid-cols-2 md:gap-16">
          <div>
            <div className="eyebrow">Why C-FIT</div>
            <h2 className="display text-[clamp(2.4rem,5vw,4rem)]">
              Not a gym.
              <br />A <span className="text-brand">training ground.</span>
            </h2>
            <p className="lead mt-5">
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
              <div key={s.label} className="mt-5">
                <div className="mb-1.5 flex justify-between font-display font-semibold uppercase tracking-[0.12em]">
                  <span>{s.label}</span>
                  <span>{s.pct}%</span>
                </div>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${s.pct}%` }} /></div>
              </div>
            ))}
            <p className="mt-7 text-mute">Open {SITE.hours[0].days}, {SITE.hours[0].time}.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- pricing */}
      <section className="bg-panel py-24">
        <div className="wrap">
          <div className={sectionHead}>
            <div>
              <div className="eyebrow">Memberships</div>
              <h2 className="display text-[clamp(2.4rem,5vw,4rem)]">Simple <span className="text-brand">pricing</span></h2>
            </div>
            <Link href="/pricing" className="btn btn--ghost btn--sm">All plans</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topPlans.map((p) => <PlanCard key={p.id} plan={p} />)}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- achievements */}
      <section className="py-24">
        <div className="wrap">
          <div className={sectionHead}>
            <div>
              <div className="eyebrow">Wins</div>
              <h2 className="display text-[clamp(2.4rem,5vw,4rem)]">Recent <span className="text-brand">achievements</span></h2>
            </div>
            <Link href="/achievements" className="btn btn--ghost btn--sm">See all</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topAch.map((a) => (
              <article key={a.id} className="card">
                <span className="chip">{a.category}</span>
                <h3 className="display mt-4 text-[1.7rem] leading-[1.05]">{a.title}</h3>
                <p className="mt-2.5 text-mute">{a.description}</p>
                <p className="mt-2.5 text-sm uppercase tracking-[0.08em] text-mute">{fmtDate(a.date)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- join */}
      <section id="join" className="relative overflow-hidden bg-brand py-24 text-white">
        <span
          className="pointer-events-none absolute -bottom-14 -right-5 font-display text-[18rem] font-extrabold leading-none text-black/12 max-md:hidden"
          aria-hidden="true"
        >
          C-FIT
        </span>
        <div className="wrap relative grid items-center gap-9 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="display text-[clamp(2.4rem,5vw,4rem)]">
              Ready to
              <br />
              start?
            </h2>
            <p className="mt-4 max-w-[38ch] text-lg">
              Leave your number and we&apos;ll book your free trial session. Come in, look around and try a workout on us.
            </p>
            <p className="mt-4">
              Prefer WhatsApp?{' '}
              <a
                className="font-bold underline"
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I would like to know more about CFitness')}`}
              >
                Message us
              </a>
            </p>
          </div>
          <div className="panel bg-[#0a0a0b] text-snow">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
