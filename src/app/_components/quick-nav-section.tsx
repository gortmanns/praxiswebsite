import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Stethoscope, Pill, Ambulance } from 'lucide-react';

const navItems = [
  {
    href: '/team',
    label: 'Team',
    icon: <Users size={40} className="mb-4 text-primary" />,
    line1: 'Unsere Ärzte',
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    icon: <Stethoscope size={40} className="mb-4 text-primary" />,
    line1: 'Unser Angebot',
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    icon: <Pill size={40} className="mb-4 text-primary" />,
    line1: 'Rezepte bestellen',
  },
  {
    href: '/notfall',
    label: 'Notfall',
    icon: <Ambulance size={40} className="mb-4 text-primary" />,
    line1: 'In dringenden Fällen',
  },
];

export function QuickNavSection() {
  return (
    <section id="quick-nav" className="bg-secondary">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="outline"
                className="flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 bg-background p-6 text-center transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1"
              >
                {item.icon}
                <span className="text-lg font-semibold text-foreground">
                  {item.line1}
                </span>
                <span className="mt-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
