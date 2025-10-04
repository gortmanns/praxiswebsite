import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotfallPage() {
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="w-full px-4 py-16 sm:px-8 sm:py-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-headline text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">NOTFALL-RUFNUMMERN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-foreground/80">
              <div className="space-y-16">
                
                <div className="rounded-lg border border-destructive p-6">
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <div className="mx-auto w-full max-w-lg">
                      <Image
                        src="http://www.praxiszentrum-im-ring.ch//images/2024/10/13/rtw-bern.jpg"
                        alt="Ambulanz"
                        width={1200}
                        height={800}
                        className="h-auto w-full object-cover"
                        data-ai-hint="ambulance"
                      />
                    </div>
                    <div className="space-y-4 text-center">
                      <p className="text-2xl lg:text-3xl xl:text-5xl text-foreground">
                        Bei einem lebensbedrohlichen Notfall alarmieren Sie bitte unverzüglich den Rettungsdienst unter der Rufnummer
                      </p>
                      <a href="tel:144" className="inline-flex w-full justify-center items-center gap-2 text-6xl lg:text-7xl xl:text-9xl font-bold text-destructive transition-colors hover:text-destructive/80">
                        <Phone className="h-16 w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
                        144
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-6">
                  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div className='mx-auto w-full max-w-lg'>
                      <Link href="https://www.medphone.ch/home" target="_blank" rel="noopener noreferrer">
                        <Image
                          src="http://www.praxiszentrum-im-ring.ch//images/2024/10/13/medphone_logo.png"
                          alt="Medphone Logo"
                          width={1024}
                          height={241}
                          className="h-auto w-full"
                          data-ai-hint="logo"
                        />
                      </Link>
                    </div>
                    <div className="space-y-4">
                        <p className='text-2xl lg:text-3xl xl:text-5xl'>Ausserhalb der Öffnungszeiten, ohne dass ein lebensbedrohlicher Notfall vorliegt, erhalten Sie medizinischen Rat durch die Hotline von Medphone:</p>
                        <div className='space-y-8 text-2xl lg:text-3xl xl:text-5xl'>
                            <div className='flex flex-col'>
                                <a href="tel:0900576747" className='flex items-center gap-3'><Phone className='h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 47</strong></a>
                                <span className='text-lg lg:text-xl xl:text-2xl pl-12 lg:pl-14 xl:pl-16'>(3.23 CHF / min) nicht über Prepaid Handy</span>
                            </div>
                            <div className='flex flex-col'>
                                <a href="tel:0900576748" className='flex items-center gap-3'><Phone className='h-8 w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 48</strong></a>
                                <span className='text-lg lg:text-xl xl:text-2xl pl-12 lg:pl-14 xl:pl-16'>(3.50 CHF / min) für Anruf über Prepaid Handy</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-6">
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <div className="mx-auto w-full max-w-lg">
                      <Image
                        src="https://www.toxinfo.ch/customer/layout/images/logo.svg"
                        alt="Tox Info Suisse Logo"
                        width={300}
                        height={100}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="space-y-4 text-center">
                      <p className="text-2xl lg:text-3xl xl:text-5xl text-foreground">
                        Bei Vergiftungen - aber nur wenn der Patient wach und ansprechbar und nicht in akuter Lebensgefahr ist - erreichen Sie den Vergiftungsnotruf unter der Nummer
                      </p>
                      <a href="tel:145" className="inline-flex w-full justify-center items-center gap-2 text-6xl lg:text-7xl xl:text-9xl font-bold text-primary transition-colors hover:text-primary/80">
                        <Phone className="h-16 w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
                        145
                      </a>
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
