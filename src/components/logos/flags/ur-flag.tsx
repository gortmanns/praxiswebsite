import { cn } from '@/lib/utils';
import React from 'react';

export function UrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#006600" d="M0 0h3v2H0z"/>
      <path fill="#fff" d="M.75 0h.5v2h-.5z"/>
      <circle cx="1.75" cy="1" r=".4" fill="#fff"/>
      <path d="M1.88 1a.3.3 0 100-.6.4.4 0 010 .6z" fill="#006600"/>
      <path d="M2.2 1l-.2-.1.1.2-.1-.2z" fill="#fff"/>
    </svg>
  );
}
