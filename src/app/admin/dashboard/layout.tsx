import Link from 'next/link';
import { Home, Calendar, LogOut, Users, Settings, Handshake, Palette, CreditCard } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster } from 'sonner';
import { getSession } from '@/lib/session';
import { logout } from './actions';
import { redirect } from 'next/navigation';
import { AppSidebar } from './_components/app-sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/admin/login');
  }

  const getInitials = (username: string | undefined) => {
    if (!username) return 'A';
    return username.charAt(0).toUpperCase();
  };
  
  return (
    <SidebarProvider>
      <AppSidebar user={session.username} />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
