
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, ChevronDown, Plus, Globe } from 'lucide-react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeFlag, EnFlag } from '@/components/logos/flags';

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.57c-2.83-1.35-5.21-3.72-6.56-6.56l1.57-1.57c.27-.27.35-.66.24-1.01-.37-1.11-.56-2.3-.56-3.53C8.6 3.7 8.01 3.1 7.28 3.1H4.24C3.51 3.1 3 3.6 2.92 4.32c-.12 1.45-.02 2.89.35 4.29 1.57 5.92 6.55 10.9 12.47 12.47 1.4.37 2.84.47 4.29.35.72-.08 1.22-.67 1.22-1.4v-3.05c0-.73-.6-1.32-1.32-1.32z"/>
    </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor" {...props}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
);

const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor" {...props}>
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
    </svg>
);

const MobileNavLink = ({ href, title, isActive, isEmergency = false, setSheetOpen }: { href: string; title: string; isActive: boolean; isEmergency?: boolean; setSheetOpen: (open: boolean) => void; }) => {
    return (
        <Link
            href={href}
            onClick={() => setSheetOpen(false)}
            className={cn(
                'block rounded-md px-3 py-2 text-lg font-bold uppercase transition-colors',
                isEmergency
                    ? (isActive ? 'text-emergency-red ring-2 ring-emergency-red' : 'text-emergency-red/80 hover:text-emergency-red')
                    : (isActive ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary')
            )}
        >
            {title}
        </Link>
    );
};


export function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isEnglish = pathname.startsWith('/page-en');

  const mainNavLinks = [
    { href: isEnglish ? '/page-en' : '/', title: isEnglish ? 'Home' : 'Startseite' },
    { href: '/leistungen', title: isEnglish ? 'Services' : 'Leistungen' },
    { href: '/medikamente', title: isEnglish ? 'Medication' : 'Medikamente' },
  ];
  
  const ueberUnsLinks = [
    { href: '/team', title: 'Team' },
    { href: '/team/externe-dienstleister', title: isEnglish ? 'External Providers' : 'Externe Dienstleister' },
    { href: '/impressionen', title: isEnglish ? 'Impressions' : 'Impressionen' }
  ];
  
  const zeitenLinks = [
    { href: '/oeffnungszeiten', title: isEnglish ? 'Opening Hours' : 'Öffnungszeiten' },
    { href: '/telefonzeiten', title: isEnglish ? 'Phone Hours' : 'Telefonzeiten' },
    { href: '/praxisferien', title: isEnglish ? 'Practice Holidays' : 'Praxisferien' }
  ];
  
  const notfallLink = { href: '/notfall', title: isEnglish ? 'EMERGENCY' : 'NOTFALL' };

  const zeitenActive = pathname === '/oeffnungszeiten' || pathname === '/telefonzeiten' || pathname === '/praxisferien';
  const ueberUnsActive = pathname === '/team' || pathname === '/impressionen' || pathname === '/team/externe-dienstleister';


  const [indicatorStyle, setIndicatorStyle] = useState({});

  const updateIndicator = useCallback((element: HTMLElement | null) => {
    if (element && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();
        setIndicatorStyle({
            '--indicator-width': `${elemRect.width}px`,
            '--indicator-left': `${elemRect.left - navRect.left}px`,
        });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    updateIndicator(e.currentTarget);
  };
  
  const handleMouseLeave = useCallback(() => {
    setIndicatorStyle({});
  }, []);


  useEffect(() => {
    // No-op, just to ensure state is updated on path change
  }, [pathname]);
  
  return (
    <header className="w-full border-b bg-background">
      <div className="bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground">
        <div className="w-full px-4 sm:px-8">
            <div className="flex h-auto items-center justify-between py-2 md:h-10">
                <div className="flex items-center gap-3">
                    <Link href="/" title="Deutsch">
                        <DeFlag className="h-6 w-auto cursor-pointer rounded-sm border-2 border-transparent hover:border-primary-foreground" />
                    </Link>
                     <Link href="/page-en" title="English">
                        <EnFlag className="h-6 w-auto cursor-pointer rounded-sm border-2 border-transparent hover:border-primary-foreground" />
                    </Link>
                    <div className="border-l border-primary-foreground/50 h-6"></div>
                    <div className="flex items-center">
                        <Globe className="h-6 w-6 text-white mr-2" />
                        <div id="google_translate_element"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-sm md:flex-row md:gap-6">
                    <a
                    href="tel:0313162600"
                    className="flex items-center gap-2 font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80"
                    >
                    <PhoneIcon className="h-[21px] w-[21px]" />
                    <span>031 316 26 00</span>
                    </a>
                    <div className="hidden items-center gap-2 font-bold text-primary-foreground lg:flex">
                    <PrinterIcon className="h-[21px] w-[21px]" />
                    <span>031 589 68 60</span>
                    </div>
                    <ObfuscatedLink
                    user="empfang"
                    domain="praxiszentrum-im-ring.ch"
                    className="flex items-center gap-2 font-bold text-primary-foreground transition-colors hover:text-primary-foreground/80"
                    >
                    <MailIcon className="h-[21px] w-[21px]" />
                    <span className="break-all">empfang@praxiszentrum-im-ring.ch</span>
                    </ObfuscatedLink>
                </div>
            </div>
        </div>
      </div>

      <div className="flex h-[140px] items-center justify-between px-8">
        <Link href={isEnglish ? "/page-en" : "/"} className="min-w-[280px] max-w-[781px]">
              <Image
                src="/images/praxiszentrum-logo.png"
                alt="Praxiszentrum im Ring Logo"
                data-ai-hint="practice logo"
                width={1964}
                height={398}
                className="h-auto w-full"
                priority
              />
        </Link>

        <nav ref={navRef} className="relative hidden items-center xl:flex" onMouseLeave={handleMouseLeave}>
            <div className="nav-link-indicator bg-gradient-to-b from-secondary to-accent" style={indicatorStyle} />

            {mainNavLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={handleMouseEnter}
                    className={cn(
                        'relative z-10 flex h-14 items-center justify-center whitespace-nowrap rounded-md px-4 text-xl font-bold uppercase transition-colors',
                        pathname === link.href ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary-foreground'
                    )}
                >
                    {link.title}
                </Link>
            ))}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div 
                      onMouseEnter={handleMouseEnter}
                      className={cn(
                        'relative z-10 flex h-14 cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-4 text-xl font-bold uppercase transition-colors',
                        ueberUnsActive ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary-foreground'
                    )}>
                        <div className="flex items-center">
                            {isEnglish ? 'About Us' : 'Über uns'} <ChevronDown className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent onMouseLeave={handleMouseLeave}>
                    {ueberUnsLinks.map(link => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href} className="uppercase">{link.title}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div 
                      onMouseEnter={handleMouseEnter}
                      className={cn(
                        'relative z-10 flex h-14 cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-4 text-xl font-bold uppercase transition-colors',
                        zeitenActive ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary-foreground'
                    )}>
                        <div className="flex items-center">
                            {isEnglish ? 'Times' : 'Zeiten'} <ChevronDown className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent onMouseLeave={handleMouseLeave}>
                    {zeitenLinks.map(link => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href} className="uppercase">{link.title}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Link
                 key={notfallLink.href}
                 href={notfallLink.href}
                 onMouseEnter={handleMouseEnter}
                 className={cn(
                  'relative z-10 flex h-14 items-center justify-center whitespace-nowrap rounded-md px-4 text-xl font-bold uppercase transition-colors',
                  pathname === notfallLink.href ? 'ring-2 ring-emergency-red ring-offset-2 ring-offset-background' : 'text-emergency-red hover:text-emergency-red/80'
                 )}
             >
                 {notfallLink.title}
             </Link>
        </nav>

        <div className="flex items-center xl:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menü öffnen</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader className="sr-only">
                    <SheetTitle>Mobiles Menü</SheetTitle>
                    <SheetDescription>Hauptnavigation für mobile Geräte</SheetDescription>
                </SheetHeader>
            <div className="p-4">
                <Link href={isEnglish ? "/page-en" : "/"} className="mb-8 block max-w-[781px]">
                    <Image
                      src="/images/praxiszentrum-logo.png"
                      alt="Praxiszentrum im Ring Logo"
                      data-ai-hint="practice logo"
                      width={234}
                      height={48}
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
                <nav className="flex flex-col space-y-2">
                    {mainNavLinks.map((link) => (
                        <MobileNavLink key={link.href} {...link} isActive={pathname === link.href} setSheetOpen={setSheetOpen} />
                    ))}
                    
                    <Collapsible>
                        <CollapsibleTrigger className={cn("group flex w-full items-center justify-between rounded-md px-3 py-2 text-lg font-bold uppercase transition-colors", ueberUnsActive ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary')}>
                            {isEnglish ? 'About Us' : 'Über uns'} <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 pl-6">
                            <div className="flex flex-col space-y-2">
                            {ueberUnsLinks.map((link) => (
                                <MobileNavLink key={link.href} {...link} isActive={pathname === link.href} setSheetOpen={setSheetOpen} />
                            ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible>
                        <CollapsibleTrigger className={cn("group flex w-full items-center justify-between rounded-md px-3 py-2 text-lg font-bold uppercase transition-colors", zeitenActive ? 'bg-gradient-to-b from-gradient-start to-gradient-end text-primary-foreground' : 'text-muted-foreground hover:text-primary')}>
                            {isEnglish ? 'Times' : 'Zeiten'} <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2 pl-6">
                             <div className="flex flex-col space-y-2">
                                {zeitenLinks.map((link) => (
                                    <MobileNavLink key={link.href} {...link} isActive={pathname === link.href} setSheetOpen={setSheetOpen} />
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    
                    <div className="pt-2">
                        <MobileNavLink {...notfallLink} isActive={pathname === notfallLink.href} isEmergency={true} setSheetOpen={setSheetOpen}/>
                    </div>
                </nav>
            </div>
            </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
