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
      {/* Elongated pill - scaled by 1.2 */}
      <path transform="scale(1.2)" transform-origin="416 322" d="M459.3 221.2c-23.9-23.9-62.7-23.9-86.6 0L243.3 350.6c-23.9 23.9-23.9 62.7 0 86.6s62.7 23.9 86.6 0l129.4-129.4c23.9-23.9 23.9-62.7 0-86.6z" />
      {/* Round pill - original size */}
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z" />
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
