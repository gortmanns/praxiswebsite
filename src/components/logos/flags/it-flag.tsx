
import { cn } from '@/lib/utils';
import React from 'react';

export function ItFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#008C45" d="M0 0h1v2H0z"/>
      <path fill="#F4F5F0" d="M1 0h1v2H1z"/>
      <path fill="#CD212A" d="M2 0h1v2H2z"/>
    </svg>
  );
}
