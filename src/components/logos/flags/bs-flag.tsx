import { cn } from '@/lib/utils';
import React from 'react';

export function BsFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" className={cn(className)}>
      <path fill="#002395" d="M0 0h20v10H0z"/>
      <path fill="#fecb00" d="M4 0L20 8V10L4 2z"/>
      <path fill="#fff" d="M3.5 1.5l1 3h-3zM5.5 2.5l1 3h-3zM7.5 3.5l1 3h-3zM9.5 4.5l1 3h-3zM11.5 5.5l1 3h-3zM13.5 6.5l1 3h-3zM15.5 7.5l1 3h-3z"/>
    </svg>
  );
}
