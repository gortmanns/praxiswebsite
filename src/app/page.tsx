import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { OurTeam } from './_components/our-team';
import { ContactSection } from './_components/contact-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <OurTeam />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
