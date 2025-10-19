
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';
import { cn } from '@/lib/utils';
import { Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function MedikamentePage() {
  const [activeTab, setActiveTab] = useState('telefon');

  const PhoneCardContent = () => (
     <>
        <h4 className="font-headline text-3xl font-bold">Bestellungen per Telefon</h4>
        <p className="text-lg mt-4">Unsere Medikamenten-Hotline ist rund um die Uhr an 365 Tagen im Jahr für Sie erreichbar.</p>
        <a href="tel:0313162666" className="my-4 flex items-center justify-start gap-4 text-3xl font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80 md:text-4xl lg:text-5xl">
            <Phone className="h-10 w-10 flex-shrink-0 md:h-12 md:w-12" />
            <span>031 316 26 66</span>
        </a>
        <div className="space-y-6 text-lg">
            <p>Befolgen Sie einfach die Anweisungen und deponieren Sie über das Dialogsystem Ihren Namen, Vornamen sowie das Geburtsdatum, gefolgt von den benötigten Medikamenten. Um Missverständnissen vorzubeugen, lesen Sie am einfachsten die Medikamente so vor, wie diese auf der Originalverpackung bezeichnet sind.</p>
            <div>
            <p>Zum Beispiel:</p>
            <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
            </div>
        </div>
     </>
  );
  
  const MobilePhoneCardContent = () => (
     <>
        <div className="space-y-6 text-lg">
            <p>Unsere Medikamenten-Hotline ist rund um die Uhr an 365 Tagen im Jahr für Sie erreichbar.</p>
            <p>Befolgen Sie einfach die Anweisungen und deponieren Sie über das Dialogsystem Ihren Namen, Vornamen sowie das Geburtsdatum, gefolgt von den benötigten Medikamenten. Um Missverständnissen vorzubeugen, lesen Sie am einfachsten die Medikamente so vor, wie diese auf der Originalverpackung bezeichnet sind.</p>
             <a href="tel:0313162666" className="my-4 flex items-center justify-start gap-4 text-2xl font-bold transition-colors hover:text-primary-foreground/80 md:text-3xl lg:text-4xl">
                <Phone className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <span>031 316 26 66</span>
            </a>
            <div>
            <p>Zum Beispiel:</p>
            <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
            </div>
        </div>
     </>
  );

  const EmailCardContent = () => (
      <>
          <h4 className="font-headline text-3xl font-bold">Bestellungen per E-Mail</h4>
          <p className="text-lg mt-4">Sie können Ihre Medikamente auch bequem per E-Mail bestellen.</p>
          <ObfuscatedLink
            user="medikamente"
            domain="praxiszentrum-im-ring.ch"
            className="my-4 flex items-center justify-start gap-4 text-3xl font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80 md:text-4xl lg:text-5xl"
        >
            <Mail className="h-10 w-10 flex-shrink-0 md:h-12 md:w-12" />
            <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
        </ObfuscatedLink>
          <div className="space-y-6 text-lg">
              <p>In den Betreff schreiben Sie bitte Ihren Namen, Vornamen sowie das Geburtsdatum, damit wir Ihre Bestellung zuordnen können. Schreiben Sie dann in die E-Mail einfach die benötigten Medikamente, möglichst so, wie diese auf der Originalverpackung bezeichnet sind.</p>
              <div>
                  <p>Zum Beispiel:</p>
                  <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
              </div>
              
              <p>Alternativ können Sie auch ganz unkompliziert Fotos der Verpackungen schicken, auf denen die Bezeichnung des jeweiligen Medikaments gut erkennbar ist.</p>
              
              <div className="space-y-2 rounded-md border border-border bg-card p-4 text-card-foreground">
                  <h5 className="font-bold text-primary">Hinweis zum Datenschutz</h5>
                  <p className="text-base">E-Mails werden im Internet unverschlüsselt übertragen und passieren dabei mehrere Server und Zwischenstationen. Das heisst, mit ausreichendem technischem Wissen kann jeder, der Zugriff auf diese Zwischenstationen hat, den Inhalt der E-Mails lesen. Eine E-Mail entspricht also am ehesten einer Postkarte und nicht einem geschlossenen Brief. Bitte bedenken Sie dies, wenn Sie diesen Weg der Vorbestellung wählen. Wenn Sie Bedenken bezüglich Vertraulichkeit und Datenschutz haben, nutzen Sie im Zweifel lieber die telefonische Bestellhotline.</p>
              </div>
          </div>
      </>
  );
  
   const MobileEmailCardContent = () => (
      <>
          <div className="space-y-6 text-lg">
              <p>Sie können Ihre Medikamente auch bequem per E-Mail bestellen.</p>
              <p>In den Betreff schreiben Sie bitte Ihren Namen, Vornamen sowie das Geburtsdatum, damit wir Ihre Bestellung zuordnen können. Schreiben Sie dann in die E-Mail einfach die benötigten Medikamente, möglichst so, wie diese auf der Originalverpackung bezeichnet sind.</p>
              <ObfuscatedLink
                user="medikamente"
                domain="praxiszentrum-im-ring.ch"
                className="my-4 flex items-center justify-start gap-4 text-2xl font-bold transition-colors hover:text-primary-foreground/80 md:text-3xl lg:text-4xl"
            >
                <Mail className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
            </ObfuscatedLink>
              <div>
                  <p>Zum Beispiel:</p>
                  <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
              </div>
              
              <p>Alternativ können Sie auch ganz unkompliziert Fotos der Verpackungen schicken, auf denen die Bezeichnung des jeweiligen Medikaments gut erkennbar ist.</p>
              
              <div className="space-y-2 rounded-md border border-border bg-card p-4 text-card-foreground">
                  <h5 className="font-bold text-primary">Hinweis zum Datenschutz</h5>
                  <p className="text-base">E-Mails werden im Internet unverschlüsselt übertragen und passieren dabei mehrere Server und Zwischenstationen. Das heisst, mit ausreichendem technischem Wissen kann jeder, der Zugriff auf diese Zwischenstationen hat, den Inhalt der E-Mails lesen. Eine E-Mail entspricht also am ehesten einer Postkarte und nicht einem geschlossenen Brief. Bitte bedenken Sie dies, wenn Sie diesen Weg der Vorbestellung wählen. Wenn Sie Bedenken bezüglich Vertraulichkeit und Datenschutz haben, nutzen Sie im Zweifel lieber die telefonische Bestellhotline.</p>
              </div>
          </div>
      </>
  );

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
                      Als Patient können Sie alle Ihre Medikamente bequem bei uns beziehen. So sparen Sie nicht nur Geld, sondern Sie haben auch die Gewissheit, dass Sie wirklich nur die Medikamente erhalten und einnehmen, die Sie auch benötigen. Bei jeder Abgabe eines Medikaments wird dieses mit den in Ihrer Krankenakte hinterlegten Medikamenten abgeglichen.
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
          </div>

          <div className="mx-auto mt-12 max-w-7xl">
            {/* Desktop View: Tabs */}
            <div className="hidden sm:block">
               <Tabs defaultValue="telefon" value={activeTab} onValueChange={setActiveTab} className="w-full rounded-lg shadow-2xl">
                  <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-0">
                      {/*
                        WICHTIGER HINWEIS: Die Farben der Tabs sind fix und ändern sich NICHT.
                        - Telefon-Tab ist IMMER blau (bg-gradient-start).
                        - E-Mail-Tab ist IMMER grau (bg-secondary).
                        - Die Schrift ist IMMER weiss (text-primary-foreground).
                        - Die Logik `data-[state=inactive]:opacity-100` ist korrekt, da sie sicherstellt, dass die inaktiven Tabs nicht ausgegraut werden.
                      */}
                      <TabsTrigger
                          value="telefon"
                          className="group/telefon flex h-auto w-full flex-col items-center justify-center gap-2 rounded-b-none bg-gradient-start p-6 text-primary-foreground data-[state=inactive]:opacity-100"
                      >
                           <span className="text-3xl font-bold">Vorbestellung per Telefon</span>
                           <div className="flex items-center gap-3 text-base">
                              <Phone className="h-6 w-6"/>
                              <span>031 316 26 66</span>
                          </div>
                      </TabsTrigger>
                       <TabsTrigger
                          value="email"
                          className="group/email flex h-auto w-full flex-col items-center justify-center gap-2 rounded-b-none bg-secondary p-6 text-primary-foreground data-[state=inactive]:opacity-100"
                      >
                          <span className="text-3xl font-bold">Vorbestellung per E-Mail</span>
                          <div
                              className="flex items-center gap-3 text-base"
                          >
                              <Mail className="h-6 w-6"/>
                              <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
                          </div>
                      </TabsTrigger>
                  </TabsList>
                <TabsContent value="telefon" className="-mt-px">
                   <Card className="rounded-t-none bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground">
                      <CardContent className="p-6 md:p-8">
                           <PhoneCardContent />
                      </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="email" className="-mt-px">
                  <Card className="rounded-t-none bg-gradient-to-b from-secondary to-accent text-primary-foreground">
                      <CardContent className="p-6 md:p-8">
                        <EmailCardContent />
                      </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Mobile View: Stacked Cards */}
             <div className="space-y-8 sm:hidden">
                <Card className="overflow-hidden bg-gradient-start text-primary-foreground">
                    <CardHeader>
                         <div className="flex items-center gap-3 text-xl font-bold">
                            <Phone />
                            <span>Vorbestellung per Telefon</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <MobilePhoneCardContent />
                    </CardContent>
                </Card>
                <Card className="overflow-hidden bg-secondary text-primary-foreground">
                     <CardHeader>
                         <div className="flex items-center gap-3 text-xl font-bold">
                            <Mail />
                            <span>Vorbestellung per E-Mail</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <MobileEmailCardContent />
                    </CardContent>
                </Card>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6 text-lg text-foreground/80">
                  <h3 className="font-headline text-2xl font-bold text-primary">Abholung Ihrer bestellten Medikamente</h3>
                  <p>Ihre Medikamente sind in der Regel spätestens zwei Werktage nach Ihrer Bestellung zur Abholung im Praxiszentrum im Ring bereit.</p>
                  <p>Um Wartezeiten und Störungen des Sprechstundenbetriebs zu minimieren, bitten wir darum, dass Sie wann immer möglich die Medikamente vorbestellen und sie zu den folgenden Zeiten abholen:</p>
                  <ul className="space-y-2 text-foreground">
                    <li>Montags 10-12 Uhr</li>
                    <li>Dienstag 15-17 Uhr</li>
                    <li>Mittwoch 10-12 Uhr</li>
                    <li>Donnerstag 15-17 Uhr</li>
                    <li>Freitag 10-12 Uhr</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
