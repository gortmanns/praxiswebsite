import { cn } from '@/lib/utils';
import React from 'react';

export function HuFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#436F4D" d="M0 1.33h3V2H0z"/>
      <path fill="#fff" d="M0 .67h3v.66H0z"/>
      <path fill="#CD2A3E" d="M0 0h3v.67H0z"/>
    </svg>
  );
}
