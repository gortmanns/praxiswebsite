import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            {/* Using an SVG for the logo to match the style of praxiszentrum-im-ring.ch */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 40C15.16 40 8 32.84 8 24C8 15.16 15.16 8 24 8C32.84 8 40 15.16 40 24C40 32.84 32.84 40 24 40Z"
                fill="currentColor"
              />
              <path d="M24 16V24H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold text-primary">Praxiszentrum im Ring</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="#symptoms"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Symptom-Check
          </Link>
          <Link
            href="#team"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Unser Team
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Kontakt
          </Link>
        </nav>
        <div className="ml-4 hidden md:flex">
           <Button asChild>
            <Link href="#contact">Termin Buchen</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
