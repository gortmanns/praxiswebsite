
import PageLayout from '../page-layout';
import { Hero } from '../_components/hero';
import { WelcomeSection } from '../_components/welcome-section';
import { QuickNavSection } from '../_components/quick-nav-section';
import { CooperationPartnersSection } from '../_components/cooperation-partners';

export default function HomeEn() {
  return (
    <PageLayout>
        <Hero />
        <WelcomeSection />
        <QuickNavSection />
        <CooperationPartnersSection />
    </PageLayout>
  );
}
