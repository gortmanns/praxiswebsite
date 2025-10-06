'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ObfuscatedLink } from '@/components/ui/obfuscated-link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useState, useRef, useEffect } from 'react';

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

const useSlidingIndicator = () => {
    const navRef = useRef<HTMLElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const updateIndicator = (target: HTMLElement) => {
        if (!navRef.current || !indicatorRef.current) return;
        const navRect = navRef.current.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        indicatorRef.current.style.width = `${targetRect.width}px`;
        indicatorRef.current.style.height = `${targetRect.height}px`;
        indicatorRef.current.style.left = `${targetRect.left - navRect.left}px`;
        indicatorRef.current.style.opacity = '1';
    };

    const hideIndicator = () => {
        if (!indicatorRef.current) return;
        indicatorRef.current.style.opacity = '0';
    };

    return { navRef, indicatorRef, updateIndicator, hideIndicator };
};


export function Header() {
  const pathname = usePathname();
  const { navRef, indicatorRef, updateIndicator, hideIndicator } = useSlidingIndicator();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const navLinks = [
    { href: '/', label: 'Startseite' },
    { href: '/team', label: 'Team' },
    { href: '/leistungen', label: 'Leistungen' },
    { href: '/medikamente', label: 'Medikamente' },
    { href: '/oeffnungszeiten', label: 'Zeiten' },
    { href: '/notfall', label: 'NOTFALL' },
  ];

  const mainNavLinks = navLinks.filter(l => !['/oeffnungszeiten', '/notfall'].includes(l.href));
  const notfallLink = navLinks.find(l => l.href === '/notfall');


  const zeitenLinks = [
    { href: '/oeffnungszeiten', label: 'Öffnungs- & Telefonzeiten' },
    { href: '/praxisferien', label: 'Praxisferien' }
  ];

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>(`[data-active="true"]`);
    if (activeLink) {
        setTimeout(() => {
            if (indicatorRef.current) {
                indicatorRef.current.style.transition = 'width 0.3s, height 0.3s, left 0.3s, opacity 0.3s';
            }
            setIsInitialLoad(false);
        }, 100);
        updateIndicator(activeLink);
    } else {
        hideIndicator();
    }
}, [pathname, updateIndicator, hideIndicator]);


  return (
    <header className="w-full border-b bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="w-full px-8">
            <div className="flex h-10 items-center justify-end">
                <div className="flex items-center gap-6 text-sm">
                    <a
                    href="tel:0313162600"
                    className="flex items-center gap-2 font-medium text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
                    >
                    <PhoneIcon className="h-[21px] w-[21px]" />
                    <span>031 316 26 00</span>
                    </a>
                    <div className="flex items-center gap-2 font-medium text-sm text-primary-foreground">
                    <PrinterIcon className="h-[21px] w-[21px]" />
                    <span>031 589 68 60</span>
                    </div>
                    <ObfuscatedLink
                    user="empfang"
                    domain="praxiszentrum-im-ring.ch"
                    className="flex items-center gap-2 font-medium text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80"
                    >
                    <MailIcon className="h-[21px] w-[21px]" />
                    <span>empfang@praxiszentrum-im-ring.ch</span>
                    </ObfuscatedLink>
                </div>
            </div>
        </div>
      </div>

      <div className="flex h-[130px] items-center justify-between px-8">
        <Link href="/">
              <Image
                src="/images/praxiszentrum-logo.png"
                alt="Praxiszentrum im Ring Logo"
                data-ai-hint="practice logo"
                width={1314}
                height={266}
                className="h-auto w-auto max-w-[322px] md:max-w-[552px]"
                priority
              />
        </Link>

        <nav ref={navRef} className="relative hidden md:flex md:items-center md:space-x-4" onMouseLeave={() => {
            const activeLink = navRef.current?.querySelector<HTMLElement>(`[data-active="true"]`);
            if (activeLink) {
                updateIndicator(activeLink);
            } else {
                hideIndicator();
            }
        }}>
            <div ref={indicatorRef} className="nav-link-indicator bg-accent" style={{ opacity: 0, transition: isInitialLoad ? 'none' : 'width 0.3s, height 0.3s, left 0.3s, opacity 0.3s' }} />
            {mainNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                    data-active={isActive}
                    className={cn(
                      'relative z-10 whitespace-nowrap rounded-md px-3 py-2 text-lg font-bold transition-colors',
                      'text-muted-foreground hover:text-primary',
                      isActive && 'text-primary-foreground'
                      )}
                >
                    {isActive && <div className="absolute inset-0 -z-10 rounded-md bg-primary" />}
                    {link.label}
                </Link>
                );
            })}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div 
                      onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                      data-active={pathname === '/oeffnungszeiten' || pathname === '/praxisferien'}
                      className={cn(
                        'relative z-10 flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-lg font-bold transition-colors',
                        'text-muted-foreground hover:text-primary',
                        (pathname === '/oeffnungszeiten' || pathname === '/praxisferien') && 'text-primary-foreground'
                    )}>
                       {(pathname === '/oeffnungszeiten' || pathname === '/praxisferien') && <div className="bg-primary -z-10 absolute inset-0 rounded-md" />}
                        Zeiten <ChevronDown className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent onMouseLeave={() => {
                     const activeLink = navRef.current?.querySelector<HTMLElement>(`[data-active="true"]`);
                     if (activeLink) {
                         updateIndicator(activeLink);
                     } else {
                         hideIndicator();
                     }
                }}>
                    {zeitenLinks.map(link => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {notfallLink && (
                 <Link
                 key={notfallLink.href}
                 href={notfallLink.href}
                 onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                 data-active={pathname === notfallLink.href}
                 className={cn(
                  'relative z-10 whitespace-nowrap rounded-md px-3 py-2 text-lg font-bold transition-colors',
                 'text-muted-foreground hover:text-primary',
                 notfallLink.label === 'NOTFALL' ? 'uppercase' : '',
                 pathname === notfallLink.href && 'text-primary-foreground'
                 )}
             >
                 {pathname === notfallLink.href && <div className="bg-primary -z-10 absolute inset-0 rounded-md" />}
                 {notfallLink.label}
             </Link>
            )}
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
                      src="/images/praxiszentrum-logo.png"
                      alt="Praxiszentrum im Ring Logo"
                      data-ai-hint="practice logo"
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
                <ObfuscatedLink
                    user="empfang"
                    domain="praxiszentrum-im-ring.ch"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                    <MailIcon className="h-[21px] w-[21px]" />
                    <span>empfang@praxiszentrum-im-ring.ch</span>
                </ObfuscatedLink>
                </div>
                <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    if (link.href === '/oeffnungszeiten') {
                        return (
                            <div key={link.href}>
                                <h3 className={cn(
                                    'rounded-md px-3 py-2 text-lg font-bold',
                                    (isActive || pathname === '/praxisferien') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                                )}>
                                    Zeiten
                                </h3>
                                <div className="flex flex-col space-y-2 pl-6 pt-2">
                                    {zeitenLinks.map(subLink => (
                                        <Link
                                            key={subLink.href}
                                            href={subLink.href}
                                            className="rounded-md px-3 py-2 text-base font-bold text-muted-foreground hover:text-primary"
                                        >
                                            {subLink.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    if (link.href === '/notfall' || link.href === '/team' || link.href === '/' || link.href === '/leistungen' || link.href === '/medikamente') {
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
                    }
                    return null;
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
