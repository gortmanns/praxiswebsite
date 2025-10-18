
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard } from './_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Doctor } from './_components/doctor-card';
import type { StaffMember } from '../admin/dashboard/team/staff/_components/staff-editor';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';


export default function TeamPage() {
  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors') as CollectionReference<DocumentData>, orderBy('order', 'asc'));
  }, [firestore]);
  const { data: doctorsData, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery as any);
  const activeDoctors = useMemo(() => doctorsData?.filter(d => !d.hidden) || [], [doctorsData]);

  const staffQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'staff') as CollectionReference<DocumentData>, orderBy('order', 'asc'));
  }, [firestore]);
  const { data: staffData, isLoading: isLoadingStaff } = useCollection<StaffMember>(staffQuery as any);
  const activeStaff = useMemo(() => staffData?.filter(s => !s.hidden) || [], [staffData]);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-16">
            <div id="aerzte">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Ärzte</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
            </div>
            
            <div className="space-y-8">
                {isLoadingDoctors ? (
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                            <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                        </div>
                    ))
                ) : activeDoctors.length > 0 ? (
                activeDoctors.map(doctor => (
                    <div key={doctor.id} id={doctor.id.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                      <DoctorCard {...doctor} />
                    </div>
                ))
                ) : (
                    <p className="text-center text-muted-foreground">Informationen zu den Ärzten werden in Kürze hier angezeigt.</p>
                )}
            </div>
            
            <div id="praxispersonal">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Praxispersonal</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Die guten Geister, ohne die keine Arztpraxis funktioniert
              </p>
            </div>
            
            <div className="mt-12">
                {isLoadingStaff ? (
                    <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-[550px] w-full max-w-sm" />
                        ))}
                    </div>
                ) : activeStaff.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {activeStaff.map((member) => {
                            const backside = member.backsideContent ? <div dangerouslySetInnerHTML={{ __html: member.backsideContent }} /> : undefined;
                            return (
                                <div key={member.id} className={cn("flex justify-center", member.fullWidth && "sm:col-span-2")}>
                                    <TeamMemberCard 
                                        name={member.name}
                                        role={member.role}
                                        role2={member.role2}
                                        imageUrl={member.imageUrl}
                                        imageHint="staff portrait"
                                        languages={member.languages}
                                        backsideContent={backside}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">Informationen zum Praxispersonal werden in Kürze hier angezeigt.</p>
                )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
