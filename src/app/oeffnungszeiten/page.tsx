
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { DoorOpen, Phone } from 'lucide-react';
import { OpeningHoursCalendar } from './_components/opening-hours-calendar';
import { PhoneHoursCalendar } from './_components/phone-hours-calendar';

export default function OeffnungszeitenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    ÖFFNUNGS- & TELEFONZEITEN
                </h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Bitte beachten Sie, dass Öffnungszeiten und Telefonzeiten verschieden sind.
                </p>
            </div>

            <div className="mx-auto mt-16">
                <Tabs defaultValue="oeffnungszeiten" className="w-full">
                    <TabsList className="grid h-auto w-full grid-cols-2 p-0">
                        <TabsTrigger 
                            value="oeffnungszeiten" 
                            className={cn(
                                'flex h-14 items-center justify-center gap-3 rounded-t-lg rounded-b-none border-b-0 text-xl font-bold',
                                'data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:bg-secondary data-[state=inactive]:text-secondary-foreground data-[state=inactive]:hover:bg-secondary/80',
                                'data-[state=active]:bg-card data-[state=active]:text-primary'
                            )}
                        >
                            <DoorOpen className="h-6 w-6"/>
                            Öffnungszeiten
                        </TabsTrigger>
                        <TabsTrigger 
                            value="telefonzeiten"
                            className={cn(
                                'flex h-14 items-center justify-center gap-3 rounded-t-lg rounded-b-none border-b-0 text-xl font-bold',
                                'data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:bg-secondary data-[state=inactive]:text-secondary-foreground data-[state=inactive]:hover:bg-secondary/80',
                                'data-[state=active]:bg-card data-[state=active]:text-primary'
                            )}
                        >
                            <Phone className="h-6 w-6"/>
                            Telefonzeiten
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="oeffnungszeiten">
                        <Card className="rounded-t-none">
                            <CardContent className="space-y-6 p-6 text-lg">
                                <h3 className="text-center font-headline text-2xl font-bold tracking-tight text-primary">
                                    Unsere Öffnungszeiten
                                </h3>
                               <OpeningHoursCalendar />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="telefonzeiten">
                        <Card className="rounded-t-none">
                            <CardContent className="space-y-6 p-6 text-lg overflow-x-auto">
                                <h3 className="text-center font-headline text-2xl font-bold tracking-tight text-primary">
                                    Unsere Telefonzeiten
                                </h3>
                                <PhoneHoursCalendar />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
