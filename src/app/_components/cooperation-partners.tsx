'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { MedicalPartner, OtherPartner } from '@/docs/backend-types';
import DOMPurify from 'dompurify';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';


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


const RowGrid: React.FC<{ partners: (MedicalPartner | OtherPartner)[] }> = ({ partners }) => {
    const count = partners.length;
    if (count === 0) return null;
    
    if (count === 4) {
        return (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map(partner => (
                    <div key={partner.id}>
                        <PartnerLink partner={partner} />
                    </div>
                ))}
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-8 gap-8">
            {count === 1 && (
                <div className="col-start-3 col-span-4">
                    <PartnerLink partner={partners[0]} />
                </div>
            )}
            {count === 2 && (
                <>
                    <div className="col-start-2 col-span-3"><PartnerLink partner={partners[0]} /></div>
                    <div className="col-span-3"><PartnerLink partner={partners[1]} /></div>
                </>
            )}
            {count === 3 && (
                <>
                    <div className="col-start-1 col-span-2"><PartnerLink partner={partners[0]} /></div>
                    <div className="col-start-4 col-span-2"><PartnerLink partner={partners[1]} /></div>
                    <div className="col-start-7 col-span-2"><PartnerLink partner={partners[2]} /></div>
                </>
            )}
        </div>
    );
};

const PartnerGrid: React.FC<{ partners: (MedicalPartner | OtherPartner)[] }> = ({ partners }) => {
    if (!partners || partners.length === 0) return null;

    const chunkedPartners = [];
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-32 w-full rounded-lg" />
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
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="h-32 w-full rounded-lg" />
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
