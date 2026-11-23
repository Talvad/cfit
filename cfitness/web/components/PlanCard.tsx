import Link from 'next/link';
import { inr } from '@/lib/public-api';
import type { Plan } from '@/lib/seed';

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`card plan ${plan.popular ? 'plan--popular' : ''}`}>
      {plan.popular && <span className="plan__tag">Most popular</span>}
      <div className="plan__cat">{plan.category}</div>
      <h3 className="display" style={{ marginTop: 8 }}>{plan.name}</h3>
      {plan.description && <p>{plan.description}</p>}
      <div className="plan__price">
        {inr(plan.price)} <small>/ {plan.period}</small>
      </div>
      <ul className="checklist">
        {plan.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <Link href="/#join" className={`btn ${plan.popular ? '' : 'btn--ghost'}`}>Get started</Link>
    </article>
  );
}
