
'use client';

import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { QuickNavSection } from './_components/quick-nav-section';
import { CooperationPartnersSection } from './_components/cooperation-partners';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const HolidayBanner = dynamic(
  () => import('./_components/holiday-banner').then((mod) => mod.HolidayBanner),
  {
    ssr: false,
    loading: () => <Skeleton className="h-12 w-full" />,
  }
);


export default function Home() {
  return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HolidayBanner />
          <Hero />
          <WelcomeSection />
          <QuickNavSection />
          <CooperationPartnersSection />
        </main>
        <Footer />
      </div>
  );
}
