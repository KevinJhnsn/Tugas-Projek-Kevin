"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Target } from 'lucide-react';
import type { SavingsGoal } from '@/lib/types';
import { format, differenceInDays, parseISO } from 'date-fns';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export default function SavingsGoals({ goals }: { goals: SavingsGoal[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
            <CardTitle>Tujuan Tabungan</CardTitle>
            <CardDescription>
            Lacak progres Anda dalam mencapai tujuan finansial.
            </CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Tambah Tujuan
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Tujuan Tabungan Baru</DialogTitle>
              <DialogDescription>
                Isi detail tujuan finansial yang ingin Anda capai.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input id="name" placeholder="Contoh: Dana Darurat" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                  Target (Rp)
                </Label>
                <Input id="target" type="number" placeholder="10000000" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Tenggat
                </Label>
                <Input id="deadline" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setOpen(false)}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="grid gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = differenceInDays(parseISO(goal.deadline), new Date());
          return (
            <div key={goal.id} className="grid gap-2">
              <div className="flex justify-between font-medium">
                <span>{goal.name}</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} aria-label={`${goal.name} progress`} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatter.format(goal.currentAmount)} / {formatter.format(goal.targetAmount)}</span>
                <span>
                  {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Tenggat terlewat'}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
