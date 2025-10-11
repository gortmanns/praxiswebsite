import { cn } from '@/lib/utils';
import React from 'react';

export function HeFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8" className={cn(className)}>
      <path fill="#fff" d="M0 0h11v8H0z"/>
      <path fill="#0038b8" d="M0 0h11v1H0zm0 7h11v1H0zm4.5 3.5l1-1.73 1 1.73H4.5zm1-2.73l-1-1.73h2z"/>
    </svg>
  );
}
