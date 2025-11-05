'use client';

import { FirebaseClientProvider } from '@/firebase';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { HolidayBanner } from './_components/holiday-banner';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HolidayBanner />
          {children}
        </main>
        <Footer />
      </div>
    </FirebaseClientProvider>
  );
}
