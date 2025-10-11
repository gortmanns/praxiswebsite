
import { cn } from '@/lib/utils';
import React from 'react';

export function PtFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#006233" d="M0 0h1.2v2H0z"/>
      <path fill="#D21034" d="M1.2 0H3v2H1.2z"/>
    </svg>
  );
}
