import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UeberUnsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background debug-outline">
      <Header />
      <main className="flex-1 debug-outline">
        <div className="container py-16 sm:py-24 debug-outline">
          <Card className="debug-outline">
            <CardHeader className="debug-outline">
              <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Über uns</CardTitle>
            </CardHeader>
            <CardContent className="debug-outline">
              <p className="text-muted-foreground">Der Inhalt für die 'Über uns'-Seite wird hier in Kürze verfügbar sein.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
