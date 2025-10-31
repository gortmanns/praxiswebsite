
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EmergencyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="w-full px-4 py-16 sm:px-8 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-headline text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">EMERGENCY NUMBERS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-foreground/80">
              <div className="space-y-16">
                
                <div className="border border-destructive p-6">
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <div className="mx-auto w-full max-w-lg">
                      <Image
                        src="/images/rtw-bern.jpg"
                        alt="Ambulance"
                        data-ai-hint="ambulance"
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    <div className="space-y-4 text-left">
                      <p className="text-xl lg:text-2xl xl:text-3xl text-foreground">
                        In a life-threatening emergency, please immediately alert the ambulance service at the number
                      </p>
                      <div className="text-6xl lg:text-8xl xl:text-9xl">
                        <a href="tel:144" className="flex items-center gap-3 font-bold text-destructive transition-colors hover:text-destructive/80">
                            <Phone className="h-24 w-24 flex-shrink-0 lg:h-32 lg:w-32 xl:h-40 xl:w-40" />
                            <strong>144</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border p-6">
                  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div className='mx-auto w-full max-w-lg'>
                      <Image
                        src="/images/medphone_logo.png"
                        alt="Medphone Logo"
                        data-ai-hint="medphone logo"
                        width={780}
                        height={183}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="space-y-4 text-left">
                        <p className='text-xl lg:text-2xl xl:text-3xl'>Outside of opening hours, if there is no life-threatening emergency, you can get medical advice from the Medphone hotline:</p>
                        <div className='space-y-8 text-2xl lg:text-3xl xl:text-5xl'>
                            <div className='flex flex-col items-start'>
                                <a href="tel:0900576747" className='flex items-center gap-3'><Phone className='h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 47</strong></a>
                                <span className='text-lg lg:text-xl xl:text-2xl pl-12 lg:pl-14 xl:pl-16'>(3.23 CHF / min) not available via prepaid mobile</span>
                            </div>
                            <div className='flex flex-col items-start'>
                                <a href="tel:0900576748" className='flex items-center gap-3'><Phone className='h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 48</strong></a>
                                <span className='text-lg lg:text-xl xl:text-2xl pl-12 lg:pl-14 xl:pl-16'>(3.50 CHF / min) for calls via prepaid mobile</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border p-6">
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <div className="mx-auto w-full max-w-lg">
                      <Link href="https://www.toxinfo.ch/" target="_blank" rel="noopener noreferrer">
                        <Image
                          src="/images/toxinfo-logo.svg"
                          alt="Tox Info Suisse Logo"
                          data-ai-hint="toxinfo logo"
                          width={464}
                          height={121}
                          className="h-auto w-full"
                        />
                      </Link>
                    </div>
                    <div className="space-y-4 text-left">
                      <p className="text-xl lg:text-2xl xl:text-3xl text-foreground">
                        In case of poisoning - but only if the patient is awake, responsive and not in acute danger - you can reach the poison emergency hotline at
                      </p>
                      <div className="text-2xl lg:text-3xl xl:text-5xl">
                          <a href="tel:145" className="flex items-center gap-3 font-bold">
                              <Phone className="h-8 w-8 flex-shrink-0 lg:h-10 lg:w-10 xl:h-12 xl:w-12" />
                              <strong>145</strong>
                          </a>
                      </div>
                    </div>
                  </div>
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
