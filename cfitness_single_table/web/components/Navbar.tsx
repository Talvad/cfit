'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/site';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt={`${SITE.name} logo`} />
          <span>{SITE.name}</span>
        </Link>

        <ul className={`nav__links ${open ? 'open' : ''}`}>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/#join" className="btn btn--sm nav__cta">Join now</Link>
        <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
