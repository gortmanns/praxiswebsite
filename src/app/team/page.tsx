
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

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

          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="mb-8 border-b-2 border-primary pb-2 font-headline text-2xl font-bold text-primary">
              Ärzte
            </h3>

            <Card className="group relative overflow-hidden">
              <CardContent className="p-6 transition-opacity duration-300 group-hover:opacity-10">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
                  <div className="relative mx-auto w-full max-w-xs md:max-w-none">
                    <Image
                      src="/images/team/Ortmanns.jpg"
                      alt="Portrait von G. Ortmanns"
                      data-ai-hint="doctor portrait"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex h-full flex-col justify-center text-left text-foreground/80">
                      <p className="text-2xl text-primary">Dipl. med.</p>
                      <h4 className="font-headline text-5xl font-bold text-primary">
                        G. Ortmanns
                      </h4>
                      <div className="mt-4 text-2xl">
                        <p className="font-bold">Praktischer Arzt</p>
                        <p>Master of Public Health (UNSW)</p>
                        <p>Master of Health Management (UNSW)</p>
                      </div>
                      <p className="mt-6 text-lg italic">Medizinische und Administrative Leitung Praxiszentrum im Ring</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 flex flex-col items-start bg-accent p-8 text-left text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ul className="space-y-4 text-lg">
                  <li className="font-bold text-primary">
                    Medizinstudium in Bonn (Deutschland) und Hobart (Australien)
                  </li>
                  <li className="font-bold text-primary">
                    Masterstudium Public Health und Health Management in Sydney (Australien)
                  </li>
                  <li className="font-bold text-primary">
                    Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor
                  </li>
                  <li className="font-bold text-primary">
                    Projektmanagement im Gesundheitswesen in Europa und Australien
                     <div className="mt-2 pl-4 text-background/80">
                        <h5 className="font-bold uppercase tracking-wider text-base mb-2">Meilensteine</h5>
                        <ul className="list-disc space-y-2 pl-5 text-base">
                          <li>Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                          <li>Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                          <li>Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                        </ul>
                     </div>
                  </li>
                  <li className='mt-2 font-bold text-primary'>
                    Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
                    <ul className="list-disc space-y-2 pl-9 mt-2 text-background/80 text-base">
                        <li>Universitätsspital Basel (USB)</li>
                        <li>Kantonsspital Baselland (KSBL)</li>
                        <li>Kantonsspital Winterthur (KSW)</li>
                        <li>Kantonsspital Wil (SRFT)</li>
                        <li>Hausarztpraxis in Winterthur</li>
                    </ul>
                  </li>
                </ul>
                <p className='mt-4 text-lg text-primary font-bold'>Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)</p>
                <p className='text-lg text-primary font-bold'>Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
