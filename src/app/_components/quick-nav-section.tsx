'use client';
import Link from 'next/link';
import {
  Users,
  FilePlus,
  AlertTriangle,
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
    Icon: FilePlus,
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    Icon: FaPillsIcon,
  },
  {
    href: '/notfall',
    label: 'Notfall',
    Icon: AlertTriangle,
  },
];

function FaPillsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M304 96c0-53-43-96-96-96S112 43 112 96s43 96 96 96 96-43 96-96zM528 224c0-53-43-96-96-96s-96 43-96 96s43 96 96 96 96-43 96-96zM320 352c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96zM112.1 271.9c-20.5-12-45.3-11.5-65.2 1.5l-2.4 1.5c-23.7 15.3-33.1 44.9-22 70.8s38.8 38.8 65.2 27.2l2.4-1.5c20-12.9 31.2-36.4 28.5-59.5c-1.3-11.3-5.2-21.9-10.9-30.8zM240 224c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z"/>
    </svg>
  )
}

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
              <item.Icon className="h-16 w-16 text-secondary-foreground" />
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
