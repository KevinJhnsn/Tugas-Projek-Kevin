"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Info } from 'lucide-react';
import { getFinancialInsights } from '@/ai/ai-financial-insights';
import { transactions, savingsGoals } from '@/lib/data';

export default function AiInsights() {
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | undefined>("");
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    async function fetchInsights() {
      const income = transactions
        .filter(t => t.type === 'Pemasukan')
        .reduce((acc, t) => acc + t.amount, 0);

      const expenses = transactions
        .filter(t => t.type === 'Pengeluaran')
        .map(t => ({ category: t.category, amount: t.amount }));

      if (transactions.length === 0) {
        setLoading(false);
        setHasData(false);
        return;
      }
      
      setHasData(true);

      try {
        const mainGoal = savingsGoals.find(g => g.category === 'personal');

        const result = await getFinancialInsights({
          income,
          expenses,
          savingsGoal: mainGoal?.targetAmount,
          currentSavings: mainGoal?.currentAmount,
        });

        setInsight(result.insights);
        setTips(result.savingsTips);
        setPrediction(result.goalPrediction);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsight("Tidak dapat memuat rekomendasi saat ini. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          Rekomendasi Cerdas
        </CardTitle>
        <CardDescription>Saran personal dari asisten AI Anda.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ) : !hasData ? (
          <div className="flex items-center gap-4 rounded-lg border bg-card p-4 text-sm">
            <Info className="h-5 w-5 flex-shrink-0 text-accent-foreground mt-0.5" />
            <p>Tambahkan transaksi pemasukan dan pengeluaran untuk mendapatkan rekomendasi cerdas dari AI.</p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-4 rounded-lg border bg-card p-4 text-sm">
              <Info className="h-5 w-5 flex-shrink-0 text-accent-foreground mt-0.5" />
              <p className="leading-relaxed">{insight}</p>
            </div>
            {prediction && (
                 <div className="flex items-start gap-4 rounded-lg border bg-card p-4 text-sm">
                    <Info className="h-5 w-5 flex-shrink-0 text-accent-foreground mt-0.5" />
                    <p className="leading-relaxed">{prediction}</p>
                 </div>
            )}
            {tips.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Tips untuk Anda:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {tips.slice(0, 3).map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
