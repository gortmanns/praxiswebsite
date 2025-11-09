
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, Users, Settings, Palette, CreditCard, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
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
import { useAuth } from '@/firebase/provider';
import { signOut } from 'firebase/auth';


export function AppSidebar() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();
  
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/dashboard/banner', label: 'Banner anpassen', icon: Settings },
    { href: '/admin/dashboard/holidays', label: 'Ferientermine', icon: Calendar },
  ];

  const teamNavItems = [
      { href: '/admin/dashboard/team/doctors', label: 'Ärzte' },
      { href: '/admin/dashboard/team/staff', label: 'Praxispersonal' },
      { href: '/admin/dashboard/team/service-providers', label: 'Externe Dienstleister' },
  ];

  const cardPartnerNavItems = [
    { href: '/admin/dashboard/partners/medical', label: 'Ärzte' },
    { href: '/admin/dashboard/partners/other', label: 'Sonstige' },
  ];

  const visualDesignItem = { href: '/admin/dashboard/visual-design', label: 'Visual Design', icon: Palette };

  const handleLogout = async () => {
    if (!auth.auth) return;
    await signOut(auth.auth);
    router.push('/admin/login');
  };

  return (
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
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Karten Partner" className="w-full pointer-events-none">
                    <CreditCard />
                    <span>Karten Partner</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuSub>
                {cardPartnerNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                        <Link href={item.href} passHref>
                            <SidebarMenuSubButton isActive={pathname === item.href}>
                                {item.label}
                            </SidebarMenuSubButton>
                        </Link>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
            <SidebarMenuItem>
                <div className="my-4 border-t border-sidebar-border" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={visualDesignItem.href} passHref>
                  <SidebarMenuButton 
                      isActive={pathname === visualDesignItem.href}
                      tooltip={visualDesignItem.label}
                  >
                      <visualDesignItem.icon />
                      <span>{visualDesignItem.label}</span>
                  </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto w-full justify-start gap-2 p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start truncate group-data-[collapsible=icon]:hidden">
                       <span className="text-sm font-medium">Admin</span>
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
  );
}
