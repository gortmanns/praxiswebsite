'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { HolidayBanner } from './_components/holiday-banner';
import { cn } from '@/lib/utils';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isEnglish={isEnglish} />
      <main className="flex-1">
        <HolidayBanner isEnglish={isEnglish} />
        {children}
      </main>
      <Footer isEnglish={isEnglish} />
    </div>
  );
}
