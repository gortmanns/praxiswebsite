import { cn } from '@/lib/utils';
import React from 'react';

export function KoFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#fff" d="M0 0h3v2H0z"/>
      <circle cx="1.5" cy="1" r=".5" fill="#cd2e3a"/>
      <path d="M1.5 1a.5.5 0 000-1 .25.25 0 000 .5.25.25 0 010 .5z" fill="#0047a0"/>
      <g fill="#000">
        <path d="M.2.3h.2v.2H.2zm0 .2h.2v.2H.2zM.4.3h.2v.2H.4zm2 .8h.2v.2H2.6zm0 .2h.2v.2H2.6zm-.2.2h.2v.2H2.4zM.2.9h.2v.2H.2zm0 .2h.2v.2H.2zM.4.9h.2v.2H.4zm2-1.2h.2v.2H2.6zm0 .2h.2v.2H2.6zm-.2-.2h.2v.2H2.4z"/>
      </g>
    </svg>
  );
}
