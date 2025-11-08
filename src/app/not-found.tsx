'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
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
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-primary sm:text-4xl">404 - Seite nicht gefunden</h1>
          <p className="mt-4 text-lg text-foreground/80">
            Die von Ihnen gesuchte Seite ist nicht vorhanden.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </div>
    </div>
  );
}
