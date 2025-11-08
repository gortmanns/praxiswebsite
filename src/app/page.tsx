'use client';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { QuickNavSection } from './_components/quick-nav-section';
import { CooperationPartnersSection } from './_components/cooperation-partners';
import ClientLayout from './_components/ClientLayout';

export default function Home() {
  return (
    <ClientLayout>
      <Hero isEnglish={false} />
      <WelcomeSection isEnglish={false} />
      <QuickNavSection />
      <CooperationPartnersSection isEnglish={false} />
    </ClientLayout>
  );
}
