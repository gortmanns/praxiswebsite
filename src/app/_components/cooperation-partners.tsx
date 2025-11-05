
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface Partner {
  id: string;
  order: number;
  name: string;
  websiteUrl: string;
  logoHtml: string;
  openInNewTab: boolean;
  hidden?: boolean;
}

const CodeRenderer: React.FC<{ html: string }> = ({ html }) => {
    const [sanitizedHtml, setSanitizedHtml] = useState({ __html: '' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sanitize = DOMPurify.sanitize;
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src']
            };
            setSanitizedHtml({ __html: sanitize(html, config) });
        }
    }, [html]);

    return <div className="relative flex h-full w-full items-center justify-center overflow-hidden" dangerouslySetInnerHTML={sanitizedHtml} />;
};


const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
    <Link
        href={partner.websiteUrl || '#'}
        target={partner.openInNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="block w-full aspect-[2/1] overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        <Card className="flex h-full w-full items-center justify-center bg-background p-4 transition-transform duration-300 hover:scale-105">
            {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
        </Card>
    </Link>
);

const PartnerGrid: React.FC<{ partners: Partner[] }> = ({ partners }) => {
  if (!partners || partners.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
      {partners.map((partner) => (
        <div key={partner.id} className="w-full md:w-1/3 lg:w-1/4 max-w-xs flex-grow">
          <PartnerCard partner={partner} />
        </div>
      ))}
    </div>
  );
};


export function CooperationPartnersSection() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/page-en');
  const firestore = useFirestore();

  const medicalPartnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'medicalPartners'), orderBy('order', 'asc'));
  }, [firestore]);

  const otherPartnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'otherPartners'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: medicalPartnersData, isLoading: isLoadingMedical } = useCollection<Partner>(medicalPartnersQuery);
  const { data: otherPartnersData, isLoading: isLoadingOther } = useCollection<Partner>(otherPartnersQuery);
  
  const activeMedicalPartners = useMemo(() => medicalPartnersData?.filter(p => !p.hidden), [medicalPartnersData]);
  const activeOtherPartners = useMemo(() => otherPartnersData?.filter(p => !p.hidden), [otherPartnersData]);

  const renderSkeleton = () => (
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full md:w-1/3 lg:w-1/4 max-w-xs flex-grow">
                   <Skeleton className="w-full aspect-[2/1] rounded-lg" />
              </div>
          ))}
      </div>
  );

  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          {isEnglish ? 'Our Medical Cooperation Partners' : 'Unsere ärztlichen Kooperationspartner'}
        </h2>
        
        <div className="mt-12">
          {isLoadingMedical ? renderSkeleton() : (
              activeMedicalPartners && activeMedicalPartners.length > 0 ? <PartnerGrid partners={activeMedicalPartners} /> : <p className="text-center text-primary-foreground">Informationen werden geladen...</p>
          )}
        </div>

        {activeOtherPartners && activeOtherPartners.length > 0 && (
            <>
                <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                {isEnglish ? 'Our Other Partners' : 'Unsere weiteren Partner'}
                </h3>
                <div className="mt-12">
                     {isLoadingOther ? renderSkeleton() : (
                       activeOtherPartners && activeOtherPartners.length > 0 && <PartnerGrid partners={activeOtherPartners} />
                     )}
                </div>
            </>
        )}
      </div>
    </section>
  );
}
