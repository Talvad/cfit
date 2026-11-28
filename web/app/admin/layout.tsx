import type { Metadata } from 'next';
import { Suspense } from 'react';
import AdminRoot from '@/components/admin/AdminRoot';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | CFitness Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="a-loading p-10">Loading admin…</div>}>
      <AdminRoot>{children}</AdminRoot>
    </Suspense>
  );
}
