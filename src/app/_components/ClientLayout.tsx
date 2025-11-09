
'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { HolidayBanner } from './holiday-banner';
import React, { useContext } from 'react';
import { FirebaseClientProvider, FirebaseContext } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

// This is the main Client Component Layout.
// It contains all providers and hooks that need to run on the client.
function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en');
  const firebaseContext = useContext(FirebaseContext);

  // SSR Guard: Do not render anything until Firebase is initialized on the client.
  // This prevents the 'useContext of null' error during the build process.
  if (!firebaseContext || !firebaseContext.areServicesAvailable) {
    return null;
  }

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


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <InnerLayout>{children}</InnerLayout>
    </FirebaseClientProvider>
  );
}
