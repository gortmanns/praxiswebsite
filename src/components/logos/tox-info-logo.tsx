import { cn } from '@/lib/utils';

export function ToxInfoLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 450 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Tox Info Suisse Logo"
    >
      <style>
        {`
          .tox-text { font-family: Arial, sans-serif; font-weight: bold; }
          .tox-red { fill: #E60000; }
          .tox-black { fill: #000000; }
        `}
      </style>
      <g className="tox-text">
        <text x="10" y="70" fontSize="80" className="tox-red">Tox</text>
        <text x="180" y="70" fontSize="80" className="tox-black">Info</text>
      </g>
      <path d="M340 20 l20 60 l20 -60" stroke="#000000" strokeWidth="10" fill="none" />
      <path d="M380 20 l20 60 l20 -60" stroke="#000000" strokeWidth="10" fill="none" />
      <circle cx="435" cy="50" r="10" fill="#E60000" />
    </svg>
  );
}
