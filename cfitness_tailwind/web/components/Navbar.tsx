'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/site';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-xl">
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt={`${SITE.name} logo`} className="h-[46px] w-auto mix-blend-lighten" />
          <span className="font-display text-2xl font-extrabold uppercase tracking-[0.08em]">{SITE.name}</span>
        </Link>

        <ul
          className={`absolute inset-x-0 top-[72px] flex-col border-b border-edge bg-ink md:static md:flex md:flex-row md:items-center md:gap-9 md:border-0 md:bg-transparent ${
            open ? 'flex' : 'hidden'
          }`}
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="border-t border-edge md:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`relative block px-5 py-4 font-display text-[1.05rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-snow md:px-0 md:py-1.5 ${
                    active
                      ? 'text-snow md:after:absolute md:after:inset-x-0 md:after:-bottom-0.5 md:after:h-[3px] md:after:bg-brand'
                      : 'text-mute'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/#join" className="btn btn--sm hidden md:inline-flex">
          Join now
        </Link>
        <button
          className="grid h-11 w-11 place-items-center border border-edge text-xl md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
