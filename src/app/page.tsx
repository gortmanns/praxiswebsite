import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { ContactSection } from './_components/contact-section';
import { ColorPaletteDemo } from './_components/color-palette-demo';
import { QuickNavSection } from './_components/quick-nav-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WelcomeSection />
        <QuickNavSection />
        <ContactSection />
        <ColorPaletteDemo />
      </main>
      <Footer />
    </div>
  );
}
