
import Link from 'next/link';
import Image from 'next/image';
import { Header } from './_components/header';
import { Footer } from './_components/footer';

// This component is now completely self-contained and does NOT use any client-side layout components.
// It renders its own simple Header and Footer to avoid any hooks during server-side build.

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isEnglish={false} />
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="max-w-md">
              <Image
                src="/images/praxiszentrum-logo.png"
                alt="Praxiszentrum im Ring Logo"
                data-ai-hint="practice logo"
                width={400}
                height={81} 
                className="mx-auto h-auto w-full"
              />
              <h1 className="mt-8 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Seite nicht gefunden</h1>
              <p className="mt-4 text-lg text-foreground/80">
                Es tut uns leid, aber die angeforderte Seite ist nicht vorhanden.
              </p>
              <div className="mt-10">
                <Link href="/" className="rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
        </div>
      </main>
      <Footer isEnglish={false} />
    </div>
  );
}
