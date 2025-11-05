
import { Hero } from '../_components/hero';
import { WelcomeSection } from '../_components/welcome-section';
import { QuickNavSection } from '../_components/quick-nav-section';
import { CooperationPartnersSection } from '../_components/cooperation-partners';

export default function HomeEn() {
  return (
    <>
        <Hero isEnglish={true} />
        <WelcomeSection isEnglish={true} />
        <QuickNavSection />
        <CooperationPartnersSection isEnglish={true} />
    </>
  );
}
