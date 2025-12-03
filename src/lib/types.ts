export type Transaction = {
  id: string;
  type: 'Pemasukan' | 'Pengeluaran';
  category: string;
  amount: number;
  date: string;
  description: string;
};

export type SavingsGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'personal' | 'child' | 'retirement' | 'family';
  status: 'active' | 'completed';
  imageUrl: string;
  description?: string;
};
