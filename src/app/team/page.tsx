
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard, type Doctor } from './_components/doctor-card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { StaffMember } from '../admin/dashboard/team/staff/_components/staff-editor';
import { cn } from '@/lib/utils';


export default function TeamPage() {
  const firestore = useFirestore();
  
  const doctorsQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
  }, [firestore]);

  const staffQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'staff'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: doctors, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery);
  const { data: staff, isLoading: isLoadingStaff } = useCollection<StaffMember>(staffQuery);

  const visibleDoctors = doctors?.filter(doc => !doc.hidden) || [];
  const visibleStaff = staff?.filter(member => !member.hidden) || [];

  const fullWidthStaff = visibleStaff.filter(s => s.fullWidth);
  const gridStaff = visibleStaff.filter(s => !s.fullWidth);


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
            ) : (
              visibleDoctors.map(doctor => (
                <div key={doctor.id} id={doctor.id.toLowerCase().replace(/ /g, '-')} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                  <DoctorCard {...doctor} />
                </div>
              ))
            )}
            
            <div id="praxispersonal">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">Praxispersonal</h2>
              <div className="mt-2 h-1 w-full bg-primary"></div>
              <p className="mt-4 text-center text-lg text-foreground/80">
                Die guten Geister, ohne die keine Arztpraxis funktioniert
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 border-2 border-red-500">
                {fullWidthStaff.map((member, index) => (
                  <div key={member.id} className={cn("mx-auto flex w-full justify-center border-2 border-yellow-400", fullWidthStaff.length % 2 !== 0 && index === fullWidthStaff.length -1 && "sm:col-span-2")}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-2 border-blue-500">
                  {gridStaff.map((member) => (
                    <div key={member.id} className="mx-auto flex w-full justify-center border-2 border-green-500">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    