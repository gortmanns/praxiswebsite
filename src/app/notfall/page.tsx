import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
              <CardTitle className="text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">NOTFALL-RUFNUMMERN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-foreground/80">
              <div className="space-y-16">
                
                <div className="rounded-lg border border-destructive p-6">
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    {ambulanceImage && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image
                          src={ambulanceImage.imageUrl}
                          alt={ambulanceImage.description}
                          fill
                          className="object-contain"
                          data-ai-hint={ambulanceImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="space-y-4 text-center">
                      <p className="text-xl text-foreground">
                        Bei einem lebensbedrohlichen Notfall alarmieren Sie bitte unverzüglich den Rettungsdienst unter der Rufnummer
                      </p>
                      <a href="tel:144" className="inline-flex w-full justify-center items-center gap-2 text-7xl font-bold text-destructive transition-colors hover:text-destructive/80">
                        <Phone className="h-14 w-14" />
                        144
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    {medphoneImage && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image
                          src={medphoneImage.imageUrl}
                          alt={medphoneImage.description}
                          fill
                          className="object-contain"
                          data-ai-hint={medphoneImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                        <p className='text-xl'>Ausserhalb der Öffnungszeiten, ohne dass ein lebensbedrohlicher Notfall vorliegt, erhalten Sie medizinischen Rat durch die Hotline von Medphone:</p>
                        <div className='space-y-4 text-xl'>
                            <p className='flex items-center gap-3'><Phone className='h-6 w-6 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 47</strong> (3.23 CHF / min) nicht über Prepaid Handy</p>
                            <p className='flex items-center gap-3'><Phone className='h-6 w-6 flex-shrink-0' /><strong className='font-bold'>0900 - 57 67 48</strong> (3.50 CHF / min) für Anruf über Prepaid Handy</p>
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
