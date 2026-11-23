import type { Metadata } from 'next';
import Link from 'next/link';
import PlanCard from '@/components/PlanCard';
import { getPlans } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Pricing' };

export default async function PricingPage() {
  const plans = await getPlans();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Memberships</div>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Pick your <span className="red">plan</span>
          </h1>
          <p className="lead" style={{ marginTop: 18 }}>
            Clear monthly pricing with no joining-fee surprises. Not sure which fits? Try a free session first.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {plans.length === 0 ? (
            <p className="empty">Pricing will be published soon.</p>
          ) : (
            <div className="grid grid--3">
              {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
            </div>
          )}
          <div className="panel" style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="display">Want to try before you buy?</h3>
              <p className="muted">Book a free trial session and walk the floor with a coach.</p>
            </div>
            <Link href="/#join" className="btn">Book free trial</Link>
          </div>
        </div>
      </section>
    </>
  );
}
