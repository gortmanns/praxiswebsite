import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { OurTeam } from './_components/our-team';
import { ContactSection } from './_components/contact-section';
import { ColorPaletteDemo } from './_components/color-palette-demo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 mt-[-1px]">
        <Hero />
        <WelcomeSection />
        <OurTeam />
        <ContactSection />
        <ColorPaletteDemo />
      </main>
      <Footer />
    </div>
  );
}
