import Link from 'next/link';
import { inr } from '@/lib/public-api';
import type { Plan } from '@/lib/seed';

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`card flex flex-col ${plan.popular ? 'border-brand bg-linear-to-b from-[#1c1012] to-panel to-60%' : ''}`}
    >
      {plan.popular && (
        <span className="absolute right-8 top-3.5 bg-brand px-2.5 py-[3px] font-display text-xs font-bold uppercase tracking-[0.16em]">
          Most popular
        </span>
      )}
      <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">{plan.category}</div>
      <h3 className="display mt-2 text-[1.7rem] leading-[1.05]">{plan.name}</h3>
      {plan.description && <p className="mt-2.5 text-mute">{plan.description}</p>}
      <div className="mb-1 mt-3.5 font-display text-[4.2rem] font-extrabold leading-none">
        {inr(plan.price)}{' '}
        <small className="text-[1.1rem] font-semibold uppercase tracking-widest text-mute">/ {plan.period}</small>
      </div>
      <ul className="checklist mb-7 flex-1 [&_li]:text-[0.97rem]">
        {plan.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <Link href="/#join" className={`btn ${plan.popular ? '' : 'btn--ghost'}`}>Get started</Link>
    </article>
  );
}
