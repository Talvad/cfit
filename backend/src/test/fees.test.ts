import assert from 'node:assert/strict';
import test from 'node:test';
import { buildFeeMonth } from '../services/fees';
import type { Member, PaymentRecord } from '../types';

const member = (overrides: Partial<Member>): Member => ({
  id: 'm1',
  name: 'Asha',
  phone: '5550100',
  email: '',
  address: '',
  gender: '',
  dob: '',
  program: 'General Fitness',
  planId: '',
  planName: '',
  amount: 1000,
  joiningDate: '2024-01-01',
  feeDay: 31,
  status: 'active',
  trainer: '',
  emergencyContact: '',
  notes: '',
  createdAt: '',
  updatedAt: '',
  ...overrides,
});

test('builds fee rows, clamps due dates, and totals active and recorded payments', () => {
  const members = [
    member({}),
    member({ id: 'm2', name: 'Bhavya', status: 'paused', feeDay: 10 }),
    member({ id: 'm3', name: 'Future', joiningDate: '2024-03-01' }),
  ];
  const payments: PaymentRecord[] = [
    {
      month: '2024-02',
      memberId: 'm2',
      memberName: 'Bhavya',
      due: 500,
      paid: 500,
      entries: [],
      updatedAt: '',
    },
  ];

  const result = buildFeeMonth('2024-02', members, payments, '2024-03-01');

  assert.deepEqual(result.rows.map(({ memberId, dueDate, status, overdue }) => ({
    memberId,
    dueDate,
    status,
    overdue,
  })), [
    { memberId: 'm2', dueDate: '2024-02-10', status: 'paid', overdue: false },
    { memberId: 'm1', dueDate: '2024-02-29', status: 'pending', overdue: true },
  ]);
  assert.deepEqual(result.totals, {
    expected: 1500,
    collected: 500,
    pending: 1000,
    paidCount: 1,
    pendingCount: 1,
    overdueCount: 1,
  });
});
