import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background debug-outline">
      <Header />
      <main className="flex-1 debug-outline">
        <div className="container py-16 sm:py-24 debug-outline">
          <div className="mx-auto max-w-5xl text-center debug-outline">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              UNSER TEAM
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl debug-outline">
            <h3 className="mb-8 border-b-2 border-primary pb-2 font-headline text-2xl font-bold text-primary">
              Ärzte
            </h3>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
              <div className="relative mx-auto w-full max-w-xs md:max-w-none debug-outline">
                <Image
                  src="/images/team/ortmanns.jpg"
                  alt="Portrait von G. Ortmanns"
                  data-ai-hint="doctor portrait"
                  width={400}
                  height={400}
                  className="rounded-full object-cover aspect-square"
                />
              </div>
              <div className="text-left text-foreground/80 md:col-span-2 debug-outline">
                <p className="text-lg">Dipl. med.</p>
                <h4 className="font-headline text-2xl font-bold text-foreground">G. Ortmanns</h4>
                <p className="mt-4 text-lg">Praktischer Arzt</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
