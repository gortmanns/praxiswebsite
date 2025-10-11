import { cn } from '@/lib/utils';
import React from 'react';

export function PaFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path d="M0 0h3v2H0z" fill="#008000"/>
      <path d="M0 1h3v1H0z" fill="#f93"/>
      <circle r=".4" cx="1.5" cy="1" fill="#00f" stroke="#fff" strokeWidth=".1"/>
    </svg>
  );
}
