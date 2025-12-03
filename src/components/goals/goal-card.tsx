import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SavingsGoal } from '@/lib/types';
import { differenceInDays, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export default function GoalCard({ goal }: { goal: SavingsGoal }) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = goal.status === 'active' ? differenceInDays(parseISO(goal.deadline), new Date()) : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
            <Image
                src={goal.imageUrl}
                alt={goal.name}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={`goal ${goal.name}`}
            />
            {goal.status === 'completed' && (
                 <Badge className="absolute top-2 right-2">Selesai</Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-1">{goal.name}</CardTitle>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{formatter.format(goal.currentAmount)}</span>
            <span>{formatter.format(goal.targetAmount)}</span>
        </div>
        <Progress value={progress} aria-label={`${goal.name} progress`} />
         <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Terkumpul {Math.round(progress)}%</span>
            {goal.status === 'active' && (
                <span>
                    {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Tenggat terlewat'}
                </span>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">Lihat Detail</Button>
      </CardFooter>
    </Card>
  );
}
