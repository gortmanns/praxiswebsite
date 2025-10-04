import { Header } from '../_components/header';
import { Footer } from '../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OeffnungszeitenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    ÖFFNUNGS- & TELEFONZEITEN
                </h2>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
                 <Card id="oeffnungszeiten">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Praxis-Öffnungszeiten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Der Inhalt für die Öffnungszeiten wird hier in Kürze verfügbar sein.</p>
                    </CardContent>
                </Card>

                <Card id="telefonzeiten" className="mt-12">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Telefonzeiten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Der Inhalt für die Telefonzeiten wird hier in Kürze verfügbar sein.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
