'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './dashboard/_components/app-sidebar';
import { Toaster } from 'sonner';
import { FirebaseClientProvider } from '@/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
