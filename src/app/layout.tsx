
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Montserrat, Open_Sans, JetBrains_Mono, Dancing_Script, Pacifico, Great_Vibes, Sacramento, Tangerine, Caveat, Allura, Parisienne, Rochester, La_Belle_Aurore } from 'next/font/google';

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

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
});
const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  weight: '400',
});
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
});
const sacramento = Sacramento({
  subsets: ['latin'],
  variable: '--font-sacramento',
  weight: '400',
});
const tangerine = Tangerine({
  subsets: ['latin'],
  variable: '--font-tangerine',
  weight: ['400', '700'],
});
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
});
const allura = Allura({
  subsets: ['latin'],
  variable: '--font-allura',
  weight: '400',
});
const parisienne = Parisienne({
  subsets: ['latin'],
  variable: '--font-parisienne',
  weight: '400',
});
const rochester = Rochester({
  subsets: ['latin'],
  variable: '--font-rochester',
  weight: '400',
});
const laBelleAurore = La_Belle_Aurore({
  subsets: ['latin'],
  variable: '--font-la-belle-aurore',
  weight: '400',
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
      <body className={cn('font-body antialiased', montserrat.variable, openSans.variable, jetbrainsMono.variable, dancingScript.variable, pacifico.variable, greatVibes.variable, sacramento.variable, tangerine.variable, caveat.variable, allura.variable, parisienne.variable, rochester.variable, laBelleAurore.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
