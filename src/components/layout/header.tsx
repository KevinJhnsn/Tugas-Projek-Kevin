'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PanelLeft,
  Search,
  Landmark,
  Target,
  BarChart3,
  ArrowRightLeft,
  Users,
  User,
  Baby,
  Briefcase,
  Sun,
  Moon,
  LayoutDashboard
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const mobileNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dasbor' },
    { href: '/goals', icon: Target, label: 'Tujuan Pribadi' },
    { href: '/child-savings', icon: Baby, label: 'Tabungan Anak' },
    { href: '/retirement', icon: Briefcase, label: 'Dana Pensiun' },
    { href: '/family', icon: Users, label: 'Tabungan Keluarga' },
    { href: '/transactions', icon: ArrowRightLeft, label: 'Transaksi' },
    { href: '/reports', icon: BarChart3, label: 'Laporan' },
];

export default function Header() {
  const kevinAvatar = PlaceHolderImages.find(p => p.id === 'kevin-avatar');
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Landmark className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Bijak Planner</span>
            </Link>
            {mobileNavItems.map(item => (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                    pathname === item.href && "text-foreground"
                )}
                >
                <item.icon className="h-5 w-5" />
                {item.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Terang
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Gelap
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            Sistem
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {kevinAvatar && (
              <Image
                src={kevinAvatar.imageUrl}
                width={36}
                height={36}
                alt={kevinAvatar.description}
                data-ai-hint={kevinAvatar.imageHint}
                className="overflow-hidden rounded-full"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Dukungan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Keluar</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
