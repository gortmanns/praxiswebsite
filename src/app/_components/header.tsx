import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Mail, Menu, Phone } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const navLinks = [
    { href: '/', label: 'Startseite' },
    { href: '/team', label: 'Team' },
    { href: '/leistungen', label: 'Leistungen' },
    { href: '/medikamente', label: 'Medikamente' },
    { href: '/notfall', label: 'NOTFALL' },
  ];

  return (
    <header className="w-full border-b bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-10 items-center justify-end gap-6 px-4 text-sm">
          <a href="tel:+41313162600" className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80">
            <Phone size={16} />
            <span>+41 31 316 26 00</span>
          </a>
          <a href="mailto:empfang@praxiszentrum-im-ring.ch" className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80">
            <Mail size={16} />
            <span>empfang@praxiszentrum-im-ring.ch</span>
          </a>
        </div>
      </div>
      
      {/* Main header with logo and navigation */}
      <div className="relative flex h-20 items-center justify-center">
        {/* Logo - Aligned Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-block">
            <Image
                src="http://www.praxiszentrum-im-ring.ch/images/headers/logo-neu.png"
                alt="Praxiszentrum im Ring Logo"
                width={520}
                height={105}
                className="h-auto w-auto max-w-[300px] md:max-w-[520px]"
                priority
            />
            </Link>
        </div>

        {/* Centered Navigation for Desktop */}
        <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="text-lg font-bold text-muted-foreground transition-colors hover:text-primary"
            >
                {link.label}
            </Link>
            ))}
        </nav>
        
        {/* Mobile Menu Trigger - Right-aligned */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 lg:pr-8">
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
                    <a href="tel:+41313162600" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                        <Phone size={16} />
                        <span>+41 31 316 26 00</span>
                    </a>
                    <a href="mailto:empfang@praxiszentrum-im-ring.ch" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                        <Mail size={16} />
                        <span>empfang@praxiszentrum-im-ring.ch</span>
                    </a>
                    </div>
                    <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-bold text-muted-foreground transition-colors hover:text-primary"
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
        </div>
    </header>
  );
}