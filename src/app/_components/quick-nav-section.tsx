'use client';
import Link from 'next/link';
import {
  AlertTriangle,
  Users,
} from 'lucide-react';

const TiltedHandHelpingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className="rotate-20"
  >
    <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
    <path d="M14 14V6" />
    <path d="M18 19v-2a4 4 0 0 0-4-4H4" />
  </svg>
);

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
      viewBox="0 0 576 512"
      fill="currentColor"
      {...props}
    >
      <path d="M152 32C152 49.67 137.7 64 120 64S88 49.67 88 32S102.3 0 120 0S152 14.33 152 32zM120 80C75.82 80 40 115.8 40 160V320C40 337.7 54.33 352 72 352C89.67 352 104 337.7 104 320V288H136V320C136 337.7 150.3 352 168 352C185.7 352 200 337.7 200 320V288H232V320C232 337.7 246.3 352 264 352C281.7 352 296 337.7 296 320V288H328V320C328 352 360 384 400 384H480C524.2 384 560 348.2 560 304C560 259.8 524.2 224 480 224H416V160C416 106.1 365 64 304 64H264C219.8 64 184 99.82 184 144V224H120C106.7 224 96 234.7 96 248C96 261.3 106.7 272 120 272H152V160C152 142.3 137.7 128 120 128C102.3 128 88 142.3 88 160C88 186.5 109.5 208 136 208V248C91.82 248 56 212.2 56 168V160C56 123.8 83.82 96 120 96C137.7 96 152 110.3 152 128V144H168C176.8 119.2 200.4 96 232 96V96H248V88C248 74.75 237.3 64 224 64C210.7 64 200 74.75 200 88V144C200 157.3 189.3 168 176 168H152V200C169.7 200 184 185.7 184 168V144C184 110.1 209.1 80 240 80H248V80zM512 128H464V80H512V128zM488 64C501.3 64 512 53.25 512 40C512 26.75 501.3 16 488 16S464 26.75 464 40C464 53.25 474.7 64 488 64zM440 40C440 53.25 450.7 64 464 64S488 53.25 488 40C488 26.75 474.7 16 464 16S440 26.75 440 40zM464 152C474.7 152 488 154.5 488 160C488 165.5 474.7 168 464 168C453.3 168 440 165.5 440 160C440 154.5 453.3 152 464 152z" />
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
