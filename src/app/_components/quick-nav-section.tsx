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
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M112 112c0-26.5-21.5-48-48-48S16 85.5 16 112v24c0 53 43 96 96 96s96-43 96-96v-24c0-26.5-21.5-48-48-48s-48 21.5-48 48v24c0 13.3-10.7 24-24 24s-24-10.7-24-24v-24zm160-16c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24-10.7 24-24 24zm136-48c-26.5 0-48 21.5-48 48v24c0 13.3-10.7 24-24 24s-24-10.7-24-24V112c0-53-43-96-96-96s-96 43-96 96v24c0 26.5-21.5 48-48 48s-48-21.5-48-48V112C16 50.1 66.1 0 128 0s112 50.1 112 112v24c0 13.3 10.7 24 24 24s24-10.7 24-24V112c0-26.5 21.5-48 48-48s48 21.5 48 48v24c0 53 43 96 96 96s96-43 96-96v-24c0-26.5-21.5-48-48-48zm-96 16c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24-10.7 24-24 24zM256 288c-61.9 0-112 50.1-112 112v32c0 35.3 28.7 64 64 64h96c35.3 0 64-28.7 64-64v-32c0-61.9-50.1-112-112-112zm-48 112v32c0 4.4-3.6 8-8 8s-8-3.6-8-8v-32c0-26.5 21.5-48 48-48s48 21.5 48 48v32c0 4.4-3.6 8-8 8s-8-3.6-8-8v-32c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/>
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