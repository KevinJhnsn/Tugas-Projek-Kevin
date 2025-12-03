"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import type { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
    const [open, setOpen] = useState(false);

    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-2">
                <CardTitle>Transaksi Terkini</CardTitle>
                <CardDescription>
                Daftar pemasukan dan pengeluaran terbaru Anda.
                </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Tambah Transaksi
                </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tambah Transaksi Baru</DialogTitle>
                <DialogDescription>
                    Catat pemasukan atau pengeluaran Anda di sini.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Tipe</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Pilih tipe transaksi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Pemasukan</SelectItem>
                                <SelectItem value="expense">Pengeluaran</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Kategori</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gaji">Gaji</SelectItem>
                                <SelectItem value="makanan">Makanan</SelectItem>
                                <SelectItem value="transportasi">Transportasi</SelectItem>
                                <SelectItem value="tagihan">Tagihan</SelectItem>
                                <SelectItem value="hiburan">Hiburan</SelectItem>
                                <SelectItem value="belanja">Belanja</SelectItem>
                                <SelectItem value="kesehatan">Kesehatan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">Jumlah (Rp)</Label>
                        <Input id="amount" type="number" placeholder="50000" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Tanggal</Label>
                        <Input id="date" type="date" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit" onClick={() => setOpen(false)}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="hidden sm:table-cell">Tipe</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(t => (
                    <TableRow key={t.id}>
                        <TableCell>
                            <div className="font-medium">{t.category}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                                {t.description}
                            </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant={t.type === 'Pemasukan' ? 'default' : 'secondary'}>
                                {t.type}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {format(new Date(t.date), 'dd MMMM yyyy', { locale: id })}
                        </TableCell>
                        <TableCell className={`text-right ${t.type === 'Pemasukan' ? 'text-green-600' : 'text-red-600'}`}>
                            {t.type === 'Pemasukan' ? '+' : '-'} {formatter.format(t.amount)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}
