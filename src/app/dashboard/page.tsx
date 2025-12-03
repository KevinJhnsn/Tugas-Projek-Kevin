import { transactions, savingsGoals } from '@/lib/data';
import OverviewCards from '@/components/dashboard/overview-cards';
import SavingsGoals from '@/components/dashboard/savings-goals';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import ExpenseChart from '@/components/dashboard/expense-chart';
import AiInsights from '@/components/dashboard/ai-insights';
import Header from '@/components/layout/header';
import AppSidebar from '@/components/layout/app-sidebar';

export default function DashboardPage() {
  const totalIncome = transactions
    .filter((t) => t.type === 'Pemasukan')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'Pengeluaran')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2 xl:col-span-3">
              <OverviewCards
                balance={totalBalance}
                income={totalIncome}
                expense={totalExpense}
              />
            </div>
            
            <div className="grid gap-4 md:gap-8 lg:col-span-2 xl:col-span-3 xl:grid-cols-3">
              <div className="xl:col-span-2 grid auto-rows-max gap-4 md:gap-8">
                  <SavingsGoals goals={savingsGoals} />
                  <RecentTransactions transactions={transactions.slice(0, 5)} />
              </div>

              <div className="grid auto-rows-max gap-4 md:gap-8">
                  <ExpenseChart transactions={transactions} />
                  <AiInsights />
              </div>
            </div>
        </main>
      </div>
    </div>
  );
}
