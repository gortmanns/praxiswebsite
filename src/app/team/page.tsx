
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const DoctorCard = () => (
    <div className="mx-auto max-w-5xl" style={{ containerType: 'inline-size' }}>
        <div
            className="group relative w-full"
            style={{ aspectRatio: '1000 / 495' }}
        >
            <Card className="absolute inset-0 overflow-hidden">
                <CardContent className="h-full p-6 transition-opacity duration-300 group-hover:opacity-10">
                <div className="grid h-full grid-cols-3 items-center gap-[4.5%]">
                    <div className="relative col-span-1 h-full w-full">
                    <Image
                        src="/images/team/Ortmanns.jpg"
                        alt="Portrait von G. Ortmanns"
                        data-ai-hint="doctor portrait"
                        fill
                        className="object-contain"
                    />
                    </div>
                    <div className="col-span-2">
                    <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                        <p className="text-[2.2cqw] text-primary">Dipl. med.</p>
                        <h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">
                        G. Ortmanns
                        </h4>
                        <div className="mt-[1.5cqw] text-[2.2cqw] leading-tight">
                        <p className="font-bold">Praktischer Arzt</p>
                        <p>Master of Public Health (UNSW)</p>
                        <p>Master of Health Management (UNSW)</p>
                        </div>
                        <p className="mt-[2.5cqw] text-[1.6cqw] italic">
                        <span className="whitespace-nowrap">
                            Medizinische und Administrative Leitung
                        </span>{' '}
                        <span className="whitespace-nowrap">
                            Praxiszentrum im Ring
                        </span>
                        </p>
                    </div>
                    </div>
                </div>
                </CardContent>
                <div className="absolute inset-0 flex flex-col items-start justify-center overflow-auto bg-accent p-6 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ul className="space-y-1.5 text-[clamp(0.8rem,2.1cqw,1.2rem)] leading-tight">
                    <li className="font-bold text-primary">
                    Medizinstudium in Bonn (Deutschland) und Hobart
                    (Australien)
                    </li>
                    <li className="font-bold text-primary">
                    Masterstudium Public Health und Health Management in
                    Sydney (Australien)
                    </li>
                    <li className="font-bold text-primary">
                    Unternehmensberatung mit Spezialisierung auf den
                    Gesundheitssektor
                    </li>
                    <li className="font-bold text-primary">
                    Projektmanagement im Gesundheitswesen in Europa und
                    Australien
                    <div className="mt-1 pl-4 text-[clamp(0.7rem,1.9cqw,1rem)] leading-snug text-background/80">
                        <h5 className="mb-1 font-bold uppercase tracking-wider text-primary">
                        Meilensteine
                        </h5>
                        <ul className="list-disc space-y-px pl-5">
                        <li>
                            Leiter Klinische Entwicklung und Analytik bei DxCG
                            Gesundheitsanalytik GmbH (Deutschland)
                        </li>
                        <li>
                            Verantwortlicher Manager für Klinische Sicherheit
                            und Design Assurance bei der Entwicklung der
                            Nationalen Elektronischen Gesundheitsakte in
                            Australien
                        </li>
                        <li>
                            Direktor der Memory-Strategie (Elektronisches
                            Medikamenten-Management und Elektronische
                            Patientenakten) für das Netzwerk der
                            Kinderkrankenhäuser in Sydney, Australien
                        </li>
                        </ul>
                    </div>
                    </li>
                    <li className="mt-2 font-bold text-primary">
                    Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
                    <ul className="mt-1 list-disc space-y-px pl-9 text-[clamp(0.7rem,1.9cqw,1rem)] leading-snug text-background/80">
                        <li>Universitätsspital Basel (USB)</li>
                        <li>Kantonsspital Baselland (KSBL)</li>
                        <li>Kantonsspital Winterthur (KSW)</li>
                        <li>Kantonsspital Wil (SRFT)</li>
                        <li>Hausarztpraxis in Winterthur</li>
                    </ul>
                    </li>
                </ul>
                <p className="mt-2 text-[clamp(0.7rem,1.9cqw,1rem)] font-bold text-primary">
                    Wissenschaftlicher Mitarbeiter an der Universität Zürich /
                    USZ (Abteilung für Pneumologie)
                </p>
                <p className="text-[clamp(0.7rem,1.9cqw,1rem)] font-bold text-primary">
                    Lehrbeauftragter für Hausarztmedizin (Institut für
                    Hausarztmedizin der Universität Bern)
                </p>
                </div>
            </Card>
        </div>
    </div>
);


export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              UNSER TEAM
            </h2>
          </div>

          <div className="mx-auto mt-16">
            <h3 className="mb-8 border-b-2 border-primary pb-2 font-headline text-2xl font-bold text-primary">
              Ärzte
            </h3>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
                <DoctorCard />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
