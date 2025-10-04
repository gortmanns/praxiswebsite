import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OeffnungszeitenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                ÖFFNUNGS- & TELEFONZEITEN
            </h2>
            <Card id="oeffnungszeiten">
                <CardHeader>
                <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Öffnungs- & Telefonzeiten</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">Der Inhalt für die Öffnungszeiten-Seite wird hier in Kürze verfügbar sein.</p>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    