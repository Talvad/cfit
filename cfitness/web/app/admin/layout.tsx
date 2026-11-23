import type { Metadata } from 'next';
import './admin.css';
import AdminRoot from '@/components/admin/AdminRoot';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | CFitness Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminRoot>{children}</AdminRoot>;
}
