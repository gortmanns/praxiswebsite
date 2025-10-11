import { cn } from '@/lib/utils';
import React from 'react';

export function FiFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11" className={cn(className)}>
      <path fill="#fff" d="M0 0h18v11H0z"/>
      <path fill="#002f6c" d="M5 0h3v11H5zM0 4h18v3H0z"/>
    </svg>
  );
}
