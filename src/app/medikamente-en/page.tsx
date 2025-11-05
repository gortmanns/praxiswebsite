'use client';

import PageLayout from '../page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';
import { cn } from '@/lib/utils';
import { Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function MedicationPage() {
  const [activeTab, setActiveTab] = useState('phone');

  const PhoneCardContent = () => (
     <div className="w-full">
        <h4 className="font-headline font-bold text-[clamp(1.5rem,4vw,1.875rem)]">Orders by Phone</h4>
        <p className="text-[clamp(1rem,2.5vw,1.125rem)] mt-4">Our medication hotline is available 24/7, 365 days a year.</p>
        <a href="tel:0313162666" className="my-4 flex items-center justify-start gap-4 font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80 text-[clamp(1.5rem,5vw,3rem)]">
            <Phone className="h-[clamp(2.5rem,8vw,3rem)] w-[clamp(2.5rem,8vw,3rem)] flex-shrink-0" />
            <span>031 316 26 66</span>
        </a>
        <div className="space-y-6 text-[clamp(1rem,2.5vw,1.125rem)]">
            <p>Simply follow the instructions and leave your name, first name, and date of birth via the dialogue system, followed by the required medications. To avoid misunderstandings, it is best to read out the medications as they are written on the original packaging.</p>
            <div>
            <p>For example:</p>
            <pre className="mt-2 rounded-md bg-muted p-4 font-code text-[clamp(0.8rem,2vw,1rem)] text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
            </div>
        </div>
     </div>
  );
  
  const MobilePhoneCardContent = () => (
     <>
        <div className="space-y-6 text-lg">
            <p>Our medication hotline is available 24/7, 365 days a year.</p>
            <p>Simply follow the instructions and leave your name, first name, and date of birth via the dialogue system, followed by the required medications. To avoid misunderstandings, it is best to read out the medications as they are written on the original packaging.</p>
             <a href="tel:0313162666" className="my-4 flex items-center justify-start gap-4 text-2xl font-bold transition-colors hover:text-primary-foreground/80 md:text-3xl lg:text-4xl">
                <Phone className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <span>031 316 26 66</span>
            </a>
            <div>
            <p>For example:</p>
            <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
            </div>
        </div>
     </>
  );

  const EmailCardContent = () => (
      <div className="w-full">
          <h4 className="font-headline font-bold text-[clamp(1.5rem,4vw,1.875rem)]">Orders by E-Mail</h4>
          <p className="text-[clamp(1rem,2.5vw,1.125rem)] mt-4">You can also conveniently order your medications by e-mail.</p>
          <ObfuscatedLink
            user="medikamente"
            domain="praxiszentrum-im-ring.ch"
            className="my-4 flex items-center justify-start gap-4 font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80 text-[clamp(1.2rem,3.5vw,2.5rem)]"
        >
            <Mail className="h-[clamp(2.5rem,8vw,3rem)] w-[clamp(2.5rem,8vw,3rem)] flex-shrink-0" />
            <span className="break-words">medikamente@praxiszentrum-im-ring.ch</span>
        </ObfuscatedLink>
          <div className="space-y-6 text-[clamp(1rem,2.5vw,1.125rem)]">
              <p>In the subject line, please write your name, first name, and date of birth so we can assign your order. Then, simply list the required medications in the e-mail, preferably as they are written on the original packaging.</p>
              <div>
                  <p>For example:</p>
                  <pre className="mt-2 rounded-md bg-muted p-4 font-code text-[clamp(0.8rem,2vw,1rem)] text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
              </div>
              
              <p>Alternatively, you can easily send photos of the packaging where the medication name is clearly visible.</p>
              
              <div className="space-y-2 rounded-md border border-border bg-card p-4 text-card-foreground">
                  <h5 className="font-bold text-primary">Data Protection Notice</h5>
                  <p className="text-[clamp(0.8rem,2vw,1rem)]">E-mails are transmitted unencrypted on the internet and pass through several servers and intermediate stations. This means that anyone with sufficient technical knowledge who has access to these stations can read the content of the e-mails. An e-mail is therefore more like a postcard than a sealed letter. Please consider this when choosing this ordering method. If you have concerns about confidentiality and data protection, it is better to use the telephone order hotline.</p>
              </div>
          </div>
      </div>
  );
  
   const MobileEmailCardContent = () => (
      <>
          <div className="space-y-6 text-lg">
              <p>You can also conveniently order your medications by e-mail.</p>
              <p>In the subject line, please write your name, first name, and date of birth so we can assign your order. Then, simply list the required medications in the e-mail, preferably as they are written on the original packaging.</p>
              <ObfuscatedLink
                user="medikamente"
                domain="praxiszentrum-im-ring.ch"
                className="my-4 flex items-center justify-start gap-4 text-2xl font-bold transition-colors hover:text-primary-foreground/80 md:text-3xl lg:text-4xl"
            >
                <Mail className="h-8 w-8 flex-shrink-0 md:h-10 md:w-10" />
                <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
            </ObfuscatedLink>
              <div>
                  <p>For example:</p>
                  <pre className="mt-2 rounded-md bg-muted p-4 font-code text-base text-muted-foreground">ATORVASTATIN Mepha Lactab 40 mg</pre>
              </div>
              
              <p>Alternatively, you can easily send photos of the packaging where the medication name is clearly visible.</p>
              
              <div className="space-y-2 rounded-md border border-border bg-card p-4 text-card-foreground">
                  <h5 className="font-bold text-primary">Data Protection Notice</h5>
                  <p className="text-base">E-mails are transmitted unencrypted on the internet and pass through several servers and intermediate stations. This means that anyone with sufficient technical knowledge who has access to these stations can read the content of the e-mails. An e-mail is therefore more like a postcard than a sealed letter. Please consider this when choosing this ordering method. If you have concerns about confidentiality and data protection, it is better to use the telephone order hotline.</p>
              </div>
          </div>
      </>
  );

  return (
    <PageLayout>
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  MEDICATION
              </h2>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src="/images/foto-medis.jpg"
                      alt="Various medication boxes"
                      data-ai-hint="medication boxes"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="font-headline text-2xl font-bold text-primary">Your medication directly from your family doctor</h3>
                    <p className="text-lg text-foreground/80">
                      As a patient, you can conveniently obtain all your medications from us. This not only saves you money, but also gives you the certainty that you are only receiving and taking the medications you actually need. Every time a medication is dispensed, it is checked against the medications stored in your medical record.
                    </p>
                    <p className="text-lg text-foreground/80">
                      To make obtaining your medications as easy as possible, we offer you the option to pre-order them.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-16 max-w-7xl text-center">
            <h3 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              How to easily order your medication
            </h3>
          </div>

          <div className="mx-auto mt-12 max-w-7xl">
            {/* Desktop View: Tabs */}
            <div className="hidden sm:block">
              <Tabs defaultValue="phone" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-lg bg-transparent p-0 shadow-2xl">
                      <TabsTrigger
                          value="phone"
                          className="group/phone flex h-auto w-full flex-col items-center justify-center gap-2 rounded-b-none bg-gradient-start p-6 text-primary-foreground"
                      >
                           <span className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold">Pre-order by Phone</span>
                           <div className="flex items-center gap-3 text-[clamp(0.8rem,2vw,1rem)]">
                              <Phone className="h-6 w-6"/>
                              <span>031 316 26 66</span>
                          </div>
                      </TabsTrigger>
                       <TabsTrigger
                          value="email"
                          className="group/email flex h-auto w-full flex-col items-center justify-center gap-2 rounded-b-none bg-secondary p-6 text-primary-foreground"
                      >
                          <span className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold">Pre-order by E-Mail</span>
                          <div className="flex items-center gap-3 text-[clamp(0.8rem,2vw,1rem)]">
                              <Mail className="h-6 w-6"/>
                              <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
                          </div>
                      </TabsTrigger>
                  </TabsList>
                <TabsContent value="phone" className="-mt-px">
                   <Card className="rounded-t-none bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground shadow-2xl">
                      <CardContent className="p-6 md:p-8">
                           <PhoneCardContent />
                      </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="email" className="-mt-px">
                  <Card className="rounded-t-none bg-gradient-to-b from-secondary to-accent text-primary-foreground shadow-2xl">
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
                            <span>Pre-order by Phone</span>
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
                            <span>Pre-order by E-Mail</span>
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
                  <h3 className="font-headline text-2xl font-bold text-primary">Picking up your ordered medication</h3>
                  <p>Your medications will usually be ready for collection at the Praxiszentrum im Ring no later than two working days after your order.</p>
                  <p>To minimize waiting times and disruptions to our consultation hours, we kindly ask you to pre-order your medications whenever possible and pick them up at the following times:</p>
                  <ul className="space-y-2 text-foreground">
                    <li>Monday 10 AM - 12 PM</li>
                    <li>Tuesday 3 PM - 5 PM</li>
                    <li>Wednesday 10 AM - 12 PM</li>
                    <li>Thursday 3 PM - 5 PM</li>
                    <li>Friday 10 AM - 12 PM</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
    </PageLayout>
  );
}
