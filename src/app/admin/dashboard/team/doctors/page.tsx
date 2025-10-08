'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DoctorCard } from '@/app/team/_components/doctor-card';
import { doctors } from '@/app/team/_components/doctors-data';


export default function DoctorsPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
          <CardDescription>
            Hier können Sie Ärzte hinzufügen, bearbeiten und eine Vorschau der Profile auf der Team-Seite sehen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-primary">Neuen Arzt erfassen</h3>
                <p className="text-muted-foreground">Füllen Sie die Felder aus, um einen neuen Arzt hinzuzufügen.</p>
                <div className="mt-6">
                 <EditableDoctorCard />
                </div>
                <Alert variant="info" className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                        Jede Information dieser Karte kann durch Anklicken des entsprechenden Elements geändert werden. Die Änderungen werden erst nach dem Klick auf einen finalen Speicher-Button übernommen.
                    </AlertDescription>
                </Alert>
            </div>

            <Separator className="my-8" />
            
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-primary">Vorschau der bestehenden Ärzte</h3>
              <p className="text-muted-foreground">So erscheinen die Ärzte auf der Team-Seite.</p>
              <div className="mt-6 space-y-8">
                {doctors.map((doctor) => (
                   <div key={doctor.id} className="mx-auto max-w-[1000px] p-2">
                       <DoctorCard {...doctor} />
                   </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
