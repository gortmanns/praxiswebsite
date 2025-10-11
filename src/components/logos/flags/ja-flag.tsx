import { cn } from '@/lib/utils';
import React from 'react';

export function JaFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#fff" d="M0 0h3v2H0z"/>
      <circle cx="1.5" cy="1" r=".6" fill="#bc002d"/>
    </svg>
  );
}
