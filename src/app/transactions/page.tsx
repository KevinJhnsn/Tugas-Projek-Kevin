import RecentTransactions from "@/components/dashboard/recent-transactions";
import { transactions } from "@/lib/data";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">Lihat semua pemasukan dan pengeluaran Anda.</p>
        </div>
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
