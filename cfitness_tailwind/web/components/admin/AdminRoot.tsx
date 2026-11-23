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

const navLink =
  'flex items-center gap-3 border-l-[3px] px-3 py-[11px] font-medium transition-colors hover:bg-panel hover:text-snow';

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
    return <div className="a-loading p-10">Checking your session…</div>;
  }

  return (
    <ToastProvider>
      <AuthCtx.Provider value={ctx}>
        <div className="min-h-screen bg-ink md:grid md:grid-cols-[250px_1fr]">
          <aside
            className={`fixed inset-y-0 left-0 z-60 flex h-screen w-[270px] flex-col border-r border-edge bg-[#050506] px-3.5 py-5 transition-transform md:sticky md:top-0 md:z-auto md:w-auto md:translate-x-0 ${
              menu ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="mb-3.5 flex items-center gap-2.5 border-b border-edge px-2 pb-5 pt-1">
              <img src="/logo.png" alt="" className="h-10 mix-blend-lighten" />
              <div>
                <b className="block font-display text-xl uppercase leading-none tracking-[0.1em]">CFitness</b>
                <small className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand">Admin</small>
              </div>
            </div>
            <nav className="grid flex-1 content-start gap-1">
              {NAV.map((n) => {
                const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`${navLink} ${active ? 'border-brand bg-panel text-snow' : 'border-transparent text-mute'}`}
                  >
                    <span aria-hidden="true">{n.icon}</span> {n.label}
                  </Link>
                );
              })}
              <Link href="/" target="_blank" className={`${navLink} mt-3.5 border-transparent text-mute`}>
                <span aria-hidden="true">↗</span> View website
              </Link>
            </nav>
            <div className="break-all border-t border-edge px-2 pt-3.5 text-sm text-mute">
              Signed in as
              <br />
              <b className="text-snow">{auth.email}</b>
              <button className="a-btn a-btn--ghost a-btn--sm mt-2.5 w-full" onClick={logout}>Sign out</button>
            </div>
          </aside>

          {menu && <div className="fixed inset-0 z-55 bg-black/60 md:hidden" onClick={() => setMenu(false)} />}

          <div className="min-w-0">
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-edge bg-[#050506] px-4 py-3 md:hidden">
              <b className="font-display uppercase tracking-[0.1em]">CFitness Admin</b>
              <button className="a-btn a-btn--ghost a-btn--sm" onClick={() => setMenu(true)}>☰ Menu</button>
            </div>
            <main className="min-w-0 px-4 pb-16 pt-5 md:px-8 md:pt-7">{children}</main>
          </div>
        </div>
      </AuthCtx.Provider>
    </ToastProvider>
  );
}
