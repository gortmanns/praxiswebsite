import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function NotfallPage() {
  const ambulanceImage = PlaceHolderImages.find((p) => p.id === 'rettungswagen');
  const medphoneImage = PlaceHolderImages.find((p) => p.id === 'medphone-logo');
  
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
                      {ambulanceImage && (
                        <Image
                          src={ambulanceImage.imageUrl}
                          alt={ambulanceImage.description}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-cover"
                          data-ai-hint={ambulanceImage.imageHint}
                        />
                      )}
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

                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <div className='mx-auto w-full max-w-lg'>
                    {medphoneImage && (
                      <Link href="https://www.medphone.ch/home" target="_blank" rel="noopener noreferrer">
                        <Image
                            src={medphoneImage.imageUrl}
                            alt={medphoneImage.description}
                            width={1200}
                            height={349}
                            className="w-full h-auto"
                            data-ai-hint={medphoneImage.imageHint}
                          />
                      </Link>
                    )}
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


                <div className="space-y-4 rounded-lg border border-border p-6">
                  <h4 className="font-bold text-lg text-foreground">Bei Vergiftungen</h4>
                  <p>
                    Bei Verdacht auf eine Vergiftung erhalten Sie beim Tox Info Suisse rund um die Uhr fachkundige Auskunft.
                  </p>
                  <a href="tel:145" className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                    Tox Info Suisse: 145
                  </a>
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
