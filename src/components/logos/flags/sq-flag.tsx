import { cn } from '@/lib/utils';
import React from 'react';

export function SqFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 5" className={cn(className)}>
      <path d="M0 0h7v5H0z" fill="#e41e20"/>
      <path d="M3.5 1.93L2.56 1.5 2.5 1.25l.44.63-.94.32.94.31-.44.63.06-.25.94-.43zm0 1.14L2.56 2.64l-.06.25.44-.63.94-.31-.94-.32.44-.63.06.25.94.43z" fill="#000"/>
    </svg>
  );
}
