
import { AppSidebar } from './_components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
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
