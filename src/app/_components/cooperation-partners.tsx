
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';
import type { OtherPartner as OtherPartnerData } from '@/docs/backend-types';

interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl: string;
    logoUrl: string;
    openInNewTab?: boolean;
    hint?: string;
    width?: number;
    height?: number;
    hidden?: boolean;
}

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

  const { data: medicalPartners, isLoading: isLoadingMedical } = useCollection<Partner>(medicalPartnersQuery);
  const { data: otherPartners, isLoading: isLoadingOther } = useCollection<OtherPartnerData>(otherPartnersQuery);

  const visibleMedicalPartners = medicalPartners?.filter(p => !p.hidden) || [];
  const visibleOtherPartners = otherPartners?.filter(p => !p.hidden) || [];

  const renderPartnerLogo = (partner: Partner) => {
    if (partner.name === 'orthozentrum-bern') {
      return <OrthozentrumLogo className="h-full w-full object-contain" />;
    }
    if (partner.name === 'Agnieszka Slezak') {
      return <AgnieszkaSlezakLogo className="h-full w-full object-contain" />;
    }
     if (partner.name === 'Schemmer & Worni' || partner.name === 'VASC ALLIANCE') {
        return (
            <Image
                src={partner.logoUrl}
                alt={`${partner.name} Logo`}
                fill
                className="object-contain"
                data-ai-hint={partner.hint}
            />
        );
    }
    return (
        <Image
          src={partner.logoUrl}
          alt={`${partner.name} Logo`}
          width={partner.width || 200}
          height={partner.height || 60}
          className="object-contain"
          data-ai-hint={partner.hint}
        />
    );
  };


  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                       <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                          {renderPartnerLogo(partner)}
                       </div>
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:w-full">
              {isLoadingOther ? (
                 Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-full sm:w-auto">
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </div>
                ))
              ) : (
                visibleOtherPartners.map(partner => (
                  <div key={partner.id} className="w-full sm:w-auto">
                    <Link
                      href={partner.websiteUrl || '#'}
                      target={partner.openInNewTab ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Card className="flex h-full w-full items-center justify-center bg-background p-2">
                        <div className="relative flex w-full h-full items-center justify-center p-0 overflow-hidden">
                            <Image
                              src={partner.logoUrl!}
                              alt={`${partner.name} Logo`}
                              fill
                              className="object-contain"
                              style={{
                                  transform: `scale(${ (partner.logoScale || 100) / 100}) translate(${partner.logoX || 0}px, ${partner.logoY || 0}px)`,
                                  transformOrigin: 'center center',
                              }}
                            />
                        </div>
                      </Card>
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </Link>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
