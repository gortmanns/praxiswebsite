
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export function TrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className={cn(className)}>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="10" cy="10" r="5" fill="#FFF" />
      <circle cx="11.25" cy="10" r="4" fill="#E30A17" />
      <polygon
        points="15,10 15.65,8.1 17.6,8.8 16.1,7.2 17.6,5.6 15.65,6.3 15,4.4 14.35,6.3 12.4,5.6 13.9,7.2 12.4,8.8 14.35,8.1"
        fill="#FFF"
        transform="translate(1, 0.7)"
      />
    </svg>
  );
}
