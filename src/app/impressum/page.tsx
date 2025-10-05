
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
          <div className="mt-16 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Für den Inhalt der Seite verantwortlich</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-lg text-foreground/80">
                  <div className="space-y-1">
                      <p>PRAXISZENTRUM IM RING</p>
                      <p>Dipl. med. G. Ortmanns</p>
                      <p>Kappelenring 6</p>
                      <p>3032 Hinterkappelen</p>
                  </div>
                  <div className="space-y-1 pt-4">
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
                  <div className="space-y-1 pt-4">
                      <p>GLN: 7601003456677</p>
                      <p>ZSR: U57432</p>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Haftungsausschluss</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base text-foreground/80">
                <p>Alle Angaben auf unserer Website wurden sorgfältig geprüft. Wir sind bemüht, dafür Sorge zu tragen, dass die von uns bereitgestellten Informationen aktuell, richtig und vollständig sind. Dennoch ist das Auftreten von Fehlern nicht völlig auszuschließen, so dass wir für die Vollständigkeit, Richtigkeit und Aktualität der Informationen, auch journalistisch-redaktioneller Art, keine Gewähr übernehmen können. Haftungsansprüche, die sich auf Schäden materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.</p>
                <p>Der Herausgeber kann Texte nach eigenem Ermessen und ohne vorherige Ankündigung ändern oder löschen und ist nicht dazu verpflichtet, die Inhalte dieser Website zu aktualisieren. Die Nutzung dieser Website bzw. der Zugang zu ihr erfolgt auf eigenes Risiko des Besuchers. Der Herausgeber, seine Kunden oder Partner sind nicht verantwortlich für Schäden, wie z.B. direkte, indirekte, zufällige oder Folgeschäden, die angeblich durch den Besuch dieser Website verursacht wurden und übernehmen folglich keine Haftung für solche Schäden.</p>
                <p>Der Herausgeber übernimmt auch keine Verantwortung oder Haftung für den Inhalt und die Verfügbarkeit von Websites Dritter, die über externe Links von dieser Website aus erreicht werden können. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Der Herausgeber distanziert sich daher ausdrücklich von allen fremden Inhalten, die möglicherweise straf- oder haftungsrechtlich relevant sind oder gegen die guten Sitten verstoßen.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Urheberrechtserklärung</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-foreground/80">
                <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören ausschliesslich Praxiszentrum im Ring oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
