import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
        <div className="max-w-md p-8">
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
  );
}
