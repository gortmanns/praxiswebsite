
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';

export default function PraxisferienPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background debug-outline">
      <Header />
      <main className="flex-1 debug-outline">
        <div className="container py-16 sm:py-24 debug-outline">
            <div className="mx-auto max-w-5xl text-center debug-outline">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl sm:whitespace-nowrap text-primary">
                    PRAXISFERIEN
                </h2>
                <p className="mt-6 text-lg text-foreground/80">
                    Auf dieser Seite finden Sie stets eine Übersicht aller Praxisferien, soweit diese bereits geplant sind.
                </p>
            </div>
            <div className="mx-auto mt-16 w-full max-w-2xl space-y-8 debug-outline">
              <div className="space-y-2 debug-outline">
                <p className="text-xl font-bold text-primary">Herbstferien 2025</p>
                <p className="text-lg text-foreground/80">4. Oktober 2025 - 12. Oktober 2025</p>
              </div>
              <hr className="border-t border-border" />
              <div className="space-y-2 debug-outline">
                <p className="text-xl font-bold text-primary">Weihnachtsferien 2025 / 2026</p>
                <p className="text-lg text-foreground/80">20.12.2025 - 4. Januar 2026</p>
              </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
