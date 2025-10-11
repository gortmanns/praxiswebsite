import { cn } from '@/lib/utils';
import React from 'react';

export function CsFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#fff" d="M0 0h3v1H0z"/>
      <path fill="#d7141a" d="M0 1h3v1H0z"/>
      <path fill="#11457e" d="M0 0v2l1.5-1z"/>
    </svg>
  );
}
