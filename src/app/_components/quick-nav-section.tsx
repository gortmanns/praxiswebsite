'use client';
import Link from 'next/link';
import {
  Users,
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
    Icon: CustomPillsIcon,
  },
  {
    href: '/notfall',
    label: 'Notfall',
    Icon: AlertTriangle,
  },
];

function CustomPillsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 150"
      fill="currentColor"
      {...props}>
      <g transform="rotate(15 55 75)">
        {/* Bottom filled half of the capsule */}
        <path d="M55 105 a30 30 0 0 1-30-30 v-0 h60 v0 a30 30 0 0 1-30 30z" />
        {/* Top hollow half of the capsule */}
        <path d="M25 75 a30 30 0 0 1 30-30 a30 30 0 0 1 30 30" fill="none" stroke="currentColor" strokeWidth="5"/>
      </g>
      
      {/* Round pill, 20% smaller */}
      <g transform="translate(130 50)">
        <circle cx="24" cy="24" r="24" fill="currentColor"/>
        {/* Break line at 45 degrees */}
        <line x1="10" y1="10" x2="38" y2="38" stroke="hsl(var(--secondary-foreground))" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}


// Keep FilePlus as it's used in the navItems array for 'Leistungen'
function FilePlus(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 15v-6" />
      <path d="M9 12h6" />
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
