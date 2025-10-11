import { cn } from '@/lib/utils';
import React from 'react';

export function DaFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28" className={cn(className)}>
      <path fill="#c60b1e" d="M0 0h37v28H0z"/>
      <path fill="#fff" d="M12 0h4v28h-4zM0 12h37v4H0z"/>
    </svg>
  );
}
