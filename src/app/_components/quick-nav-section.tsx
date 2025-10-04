import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    href: '/team',
    label: 'Team',
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
  },
  {
    href: '/notfall',
    label: 'Notfall',
  },
];

export function QuickNavSection() {
  return (
    <section id="quick-nav" className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="secondary"
                className="h-32 w-full text-lg font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
