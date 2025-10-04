import Link from 'next/link';
import { Users, HandHelping, Pill, AlertTriangle, HeartPulse, ClipboardList, Medal } from 'lucide-react';

const navItems = [
  {
    href: '/team',
    label: 'Team',
    icon: Users,
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    icon: HandHelping,
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-8 text-secondary-foreground transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {item.label === 'Leistungen' ? (
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    <HeartPulse className="h-12 w-12 text-secondary-foreground" />
                    <ClipboardList className="h-12 w-12 text-secondary-foreground" />
                    <Medal className="h-12 w-12 text-secondary-foreground" />
                  </div>
                ) : (
                  <Icon className="h-16 w-16 text-secondary-foreground" />
                )}
                <span className="text-lg font-bold uppercase tracking-wider text-secondary-foreground">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
