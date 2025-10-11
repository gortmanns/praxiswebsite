'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';

interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl: string;
    logoUrl: string;
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
  const { data: otherPartners, isLoading: isLoadingOther } = useCollection<Partner>(otherPartnersQuery);

  const visibleMedicalPartners = medicalPartners?.filter(p => !p.hidden) || [];
  const visibleOtherPartners = otherPartners?.filter(p => !p.hidden) || [];

  const renderPartnerLogo = (partner: Partner) => {
    if (partner.name === 'orthozentrum-bern') {
      return <OrthozentrumLogo className="h-24 w-auto" />;
    }
    if (partner.name === 'Agnieszka Slezak') {
      return <AgnieszkaSlezakLogo className="h-24 w-auto" />;
    }
    return (
      <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
        <Image
          src={partner.logoUrl}
          alt={`${partner.name} Logo`}
          width={partner.width || 200}
          height={partner.height || 60}
          className="object-contain"
          data-ai-hint={partner.hint}
        />
      </div>
    );
  };


  return (
    <section id="partners" className="w-full bg-primary">
      <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Unsere ärztlichen Kooperationspartner
        </h2>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {isLoadingMedical ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))
          ) : (
            visibleMedicalPartners.map(partner => (
                <div key={partner.id} className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                  <Link
                    href={partner.websiteUrl || '#'}
                    target={partner.websiteUrl === '#' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group relative block h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Card className="flex h-full w-full items-center p-6">
                      <CardContent className="flex w-full items-center justify-center p-0">
                        {renderPartnerLogo(partner)}
                      </CardContent>
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
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-8">
          <div className="hidden lg:block"></div>
          {isLoadingOther ? (
             Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="sm:col-span-1 lg:col-span-2">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))
          ) : (
            visibleOtherPartners.map(partner => (
              <Link
                key={partner.id}
                href={partner.websiteUrl || '#'}
                target={partner.websiteUrl === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group relative sm:col-span-1 lg:col-span-2 h-32 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Card className="flex h-full w-full items-center justify-center p-6">
                  <CardContent className="flex w-full items-center justify-center p-0">
                    <div className="relative flex h-[77px] w-full items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logoUrl!}
                        alt={`${partner.name} Logo`}
                        width={partner.width || 200}
                        height={partner.height || 60}
                        className="object-contain"
                        data-ai-hint={partner.hint}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
            ))
          )}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
