'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (isUserLoading) {
      return; // Warten, bis der Auth-Status bekannt ist
    }

    const isLoginPage = pathname.startsWith('/admin/login');

    if (!user && !isLoginPage) {
      // Wenn nicht eingeloggt und nicht auf der Login-Seite, umleiten zum Login
      router.push('/admin/login');
    } else if (user && isLoginPage) {
      // Wenn eingeloggt und auf der Login-Seite, umleiten zum Dashboard
      router.push('/admin/dashboard');
    }
  }, [user, isUserLoading, pathname, router]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Wird geladen...</p>
      </div>
    );
  }

  // Verhindern, dass Dashboard-Inhalte kurz angezeigt werden, bevor die Umleitung greift
  if (!user && !pathname.startsWith('/admin/login')) {
      return (
          <div className="flex h-screen w-full items-center justify-center">
              <p>Wird umgeleitet...</p>
          </div>
      );
  }
  
  if (user && pathname.startsWith('/admin/login')) {
      return (
          <div className="flex h-screen w-full items-center justify-center">
              <p>Wird umgeleitet...</p>
          </div>
      );
  }


  return <>{children}</>;
}
