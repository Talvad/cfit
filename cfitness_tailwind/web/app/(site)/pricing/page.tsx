import type { Metadata } from 'next';
import Link from 'next/link';
import PlanCard from '@/components/PlanCard';
import { getPlans } from '@/lib/public-api';

export const metadata: Metadata = { title: 'Pricing' };

export default async function PricingPage() {
  const plans = await getPlans();
  return (
    <>
      <section className="border-b border-edge bg-glow pb-10 pt-20">
        <div className="wrap">
          <div className="eyebrow">Memberships</div>
          <h1 className="display text-[clamp(3rem,8vw,6rem)]">
            Pick your <span className="text-brand">plan</span>
          </h1>
          <p className="lead mt-4">
            Clear monthly pricing with no joining-fee surprises. Not sure which fits? Try a free session first.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap">
          {plans.length === 0 ? (
            <p className="border border-dashed border-edge p-12 text-center text-mute">Pricing will be published soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
            </div>
          )}
          <div className="panel mt-14 flex flex-wrap items-center justify-between gap-5">
            <div>
              <h3 className="display text-[1.7rem] leading-[1.05]">Want to try before you buy?</h3>
              <p className="mt-1 text-mute">Book a free trial session and walk the floor with a coach.</p>
            </div>
            <Link href="/#join" className="btn">Book free trial</Link>
          </div>
        </div>
      </section>
    </>
  );
}
