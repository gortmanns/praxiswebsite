
'use client';

import type { Metadata } from 'next';
import './globals.css';
import './tiptap-styles.css';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { HolidayBanner } from './_components/holiday-banner';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { FirebaseClientProvider } from '@/firebase';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isEnglish = pathname.includes('-en') || pathname.startsWith('/page-en');

  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <html lang="de">
        <body className={cn('font-body antialiased', montserrat.variable)}>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
        </body>
      </html>
    );
  }
  
  return (
    <html lang="de">
      <body className={cn('font-body antialiased', montserrat.variable)}>
        <FirebaseClientProvider>
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
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
