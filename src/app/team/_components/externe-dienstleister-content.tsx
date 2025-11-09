
'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase/provider';
import { collection, query, orderBy } from 'firebase/firestore';
import { DoctorCard, type Doctor as ServiceProvider } from './doctor-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExterneDienstleisterContent({ isEnglish }: { isEnglish: boolean }) {
  const firestore = useFirestore();

  const serviceProvidersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'serviceProviders'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: serviceProviders, isLoading } = useCollection<ServiceProvider>(serviceProvidersQuery as any);

  const activeServiceProviders = React.useMemo(() => serviceProviders?.filter(p => !p.hidden), [serviceProviders]);
  
  const renderSkeletons = () => (
    <div className="space-y-16">
        {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-full max-w-[1000px] aspect-[1000/495] mx-auto" />
        ))}
    </div>
  );

  return (
    <div className="container py-16 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                {isEnglish ? 'EXTERNAL SERVICE PROVIDERS' : 'EXTERNE DIENSTLEISTER'}
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
                {isEnglish 
                ? 'In addition to our core team, we work with experienced specialists who hold consultations directly in our practice rooms. This allows us to offer you a wide range of medical services on-site.'
                : 'Zusätzlich zu unserem Kernteam arbeiten wir mit erfahrenen Fachärztinnen und Fachärzten zusammen, die Sprechstunden direkt in unseren Praxisräumen abhalten. So können wir Ihnen ein breites medizinisches Leistungsspektrum vor Ort anbieten.'}
            </p>
        </div>
        <div className="mx-auto mt-16 flex flex-col items-center space-y-16">
            {isLoading ? renderSkeletons() : activeServiceProviders?.map(provider => (
                <a key={provider.id} href={provider.websiteUrl} target={provider.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer">
                    <DoctorCard {...provider} disableFlip={true} />
                </a>
            ))}
        </div>
    </div>
  );
}
