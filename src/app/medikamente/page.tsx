
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';
import { cn } from '@/lib/utils';
import { Phone, Mail } from 'lucide-react';

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
          <div className="mx-auto mt-16 max-w-7xl">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
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

          <div className="mx-auto mt-16 max-w-7xl text-center">
            <h3 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              So einfach bestellen Sie Ihre Medikamente
            </h3>
            <p className="mt-4 text-xl font-bold text-foreground">
              Ganz bequem, wahlweise per Telefon oder E-Mail
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-7xl">
            <Tabs defaultValue="telefon" className="w-full">
              <TabsList className="grid h-auto w-full grid-cols-1 gap-4 sm:grid-cols-2">
                  <a href="tel:0313162666">
                    <TabsTrigger 
                        value="telefon" 
                        className={cn(
                            'h-auto w-full flex-col items-center justify-center gap-2 rounded-lg p-6 text-xl font-bold text-secondary-foreground transition-colors data-[state=inactive]:bg-secondary data-[state=inactive]:hover:bg-secondary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg'
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Phone className="h-6 w-6"/>
                            <span>Vorbestellung per Telefon</span>
                        </div>
                        <span className="text-base font-normal">031 316 26 66</span>
                    </TabsTrigger>
                  </a>
                  <ObfuscatedLink
                    user="medikamente"
                    domain="praxiszentrum-im-ring.ch"
                  >
                    <TabsTrigger 
                        value="email"
                        className={cn(
                            'h-auto w-full flex-col items-center justify-center gap-2 rounded-lg p-6 text-xl font-bold text-secondary-foreground transition-colors data-[state=inactive]:bg-secondary data-[state=inactive]:hover:bg-secondary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg'
                        )}
                    >
                       <div className="flex items-center gap-3">
                            <Mail className="h-6 w-6"/>
                            <span>Vorbestellung per Email</span>
                        </div>
                        <span className="text-base font-normal break-all">medikamente@praxiszentrum-im-ring.ch</span>
                    </TabsTrigger>
                  </ObfuscatedLink>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
