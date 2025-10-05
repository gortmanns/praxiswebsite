
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function MedikamentePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
              MEDIKAMENTE
            </h2>
          </div>
          <Card className="mt-16">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src="/images/foto-medis.jpg"
                    alt="Verschiedene Medikamentenschachteln"
                    data-ai-hint="medication boxes"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="font-headline text-2xl font-bold text-primary">Ihre Medikamente direkt vom Hausarzt</h3>
                  <p className="text-lg text-foreground/80">
                    Als Patient können Sie alle Ihre Medikamente bequem bei uns beziehen. So sparen Sie nicht nur Geld sondern Sie haben auch die Gewissheit, dass Sie wirklich nur die Medikamente erhalten und einnehmen, die Sie auch benötigen. Bei jeder Abgabe eines Medikaments wird dieses mit den in Ihrer Krankenakte hinterlegten Medikamenten abgeglichen.
                  </p>
                  <p className="text-lg text-foreground/80">
                    Um Ihnen den Bezug der Medikamente so einfach wie möglich zu machen, bieten wir Ihnen die Möglichkeit, die Medikamente vorzubestellen.
                  </p>
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
