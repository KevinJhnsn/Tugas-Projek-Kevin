"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export default function AddGoalButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
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
            <div className="grid gap-2">
                <Label htmlFor="name">Nama Tujuan</Label>
                <Input id="name" placeholder="Contoh: Dana Darurat" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="target">Target (Rp)</Label>
                <Input id="target" type="number" placeholder="10000000" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi (Opsional)</Label>
                <Textarea id="description" placeholder="Uang untuk keperluan mendadak..." />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="image">Upload Gambar</Label>
                <Input id="image" type="file" />
            </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">Batal</Button>
          <Button type="submit" onClick={() => setOpen(false)}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
