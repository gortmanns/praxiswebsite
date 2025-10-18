
'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard } from './_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import { doctors, staff, serviceProviders } from './_components/static-data';
import { cn } from '@/lib/utils';
import React from 'react';

export default function TeamPage() {
  const activeDoctors = doctors.filter(d => !d.hidden);
  const activeStaff = staff.filter(s => !s.hidden);

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
                {activeDoctors.length > 0 ? (
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
                {activeStaff.length > 0 ? (
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
