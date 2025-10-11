import { cn } from '@/lib/utils';
import React from 'react';

export function TrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#e30a17" d="M0 0h3v2H0z"/>
      <circle cx="1.125" cy="1" r=".5" fill="#fff"/>
      <path d="M1.25 1a.4.4 0 100-.8.5.5 0 010 .8z" fill="#fff"/>
      <path d="M1.375 1l.1-.3.1.3-.2-.2z" fill="#e30a17"/>
    </svg>
  );
}
