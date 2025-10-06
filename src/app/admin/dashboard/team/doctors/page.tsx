'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DoctorCardOrtmanns } from '@/app/team/_components/doctor-card-ortmanns';
import { DoctorCardSchemmer } from '@/app/team/_components/doctor-card-schemmer';
import { DoctorCardRosenov } from '@/app/team/_components/doctor-card-rosenov';
import { DoctorCardHerschel } from '@/app/team/_components/doctor-card-herschel';
import { DoctorCardSlezak } from '@/app/team/_components/doctor-card-slezak';

export default function DoctorsPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Vorschau der Ärzte-Karten</CardTitle>
          <CardDescription>
            Dies ist eine Vorschau, wie die Ärzte-Profile auf der Team-Seite angezeigt werden. Die Bearbeitung der Inhalte wird in Kürze hier möglich sein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <DoctorCardOrtmanns />
            <DoctorCardSchemmer />
            <DoctorCardRosenov />
            <DoctorCardHerschel />
            <DoctorCardSlezak />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
