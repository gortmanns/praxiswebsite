'use client';

import { Hero } from '../_components/hero';
import { WelcomeSection } from '../_components/welcome-section';
import { QuickNavSection } from '../_components/quick-nav-section';
import { CooperationPartnersSection } from '../_components/cooperation-partners';
import ClientLayout from '../_components/ClientLayout';

export default function HomeEn() {
  return (
    <ClientLayout>
        <Hero isEnglish={true} />
        <WelcomeSection isEnglish={true} />
        <QuickNavSection />
        <CooperationPartnersSection isEnglish={true} />
    </ClientLayout>
  );
}
