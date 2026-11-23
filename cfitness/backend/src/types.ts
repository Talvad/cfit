export type Program = 'Cardio' | 'Personal Training' | 'Cardio + Personal Training' | 'General Fitness';
export type MemberStatus = 'active' | 'paused' | 'left';

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  dob: string;
  program: Program;
  planId: string;
  planName: string;
  amount: number;
  joiningDate: string;
  feeDay: number;
  status: MemberStatus;
  trainer: string;
  emergencyContact: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentEntry {
  id: string;
  amount: number;
  mode: string;
  paidOn: string;
  note: string;
  recordedAt: string;
}

export interface PaymentRecord {
  month: string;
  memberId: string;
  memberName: string;
  due: number;
  paid: number;
  entries: PaymentEntry[];
  updatedAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  key: string;
  caption: string;
  category: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  person: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'converted' | 'closed';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type FeeStatus = 'paid' | 'partial' | 'pending';

export interface FeeRow {
  memberId: string;
  name: string;
  phone: string;
  program: string;
  memberStatus: string;
  dueDate: string;
  due: number;
  paid: number;
  balance: number;
  status: FeeStatus;
  overdue: boolean;
  entries: PaymentEntry[];
}
