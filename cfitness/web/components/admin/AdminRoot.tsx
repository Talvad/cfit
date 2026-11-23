'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getSession, isAdminSession, sessionEmail, signOut } from '@/lib/auth';
import { ToastProvider } from './ui';

type AuthState = { status: 'loading' | 'authed' | 'anon'; email: string };
const AuthCtx = createContext<{ email: string; refresh: () => Promise<boolean>; logout: () => void }>({
  email: '',
  refresh: async () => false,
  logout: () => {},
});
export const useAuth = () => useContext(AuthCtx);

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/members', label: 'Members', icon: '☻' },
  { href: '/admin/fees', label: 'Fees & Pending', icon: '₹' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: '✉' },
  { href: '/admin/pricing', label: 'Pricing', icon: '◈' },
  { href: '/admin/gallery', label: 'Gallery', icon: '▣' },
  { href: '/admin/achievements', label: 'Achievements', icon: '★' },
];

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({ status: 'loading', email: '' });
  const [menu, setMenu] = useState(false);
  const isLogin = pathname === '/admin/login';

  const refresh = useCallback(async () => {
    const s = await getSession();
    if (s && isAdminSession(s)) {
      setAuth({ status: 'authed', email: sessionEmail(s) });
      return true;
    }
    setAuth({ status: 'anon', email: '' });
    return false;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (auth.status === 'anon' && !isLogin) router.replace('/admin/login');
  }, [auth.status, isLogin, router]);

  useEffect(() => setMenu(false), [pathname]);

  const logout = () => {
    signOut();
    setAuth({ status: 'anon', email: '' });
    router.replace('/admin/login');
  };

  const ctx = { email: auth.email, refresh, logout };

  if (isLogin) {
    return (
      <ToastProvider>
        <AuthCtx.Provider value={ctx}>{children}</AuthCtx.Provider>
      </ToastProvider>
    );
  }

  if (auth.status !== 'authed') {
    return <div className="a-loading" style={{ padding: 40 }}>Checking your session…</div>;
  }

  return (
    <ToastProvider>
      <AuthCtx.Provider value={ctx}>
        <div className="ad">
          <aside className={`ad-side ${menu ? 'open' : ''}`}>
            <div className="ad-brand">
              <img src="/logo.png" alt="" />
              <div><b>CFitness</b><small>Admin</small></div>
            </div>
            <nav className="ad-nav">
              {NAV.map((n) => {
                const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
                return (
                  <Link key={n.href} href={n.href} className={active ? 'active' : ''}>
                    <span aria-hidden="true">{n.icon}</span> {n.label}
                  </Link>
                );
              })}
              <Link href="/" target="_blank" style={{ marginTop: 14 }}>
                <span aria-hidden="true">↗</span> View website
              </Link>
            </nav>
            <div className="ad-user">
              Signed in as<br /><b style={{ color: 'var(--text)' }}>{auth.email}</b>
              <button className="a-btn a-btn--ghost a-btn--sm" onClick={logout}>Sign out</button>
            </div>
          </aside>
          {menu && <div className="ad-scrim" onClick={() => setMenu(false)} />}
          <div>
            <div className="ad-top">
              <b style={{ fontFamily: 'var(--display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CFitness Admin</b>
              <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => setMenu(true)}>☰ Menu</button>
            </div>
            <main className="ad-main">{children}</main>
          </div>
        </div>
      </AuthCtx.Provider>
    </ToastProvider>
  );
}
