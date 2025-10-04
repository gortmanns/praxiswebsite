import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

            <div className="mx-auto mt-16 max-w-4xl">
                <Tabs defaultValue="oeffnungszeiten" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="oeffnungszeiten">Praxis-Öffnungszeiten</TabsTrigger>
                        <TabsTrigger value="telefonzeiten">Telefonzeiten</TabsTrigger>
                    </TabsList>
                    <TabsContent value="oeffnungszeiten">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground">Der Inhalt für die Öffnungszeiten wird hier in Kürze verfügbar sein.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="telefonzeiten">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground">Der Inhalt für die Telefonzeiten wird hier in Kürze verfügbar sein.</p>
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
