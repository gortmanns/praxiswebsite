'use client';
import Link from 'next/link';
import {
  Users,
  FilePlus,
  AlertTriangle,
  Pill,
  Syringe,
} from 'lucide-react';

const navItems = [
  {
    href: '/team',
    label: 'Team',
    icon: Users,
    icons: null,
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    icon: FilePlus,
    icons: null,
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    icon: null,
    icons: [Pill, Syringe],
  },
  {
    href: '/notfall',
    label: 'Notfall',
    icon: AlertTriangle,
    icons: null,
  },
];

export function QuickNavSection() {
  return (
    <section id="quick-nav" className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-8 text-secondary-foreground transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-center justify-center gap-4">
                {item.icon && <item.icon className="h-16 w-16 text-secondary-foreground" />}
                {item.icons && item.icons.map((Icon, index) => (
                  <Icon key={index} className="h-16 w-16 text-secondary-foreground" />
                ))}
              </div>
              <span className="text-lg font-bold uppercase tracking-wider text-secondary-foreground">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
