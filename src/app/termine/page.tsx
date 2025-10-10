
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, UserPlus, Clock } from 'lucide-react';

export default function TerminePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              TERMINVEREINBARUNG
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-4xl space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl font-bold text-primary">
                  <Phone />
                  Terminvereinbarung per Telefon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-foreground/80">
                <p>Für Terminvereinbarungen erreichen Sie uns während unserer <a href="/oeffnungszeiten" className="text-primary hover:underline">Telefonzeiten</a> unter der folgenden Nummer:</p>
                <a href="tel:0313162600" className="my-4 flex items-center justify-start gap-4 text-2xl font-bold text-foreground transition-colors hover:text-primary md:text-3xl">
                    <Phone className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                    <span>031 316 26 00</span>
                </a>
                <p>Wir bitten Sie um Verständnis, dass wir aus organisatorischen Gründen keine Termine per E-Mail vergeben können. Die elektronische Kommunikation eignet sich nicht für die speditive und persönliche Planung, die ein Arzttermin erfordert.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl font-bold text-primary">
                  <UserPlus />
                  Informationen für Neupatienten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-foreground/80">
                <p>Wenn Sie zum ersten Mal zu uns kommen, bringen Sie bitte zu Ihrem Termin Ihre Krankenkassenkarte sowie allfällig vorhandene Unterlagen wie Impfausweis, Blutgruppennachweis oder eine Liste Ihrer aktuellen Medikamente mit.</p>
                <p>Dies hilft uns, Sie von Anfang an optimal zu betreuen.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl font-bold text-primary">
                  <Clock />
                  Terminabsagen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-foreground/80">
                <p>Sollten Sie einen vereinbarten Termin nicht wahrnehmen können, bitten wir Sie, uns dies so früh wie möglich, spätestens aber 24 Stunden vorher, telefonisch mitzuteilen.</p>
                <p>Nicht rechtzeitig abgesagte Termine müssen wir Ihnen leider privat in Rechnung stellen, da die für Sie reservierte Zeit nicht anderweitig vergeben werden kann.</p>
                <p>Vielen Dank für Ihr Verständnis!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    