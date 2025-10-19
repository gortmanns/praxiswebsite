
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import './globals.css';
import './tiptap-styles.css';
import { cn } from '@/lib/utils';
import { Montserrat, Open_Sans } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Praxiszentrum im Ring',
  description: 'Ihre Gesundheit, Unsere Priorität.',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={cn('font-body antialiased', montserrat.variable, openSans.variable)}>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'de',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
         <Script
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </body>
    </html>
  );
}
