import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Mail, Menu, Phone } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const navLinks = [
    { href: '#team', label: 'Unser Team' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-10 items-center justify-end gap-6 px-4 text-sm">
          <a href="tel:+41441234567" className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80">
            <Phone size={16} />
            <span>+41 44 123 45 67</span>
          </a>
          <a href="mailto:info@praxis-im-ring.ch" className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80">
            <Mail size={16} />
            <span>info@praxis-im-ring.ch</span>
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-20 items-center justify-between container">
          <Link href="/" className="flex items-center gap-2 -ml-4">
            <Image
              src="http://www.praxiszentrum-im-ring.ch/images/headers/logo-neu.png"
              alt="Praxiszentrum im Ring Logo"
              width={400}
              height={81}
              className="h-auto w-[400px]"
              priority
            />
          </Link>
          
          <div className="flex items-center">
            <nav className="hidden items-center space-x-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-4 hidden md:flex">
              <Button asChild>
                <Link href="#contact">Termin Buchen</Link>
              </Button>
            </div>
            <div className="ml-4 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menü öffnen</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="p-4">
                    <Link href="/" className="mb-8 block">
                       <Image
                        src="http://www.praxiszentrum-im-ring.ch/images/headers/logo-neu.png"
                        alt="Praxiszentrum im Ring Logo"
                        width={180}
                        height={37}
                        className="h-auto"
                      />
                    </Link>
                    <div className="mb-6 space-y-4 text-sm">
                      <a href="tel:+41441234567" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                        <Phone size={16} />
                        <span>+41 44 123 45 67</span>
                      </a>
                      <a href="mailto:info@praxis-im-ring.ch" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                        <Mail size={16} />
                        <span>info@praxis-im-ring.ch</span>
                      </a>
                    </div>
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <Button asChild className="mt-4">
                        <Link href="#contact">Termin Buchen</Link>
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
