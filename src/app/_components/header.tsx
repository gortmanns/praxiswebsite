'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Mail, Menu, Phone } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Startseite' },
    { href: '/zeiten', label: 'Zeiten' },
    { href: '/team', label: 'Team' },
    { href: '/leistungen', 'label': 'Leistungen' },
    { href: '/medikamente', 'label': 'Medikamente' },
    { href: '/notfall', label: 'NOTFALL' },
  ];

  return (
    <header className="w-full border-b bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-end gap-6 text-sm">
          <a
            href="tel:+41313162600"
            className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
          >
            <Phone size={16} />
            <span>+41 31 316 26 00</span>
          </a>
          <a
            href="mailto:empfang@praxiszentrum-im-ring.ch"
            className="flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
          >
            <Mail size={16} />
            <span>empfang@praxiszentrum-im-ring.ch</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-28 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0">
            <Link href="/">
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

            <nav className="hidden md:flex md:items-center md:justify-end md:space-x-4">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                    'whitespace-nowrap rounded-md px-3 py-2 text-lg font-bold transition-colors',
                    isActive
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'text-muted-foreground hover:text-primary',
                    link.label === 'NOTFALL' ? 'uppercase' : ''
                    )}
                >
                    {link.label}
                </Link>
                );
            })}
            </nav>

            <div className="flex items-center md:hidden">
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
                    <a
                        href="tel:+41313162600"
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                    >
                        <Phone size={16} />
                        <span>+41 31 316 26 00</span>
                    </a>
                    <a
                        href="mailto:empfang@praxiszentrum-im-ring.ch"
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                    >
                        <Mail size={16} />
                        <span>empfang@praxiszentrum-im-ring.ch</span>
                    </a>
                    </div>
                    <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                            'rounded-md px-3 py-2 text-lg font-bold transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-primary',
                            link.label === 'NOTFALL' ? 'uppercase' : ''
                            )}
                        >
                            {link.label}
                        </Link>
                        );
                    })}
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
