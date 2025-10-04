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
        {/* Längliche Pille */}
        <path d="M479.13,32.87A143.2,143.2,0,0,0,320,32a143.2,143.2,0,0,0-159.13,112.87,143.2,143.2,0,0,0,0,224.26A143.2,143.2,0,0,0,320,480a143.2,143.2,0,0,0,159.13-112.87,143.2,143.2,0,0,0,0-224.26ZM320,448a111.3,111.3,0,0,1-124.2-88H320V64h-.3A111.32,111.32,0,0,1,320,64a111.3,111.3,0,0,1,124.2,88H320Z" stroke="currentColor" strokeWidth="16" fill="none"/>
        <path d="M320 64H195.7C195.7 64 320 64 320 64V360H195.8A111.31 111.31 0 0 1 195.8 88H320Z" />

        {/* Runde Pille */}
        <circle cx="448" cy="352" r="96"/>
        <line x1="400" y1="304" x2="496" y2="400" stroke="white" strokeWidth="20" strokeLinecap="round"/>
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
