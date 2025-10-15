'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { MedicalPartner, OtherPartner } from '@/docs/backend-types';
import DOMPurify from 'dompurify';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { cn } from '@/lib/utils';


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

const PartnerLink: React.FC<{ partner: MedicalPartner | OtherPartner }> = ({ partner }) => (
    <Link
        href={partner.websiteUrl || '#'}
        target={partner.openInNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        <Card className="flex h-full w-full items-center justify-center bg-background p-2">
            {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
        </Card>
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </Link>
);


const PartnerGrid: React.FC<{ partners: (MedicalPartner | OtherPartner)[] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;

    const count = partners.length;
    const isSingleRow = count < 4;

    const getGridClass = () => {
        if (isSingleRow) {
            switch (count) {
                case 1: return 'md:grid-cols-1';
                case 2: return 'md:grid-cols-2';
                case 3: return 'md:grid-cols-3';
                default: return 'md:grid-cols-4';
            }
        }
        return 'md:grid-cols-4';
    };

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center", getGridClass())}>
            {partners.map(partner => (
                <div key={partner.id} className="w-full max-w-[280px] mx-auto">
                    <PartnerLink partner={partner} />
                </div>
            ))}
        </div>
    );
};

export function CooperationPartnersSection() {
  const firestore = useFirestore();

  const medicalPartnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'medicalPartners'), where('hidden', '==', false), orderBy('order', 'asc'));
  }, [firestore]);

  const otherPartnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'otherPartners'), where('hidden', '==', false), orderBy('order', 'asc'));
  }, [firestore]);
  
  const { data: medicalPartners, isLoading: isLoadingMedical } = useCollection<MedicalPartner>(medicalPartnersQuery);
  const { data: otherPartners, isLoading: isLoadingOther } = useCollection<OtherPartner>(otherPartnersQuery);
  
  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12">
          {isLoadingMedical ? (
            <div className="flex flex-wrap justify-center gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-32 w-full max-w-[280px] flex-shrink-0 rounded-lg" />
                ))}
            </div>
          ) : (
            <PartnerGrid partners={medicalPartners || []} />
          )}
        </div>

        {(otherPartners && otherPartners.length > 0) && (
            <>
                <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                Unsere weiteren Partner
                </h3>
                <div className="mt-12">
                    {isLoadingOther ? (
                        <div className="flex flex-wrap justify-center gap-8">
                            {Array.from({ length: 4 }).map((_, index) => (
                                 <Skeleton key={index} className="h-32 w-full max-w-[280px] flex-shrink-0 rounded-lg" />
                            ))}
                        </div>
                    ) : (
                        <PartnerGrid partners={otherPartners || []} />
                    )}
                </div>
            </>
        )}
      </div>
    </section>
  );
}
