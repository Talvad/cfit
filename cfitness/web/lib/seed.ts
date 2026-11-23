// Shown when the API isn't configured yet (or is unreachable), so the site always looks complete.
export type Plan = {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  active?: boolean;
  order?: number;
};

export type Achievement = {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  person?: string;
  imageKey?: string;
  imageUrl?: string;
};

export type GalleryItem = {
  id: string;
  key: string;
  url: string;
  caption?: string;
  category: string;
  createdAt?: string;
};

export const SEED_PLANS: Plan[] = [
  {
    id: 'seed-cardio',
    name: 'Cardio Zone',
    description: 'Treadmills, bikes, rowers and guided conditioning.',
    category: 'Cardio',
    price: 800,
    period: 'month',
    features: ['Full cardio floor access', 'Group conditioning sessions', 'Locker access', 'Free fitness assessment'],
    order: 1,
  },
  {
    id: 'seed-combo',
    name: 'Strength + Cardio',
    description: 'The whole floor, for people who want results.',
    category: 'Combo',
    price: 1200,
    period: 'month',
    features: ['Strength and cardio floors', 'Starter programme from a coach', 'Monthly progress check', 'Locker access'],
    popular: true,
    order: 2,
  },
  {
    id: 'seed-pt',
    name: 'Personal Training',
    description: 'A coach, a plan and someone watching your form.',
    category: 'Personal Training',
    price: 3500,
    period: 'month',
    features: ['One-to-one coaching', 'Custom training plan', 'Nutrition guidance', 'Weekly check-ins'],
    order: 3,
  },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'seed-a1',
    title: 'District Powerlifting Podium',
    description: 'Three C-FIT lifters stood on the podium at the district championship.',
    date: '2026-08-14',
    category: 'Competition',
  },
  {
    id: 'seed-a2',
    title: '100-Day Transformation Challenge',
    description: 'Forty members completed the challenge and together lost over 180 kg.',
    date: '2026-05-30',
    category: 'Transformation',
  },
  {
    id: 'seed-a3',
    title: '500 Members Strong',
    description: 'We crossed 500 people trained since opening our doors.',
    date: '2026-02-02',
    category: 'Milestone',
  },
];
