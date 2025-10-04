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
      viewBox="0 0 640 512"
      fill="currentColor"
      {...props}>
        {/* Längliche Pille: linke Hälfte (hohl), rechte Hälfte (gefüllt) */}
        <path d="M320,64.3C223.4,64.3,144,143.7,144,240.3S223.4,416.3,320,416.3c48.2,0,92-19.3,123.8-50.7" fill="none" stroke="currentColor" strokeWidth="32" />
        <path d="M320,64.3c96.6,0,176,79.4,176,176s-79.4,176-176,176" fill="currentColor" />
        
        {/* Runde Pille mit Bruchrille */}
        <circle cx="448" cy="352" r="120" fill="currentColor" />
        <line x1="400" y1="280" x2="496" y2="424" stroke="white" strokeWidth="24" strokeLinecap="round" transform="rotate(10, 448, 352)" />
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
