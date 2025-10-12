

'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { MedicalPartner, OtherPartner } from '@/docs/backend-types';
import DOMPurify from 'dompurify';

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


export function CooperationPartnersSection() {
  const firestore = useFirestore();

  const medicalPartnersQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'medicalPartners'), orderBy('order', 'asc'));
  }, [firestore]);

  const otherPartnersQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'otherPartners'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: medicalPartners, isLoading: isLoadingMedical } = useCollection<MedicalPartner>(medicalPartnersQuery);
  const { data: otherPartners, isLoading: isLoadingOther } = useCollection<OtherPartner>(otherPartnersQuery);

  const visibleMedicalPartners = medicalPartners?.filter(p => !p.hidden) || [];
  const visibleOtherPartners = otherPartners?.filter(p => !p.hidden) || [];

  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {isLoadingMedical ? (
            Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))
          ) : (
            visibleMedicalPartners.map(partner => (
                <div key={partner.id}>
                  <Link
                    href={partner.websiteUrl || '#'}
                    target={partner.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                       {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
                    </Card>
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </Link>
                </div>
              ))
          )}
        </div>


        <h3 className="mt-16 text-center font-headline text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          Unsere weiteren Partner
        </h3>
        <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:w-full">
              {isLoadingOther ? (
                 Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-full sm:w-auto">
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </div>
                ))
              ) : (
                visibleOtherPartners.map(partner => {
                  return (
                      <div key={partner.id} className="w-full">
                        <Link
                          href={partner.websiteUrl || '#'}
                          target={partner.openInNewTab ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                             {partner.logoHtml && <CodeRenderer html={partner.logoHtml} />}
                          </Card>
                          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </Link>
                      </div>
                  );
                })
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
