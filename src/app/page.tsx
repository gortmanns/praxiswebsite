
'use client';

import { Header } from './_components/header';
import { Footer } from './_components/footer';
import { Hero } from './_components/hero';
import { WelcomeSection } from './_components/welcome-section';
import { QuickNavSection } from './_components/quick-nav-section';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'dompurify';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';

interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl?: string;
    logoHtml: string;
    openInNewTab?: boolean;
    hidden?: boolean;
    [key: string]: any;
}


const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return <div className="relative flex h-full w-full items-center justify-center overflow-hidden" dangerouslySetInnerHTML={sanitizedHtml} />;
};

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
    <Link
        href={partner.websiteUrl || '#'}
        target={partner.openInNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="group relative block h-32 w-full max-w-xs mx-auto overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        <Card className="flex h-full w-full items-center justify-center bg-background p-2">
            {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
        </Card>
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </Link>
);

const RowGrid: React.FC<{ partners: Partner[] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;

    const getGridStyle = (index: number, total: number) => {
        let colStart;
        if (total === 4) { // 2-2-2-2
            colStart = index * 2 + 1;
        } else if (total === 3) { // 1-2-2-2-1
             colStart = index * 2 + 2;
        } else if (total === 2) { // 2-2-2 centered
            colStart = index * 2 + 3;
        } else { // 1 card centered
            colStart = 4;
        }
        return { gridColumnStart: colStart, gridColumnEnd: `span 2` };
    };

    return (
        <div className="grid grid-cols-8 gap-8">
            {partners.map((partner, index) => (
                <div key={partner.id} style={getGridStyle(index, partners.length)}>
                    <PartnerCard partner={partner} />
                </div>
            ))}
        </div>
    );
};

const PartnerGrid: React.FC<{ partners: Partner[] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;

    const chunkedPartners: Partner[][] = [];
    for (let i = 0; i < partners.length; i += 4) {
        chunkedPartners.push(partners.slice(i, i + 4));
    }

    return (
        <div className="space-y-8">
            {chunkedPartners.map((rowPartners, index) => (
                <RowGrid key={index} partners={rowPartners} />
            ))}
        </div>
    );
};


export default function Home() {
    const firestore = useFirestore();

    const medicalPartnersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'medicalPartners'), where('hidden', '==', false), orderBy('order', 'asc'));
    }, [firestore]);
    
    const { data: medicalPartners, isLoading: isLoadingMedical } = useCollection<Partner>(medicalPartnersQuery);
    
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WelcomeSection />
        <QuickNavSection />
        <section id="partners" className="w-full bg-green-600">
            <div className="mx-auto w-full px-4 pt-12 pb-16 sm:px-6 lg:px-8">
                <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Unsere ärztlichen Kooperationspartner
                </h2>
                 <div className="mt-12">
                  {isLoadingMedical ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-32 w-full rounded-lg" />
                        ))}
                    </div>
                  ) : (
                    <PartnerGrid partners={medicalPartners || []} />
                  )}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
