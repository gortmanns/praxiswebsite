
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { DoctorCard, type Doctor } from '@/app/team/_components/doctor-card';
import { User } from 'lucide-react';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';

const sampleDoctor: Doctor = {
  id: 'sample',
  title: 'Titel',
  name: 'Name',
  specialty: 'Fachgebiet',
  qualifications: [
    'Sonstige Qualifikation 1',
    'Sonstige Qualifikation 2',
    'Sonstige Qualifikation 3',
    'Sonstige Qualifikation 4',
  ],
  additionalInfo: 'Spezielle Information (alternativ zum Logo)',
  vita: `<p>Vita hier bearbeiten...</p>
         <p>Dies ist die Rückseite der Karte. Der Inhalt hier kann gescrollt werden, wenn er zu lang wird.</p>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
        `,
  imageUrl: '',
  imageHint: 'placeholder',
  order: 0,
};

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
                    <EditableDoctorCard 
                      doctor={sampleDoctor}
                    />
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
