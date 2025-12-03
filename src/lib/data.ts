import { SavingsGoal, Transaction } from './types';

export const savingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Dana Darurat',
    targetAmount: 15000000,
    currentAmount: 7500000,
    deadline: '2024-12-31',
    category: 'personal',
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/1/600/400'
  },
  {
    id: '2',
    name: 'Liburan ke Bali',
    targetAmount: 8000000,
    currentAmount: 8000000,
    deadline: '2024-09-01',
    category: 'personal',
    status: 'completed',
    imageUrl: 'https://picsum.photos/seed/2/600/400'
  },
  {
    id: '3',
    name: 'Laptop Baru',
    targetAmount: 25000000,
    currentAmount: 12000000,
    deadline: '2025-03-31',
    category: 'personal',
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/3/600/400'
  },
  {
    id: '4',
    name: 'Pendidikan S1 Anak',
    targetAmount: 250000000,
    currentAmount: 50000000,
    deadline: '2035-07-01',
    category: 'child',
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/4/600/400'
  },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'Pemasukan', category: 'Gaji', amount: 8500000, date: '2024-07-01', description: 'Gaji bulan Juli' },
  { id: '2', type: 'Pengeluaran', category: 'Makanan', amount: 1200000, date: '2024-07-05', description: 'Belanja bulanan' },
  { id: '3', type: 'Pengeluaran', category: 'Transportasi', amount: 350000, date: '2024-07-07', description: 'Bensin mobil' },
  { id: '4', type: 'Pengeluaran', category: 'Tagihan', amount: 750000, date: '2024-07-10', description: 'Tagihan internet & listrik' },
  { id: '5', type: 'Pengeluaran', category: 'Hiburan', amount: 250000, date: '2024-07-12', description: 'Nonton bioskop' },
  { id: '6', type: 'Pengeluaran', category: 'Belanja', amount: 450000, date: '2024-07-15', description: 'Baju baru' },
  { id: '7', type: 'Pemasukan', category: 'Bonus', amount: 1000000, date: '2024-07-20', description: 'Bonus project' },
  { id: '8', type: 'Pengeluaran', category: 'Kesehatan', amount: 200000, date: '2024-07-22', description: 'Obat & vitamin' },
];

export const familyMembers = [
  {
    id: '1',
    name: 'Kevin (Anda)',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwcm9maWxlJTIwcGljdHVyZXxlbnwwfHx8fDE3NjQ3NTQxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    role: 'Admin'
  },
  {
    id: '2',
    name: 'Sarah',
    avatarUrl: 'https://picsum.photos/seed/fm2/100/100',
    role: 'Member'
  },
  {
    id: '3',
    name: 'Michael',
    avatarUrl: 'https://picsum.photos/seed/fm3/100/100',
    role: 'Member'
  },
];
