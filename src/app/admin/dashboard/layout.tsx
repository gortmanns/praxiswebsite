'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sticky top-0 z-30">
          <SidebarTrigger className="md:hidden"/>
          <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      {children}
    </>
  );
}
