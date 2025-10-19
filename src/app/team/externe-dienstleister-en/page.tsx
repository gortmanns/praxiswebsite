
'use client';

import { Header } from '../../_components/header';
import { Footer } from '../../_components/footer';
import { DoctorCard } from '../_components/doctor-card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface ServiceProvider {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    hidden?: boolean;
}

export default function ExterneDienstleisterEnPage() {
    const firestore = useFirestore();

    const serviceProvidersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'serviceProviders'), orderBy('order', 'asc'));
    }, [firestore]);

    const { data: serviceProvidersData, isLoading: isLoadingServiceProviders } = useCollection<ServiceProvider>(serviceProvidersQuery);

    const activeServiceProviders = serviceProvidersData?.filter(sp => !sp.hidden) || [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div>
              <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">External Service Providers at Praxiszentrum im Ring</h2>
              <p className="mt-4 text-center text-lg text-foreground/80">
                To expand our services, we collaborate with the following specialists who offer their services in our practice rooms.
              </p>
            </div>
            
             <div className="space-y-8">
                {isLoadingServiceProviders ? (
                     Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                            <Skeleton className="w-full aspect-[1000/495]" />
                        </div>
                    ))
                ) : activeServiceProviders.length > 0 ? (
                     activeServiceProviders.map(provider => (
                        <div key={provider.id} id={provider.name.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                            <DoctorCard {...provider} disableFlip={true} />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">Information about external service providers will be displayed here shortly.</p>
                )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
