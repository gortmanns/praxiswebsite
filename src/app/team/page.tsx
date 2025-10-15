
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard } from './_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Doctor } from './_components/doctor-card';
import type { StaffMember } from '../admin/dashboard/team/staff/_components/staff-editor';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';


export default function TeamPage() {
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        setDoctors([]);
        setIsLoadingDoctors(false);
    }, 500);
     setTimeout(() => {
        setStaff([]);
        setIsLoadingStaff(false);
    }, 500);
  }, []);

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
            ) : visibleDoctors.length > 0 ? (
              visibleDoctors.map(doctor => (
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
                <div className="space-y-12">
                    <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
                        <Skeleton className="h-[550px] w-full max-w-sm" />
                        <Skeleton className="h-[550px] w-full max-w-sm" />
                    </div>
                </div>
            ) : visibleStaff.length > 0 ? (
                <div className="space-y-12">
                  {fullWidthStaff.length > 0 && (
                    <div className={cn("grid w-full grid-cols-1 justify-items-center gap-8", fullWidthStaff.length > 0 && "sm:grid-cols-2")}>
                      {fullWidthStaff.map((member, index) => (
                        <div key={member.id} className={cn("mx-auto flex w-full justify-center", fullWidthStaff.length % 2 !== 0 && index === fullWidthStaff.length - 1 && "sm:col-span-2")}>
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
                  )}
                  {gridStaff.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {gridStaff.map((member) => (
                          <div key={member.id} className="mx-auto flex w-full justify-center">
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
                  )}
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
