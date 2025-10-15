
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard } from './_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Doctor } from './_components/doctor-card';
import type { StaffMember } from '../admin/dashboard/team/staff/_components/staff-editor';
import { cn } from '@/lib/utils';
import React from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';


export default function TeamPage() {
  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'doctors'), where('hidden', '==', false), orderBy('order', 'asc')) : null
  , [firestore]);
  
  const staffQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'staff'), where('hidden', '==', false), orderBy('order', 'asc')) : null
  , [firestore]);
  
  const { data: doctors, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery);
  const { data: staff, isLoading: isLoadingStaff } = useCollection<StaffMember>(staffQuery);

  const staffMembers = staff || [];


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
            
            {isLoadingDoctors ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                        <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                    </div>
                ))
            ) : doctors && doctors.length > 0 ? (
              doctors.map(doctor => (
                <div key={doctor.id} id={doctor.id.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                  <DoctorCard {...doctor} />
                </div>
              ))
            ) : (
                <p className="text-center text-muted-foreground">Informationen zu den Ärzten werden in Kürze hier angezeigt.</p>
            )}
            
            <div id="praxispersonal">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Praxispersonal</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Die guten Geister, ohne die keine Arztpraxis funktioniert
              </p>
            </div>
            
            {isLoadingStaff ? (
                <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                         <Skeleton key={index} className="h-[550px] w-full max-w-sm" />
                    ))}
                </div>
            ) : staffMembers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {staffMembers.map((member) => {
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
      </main>
      <Footer />
    </div>
  );
}
