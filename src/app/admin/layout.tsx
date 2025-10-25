
'use client';

import { useAuth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wenn der Auth-Status nicht mehr lädt UND der Benutzer NICHT angemeldet ist
    // UND wir uns NICHT bereits auf der Login-Seite befinden,
    // dann leiten wir zur Login-Seite um.
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // Zeige einen Ladebildschirm, während der Auth-Status geprüft wird.
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

  // Wenn ein Benutzer angemeldet ist ODER wir uns auf der Login-Seite befinden,
  // zeige den Inhalt der Seite an.
  if (user || pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // In allen anderen Fällen (z.B. während der Weiterleitung) zeige einen Ladebildschirm.
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
