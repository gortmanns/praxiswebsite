import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo und Info */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="http://www.praxiszentrum-im-ring.ch/images/headers/logo-neu-weiss.png"
                alt="Praxiszentrum im Ring Logo"
                width={300}
                height={60}
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-sm text-background/80">
              Ihr Gesundheitszentrum in Hinterkappelen.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Navigation</h3>
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

          {/* Kontakt */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase text-primary">Kontakt</h3>
            <div className="space-y-2 text-sm text-background/80">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-background">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <div className='flex flex-col'>
                    <span>PRAXISZENTRUM IM RING</span>
                    <span>Kappelenring 6</span>
                    <span>3023 Hinterkappelen</span>
                </div>
              </a>
              <p className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" />
                <a
                  href="tel:0313162600"
                  className="transition-colors hover:text-background"
                >
                  031 316 26 00
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" />
                <a
                  href="mailto:empfang@praxiszentrum-im-ring.ch"
                  className="break-all transition-colors hover:text-background"
                >
                  empfang@praxiszentrum-im-ring.ch
                </a>
              </p>
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
