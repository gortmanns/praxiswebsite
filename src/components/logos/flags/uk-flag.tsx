import { cn } from '@/lib/utils';
import React from 'react';

export function UkFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#0057b7" d="M0 0h3v2H0z"/>
      <path fill="#ffd700" d="M0 1h3v1H0z"/>
    </svg>
  );
}
