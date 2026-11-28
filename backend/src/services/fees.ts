import { daysInMonth } from '../lib/util';
import type { FeeRow, FeeStatus, Member, PaymentRecord } from '../types';

export interface FeeTotals {
  expected: number;
  collected: number;
  pending: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
}

export interface FeeMonth {
  month: string;
  rows: FeeRow[];
  totals: FeeTotals;
}

const statusOf = (due: number, paid: number): FeeStatus => {
  if (paid >= due && (paid > 0 || due === 0)) return 'paid';
  return paid > 0 ? 'partial' : 'pending';
};

const dueDateFor = (member: Member, month: string): string => {
  const day = Math.min(member.feeDay || Number(member.joiningDate.slice(8, 10)) || 1, daysInMonth(month));
  return `${month}-${String(day).padStart(2, '0')}`;
};

export function buildFeeMonth(
  month: string,
  members: Member[],
  payments: PaymentRecord[],
  today: string
): FeeMonth {
  const payByMember = new Map(payments.map((payment) => [payment.memberId, payment]));
  const rows: FeeRow[] = [];

  for (const member of members) {
    const record = payByMember.get(member.id);
    const owes = member.status === 'active' && (member.joiningDate ?? '').slice(0, 7) <= month;
    if (!owes && !record) continue;

    const due = record ? record.due : member.amount;
    const paid = record ? record.paid : 0;
    const balance = Math.max(due - paid, 0);
    const dueDate = dueDateFor(member, month);
    rows.push({
      memberId: member.id,
      name: member.name,
      phone: member.phone,
      program: member.program,
      memberStatus: member.status,
      dueDate,
      due,
      paid,
      balance,
      status: statusOf(due, paid),
      overdue: balance > 0 && dueDate < today,
      entries: record ? record.entries : [],
    });
  }

  rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.name.localeCompare(b.name));
  const totals = rows.reduce<FeeTotals>(
    (result, row) => {
      result.expected += row.due;
      result.collected += row.paid;
      result.pending += row.balance;
      if (row.status === 'paid') result.paidCount += 1;
      else result.pendingCount += 1;
      if (row.overdue) result.overdueCount += 1;
      return result;
    },
    { expected: 0, collected: 0, pending: 0, paidCount: 0, pendingCount: 0, overdueCount: 0 }
  );
  return { month, rows, totals };
}
