
'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { HolidayBanner } from './holiday-banner';
import React, { useContext } from 'react';
import { FirebaseContext, useFirestore } from '@/firebase/provider';
import { Toaster } from '@/components/ui/toaster';

// This is the main Client Component Layout.
// It contains all providers and hooks that need to run on the client.
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en');
  const firestore = useFirestore(); // Use the hook to get firestore context safely

  // The Firebase context is now guaranteed to be available from the RootLayout's provider.
  // We can use a hook like useFirestore to ensure components re-render when it becomes available.
  // We can add a loading state here if needed, but for now, we'll rely on the provider's logic.

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isEnglish={isEnglish} />
      <main className="flex-1">
        {/* <HolidayBanner isEnglish={isEnglish} /> */}
        {children}
      </main>
      <Footer isEnglish={isEnglish} />
      <Toaster />
    </div>
  );
}
