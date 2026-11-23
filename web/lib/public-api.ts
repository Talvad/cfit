import { SEED_ACHIEVEMENTS, SEED_PLANS, type Achievement, type GalleryItem, type Plan } from './seed';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// Public pages are server-rendered and re-built at most once a minute,
// so admin changes show up on the website within about 60 seconds.
async function publicGet<T>(path: string): Promise<T[] | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.items as T[];
  } catch {
    return null;
  }
}

export async function getPlans(): Promise<Plan[]> {
  return (await publicGet<Plan>('/public/pricing')) ?? SEED_PLANS;
}

export async function getAchievements(): Promise<Achievement[]> {
  return (await publicGet<Achievement>('/public/achievements')) ?? SEED_ACHIEVEMENTS;
}

// No seed for the gallery: the page shows a friendly placeholder grid when empty.
export async function getGallery(): Promise<GalleryItem[]> {
  return (await publicGet<GalleryItem>('/public/gallery')) ?? [];
}

export const inr = (n: number) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export const fmtDate = (iso: string) =>
  iso
    ? new Date(iso + (iso.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
