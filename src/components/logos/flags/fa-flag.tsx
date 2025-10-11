import { cn } from '@/lib/utils';
import React from 'react';

export function FaFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" className={cn(className)}>
      <path fill="#239f40" d="M0 0h7v4H0z"/>
      <path fill="#da0000" d="M0 2.67h7v1.33H0z"/>
      <path fill="#fff" d="M0 1.33h7v1.33H0z"/>
      <path d="M3.5 1.6a.2.2 0 00-.2.2.2.2 0 10.4 0 .2.2 0 00-.2-.2m0 .1a.1.1 0 110 .2.1.1 0 010-.2" fill="#da0000"/>
    </svg>
  );
}
