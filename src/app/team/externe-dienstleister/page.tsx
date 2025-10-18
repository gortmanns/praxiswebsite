
'use client';

import { Header } from '../../_components/header';
import { Footer } from '../../_components/footer';

export default function ExterneDienstleisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div>
              <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Externe Dienstleister im Praxiszentrum im Ring</h2>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Zur Erweiterung unseres Angebots arbeiten wir mit den nachfolgenden Spezialisten zusammen, die Ihre Dienstleistungen in unseren Praxisräumen anbieten.
              </p>
            </div>
            
             <div className="space-y-8">
                <p className="text-center text-muted-foreground">Informationen zu den externen Dienstleistern werden in Kürze hier angezeigt.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
