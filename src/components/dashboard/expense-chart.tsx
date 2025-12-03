"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Transaction } from '@/lib/types';
import { useMemo } from 'react';

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
];

export default function ExpenseChart({ transactions }: { transactions: Transaction[] }) {
  const chartData = useMemo(() => {
    const expenseData = transactions.filter(t => t.type === 'Pengeluaran');
    const categoryTotals = expenseData.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const totalExpenses = useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rincian Pengeluaran</CardTitle>
        <CardDescription>Visualisasi pengeluaran berdasarkan kategori.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div
          className="flex-1 text-center text-lg font-medium leading-none"
          aria-label={`Total pengeluaran ${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalExpenses)}`}
        >
          Total Pengeluaran
          <p className="text-muted-foreground text-sm">
            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalExpenses)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
