import Link from 'next/link';
import Image from 'next/image';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';

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

const HinMailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
    </svg>
);

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
    </svg>
);


export function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutzerklaerung', label: 'Datenschutzerklärung' },
  ];
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Praxiszentrum+im+Ring,+Kappelenring+6,+3023+Hinterkappelen";

  return (
    <footer className="bg-accent text-background/80">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Rechtliches */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Rechtliches</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Anschrift */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Anschrift</h3>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm transition-colors hover:text-background">
                <MapPinIcon className="mt-1 h-[21px] w-[21px] flex-shrink-0" />
                <div className="flex flex-col">
                    <span>PRAXISZENTRUM IM RING</span>
                    <span>Kappelenring 6</span>
                    <span>3023 Hinterkappelen</span>
                </div>
            </a>
          </div>

          {/* Kontakt */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Kontakt</h3>
            <div className="space-y-2 text-sm">
                <a
                  href="tel:0313162600"
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                    <PhoneIcon className="h-[21px] w-[21px] flex-shrink-0" />
                    <span>031 316 26 00</span>
                </a>
                <p className="flex items-center gap-3">
                    <PrinterIcon className="h-[21px] w-[21px] flex-shrink-0" />
                    <span>031 589 68 60</span>
                </p>
                <ObfuscatedLink
                  user="empfang"
                  domain="praxiszentrum-im-ring.ch"
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                  <MailIcon className="h-[21px] w-[21px] flex-shrink-0" />
                  <span className="break-all">empfang@praxiszentrum-im-ring.ch</span>
                </ObfuscatedLink>
                <div className="flex flex-col items-start gap-1">
                    <ObfuscatedLink
                      user="praxiszentrum-im-ring"
                      domain="hin.ch"
                      className="flex items-center gap-3 transition-colors hover:text-background"
                    >
                      <HinMailIcon className="h-[21px] w-[21px] text-primary flex-shrink-0"/>
                      <span className="break-all">praxiszentrum-im-ring@hin.ch</span>
                    </ObfuscatedLink>
                    <p className="pl-9 text-xs text-background/70">(Für die sichere Übermittlung medizinischer Unterlagen)</p>
                </div>
            </div>
          </div>
           {/* Medikamente */}
           <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Medikamentenbestellung</h3>
            <div className="space-y-2 text-sm">
                <a
                  href="tel:0313162666"
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                    <PhoneIcon className="h-[21px] w-[21px] flex-shrink-0" />
                    <span>031 316 26 66</span>
                </a>
                <ObfuscatedLink
                  user="medikamente"
                  domain="praxiszentrum-im-ring.ch"
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                  <MailIcon className="h-[21px] w-[21px] flex-shrink-0" />
                  <span className="break-all">medikamente@praxiszentrum-im-ring.ch</span>
                </ObfuscatedLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-foreground/10">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-sm text-background/70">
            &copy; {year} Praxiszentrum im Ring. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
