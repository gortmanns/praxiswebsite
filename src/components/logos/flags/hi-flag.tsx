import { cn } from '@/lib/utils';
import React from 'react';

export function HiFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#f93" d="M0 0h3v2H0z"/>
      <path fill="#fff" d="M0 .67h3v.67H0z"/>
      <path fill="#128807" d="M0 1.33h3v.67H0z"/>
      <circle cx="1.5" cy="1" r=".3" fill="none" stroke="#000080" strokeWidth=".05"/>
      <path d="M1.5 1l.29.07m-.29-.07l.27.12m-.27-.12l.24.18m-.24-.18l.18.24m-.18-.24l.12.27m-.12-.27l.07.29m-.07-.29l-.07.29m.07-.29l-.12.27m.12-.27l-.18.24m.18-.24l-.24.18m.24-.18l-.27.12m.27-.12l-.29.07" stroke="#000080" strokeWidth=".025" strokeLinecap="round"/>
    </svg>
  );
}
