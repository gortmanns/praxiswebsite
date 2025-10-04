import { ShieldCheck, Printer } from "lucide-react";

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.57c-2.83-1.35-5.21-3.72-6.56-6.56l1.57-1.57c.27-.27.35-.66.24-1.01-.37-1.11-.56-2.3-.56-3.53C8.6 3.7 8.01 3.1 7.28 3.1H4.24C3.51 3.1 3 3.6 2.92 4.32c-.12 1.45-.02 2.89.35 4.29 1.57 5.92 6.55 10.9 12.47 12.47 1.4.37 2.84.47 4.29.35.72-.08 1.22-.67 1.22-1.4v-3.05c0-.73-.6-1.32-1.32-1.32z"/>
    </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
);

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);


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
                <MapPinIcon className="h-[21px] w-[21px] flex-shrink-0" />
                <div className="flex flex-col text-left">
                    <span>PRAXISZENTRUM IM RING</span>
                    <span>Kappelenring 6</span>
                    <span>3023 Hinterkappelen</span>
                </div>
              </a>
              <p className="flex items-center justify-center gap-2">
                <PhoneIcon className="h-[21px] w-[21px]" />
                <a href="tel:0313162600" className="hover:text-primary">031 316 26 00</a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Printer size={21} />
                <span>Fax: 031 589 68 60</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <MailIcon className="h-[21px] w-[21px]" />
                <a href="mailto:empfang@praxiszentrum-im-ring.ch" className="hover:text-primary">empfang@praxiszentrum-im-ring.ch</a>
              </p>
               <div className="flex flex-col items-center justify-center gap-2 text-center">
                <p className="flex items-center gap-2">
                    <ShieldCheck size={21} className="text-primary flex-shrink-0"/>
                    <span>HIN-Adresse: <a href="mailto:praxiszentrum-im-ring@hin.ch" className="hover:text-primary">praxiszentrum-im-ring@hin.ch</a></span>
                </p>
                <p className="text-xs text-muted-foreground/80">(Für die sichere Übermittlung medizinischer Unterlagen)</p>
              </div>
               <p className="flex items-center justify-center gap-2 pt-2 text-foreground">
                <PhoneIcon className="h-[21px] w-[21px] text-primary"/>
                <strong>Medikamenten-Hotline: <a href="tel:0313162666" className="hover:text-primary">031 316 26 66</a></strong>
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
