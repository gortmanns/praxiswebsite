
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

const sampleDoctor: Omit<Doctor, 'id'> = {
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
  vita: `<p>Vita hier bearbeiten...</p>`,
  imageUrl: '',
  imageHint: 'placeholder',
  order: 0,
};

export default function DoctorsPage() {

  const handleSave = async (doctorData: Omit<Doctor, 'id'>) => {
    console.log("Saving doctor:", doctorData);
    // Placeholder for save logic
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  
  const handleCancel = () => {
    console.log("Cancel edit");
  };

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
                      doctor={sampleDoctor as Doctor}
                      onSave={handleSave}
                      onCancel={handleCancel}
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
