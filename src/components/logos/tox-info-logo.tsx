import { cn } from '@/lib/utils';

export function ToxInfoLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 357.2 92.5"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Tox Info Suisse Logo"
      preserveAspectRatio="xMidYMid meet"
    >
      <style>
        {`
          .tox-red { fill: #E5001A; }
          .tox-black { fill: #000; }
          .tox-text { font-family: 'Frutiger-Bold', 'Frutiger', 'Arial', sans-serif; font-weight: bold; }
        `}
      </style>
      <text
        x="0"
        y="75.2"
        className="tox-text tox-red"
        fontSize="88.7"
      >
        Tox
      </text>
      <text
        x="137.8"
        y="75.2"
        className="tox-text tox-black"
        fontSize="88.7"
      >
        Info
      </text>
      <g transform="translate(265, 5)">
        <path
          className="tox-black"
          d="M33.6,56c-0.2-2.1-0.2-4.5-0.2-6.9c0-6,0.3-12.1,0.8-18.1c1.5-17.7,11.5-28.7,28.8-28.8 c6.1-0.1,12.1,1.1,17.7,3.5c-4.4,5.4-8.8,10.7-13.2,16.1c-1.3-0.5-2.6-0.8-4-1c-7.3-1.1-13.8,4.6-15,11.9 c-0.5,3.3-0.3,6.7-0.3,10c0,2.1,0,4.3,0.1,6.5c-4.9-0.1-9.9,0-14.8-0.1V56z"
        />
        <path
          className="tox-black"
          d="M57.1,79.5c0.2,2.1,0.2,4.5,0.2,6.9c0,6-0.3,12.1-0.8,18.1c-1.5,17.7-11.5,28.7-28.8,28.8 c-6.1,0.1-12.1-1.1-17.7-3.5c4.4-5.4,8.8-10.7,13.2-16.1c1.3,0.5,2.6,0.8,4,1c7.3,1.1,13.8-4.6,15-11.9 c0.5-3.3,0.3-6.7,0.3-10c0-2.1,0-4.3-0.1-6.5C47.2,79.5,52.2,79.5,57.1,79.5z"
          transform="translate(85.3, 134) rotate(180)"
        />
        <polygon
          className="tox-red"
          points="88.4,43.3 78.5,43.3 78.5,33.5 68.6,33.5 68.6,43.3 58.7,43.3 58.7,53.2 68.6,53.2 68.6,63 78.5,63 78.5,53.2 88.4,53.2"
        />
      </g>
    </svg>
  );
}
