"use client";

import { useMemo } from 'react';
import type { Transaction } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export default function MonthlySummaryChart({ transactions }: { transactions: Transaction[] }) {
  const chartData = useMemo(() => {
    const monthlyData: { [key: string]: { Pemasukan: number; Pengeluaran: number } } = {};

    transactions.forEach(t => {
      const month = format(parseISO(t.date), 'MMM yyyy', { locale: id });
      if (!monthlyData[month]) {
        monthlyData[month] = { Pemasukan: 0, Pengeluaran: 0 };
      }
      if (t.type === 'Pemasukan') {
        monthlyData[month].Pemasukan += t.amount;
      } else {
        monthlyData[month].Pengeluaran += t.amount;
      }
    });

    return Object.entries(monthlyData)
      .map(([name, values]) => ({ name, ...values }))
      .sort((a, b) => {
        const dateA = transactions.find(t => format(parseISO(t.date), 'MMM yyyy', { locale: id }) === a.name);
        const dateB = transactions.find(t => format(parseISO(t.date), 'MMM yyyy', { locale: id }) === b.name);
        if (dateA && dateB) {
            return parseISO(dateA.date).getTime() - parseISO(dateB.date).getTime();
        }
        return 0;
      });

  }, [transactions]);
  
  const chartConfig = {
    Pemasukan: {
      label: "Pemasukan",
      color: "hsl(var(--chart-1))",
    },
    Pengeluaran: {
      label: "Pengeluaran",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Bulanan</CardTitle>
        <CardDescription>Perbandingan Pemasukan dan Pengeluaran per Bulan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickFormatter={(value) => currencyFormatter.format(value as number).replace('Rp', '').replace(/\.000\.000/g, ' Jt').replace(/\.000/g, 'rb')}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-sm" style={{backgroundColor: name === 'Pemasukan' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-4))' }}/>
                          <div>
                            <p className="font-semibold">{currencyFormatter.format(value as number)}</p>
                            <p className="text-xs text-muted-foreground">{name as string}</p>
                          </div>
                      </div>
                    )}
                    labelFormatter={(label) => <p className="font-semibold">{label}</p>}
                />}
              />
              <Bar dataKey="Pemasukan" fill="var(--color-Pemasukan)" radius={[4, 4, 0, 0]} name="Pemasukan" />
              <Bar dataKey="Pengeluaran" fill="var(--color-Pengeluaran)" radius={[4, 4, 0, 0]} name="Pengeluaran" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
