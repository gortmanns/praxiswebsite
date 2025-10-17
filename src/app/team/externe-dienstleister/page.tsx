
'use client';

import { Header } from '../../_components/header';
import { Footer } from '../../_components/footer';
import { DoctorCard } from '../_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Doctor as ServiceProvider } from '../_components/doctor-card';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';

export default function ExterneDienstleisterPage() {
  const firestore = useFirestore();

  const serviceProvidersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'serviceProviders') as CollectionReference<DocumentData>, orderBy('order', 'asc'));
  }, [firestore]);

  const { data: serviceProvidersData, isLoading: isLoadingServiceProviders } = useCollection<ServiceProvider>(serviceProvidersQuery as any);

  const activeServiceProviders = useMemo(() => serviceProvidersData?.filter(s => !s.hidden) || [], [serviceProvidersData]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div>
              <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Externe Dienstleister im Praxiszentrum im Ring</h2>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Zur Erweiterung unseres Angebots arbeiten wir mit den nachfolgenden Spezialisten zusammen, die Ihre Dienstleistungen in unseren Praxisräumen anbieten.
              </p>
            </div>
            
             <div className="space-y-8">
                {isLoadingServiceProviders ? (
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                            <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                        </div>
                    ))
                ) : activeServiceProviders.length > 0 ? (
                activeServiceProviders.map(provider => (
                    <div key={provider.id} id={provider.id.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                      <DoctorCard {...provider} />
                    </div>
                ))
                ) : (
                    <p className="text-center text-muted-foreground">Informationen zu den externen Dienstleistern werden in Kürze hier angezeigt.</p>
                )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
