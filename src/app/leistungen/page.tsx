import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';

const leistungen = [
  {
    name: 'Hauskreisärztliche Betreuung',
    image: '/images/leistungen/hauskreisaerztliche-betreuung.jpg',
    description: 'Umfassende und kontinuierliche medizinische Versorgung für die ganze Familie.',
    hint: 'doctor patient consultation',
  },
  {
    name: 'Notfallmedizin',
    image: '/images/leistungen/notfallmedizin.jpg',
    description: 'Schnelle und kompetente Hilfe bei akuten medizinischen Notfällen.',
    hint: 'emergency medical kit',
  },
  {
    name: 'Praxislabor',
    image: '/images/leistungen/praxislabor.jpg',
    description: 'Sofortige Analyse von Blut- und Urinproben direkt in unserer Praxis.',
    hint: 'lab technician microscope',
  },
  {
    name: 'Digitales Röntgen',
    image: '/images/leistungen/digital-roentgen.jpg',
    description: 'Moderne und strahlenarme Röntgendiagnostik für präzise Ergebnisse.',
    hint: 'x-ray scan',
  },
  {
    name: 'Ultraschall (Sonografie)',
    image: '/images/leistungen/ultraschall.jpg',
    description: 'Schmerzfreie Untersuchung von Organen und Gewebe mittels Ultraschallwellen.',
    hint: 'ultrasound machine',
  },
  {
    name: 'Belastungs-EKG (Ergometrie)',
    image: '/images/leistungen/belastungs-ekg.jpg',
    description: 'Überprüfung der Herzfunktion unter körperlicher Anstrengung.',
    hint: 'patient stress test',
  },
  {
    name: 'Lungenfunktionsprüfung (Spirometrie)',
    image: '/images/leistungen/lungenfunktion.jpg',
    description: 'Messung des Lungenvolumens und der Atemflüsse zur Diagnose von Atemwegserkrankungen.',
    hint: 'spirometry test',
  },
  {
    name: 'Schlafapnoe-Screening',
    image: '/images/leistungen/schlafapnoe.jpg',
    description: 'Diagnostik von schlafbezogenen Atemstörungen und Schnarchen.',
    hint: 'sleep apnea device',
  },
  {
    name: 'Kleinchirurgische Eingriffe',
    image: '/images/leistungen/kleinchirurgie.jpg',
    description: 'Entfernung von Hautveränderungen, Wundversorgung und weitere kleine Eingriffe.',
    hint: 'surgical tools',
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
                  <div className="relative h-56 w-full">
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
