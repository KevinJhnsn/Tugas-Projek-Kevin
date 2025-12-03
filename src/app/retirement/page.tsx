import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { savingsGoals } from "@/lib/data";
import GoalCard from "@/components/goals/goal-card";
import AddGoalButton from "@/components/goals/add-goal-button";
import { Briefcase } from "lucide-react";

export default function RetirementPage() {
  const activeGoals = savingsGoals.filter((g) => g.status === 'active' && g.category === 'retirement');
  const completedGoals = savingsGoals.filter((g) => g.status === 'completed' && g.category === 'retirement');

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Briefcase className="h-6 w-6" />
                    Dana Pensiun
                </h1>
                <p className="text-muted-foreground">Persiapkan masa tua yang sejahtera.</p>
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
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-64">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">Belum Ada Rencana Pensiun</h3>
                            <p className="text-sm text-muted-foreground">Mulai rencanakan dana pensiun Anda sekarang.</p>
                        </div>
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
                     <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-64">
                        <div className="text-center">
                           <h3 className="text-lg font-semibold">Belum Ada Tujuan Selesai</h3>
                           <p className="text-sm text-muted-foreground">Rencana pensiun yang sudah tercapai akan muncul di sini.</p>
                       </div>
                   </div>
                )}
            </TabsContent>
        </Tabs>
    </div>
  );
}
