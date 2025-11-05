'use client';

import { FirebaseClientProvider } from '@/firebase';
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
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HolidayBanner />
          {children}
        </main>
        <Footer />
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
    </FirebaseClientProvider>
  );
}
