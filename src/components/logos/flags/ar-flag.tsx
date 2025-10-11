import { cn } from '@/lib/utils';
import React from 'react';

export function ArFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#007a3d" d="M0 0h3v2H0z"/>
      <path fill="#fff" d="M0 .67h3v.67H0z"/>
      <path fill="#000" d="M0 1.33h3v.67H0z"/>
      <path fill="red" d="M0 0v2l1-1z"/>
    </svg>
  );
}
