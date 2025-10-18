
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div id="aerzte">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Ärzte</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
            </div>
            
            <div className="space-y-8">
                <p className="text-center text-muted-foreground">Informationen zu den Ärzten werden in Kürze hier angezeigt.</p>
            </div>
            
            <div id="praxispersonal">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Praxispersonal</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Die guten Geister, ohne die keine Arztpraxis funktioniert
              </p>
            </div>
            
            <div className="mt-12">
                <p className="text-center text-muted-foreground">Informationen zum Praxispersonal werden in Kürze hier angezeigt.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
