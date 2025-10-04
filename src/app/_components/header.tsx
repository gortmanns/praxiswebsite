import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Praxiszentrum im Rind</span>
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
