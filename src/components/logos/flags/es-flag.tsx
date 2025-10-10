
import { cn } from '@/lib/utils';
import React from 'react';

export function EsFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#c60b1e" d="M0 0h3v2H0z"/>
      <path fill="#ffc400" d="M0 .5h3v1H0z"/>
    </svg>
  );
}
