import { cn } from '@/lib/utils';
import React from 'react';

export function TrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className={cn(className)}>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="10" cy="10" r="5" fill="#FFF" />
      <circle cx="11.25" cy="10" r="4" fill="#E30A17" />
      <polygon
        points="15,10 15.65,11.9 17.6,11.2 16.1,12.8 17.6,14.4 15.65,13.7 15,15.6 14.35,13.7 12.4,14.4 13.9,12.8 12.4,11.2 14.35,11.9"
        fill="#FFF"
      />
    </svg>
  );
}
