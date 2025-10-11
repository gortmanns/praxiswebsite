import { cn } from '@/lib/utils';
import React from 'react';

export function TaFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className={cn(className)}>
      <path fill="#f93" d="M0 0h5v1H0z"/>
      <path fill="green" d="M0 2h5v1H0z"/>
      <path d="M0 1h5v1H0z" fill="#fff"/>
      <circle cx="2.5" cy="1.5" r=".4" fill="#00f" stroke="#fff" strokeWidth=".1"/>
    </svg>
  );
}
