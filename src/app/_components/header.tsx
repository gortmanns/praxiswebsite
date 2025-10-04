import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const navLinks = [
    { href: '#symptoms', label: 'Symptom-Check' },
    { href: '#team', label: 'Unser Team' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="http://www.praxiszentrum-im-ring.ch/images/headers/logo-neu.png"
              alt="Praxiszentrum im Ring Logo"
              width={220}
              height={45}
              className="h-auto"
              priority
            />
          </Link>
        </div>
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
              <nav className="flex flex-col space-y-4 pt-8">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
