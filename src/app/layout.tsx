import type { Metadata } from 'next';
import './globals.css';
import './tiptap-styles.css';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Praxiszentrum im Ring',
  description: 'Ihre Gesundheit, Unsere Priorität.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={cn('font-body antialiased', montserrat.variable)}>
          {children}
      </body>
    </html>
  );
}
