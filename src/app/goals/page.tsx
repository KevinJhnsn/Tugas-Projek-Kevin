import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { savingsGoals } from "@/lib/data";
import GoalCard from "@/components/goals/goal-card";
import AddGoalButton from "@/components/goals/add-goal-button";

export default function GoalsPage() {
  const activeGoals = savingsGoals.filter((g) => g.status === 'active' && g.category === 'personal');
  const completedGoals = savingsGoals.filter((g) => g.status === 'completed' && g.category === 'personal');

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Tujuan Pribadi</h1>
                <p className="text-muted-foreground">Kelola tujuan finansial personal Anda di sini.</p>
            </div>
            <AddGoalButton />
        </div>

        <Tabs defaultValue="active">
            <TabsList>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                    {activeGoals.map(goal => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
                {activeGoals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Anda belum memiliki tujuan aktif.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="completed">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                    {completedGoals.map(goal => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
                 {completedGoals.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Anda belum memiliki tujuan yang selesai.</p>
                    </div>
                )}
            </TabsContent>
        </Tabs>
    </div>
  );
}
