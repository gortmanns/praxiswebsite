import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MedikamentePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Medikamente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Der Inhalt für die Medikamentenseite wird hier in Kürze verfügbar sein.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
