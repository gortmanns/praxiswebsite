'use client';
import Link from 'next/link';
import {
  Siren,
  HandHelping,
  Pill,
  Users,
} from 'lucide-react';

const navItems = [
  {
    href: '/team',
    label: 'Team',
    Icon: Users,
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    Icon: HandHelping,
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    Icon: Pill,
  },
  {
    href: '/notfall',
    label: 'Notfall',
    Icon: Siren,
  },
];


export function QuickNavSection() {
  return (
    <section id="quick-nav" className="w-full bg-background debug-outline">
      <div className="mx-auto w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24 lg:px-8 debug-outline">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 debug-outline">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative h-40 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 debug-outline"
            >
              {/* Graue Karte (unten) */}
              <div
                className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-6 text-secondary-foreground transition-transform duration-500 debug-outline"
              >
                <item.Icon className="h-24 w-24" />
                <span className="text-xl font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              {/* Blaue Karte (oben, gleitet rein) */}
              <div
                className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary p-6 text-primary-foreground transition-transform duration-500 translate-y-full group-hover:translate-y-0 debug-outline"
              >
                <item.Icon className="h-24 w-24" />
                <span className="text-xl font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
