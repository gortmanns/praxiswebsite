
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md">
        <Image
          src="/images/praxiszentrum-logo.png"
          alt="Praxiszentrum im Ring Logo"
          data-ai-hint="practice logo"
          width={400}
          height={81} 
          className="mx-auto h-auto w-full"
        />
        <p className="mt-8 text-lg text-foreground/80">
          Es tut uns leid, aber die angeforderte Seite ist nicht vorhanden.
          Klicken Sie{' '}
          <Link href="/" className="font-bold text-primary underline hover:no-underline">
            HIER
          </Link>
          , um zur Startseite zurückzukehren.
        </p>
      </div>
    </div>
  );
}
