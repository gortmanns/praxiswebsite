
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


// Daten von Dr. Ortmanns als initialer Zustand
const ortmannsData: Doctor = {
    id: 'ortmanns',
    title: "Dipl. med.",
    name: "G. Ortmanns",
    imageUrl: "/images/team/Ortmanns.jpg",
    imageHint: "man portrait",
    specialty: "Praktischer Arzt",
    qualifications: [
        'Master of Public Health (UNSW)',
        'Master of Health Management (UNSW)',
    ],
    vita: `
        <h4>Curriculum Vitae</h4>
        <ul>
            <li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li>
            <li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li>
            <li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li>
            <li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li>
            <li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li>
            <li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li>
            <li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
            <li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li>
            <li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li>
            <li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li>
            <li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li>
            <li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li>
            <li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li>
            <li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li>
            <li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li>
        </ul>
        <br>
        <p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>
    `,
    additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
    order: 1,
};


export default function DoctorsPage() {
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor>(ortmannsData);
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
                  <div className="relative rounded-lg border-2 border-dashed border-primary/50 bg-muted p-4 md:p-6">
                      <div className="absolute -top-3 left-4 bg-muted px-2 text-sm font-bold text-primary">
                          Klicken Sie auf ein Element um dieses zu verändern
                      </div>
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
