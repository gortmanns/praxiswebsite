'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
    </svg>
);


export function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutzerklaerung', label: 'Datenschutzerklärung' },
  ];

  return (
    <header className="w-full border-b bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-end gap-6 text-sm">
          <a
            href="tel:0313162600"
            className="flex items-center gap-2 font-medium text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
          >
            <PhoneIcon className="h-[21px] w-[21px]" />
            <span>031 316 26 00</span>
          </a>
          <a
            href="mailto:empfang@praxiszentrum-im-ring.ch"
            className="flex items-center gap-2 font-medium text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
          >
            <MailIcon className="h-[21px] w-[21px]" />
            <span>empfang@praxiszentrum-im-ring.ch</span>
          </a>
           <div className="flex items-center gap-2 font-medium text-sm text-primary-foreground">
            <PrinterIcon className="h-[21px] w-[21px]" />
            <span>Fax: 031 589 68 60</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="flex h-28 items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <nav className="hidden md:flex md:items-center md:space-x-4">
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
                    href="tel:0313162600"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                    <PhoneIcon className="h-[21px] w-[21px]" />
                    <span>031 316 26 00</span>
                </a>
                <a
                    href="mailto:empfang@praxiszentrum-im-ring.ch"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                    <MailIcon className="h-[21px] w-[21px]" />
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
    </header>
  );
}
