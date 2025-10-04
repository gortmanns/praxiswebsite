
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPaletteDemo } from '../_components/color-palette-demo';
import { cn } from '@/lib/utils';
import { DoorOpen, Phone } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const openingHours = [
    { day: "Montag", morning: "08:00 - 12:00", afternoon: "14:00 - 18:00" },
    { day: "Dienstag", morning: "08:00 - 12:00", afternoon: "14:00 - 18:00" },
    { day: "Mittwoch", morning: "08:00 - 12:00", afternoon: "geschlossen" },
    { day: "Donnerstag", morning: "08:00 - 12:00", afternoon: "14:00 - 18:00" },
    { day: "Freitag", morning: "08:00 - 12:00", afternoon: "13:00 - 17:00" },
];

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
            </div>

            <div className="mx-auto mt-16">
                <Tabs defaultValue="oeffnungszeiten" className="w-full">
                    <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg bg-transparent p-0">
                        <TabsTrigger 
                            value="oeffnungszeiten" 
                            className={cn(
                                'flex items-center justify-center gap-3 h-14 rounded-l-lg rounded-r-none border-b-2 border-transparent text-xl font-bold text-secondary-foreground transition-colors data-[state=inactive]:bg-secondary data-[state=inactive]:hover:bg-secondary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg'
                            )}
                        >
                            <DoorOpen className="h-6 w-6"/>
                            Öffnungszeiten
                        </TabsTrigger>
                        <TabsTrigger 
                            value="telefonzeiten"
                            className={cn(
                                'flex items-center justify-center gap-3 h-14 rounded-r-lg rounded-l-none border-b-2 border-transparent text-xl font-bold text-secondary-foreground transition-colors data-[state=inactive]:bg-secondary data-[state=inactive]:hover:bg-secondary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg'
                            )}
                        >
                            <Phone className="h-6 w-6"/>
                            Telefonzeiten
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="oeffnungszeiten">
                        <Card className="rounded-t-none">
                            <CardContent className="p-6 text-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[150px] text-base">Wochentag</TableHead>
                                        <TableHead className="text-base">Vormittag</TableHead>
                                        <TableHead className="text-base">Nachmittag</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {openingHours.map((item) => (
                                        <TableRow key={item.day}>
                                            <TableCell className="font-medium">{item.day}</TableCell>
                                            <TableCell>{item.morning}</TableCell>
                                            <TableCell>{item.afternoon}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="telefonzeiten">
                        <Card className="rounded-t-none">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground">Der Inhalt für die Telefonzeiten wird hier in Kürze verfügbar sein.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
        <ColorPaletteDemo />
      </main>
      <Footer />
    </div>
  );
}
