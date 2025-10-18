
'use client';

import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { CooperationPartnersSection } from './_components/cooperation-partners';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import {
  Siren,
  HandHelping,
  Pill,
  Users,
} from 'lucide-react';

const HolidayBanner = dynamic(
  () => import('./_components/holiday-banner').then((mod) => mod.HolidayBanner),
  {
    ssr: false,
    loading: () => <Skeleton className="h-12 w-full" />,
  }
);

const navItems = [
  {
    href: '/team',
    label: 'Team',
    Icon: Users,
  },
  {
    href: '/leistungen',
    label: 'Services',
    Icon: HandHelping,
  },
  {
    href: '/medikamente',
    label: 'Medication',
    Icon: Pill,
  },
  {
    href: '/notfall',
    label: 'Emergency',
    Icon: Siren,
  },
];

function QuickNavSectionEn() {
  return (
    <section id="quick-nav" className="w-full bg-background">
      <div className="mx-auto w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative h-40 w-full overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              
              <div
                className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-b from-secondary to-accent p-6 text-primary-foreground transition-transform duration-500"
              >
                <item.Icon className="h-24 w-24" />
                <span className="text-xl font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              
              <div
                className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-b from-gradient-start to-gradient-end p-6 text-primary-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0"
              >
                <item.Icon className="h-24 w-24" />
                <span className="text-xl font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


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
        <QuickNavSectionEn />
        <CooperationPartnersSection />
      </main>
      <Footer />
    </div>
  );
}
