import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Kontakt aufnehmen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Haben Sie eine Frage oder möchten Sie einen Termin buchen? Senden Sie uns eine Nachricht.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <h3 className="font-headline text-xl font-bold">Praxis Online</h3>
            <p className="mt-2 text-muted-foreground">
              Wir freuen uns auf Ihre Kontaktaufnahme.
            </p>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p><strong>Adresse:</strong><br />Musterstrasse 1<br />8000 Zürich</p>
              <p><strong>Telefon:</strong><br />+41 44 123 45 67</p>
              <p><strong>Email:</strong><br />info@praxisonline.ch</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Nachricht Senden</CardTitle>
                <CardDescription>Wir werden uns in Kürze bei Ihnen melden.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Ihr Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="ihre@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input id="subject" placeholder="Terminanfrage" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea id="message" placeholder="Ihre Nachricht..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full">Nachricht Senden</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
