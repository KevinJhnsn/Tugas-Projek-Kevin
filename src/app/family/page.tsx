import { Users } from 'lucide-react';
import { familyMembers, savingsGoals } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import GoalCard from '@/components/goals/goal-card';
import AddGoalButton from '@/components/goals/add-goal-button';

export default function FamilyPage() {
  const familyGoals = savingsGoals.filter(g => g.category === 'family');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tabungan Keluarga</h1>
          <p className="text-muted-foreground">Kelola tabungan bersama keluarga Anda.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-xl font-semibold">Tujuan Keluarga</h2>
                <AddGoalButton />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {familyGoals.map(goal => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
                 {familyGoals.length === 0 && (
                    <div className="md:col-span-2 flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-64">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">Belum Ada Tujuan Keluarga</h3>
                            <p className="text-sm text-muted-foreground">Buat tujuan tabungan bersama keluarga.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Anggota Keluarga</CardTitle>
                <CardDescription>Daftar anggota dalam grup Anda.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {familyMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={member.avatarUrl} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                            </div>
                            {member.role === 'Admin' ? (
                                <span className="text-sm font-medium text-primary">Admin</span>
                            ) : (
                                <Button variant="outline" size="sm">Hapus</Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Undang Anggota Baru
            </Button>
        </div>
      </div>
    </div>
  );
}
