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
    icon: Users,
    icons: null,
  },
  {
    href: '/leistungen',
    label: 'Leistungen',
    icon: FilePlus,
    icons: [],
  },
  {
    href: '/medikamente',
    label: 'Medikamente',
    icon: null,
    icons: ['CustomPillsIcon'],
  },
  {
    href: '/notfall',
    label: 'Notfall',
    icon: AlertTriangle,
    icons: null,
  },
];

const CustomPillsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
        <path d="M294.9 238.4l-96-96c-18.7-18.7-49.1-18.7-67.9 0s-18.7 49.1 0 67.9l96 96L42.3 391c-18.7 18.7-18.7 49.1 0 67.9s49.1 18.7 67.9 0l84.7-84.7 96 96c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9l-96-96L386.3 150.6c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0L294.9 238.4zM464 128c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z"/>
    </svg>
  );


export function QuickNavSection() {
  const iconComponents: { [key: string]: React.ElementType } = {
    FilePlus,
    CustomPillsIcon
  };

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
                {item.icons && item.icons.map((Icon, index) => {
                    const IconComponent = typeof Icon === 'string' ? iconComponents[Icon] : Icon;
                    return IconComponent ? <IconComponent key={index} className="h-16 w-16 text-secondary-foreground" /> : null;
                })}
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
