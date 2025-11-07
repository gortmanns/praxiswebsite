
'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { FirebaseClientProvider } from '@/firebase';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
          <div className="flex">
              <AppSidebar />
              <main className="flex-1">
                  <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sticky top-0 z-30 lg:hidden">
                      <SidebarTrigger />
                      <h1 className="text-lg font-semibold">Dashboard</h1>
                  </header>
                  {children}
              </main>
          </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
