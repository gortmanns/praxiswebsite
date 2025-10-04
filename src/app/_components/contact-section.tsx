import { Phone, Mail, MapPin, ShieldCheck, Printer } from "lucide-react";

export function ContactSection() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Praxiszentrum+im+Ring,+Kappelenring+6,+3023+Hinterkappelen";
  return (
    <section id="contact" className="py-16 sm:py-24 bg-muted/50">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Kontakt aufnehmen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wir freuen uns auf Ihre Kontaktaufnahme per Telefon oder E-Mail.
          </p>
        </div>
        <div className="mx-auto max-w-lg text-center">
            <h3 className="font-headline text-xl font-bold">Praxiszentrum im Ring</h3>
            <p className="mt-2 text-muted-foreground">
              Ihr Gesundheitszentrum in Hinterkappelen.
            </p>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 transition-colors hover:text-primary">
                <MapPin size={16} />
                <div className="flex flex-col">
                    <span>PRAXISZENTRUM IM RING</span>
                    <span>Kappelenring 6</span>
                    <span>3023 Hinterkappelen</span>
                </div>
              </a>
              <p className="flex items-center justify-center gap-2">
                <Phone size={16} />
                <a href="tel:0313162600" className="hover:text-primary">031 316 26 00</a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Printer size={16} />
                <span>Fax: 031 589 68 60</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail size={16} />
                <a href="mailto:empfang@praxiszentrum-im-ring.ch" className="hover:text-primary">empfang@praxiszentrum-im-ring.ch</a>
              </p>
               <div className="flex flex-col items-center justify-center gap-2 text-center">
                <p className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary flex-shrink-0"/>
                    <span>HIN-Adresse: <a href="mailto:praxiszentrum-im-ring@hin.ch" className="hover:text-primary">praxiszentrum-im-ring@hin.ch</a></span>
                </p>
                <p className="text-xs text-muted-foreground/80">(Für die sichere Übermittlung medizinischer Unterlagen)</p>
              </div>
               <p className="flex items-center justify-center gap-2 pt-2 text-foreground">
                <Phone size={16} className="text-primary"/>
                <strong>Medikamenten-Hotline: <a href="tel:0313162666" className="hover:text-primary">031 316 26 66</a></strong>
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
