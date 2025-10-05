
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
                      className="rounded-lg object-contain"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-left text-foreground/80">
                      <p className="text-xl text-primary">Dipl. med.</p>
                      <h4 className="font-headline text-4xl font-bold text-primary">
                        G. Ortmanns
                      </h4>
                      <div className="mt-4 text-xl">
                        <p className="font-bold">Praktischer Arzt</p>
                        <p>Master of Public Health (UNSW)</p>
                        <p>Master of Health Management (UNSW)</p>
                      </div>
                      <p className="mt-4 text-base italic">Medizinische und Administrative Leitung Praxiszentrum im Ring</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/90 p-6 text-left text-xs text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ul className="list-disc space-y-2 pl-4">
                  <li>MEDIZINSTUDIUM IN BONN UND HOBART (AUSTRALIEN)</li>
                  <li>MASTERSTUDIUM PUBLIC HEALTH UND HEALTH MANAGEMENT IN SYDNEY (AUSTRALIEN)</li>
                  <li>UNTERNEHMENSBERATUNG MIT SPEZIALISIERUNG AUF DEN GESUNDHEITSSEKTOR</li>
                  <li>PROJEKTMANAGEMENT IM GESUNDHEITSWESEN IN EUROPA UND AUSTRALIEN</li>
                </ul>
                <h5 className="mt-4 mb-2 font-bold uppercase">Meilensteine:</h5>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Leiter Klinische Entwicklung und Analytik für DxCG Gesundheitsanalytik GmbH (Deutschland)</li>
                  <li>Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien</li>
                  <li>Direktor der Memory-Strategie (elektronisches Medikamenten-management und elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
