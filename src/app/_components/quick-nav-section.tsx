import Link from 'next/link';
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
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg bg-secondary p-8 text-secondary-foreground transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <Icon className="mb-4 h-16 w-16 text-secondary-foreground" />
                  <span className="text-lg font-bold uppercase tracking-wider text-secondary-foreground">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
