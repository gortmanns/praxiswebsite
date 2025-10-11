import { cn } from '@/lib/utils';
import React from 'react';

export function PlFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5" className={cn(className)}>
      <path fill="#fff" d="M0 0h8v5H0z"/>
      <path fill="#dc143c" d="M0 2.5h8v2.5H0z"/>
    </svg>
  );
}
