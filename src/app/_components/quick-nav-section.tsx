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
      viewBox="0 0 640 512"
      fill="currentColor"
      {...props}
    >
      <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zM32 128C32 57.31 89.31 0 160 0s128 57.31 128 128c0 31.25-11.31 60-30.16 82.25L174.4 340.8C165.6 359.3 146.5 369.6 126.4 369.6C100.2 369.6 79.13 354.4 70.21 332.8L3.461 165.9C1.223 159.8 0 153.3 0 146.8V128c0-14.14 11.46-25.6 25.6-25.6H32zM640 176v16c0 35.35-28.65 64-64 64H512V128h64c35.35 0 64 28.65 64 64zM512 320h64c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32h-64v64h64c53.02 0 96-42.98 96-96v-64c0-53.02-42.98-96-96-96h-64v64zM494.5 353.7l-42.38-42.38c-6.252-6.252-16.38-6.252-22.63 0s-6.252 16.38 0 22.63L452.1 356.5l-42.38 42.38c-6.252 6.252-6.252 16.38 0 22.63s16.38 6.252 22.63 0L497.1 379.1l42.38 42.38c6.252 6.252 16.38 6.252 22.63 0s6.252-16.38 0-22.63L517.3 356.5l42.38-42.38c6.252-6.252 6.252-16.38 0-22.63s-16.38-6.252-22.63 0L494.7 333.9z" />
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
