'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DoctorCardOrtmanns } from '@/app/team/_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from '@/app/team/_components/doctor-card-schemmer';
import { DoctorCardRosenov } from '@/app/team/_components/doctor-card-rosenov';
import { DoctorCardHerschel } from '@/app/team/_components/doctor-card-herschel';
import { DoctorCardSlezak } from '@/app/team/_components/doctor-card-slezak';
import { EditableDoctorCard } from './_components/editable-doctor-card';

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
            </div>

            <Separator className="my-8" />
            
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-primary">Vorschau der bestehenden Ärzte</h3>
              <p className="text-muted-foreground">So erscheinen die Ärzte auf der Team-Seite.</p>
              <div className="mt-6 space-y-8">
                <DoctorCardOrtmanns />
                <DoctorCardSchemmer />
                <DoctorCardRosenov />
                <DoctorCardHerschel />
                <DoctorCardSlezak />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
