'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wenn die Benutzerdaten geladen sind und kein Benutzer angemeldet ist,
    // und wir uns nicht auf der Login-Seite befinden, leiten wir um.
    if (!isUserLoading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
    
    // Wenn der Benutzer angemeldet ist und versucht, auf die Login-Seite zu gelangen,
    // leiten wir ihn zum Dashboard weiter.
    if (!isUserLoading && user && pathname === '/admin/login') {
      router.replace('/admin/dashboard');
    }
  }, [user, isUserLoading, router, pathname]);

  // Während des Ladens oder wenn eine Umleitung bevorsteht, eine Ladeanzeige anzeigen.
  if (isUserLoading || (!user && pathname !== '/admin/login') || (user && pathname === '/admin/login')) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Wird geladen...</p>
      </div>
    );
  }

  return <>{children}</>;
}
