
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { useState } from 'react';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';


// Platzhalter-Daten für die initiale Anzeige des Editors
const sampleDoctor: Doctor = {
    id: 'sample',
    name: 'Max Mustermann',
    title: 'Dr. med.',
    specialty: 'Facharzt für Allgemeine Innere Medizin',
    qualifications: ['Fähigkeitsausweis Praxislabor (KHM)'],
    vita: '<h4>Curriculum Vitae</h4><p>Hier steht der Lebenslauf des Arztes. Sie können diesen Text bearbeiten, indem Sie auf die Kartenrückseite klicken.</p>',
    imageUrl: '', // Leeres Bild initial
    imageHint: 'portrait placeholder',
    order: 99,
};


export default function DoctorsPage() {
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor>(sampleDoctor);
  const [isImageEditorOpen, setImageEditorOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isVitaEditorOpen, setVitaEditorOpen] = useState(false);

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageToCrop(event.target?.result as string);
                setImageEditorOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setDoctorToEdit(prev => ({ ...prev, imageUrl: croppedImageUrl }));
    setImageEditorOpen(false);
    setImageToCrop(null);
  };

  const handleVitaClick = () => {
    setVitaEditorOpen(true);
  };

  const handleVitaSave = (newVita: string) => {
    setDoctorToEdit(prev => ({ ...prev, vita: newVita }));
    setVitaEditorOpen(false);
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                    Hier können Sie die Profile der Ärzte bearbeiten.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                   <div className="rounded-lg border bg-muted p-4 md:p-6">
                      <EditableDoctorCard 
                          doctor={doctorToEdit}
                          onImageClick={handleImageClick}
                          onVitaClick={handleVitaClick}
                      />
                  </div>
                </div>

                <Separator className="my-12" />

                <div className="space-y-12">
                   <div>
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Aktuell angezeigte Karten</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Dies ist eine Vorschau der Karten, wie sie aktuell auf der "Team"-Seite angezeigt werden.
                        </p>
                   </div>
                    <div className="flex w-full items-center justify-center">
                        <OrtmannsCard />
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <SchemmerCard />
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <RosenovCard />
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <HerschelCard />
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <SlezakCard />
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      {isImageEditorOpen && imageToCrop && (
          <ImageCropDialog
              imageUrl={imageToCrop}
              onCropComplete={handleCropComplete}
              onClose={() => setImageEditorOpen(false)}
          />
      )}
      {isVitaEditorOpen && (
        <VitaEditorDialog
          isOpen={isVitaEditorOpen}
          onOpenChange={setVitaEditorOpen}
          initialValue={doctorToEdit.vita}
          onSave={handleVitaSave}
        />
      )}
  </>
  );
}
