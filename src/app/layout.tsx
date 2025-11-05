import type { Metadata } from 'next';
import './globals.css';
import './tiptap-styles.css';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { FirebaseClientProvider } from '@/firebase';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Praxiszentrum im Ring',
  description: 'Hausarztpraxis in Hinterkappelen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="de">
      <body className={cn('font-body antialiased', montserrat.variable)}>
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
      </body>
    </html>
  );
}
