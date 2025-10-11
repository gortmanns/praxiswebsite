
import { cn } from '@/lib/utils';
import React from 'react';

export function DeFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className={cn(className)}>
      <rect width="5" height="3" fill="#FFCE00"/>
      <rect width="5" height="2" fill="#DD0000"/>
      <rect width="5" height="1" fill="magenta"/>
    </svg>
  );
}
