'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="max-w-md p-8">
                <Image
                    src="/images/praxiszentrum-logo.png"
                    alt="Praxiszentrum im Ring Logo"
                    data-ai-hint="practice logo"
                    width={400}
                    height={81} 
                    className="mx-auto h-auto w-full"
                />
                <h1 className="mt-8 font-headline text-4xl font-bold text-primary">Etwas ist schiefgelaufen!</h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
                </p>
                 <div className="mt-6 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/">Zurück zur Startseite</Link>
                    </Button>
                    <Button variant="outline" onClick={() => reset()}>Erneut versuchen</Button>
                </div>
            </div>
        </div>
      </body>
    </html>
  );
}
