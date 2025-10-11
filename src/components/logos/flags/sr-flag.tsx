import { cn } from '@/lib/utils';
import React from 'react';

export function SrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#C6363C" d="M0 0h3v.67H0z"/>
      <path fill="#0C4076" d="M0 .67h3v.67H0z"/>
      <path fill="#fff" d="M0 1.33h3V2H0z"/>
    </svg>
  );
}
