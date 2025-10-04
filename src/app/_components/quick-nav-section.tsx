'use client';
import Link from 'next/link';
import {
  Users,
  FilePlus,
  Pill,
  AlertTriangle,
  HeartPulse,
  ClipboardList,
  Medal,
  Stethoscope,
  ShieldCheck,
  Package,
  Beaker,
  TestTube2,
  Circle,
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
    icons: [Pill, 'CustomHalfCircle'],
  },
  {
    href: '/notfall',
    label: 'Notfall',
    icon: AlertTriangle,
    icons: null,
  },
];

const CustomHalfCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );

export function QuickNavSection() {
  const iconComponents: { [key: string]: React.ElementType } = {
    Pill,
    CustomHalfCircle: CustomHalfCircleIcon
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
