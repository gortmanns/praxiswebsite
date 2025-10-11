import { cn } from '@/lib/utils';
import React from 'react';

export function ZhFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={cn(className)}>
      <path fill="#ee1c25" d="M0 0h3v2H0z"/>
      <path fill="#ff0" d="M.5.5l.2.6L1 .6l-.2.5.5.2-.6.2.2.5-.5-.2-.5.2.2-.5-.6-.2.5-.2zM1.2 1l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.6 1.2l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.6.8l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.2.6l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1z"/>
    </svg>
  );
}
