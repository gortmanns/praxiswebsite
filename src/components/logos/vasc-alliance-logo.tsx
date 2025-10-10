
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function VascAllianceLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/VASC-Alliance-Logo.png"
      alt="VASC Alliance Logo"
      width={800}
      height={268}
      className={cn("h-auto w-full max-w-[400px] object-contain", className)}
      data-ai-hint="partner logo"
    />
  );
}
