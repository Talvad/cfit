export type Member = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  gender?: string;
  dob?: string;
  program: string;
  planId?: string;
  planName?: string;
  amount: number;
  joiningDate: string;
  feeDay: number;
  status: 'active' | 'paused' | 'left';
  trainer?: string;
  emergencyContact?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentEntry = {
  id: string;
  amount: number;
  mode: string;
  paidOn: string;
  note?: string;
  recordedAt: string;
};

export type PaymentRecord = {
  month: string;
  memberId: string;
  due: number;
  paid: number;
  entries: PaymentEntry[];
};

export type FeeRow = {
  memberId: string;
  name: string;
  phone: string;
  program: string;
  memberStatus: string;
  dueDate: string;
  due: number;
  paid: number;
  balance: number;
  status: 'paid' | 'partial' | 'pending';
  overdue: boolean;
  entries: PaymentEntry[];
};

export type FeesResponse = {
  month: string;
  rows: FeeRow[];
  totals: {
    expected: number;
    collected: number;
    pending: number;
    paidCount: number;
    pendingCount: number;
    overdueCount: number;
  };
};

export type Dashboard = {
  month: string;
  members: { total: number; active: number; paused: number; left: number; newThisMonth: number };
  fees: FeesResponse['totals'];
  dueSoon: number;
  newEnquiries: number;
  programs: Record<string, number>;
  trend: { month: string; collected: number }[];
  recentPayments: (PaymentEntry & { memberId: string; name: string })[];
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  interest?: string;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: string;
};

export const PROGRAMS = ['Cardio', 'Personal Training', 'Cardio + Personal Training', 'General Fitness'];
export const PAY_MODES = ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Other'];
export const PLAN_CATEGORIES = ['Cardio', 'Personal Training', 'Combo', 'General'];
export const GALLERY_CATEGORIES = ['Gym Floor', 'Training', 'Events', 'Transformations', 'Community'];
export const ACH_CATEGORIES = ['Competition', 'Transformation', 'Milestone', 'Award', 'Community'];
