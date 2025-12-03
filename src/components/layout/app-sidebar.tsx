"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Landmark,
  Settings,
  Target,
  BarChart3,
  ArrowRightLeft,
  Users,
  User,
  Baby,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dasbor' },
  { href: '/goals', icon: Target, label: 'Tujuan Pribadi' },
  { href: '/child-savings', icon: Baby, label: 'Tabungan Anak' },
  { href: '/retirement', icon: Briefcase, label: 'Dana Pensiun' },
  { href: '/family', icon: Users, label: 'Tabungan Keluarga' },
  { href: '/transactions', icon: ArrowRightLeft, label: 'Transaksi' },
  { href: '/reports', icon: BarChart3, label: 'Laporan' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Landmark className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Bijak Planner</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                    href="/profile"
                    className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        pathname === '/profile' && "bg-accent text-accent-foreground"
                    )}
                    >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profil</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profil</TooltipContent>
            </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
