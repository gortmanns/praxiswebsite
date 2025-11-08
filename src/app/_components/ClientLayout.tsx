
'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { HolidayBanner } from './holiday-banner';
import React from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

// This is the main Client Component Layout.
// It contains all providers and hooks that need to run on the client.
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en');

  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header isEnglish={isEnglish} />
        <main className="flex-1">
          <HolidayBanner isEnglish={isEnglish} />
          {children}
        </main>
        <Footer isEnglish={isEnglish} />
        <Toaster />
      </div>
    </FirebaseClientProvider>
  );
}
