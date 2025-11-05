
'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { HolidayBanner } from './_components/holiday-banner';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/page-en') || 
                    pathname.startsWith('/team-en') || 
                    pathname.startsWith('/team/externe-dienstleister-en') || 
                    pathname.startsWith('/impressionen-en') || 
                    pathname.startsWith('/jobs-en') || 
                    pathname.startsWith('/leistungen-en') || 
                    pathname.startsWith('/medikamente-en') || 
                    pathname.startsWith('/notfall-en') ||
                    pathname.startsWith('/ueber-uns-en') ||
                    pathname.startsWith('/impressum-en') ||
                    pathname.startsWith('/datenschutzerklaerung-en');
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        <Header isEnglish={isEnglish} />
        <main className="flex-1">
          <HolidayBanner isEnglish={isEnglish} />
          {children}
        </main>
        <Footer isEnglish={isEnglish} />
      </div>
      <Toaster />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (document.getElementById('google_translate_element')) {
                new google.translate.TranslateElement({
                  pageLanguage: 'de',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
}
