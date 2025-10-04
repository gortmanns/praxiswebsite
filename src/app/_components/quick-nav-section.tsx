'use client';
import Link from 'next/link';
import {
  Siren,
  Users,
  HandHelping,
  Pill,
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
    <section id="quick-nav" className="w-full bg-background">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg bg-secondary text-secondary-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{ perspective: '1000px' }}
            >
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg p-6 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <item.Icon className="h-14 w-14 transition-colors" />
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
