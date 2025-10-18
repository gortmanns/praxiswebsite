
'use client';

import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useAuth({ redirectOn: 'logout', redirectTo: '/admin/login' });
  const router = useRouter();

  useEffect(() => {
    if (!loading && error) {
      // Handles cases where auth fails for reasons other than logout (e.g. token expired)
      router.push('/admin/login');
    }
  }, [loading, error, router]);

  if (loading || !user) {
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

  return <>{children}</>;
}
