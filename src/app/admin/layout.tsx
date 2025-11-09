
'use client';
import { AppSidebar } from './dashboard/_components/app-sidebar';
import { useAuth } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

  return (
    <SidebarProvider>
        <div className="flex min-h-screen bg-muted/40">
            <AppSidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    </SidebarProvider>
  );
}
