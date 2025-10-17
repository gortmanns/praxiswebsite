
'use client';

import { Header } from '../../_components/header';
import { Footer } from '../../_components/footer';
import { TeamMemberCard } from '../_components/team-member-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { StaffMember } from '../../admin/dashboard/team/staff/_components/staff-editor';
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

  const { data: serviceProvidersData, isLoading: isLoadingServiceProviders } = useCollection<StaffMember>(serviceProvidersQuery as any);

  const activeServiceProviders = useMemo(() => serviceProvidersData?.filter(s => !s.hidden) || [], [serviceProvidersData]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div>
              <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Externe Dienstleister</h2>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Zur Erweiterung unseres Angebots arbeiten wir mit qualifizierten externen Spezialisten zusammen.
              </p>
            </div>
            
            <div className="mt-12">
                {isLoadingServiceProviders ? (
                    <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-[550px] w-full max-w-sm" />
                        ))}
                    </div>
                ) : activeServiceProviders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {activeServiceProviders.map((member) => {
                            const backside = member.backsideContent ? <div dangerouslySetInnerHTML={{ __html: member.backsideContent }} /> : undefined;
                            return (
                                <div key={member.id} className={cn("flex justify-center", member.fullWidth && "sm:col-span-2")}>
                                    <TeamMemberCard 
                                        name={member.name}
                                        role={member.role}
                                        role2={member.role2}
                                        imageUrl={member.imageUrl}
                                        imageHint="service provider portrait"
                                        languages={member.languages}
                                        backsideContent={backside}
                                    />
                                </div>
                            );
                        })}
                    </div>
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
