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
    <section id="quick-nav" className="bg-background border-2 border-orange-500">
      <div className="container py-16 sm:py-24">
        <div className="mx-auto w-full max-w-full">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-6 text-secondary-foreground transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <item.Icon className="h-14 w-14 text-secondary-foreground" />
                <span className="text-xl font-bold uppercase tracking-wider text-secondary-foreground">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
