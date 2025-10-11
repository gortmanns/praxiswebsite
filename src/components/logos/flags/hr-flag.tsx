import { cn } from '@/lib/utils';
import React from 'react';

export function HrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" className={cn(className)}>
      <path fill="#ff0000" d="M0 0h2v1H0z"/>
      <path fill="#fff" d="M0 .333h2v.333H0z"/>
      <path fill="#0000ff" d="M0 .667h2v.333H0z"/>
      <path d="M1 .37a.16.16 0 100 .26.16.16 0 100-.26z" fill="#ff0000" stroke="#fff" strokeWidth=".04"/>
    </svg>
  );
}
