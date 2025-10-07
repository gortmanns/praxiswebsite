'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Home, Calendar, User as UserIcon, LogOut, Users, Settings } from 'lucide-react';
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
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'A';
    return email.charAt(0).toUpperCase();
  };
  
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/dashboard/banner', label: 'Banner anpassen', icon: Settings },
    { href: '/admin/dashboard/holidays', label: 'Ferientermine', icon: Calendar },
  ];

  const teamNavItems = [
      { href: '/admin/dashboard/team/doctors', label: 'Ärzte' },
      { href: '/admin/dashboard/team/staff', label: 'Praxispersonal' },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-14 items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
             <Image
                src="/images/praxiszentrum-logo.png"
                alt="Praxiszentrum im Ring Logo"
                data-ai-hint="practice logo"
                width={1511}
                height={306}
                className="h-auto w-40"
              />
          </div>
           <div className="hidden h-14 items-center justify-center p-2 group-data-[collapsible=icon]:flex">
              <Image
                src="/images/praxiszentrum-logo-icon.png"
                alt="Praxiszentrum im Ring Logo Icon"
                data-ai-hint="practice logo icon"
                width={100}
                height={100}
                className="h-auto w-8"
              />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
               <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                    <SidebarMenuButton 
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Anpassungen Team" className="w-full pointer-events-none">
                    <Users />
                    <span>Anpassungen Team</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuSub>
                {teamNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                        <Link href={item.href} passHref>
                            <SidebarMenuSubButton isActive={pathname === item.href}>
                                {item.label}
                            </SidebarMenuSubButton>
                        </Link>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto w-full justify-start gap-2 p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start truncate group-data-[collapsible=icon]:hidden">
                       <span className="text-sm font-medium">{user?.displayName || 'Admin'}</span>
                       <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
                <DropdownMenuLabel>Mein Konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold">{[...navItems, ...teamNavItems].find(item => item.href === pathname)?.label || 'Dashboard'}</h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
