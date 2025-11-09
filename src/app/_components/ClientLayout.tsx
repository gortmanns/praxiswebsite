
'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { HolidayBanner } from './holiday-banner';
import React, { useContext } from 'react';
import { FirebaseContext } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

// This is the main Client Component Layout.
// It contains all providers and hooks that need to run on the client.
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en');
  const firebaseContext = useContext(FirebaseContext);

  // SSR Guard: During build, Firebase context might not be ready.
  // We check for its availability.
  if (!firebaseContext) {
    // On the server or during the very first render pass, we can return the children directly
    // because the provider is wrapping them in RootLayout.
    // This avoids rendering the full layout until the client-side context is hydrated.
    return <>{children}</>;
  }

  // Once the context is available on the client, render the full layout.
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
