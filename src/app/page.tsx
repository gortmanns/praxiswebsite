
import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { QuickNavSection } from './_components/quick-nav-section';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WelcomeSection />
        <QuickNavSection />
        <section id="partners" className="w-full bg-green-600">
            <div className="mx-auto w-full px-4 pt-12 pb-16 sm:px-6 lg:px-8">
                <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Unsere ärztlichen Kooperationspartner
                </h2>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
