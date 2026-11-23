import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';
import { Suspense } from 'react';
import { connection } from 'next/server';

const heading = 'mb-3.5 font-display font-bold uppercase tracking-[0.2em] text-brand';
const item = 'mb-2 text-mute';

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-[#050506] pb-6 pt-14">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-3.5 flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-[52px] w-auto mix-blend-lighten" />
              <span className="font-display text-2xl font-extrabold uppercase tracking-[0.08em]">{SITE.name}</span>
            </div>
            <p className="max-w-[34ch] text-mute">{SITE.description}</p>
          </div>
          <div>
            <h4 className={heading}>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href} className={item}>
                  <Link href={n.href} className="hover:text-snow">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={heading}>Visit us</h4>
            <ul>
              <li className={item}>{SITE.address}</li>
              <li className={item}>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-snow">{SITE.phone}</a>
              </li>
              <li className={item}>
                <a href={`mailto:${SITE.email}`} className="hover:text-snow">{SITE.email}</a>
              </li>
              {SITE.hours.map((h) => (
                <li key={h.days} className={item}>{h.days}: {h.time}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-11 flex flex-wrap justify-between gap-2.5 border-t border-edge pt-5 text-sm text-mute">
          <Suspense fallback={<RightsReservedSkeleton/>}>
            <RightsReserved/>
          </Suspense>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

function RightsReservedSkeleton(){
  return <span>Loading...</span>
}
async function RightsReserved(){
  await connection()
  return <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
}