'use client';
import Link from 'next/link';
import {
  Siren,
  HandHelping,
  Pill,
} from 'lucide-react';

const navItems = [
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group h-32 w-full rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative h-full w-full rounded-lg transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front face */}
                <div
                  className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-secondary p-6 text-secondary-foreground"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <item.Icon className="h-14 w-14" />
                  <span className="text-xl font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                {/* Back face */}
                <div
                  className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary p-6 text-primary-foreground"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <item.Icon className="h-14 w-14" />
                  <span className="text-xl font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
