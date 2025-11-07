
'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { DoctorCard, Doctor } from './doctor-card';
import { TeamMemberCard } from './team-member-card';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function TeamContent({ isEnglish }: { isEnglish: boolean }) {
  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
  }, [firestore]);

  const staffQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'staff'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: doctors, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery as any);
  const { data: staff, isLoading: isLoadingStaff } = useCollection<StaffMember>(staffQuery as any);

  const activeDoctors = React.useMemo(() => doctors?.filter(d => !d.hidden), [doctors]);
  const activeStaff = React.useMemo(() => staff?.filter(s => !s.hidden), [staff]);

  const renderDoctorSkeletons = () => (
    <div className="space-y-16">
        {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="w-full max-w-[1000px] aspect-[1000/495] mx-auto" />
        ))}
    </div>
  );

  const renderStaffSkeletons = () => (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full max-w-sm h-[550px]" />
          ))}
      </div>
  );

  return (
      <>
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  {isEnglish ? 'OUR DOCTORS' : 'UNSERE ÄRZTINNEN & ÄRZTE'}
              </h2>
          </div>
          <div className="mx-auto mt-16 flex flex-col items-center space-y-16">
              {isLoadingDoctors ? renderDoctorSkeletons() : activeDoctors?.map(doctor => (
                  <DoctorCard key={doctor.id} {...doctor} />
              ))}
          </div>

          <div className="mx-auto mt-24 max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  {isEnglish ? 'OUR PRACTICE TEAM' : 'UNSER PRAXISTEAM'}
              </h2>
          </div>
          <div className="mx-auto mt-16 grid grid-cols-1 items-start justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {isLoadingStaff ? renderStaffSkeletons() : activeStaff?.map(member => (
                    <div key={member.id} className={member.fullWidth ? "sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full flex justify-center" : ""}>
                         <TeamMemberCard
                            name={member.name}
                            role={member.role}
                            role2={member.role2}
                            imageUrl={member.imageUrl}
                            imageHint="staff portrait"
                            languages={member.languages}
                            backsideContent={member.backsideContent ? <div dangerouslySetInnerHTML={{ __html: member.backsideContent }} /> : undefined}
                        />
                    </div>
                ))}
          </div>
      </>
  );
}
