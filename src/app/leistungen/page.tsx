
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const leistungen = [
  {
    name: 'Audiometrie',
    image: '/images/leistungen/audiometrie.jpg',
    hint: 'audiometry test',
    backsideContent: (
      <>
        <p>Durch die orientierende Audiometrie (Test des Hörvermögens) können wir eine Hörminderung unkompliziert erkennen und Sie wenn nötig in die Behandlung eines Spezialisten (Facharzt für HNO) überweisen.</p>
      </>
    ),
  },
  {
    name: 'EKG',
    image: '/images/leistungen/ekg.jpg',
    hint: 'ecg machine',
    backsideContent: (
      <>
        <p>Mit dem modernen, digitalen 12-Kanal-EKG können wir die elektrischen Signale Ihres Herzens analysieren und mögliche Probleme wie Vorhofflimmern und Rhythmusstörungen frühzeitig erkennen.</p>
      </>
    ),
  },
  {
    name: 'Praxislabor',
    image: '/images/leistungen/labor.jpg',
    hint: 'lab technician microscope',
    backsideContent: (
      <>
        <p>In unserem modernen Praxislabor können wir viele Analysen noch während der Sprechstunde durchführen und so eine Behandlung ohne Verzögerung sicherstellen.</p>
        <br />
        <p>Für Analysen, die wir nicht vor Ort durchführen können, arbeiten wir mit MCL, einem der grössten Labordienstleister der Schweiz, zusammen.</p>
        <br />
        <p>Auf Wunsch führen wir auch Laboranalysen durch, die nicht durch die Grundversicherung abgedeckt sind (z. B. Bestimmungen von Vitaminspiegeln oder Durchführung von Covid-Tests).</p>
      </>
    ),
  },
  {
    name: 'Praxisapotheke',
    image: '/images/leistungen/praxisapotheke.jpg',
    hint: 'pharmacy shelf medication',
    backsideContent: (
      <>
        <p>Als selbstdispensierende Praxis übernehmen wir Ihre Versorgung mit den benötigten Medikamenten aus unserer gut sortierten Praxisapotheke. Die Lagerung und Abgabe der Medikamente erfolgt selbstverständlich entsprechend den gesetzlichen Vorschriften.</p>
      </>
    ),
  },
  {
    name: 'Röntgen',
    image: '/images/leistungen/roentgen.jpg',
    hint: 'x-ray scan',
    backsideContent: (
      <>
        <p>Durch unser volldigitales Röntgengerät können wir schnell und unkompliziert Knochenbrüche, Lungenentzündungen und andere Probleme feststellen und dann die notwendige Behandlung ohne Zeitverzögerung einleiten.</p>
      </>
    ),
  },
  {
    name: 'Spirometrie',
    image: '/images/leistungen/spirometrie.jpg',
    hint: 'spirometry test',
    backsideContent: (
      <>
        <p>Durch die Untersuchung der Lungenfunktion (Spirometrie) kann der Verdacht auf eine Lungenerkrankung wie Asthma oder COPD frühzeitig gestellt und eine angemessene Behandlung eingeleitet werden.</p>
      </>
    ),
  },
  {
    name: 'TWINT',
    image: '/images/leistungen/twint_logo.png',
    hint: 'twint logo',
    backsideContent: (
      <>
        <p>Zusatzleistungen können Sie nicht nur in bar, sondern auch modern und bequem mit dem Handy per TWINT bezahlen.</p>
        <br />
        <p>Alle Leistungen, die von Ihrer Kasse übernommen werden, rechnen wir natürlich weiterhin direkt mit dieser ab.</p>
      </>
    ),
  },
  {
    name: 'Verkehrsmedizinische Untersuchungen',
    image: '/images/leistungen/VMU.png',
    hint: 'driving test eye chart',
    backsideContent: (
      <>
        <p>Wir führen Verkehrsmedizinische Untersuchungen der Stufe 1 durch (für Senioren). Dies ist eine Wahlleistung und nicht über die Krankenversicherung gedeckt.</p>
      </>
    ),
  },
  {
    name: 'Wundversorgung und Kleinchirurgie',
    image: '/images/leistungen/wundversorgung.jpg',
    hint: 'wound dressing',
    backsideContent: (
      <>
        <p>Die Versorgung kleiner Wunden und die Durchführung kleiner Eingriffe (z. B. Entfernung von Hautveränderungen) können wir direkt in der normalen Sprechstunde durchführen.</p>
        <br/>
        <p>Für grössere Eingriffe steht mit <Link href="/team#schemmer" className="underline hover:text-primary">Prof. Dr. med. Dr. h. c. Schemmer</Link> ein Spezialist zur Verfügung, der mehrmals pro Monat eine Sprechstunde im Praxiszentrum anbietet.</p>
      </>
    ),
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function LeistungenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    UNSERE LEISTUNGEN
                </h2>
            </div>

            <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {leistungen.map((leistung) => (
                  <div key={leistung.name} className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl aspect-[4/5]">
                    <div className="flex items-center justify-center p-4 min-h-[9rem]">
                        <div className="text-center">
                          <h3 className="font-headline text-2xl font-bold text-primary">
                            {leistung.name === 'TWINT' ? (
                                <>
                                    TWINT
                                    <br />
                                    <span>Mit dem Handy bezahlen</span>
                                </>
                            ) : leistung.name}
                          </h3>
                        </div>
                    </div>
                    <div className={cn("relative flex-1", leistung.name === 'TWINT' && "bg-black")}>
                        <Image
                          src={leistung.image}
                          alt={leistung.name}
                          fill
                          className={cn(
                            "object-cover",
                            leistung.name === 'TWINT' && "object-contain p-4"
                          )}
                          data-ai-hint={leistung.hint}
                        />
                    </div>
                     {leistung.backsideContent && (
                          <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center overflow-auto bg-accent/95 p-6 text-left text-background transition-all duration-1000 group-hover:translate-y-0">
                              <div className="text-center text-lg">
                                  {leistung.backsideContent}
                              </div>
                          </div>
                      )}
                  </div>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
