import ExpenseChart from '@/components/dashboard/expense-chart';
import AiInsights from '@/components/dashboard/ai-insights';
import { transactions } from '@/lib/data';
import MonthlySummaryChart from '@/components/reports/monthly-summary-chart';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Laporan & Analisis</h1>
            <p className="text-muted-foreground">Dapatkan wawasan dari data keuangan Anda.</p>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
             <div className="grid auto-rows-max gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <ExpenseChart transactions={transactions} />
                    <MonthlySummaryChart transactions={transactions} />
                </div>
                 <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <AiInsights />
                </div>
            </div>
        </div>
    </div>
  );
}
