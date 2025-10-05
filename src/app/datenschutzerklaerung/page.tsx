
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DatenschutzerklaerungPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    DATENSCHUTZERKLÄRUNG
                </h2>
            </div>
            <div className="mt-16">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground">Der Inhalt für die Datenschutzerklärungsseite wird hier in Kürze verfügbar sein.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
