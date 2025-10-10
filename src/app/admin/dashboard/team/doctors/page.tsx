
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Doctor, DoctorCard } from '@/app/team/_components/doctor-card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function DoctorsPage() {
  const firestore = useFirestore();

  const doctorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'doctors'), orderBy('order'));
  }, [firestore]);

  const { data: doctorsData, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery);

  return (
    <>
      <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                    Vorschau der aktuell in der Datenbank gespeicherten Ärzte.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-12">
                {isLoadingDoctors ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex w-full items-center justify-center">
                      <Skeleton className="h-[495px] w-full max-w-[1000px]" />
                    </div>
                  ))
                ) : doctorsData && doctorsData.length > 0 ? (
                  doctorsData.map((doctor) => (
                      <div key={doctor.id} className="flex w-full items-center justify-center">
                        <DoctorCard {...doctor} />
                      </div>
                  ))
                ) : (
                    <p className="text-center text-muted-foreground">Keine Ärzte in der Datenbank gefunden.</p>
                )}
            </div>
            </CardContent>
        </Card>
      </div>
  </>
  );
}
