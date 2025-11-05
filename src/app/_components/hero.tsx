
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export function Hero({ isEnglish }: { isEnglish: boolean }) {
  return (
    <section className="relative w-full aspect-[1511/721]">
      <Image
        src="/images/luftbild.jpg"
        alt="Aerial view of the practice location."
        data-ai-hint="aerial clinic"
        fill
        className="h-auto w-full object-cover"
        priority
      />
      <div className="absolute bottom-8 left-8">
        <Button asChild size="lg" className="h-14 gap-3 rounded-full px-8 text-xl font-bold shadow-2xl">
          <Link href="/termine">
            <Calendar />
            {isEnglish ? 'Book Appointment' : 'Termin vereinbaren'}
          </Link>
        </Button>
      </div>
    </section>
  );
}
