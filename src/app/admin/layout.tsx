
'use client';

import { FirebaseClientProvider } from '@/firebase';
import { useAuth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      if (!loading && !user && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }, [user, loading, router, pathname]);
  
    if (loading) {
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      );
    }
  
    if (user || pathname === '/admin/login') {
      return <>{children}</>;
    }
    
    // Fallback loading state while redirecting
    return (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <FirebaseClientProvider>
        <AuthWrapper>
            {children}
        </AuthWrapper>
    </FirebaseClientProvider>
  );
}
