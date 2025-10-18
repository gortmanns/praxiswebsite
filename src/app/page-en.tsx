
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


export default function HomeEn() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HolidayBanner />
        <Hero />
        <section id="welcome" className="pt-8 pb-12 sm:pt-12 sm:pb-16">
            <div className="container">
                <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl sm:whitespace-nowrap text-primary">
                    WELCOME TO THE PRAXISZENTRUM IM RING
                </h2>
                <p className="mt-6 text-lg text-foreground/80">
                    Located in the heart of Kappelenring, we see ourselves as the point of contact and advisor for all health-related questions for our patients. As a training practice for general medicine at the University of Bern, we also actively support the training of the next generation of doctors. We are also a training company for medical practice assistants.
                </p>
                </div>
            </div>
        </section>
        <QuickNavSection />
        <CooperationPartnersSection />
      </main>
      <Footer />
    </div>
  );
}
