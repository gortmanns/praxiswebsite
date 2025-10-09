'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { DoctorCard } from '@/app/team/_components/doctor-card';
import { User } from 'lucide-react';

export default function DoctorsPage() {

  return (
    <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                    Hier können Sie Ärzte hinzufügen, bearbeiten und deren Reihenfolge ändern.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 <div className="mx-auto w-full p-2">
                    <DoctorCard
                        title="Titel"
                        name="Name"
                        imageUrl=""
                        imageHint="placeholder"
                        specialty="Fachgebiet"
                        qualifications={[
                            'Sonstige Qualifikation 1',
                            'Sonstige Qualifikation 2',
                            'Sonstige Qualifikation 3',
                            'Sonstige Qualifikation 4',
                        ]}
                        vita={`<p>Vita hier bearbeiten...</p>`}
                        additionalInfo="Spezielle Information"
                    >
                         <div className="flex h-28 w-auto items-center justify-center text-muted-foreground">
                            Logo
                        </div>
                    </DoctorCard>
                 </div>
            </CardContent>
        </Card>

        <div className="w-full space-y-8">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Aktuelle Vorschau
            </h3>
            <div className="space-y-12">
                <div className="mx-auto w-full p-2">
                    <OrtmannsCard />
                </div>
                <div className="mx-auto w-full p-2" id="schemmer">
                    <SchemmerCard />
                </div>
                <div className="mx-auto w-full p-2" id="rosenov">
                    <RosenovCard />
                </div>
                <div className="mx-auto w-full p-2" id="herschel">
                    <HerschelCard />
                </div>
                <div className="mx-auto w-full p-2" id="slezak">
                    <SlezakCard />
                </div>
            </div>
        </div>
    </div>
  );
}
