
'use client';

import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { HolidayBanner } from './_components/holiday-banner';
import { Toaster } from "@/components/ui/toaster";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HolidayBanner />
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
