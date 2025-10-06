
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Montserrat, Open_Sans, JetBrains_Mono } from 'next/font/google';

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: 'Praxiszentrum im Ring',
  description: 'Ihre Gesundheit, Unsere Priorität.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={cn('font-body antialiased', montserrat.variable, openSans.variable, jetbrainsMono.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
