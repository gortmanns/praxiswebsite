'use client';
import Link from 'next/link';
import {
  AlertTriangle,
  Users,
  HandHelping,
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
    Icon: HandHoldingMedicalIcon,
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

function HandHoldingMedicalIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <div className="relative" style={{ width: props.width, height: props.height }}>
        <HandHelping {...props} />
        <div 
          className="absolute text-current"
          style={{ 
            fontSize: '40%', 
            fontWeight: 'bold', 
            top: '15%', 
            left: '55%',
            lineHeight: 1,
          }}
        >
          +
        </div>
      </div>
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
