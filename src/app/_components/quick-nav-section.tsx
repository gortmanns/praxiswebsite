'use client';
import Link from 'next/link';
import {
  AlertTriangle,
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
    Icon: FaHandHoldingMedicalIcon,
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
      viewBox="0 0 120 110"
      fill="currentColor"
      {...props}>
      <g transform="rotate(15 25 50)">
        {/* Lower filled part */}
        <path d="M10 50 H 40 V 85 C 40 100.45, 10 100.45, 10 85 Z" />
        {/* Full outline */}
        <path d="M10 15 C 10 -0.45, 40 -0.45, 40 15 V 85 C 40 100.45, 10 100.45, 10 85 V 15 Z" fill="none" stroke="currentColor" strokeWidth="5" />
      </g>
      {/* Circle with 80% height of capsule, aligned to bottom */}
      <circle cx="85" cy="62.06" r="28" fill="currentColor" stroke="white" strokeWidth="2" />
      <path d="M65.2 42.26 L 104.8 81.86" stroke="gray" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FaHandHoldingMedicalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M96 128a64 64 0 1 1 128 0A64 64 0 1 1 96 128zM32 352a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM254.3 226.2c-2.3-3.4-5.2-6.3-8.5-8.5C222.3 203.8 192 173.4 192 128A96 96 0 1 1 32 128c0 37.1 23.5 68.9 56.2 84.1-1.3 4.8-1.9 9.8-1.9 14.9 0 32.4 10.1 62.4 27.5 86.8-40.4 3.4-78.1 16.2-109.8 36.1C-3.7 458.2-11.9 480.9 7.8 502.2c19.7 21.3 50.5 24.9 76.5 8.1C134.1 475.2 195.4 448 256 448c26.9 0 52.3 5.4 75.9 15.3 14.1 6.1 29.5 7.9 44.5 5.5 28.1-4.7 44.6-32.8 33.5-60.1-13-32.1-41.9-56.9-78.1-69.6 22.8-23.7 35.8-54.3 35.8-87.3 0-21.1-5-41-13.8-58.2-7.2-14.1-17.7-26.6-30.8-36.9-13-10.2-28.2-17.8-45-22.5-17-4.7-34.9-6.4-52.6-5.1-15.9 1.1-31.4 4.8-46 10.8zM416 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM352 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM448 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
    </svg>
  );
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
