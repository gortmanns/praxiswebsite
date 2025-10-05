
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  IMPRESSUM
              </h2>
          </div>
          <Card className="mt-16">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-bold text-primary">Für den Inhalt der Seite verantwortlich</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg text-foreground/80">
                <div className="space-y-1">
                    <p>Dipl. med. G. Ortmanns</p>
                    <p>Praktischer Arzt</p>
                    <p>Master of Public Health (UNSW)</p>
                    <p>Master of Health Management (UNSW)</p>
                </div>
                <div className="space-y-1">
                    <h3 className="font-headline text-2xl font-bold text-primary">Anschrift</h3>
                    <p>PRAXISZENTRUM IM RING</p>
                    <p>Kappelenring 6</p>
                    <p>3032 Hinterkappelen</p>
                </div>
                <div className="space-y-1">
                    <p>Telefon: 031 316 26 00</p>
                    <p>Fax: 031 589 68 60</p>
                    <ObfuscatedLink
                        user="empfang"
                        domain="praxiszentrum-im-ring.ch"
                        className="text-primary hover:underline"
                    >
                        empfang@praxiszentrum-im-ring.ch
                    </ObfuscatedLink>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
