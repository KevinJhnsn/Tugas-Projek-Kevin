'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from '@/firebase/config';
import type { User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
            <p className="text-muted-foreground">Kelola informasi akun dan preferensi Anda.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>Perbarui nama, email, dan foto profil Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-36" />
                </div>
              ) : user ? (
                <>
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                          <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User Avatar'} />
                          <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Ubah Foto</Button>
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" defaultValue={user.displayName || 'Pengguna Baru'} />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email || ''} disabled />
                  </div>
                  <Button>Simpan Perubahan</Button>
                </>
              ) : (
                <p>Silakan login untuk melihat profil Anda.</p>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
