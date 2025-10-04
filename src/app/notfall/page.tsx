import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, AlertTriangle } from 'lucide-react';

export default function NotfallPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Notfall</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-foreground/80">
              <div>
                <h3 className="mb-4 font-headline text-2xl font-bold text-primary">Praxis-Öffnungszeiten</h3>
                <p>
                  Unsere Praxis ist während der folgenden Zeiten geöffnet. In Notfällen ausserhalb dieser Zeiten stehen Ihnen die unten aufgeführten Dienste zur Verfügung.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary">Was tun bei einem Notfall?</h3>
                
                <div className="space-y-4 rounded-lg border border-border p-6">
                  <h4 className="font-bold text-lg text-foreground">Ausserhalb unserer Öffnungszeiten</h4>
                  <p>
                    Wenden Sie sich telefonisch an die Medgate Telemedizinisches Zentrum, mit welchen wir zusammenarbeiten. Ein Arzt oder eine Ärztin von Medgate wird das weitere Vorgehen mit Ihnen besprechen.
                  </p>
                  <a href="tel:0800888333" className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                    Medgate: 0800 888 333
                  </a>
                  <p className="pt-2">
                    Falls Medgate nicht erreichbar ist, kontaktieren Sie bitte die kantonale Notfallnummer:
                  </p>
                  <a href="tel:0900576747" className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                    Medphone: 0900 57 67 47 (kostenpflichtig)
                  </a>
                </div>

                <div className="space-y-4 rounded-lg border border-destructive bg-destructive/10 p-6">
                  <h4 className="flex items-center gap-2 font-bold text-lg text-destructive">
                    <AlertTriangle />
                    Bei lebensbedrohlichen Notfällen
                  </h4>
                  <p className="text-destructive/90">
                    Rufen Sie sofort den Sanitätsnotruf an. Zögern Sie nicht bei Verdacht auf Herzinfarkt, Schlaganfall oder bei schweren Unfällen.
                  </p>
                  <a href="tel:144" className="inline-flex items-center gap-2 font-bold text-destructive transition-colors hover:text-destructive/80">
                    <Phone className="h-5 w-5" />
                    Sanitätsnotruf: 144
                  </a>
                </div>

                <div className="space-y-4 rounded-lg border border-border p-6">
                  <h4 className="font-bold text-lg text-foreground">Bei Vergiftungen</h4>
                  <p>
                    Bei Verdacht auf eine Vergiftung erhalten Sie beim Tox Info Suisse rund um die Uhr fachkundige Auskunft.
                  </p>
                  <a href="tel:145" className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                    Tox Info Suisse: 145
                  </a>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
