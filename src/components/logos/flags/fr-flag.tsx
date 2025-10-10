
import { cn } from '@/lib/utils';
import React from 'react';

export function FrFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#ED2939" d="M0 0h3v2H0z"/>
      <path fill="#fff" d="M0 0h2v2H0z"/>
      <path fill="#002395" d="M0 0h1v2H0z"/>
    </svg>
  );
}
