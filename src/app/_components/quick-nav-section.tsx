import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Stethoscope, Pill, AlertTriangle } from 'lucide-react';

const navItems = [
  {
    href: '/team',
    label: 'Team',
    icon: Users,
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    icon: Stethoscope,
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    icon: Pill,
  },
  {
    href: '/notfall',
    label: 'Notfall',
    icon: AlertTriangle,
  },
];

export function QuickNavSection() {
  return (
    <section id="quick-nav" className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant="secondary"
                  className="h-32 w-full flex-col text-lg font-bold uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon className="mb-4 h-24 w-24" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
