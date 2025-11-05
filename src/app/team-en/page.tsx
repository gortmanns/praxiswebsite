
'use client';

import { TeamMemberCard } from '../team/_components/team-member-card';
import { DoctorCard, type Doctor as DoctorData } from '../team/_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';

interface StaffMember {
    id: string;
    order: number;
    name: string;
    role: string;
    role2?: string;
    imageUrl: string;
    backsideContent?: string;
    languages?: string[];
    hidden?: boolean;
    fullWidth?: boolean;
}

export default function TeamEnPage() {
  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
  }, [firestore]);

  const staffQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'staff'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: doctorsData, isLoading: isLoadingDoctors } = useCollection<DoctorData>(doctorsQuery);
  const { data: staffData, isLoading: isLoadingStaff } = useCollection<StaffMember>(staffQuery);

  const activeDoctors = doctorsData?.filter(d => !d.hidden) || [];
  const activeStaff = staffData?.filter(s => !s.hidden) || [];

  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-16">
        <div id="doctors">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Doctors</h2>
          <div className="mt-2 h-1 w-full bg-primary"></div>
        </div>
        
        <div className="space-y-8">
            {isLoadingDoctors ? (
                Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                        <Skeleton className="w-full aspect-[1000/495]" />
                    </div>
                ))
            ) : activeDoctors.length > 0 ? (
                activeDoctors.map(doctor => (
                    <div key={doctor.id} id={doctor.name.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                    <DoctorCard {...doctor} />
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground">Information about the doctors will be displayed here shortly.</p>
            )}
        </div>
         <div className="text-center pt-8">
             <Link href="/team/externe-dienstleister-en" className="text-primary hover:underline text-lg">
                Click here for our external service providers.
            </Link>
        </div>
        
        <div id="practice-staff">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Practice Staff</h2>
          <div className="mt-2 h-1 w-full bg-primary"></div>
          <p className="mt-4 text-center text-lg text-foreground/80">
            The good spirits without whom no doctor's office can function
          </p>
        </div>
        
        <div className="mt-12">
            {isLoadingStaff ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <Skeleton className="h-[550px] w-full max-w-sm" />
                        </div>
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
                <p className="text-center text-muted-foreground">Information about the practice staff will be displayed here shortly.</p>
            )}
        </div>
      </div>
    </div>
  );
}
