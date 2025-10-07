
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
import { DoctorCardOrtmanns } from '@/app/team/_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from '@/app/team/_components/doctor-card-schemmer';
import { DoctorCardRosenov } from '@/app/team/_components/doctor-card-rosenov';
import { DoctorCardHerschel } from '@/app/team/_components/doctor-card-herschel';
import { DoctorCardSlezak } from '@/app/team/_components/doctor-card-slezak';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { doctorBacksides } from '@/app/team/_components/doctor-data';

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-4 border-orange-500 p-2">
                  <div className="border-2 border-orange-500">
                    <DoctorCardOrtmanns />
                  </div>
                  <div className="border-2 border-orange-500 h-full">
                    <Card className="h-full"><CardContent className="p-6">{doctorBacksides.ortmanns}</CardContent></Card>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-4 border-orange-500 p-2">
                  <div className="border-2 border-orange-500">
                    <DoctorCardSchemmer />
                  </div>
                  <div className="border-2 border-orange-500 h-full">
                    <Card className="h-full"><CardContent className="p-6">{doctorBacksides.schemmer}</CardContent></Card>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-4 border-orange-500 p-2">
                  <div className="border-2 border-orange-500">
                    <DoctorCardRosenov />
                  </div>
                  <div className="border-2 border-orange-500 h-full">
                    <Card className="h-full"><CardContent className="p-6">{doctorBacksides.rosenov}</CardContent></Card>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-4 border-orange-500 p-2">
                  <div className="border-2 border-orange-500">
                    <DoctorCardHerschel />
                  </div>
                  <div className="border-2 border-orange-500 h-full">
                    <Card className="h-full"><CardContent className="p-6">{doctorBacksides.herschel}</CardContent></Card>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-4 border-orange-500 p-2">
                  <div className="border-2 border-orange-500">
                    <DoctorCardSlezak />
                  </div>
                  <div className="border-2 border-orange-500 h-full">
                    <Card className="h-full"><CardContent className="p-6">{doctorBacksides.slezak}</CardContent></Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
