import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';

const leistungen = [
  {
    name: 'Audiometrie',
    image: '/images/leistungen/audiometrie.jpg',
    description: 'Hörtests zur Überprüfung und Diagnose der Hörfähigkeit.',
    hint: 'audiometry test',
  },
  {
    name: 'EKG',
    image: '/images/leistungen/ekg.jpg',
    description: 'Messung der Herzströme zur Beurteilung der Herzfunktion.',
    hint: 'ecg machine',
  },
  {
    name: 'Labor',
    image: '/images/leistungen/labor.jpg',
    description: 'Analyse von Blut- und Urinproben direkt in unserer Praxis.',
    hint: 'lab technician microscope',
  },
  {
    name: 'Praxisapotheke',
    image: '/images/leistungen/praxisapotheke.jpg',
    description: 'Direkte Abgabe von Medikamenten aus unserer eigenen Apotheke.',
    hint: 'pharmacy shelf medication',
  },
  {
    name: 'Röntgen',
    image: '/images/leistungen/roentgen.jpg',
    description: 'Moderne digitale Röntgendiagnostik für präzise Ergebnisse.',
    hint: 'x-ray scan',
  },
  {
    name: 'Spirometrie',
    image: '/images/leistungen/spirometrie.jpg',
    description: 'Lungenfunktionstests zur Diagnose von Atemwegserkrankungen.',
    hint: 'spirometry test',
  },
  {
    name: 'Verkehrsmedizinische Untersuchungen (VMU)',
    image: '/images/leistungen/vmu.jpg',
    description: 'Untersuchungen zur Beurteilung der Fahreignung.',
    hint: 'driving test eye chart',
  },
  {
    name: 'Wundversorgung',
    image: '/images/leistungen/wundversorgung.jpg',
    description: 'Professionelle Versorgung von akuten und chronischen Wunden.',
    hint: 'wound dressing',
  },
];

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
                <p className="mt-6 text-lg text-foreground/80">
                    Wir bieten Ihnen eine breite Palette an medizinischen Dienstleistungen an, um Ihre Gesundheit optimal zu betreuen.
                </p>
            </div>

            <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {leistungen.map((leistung) => (
                <div key={leistung.name} className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={leistung.image}
                      alt={leistung.name}
                      fill
                      className="object-cover"
                      data-ai-hint={leistung.hint}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-headline text-xl font-bold text-primary">{leistung.name}</h3>
                      <p className="mt-2 text-base text-foreground/80">{leistung.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
