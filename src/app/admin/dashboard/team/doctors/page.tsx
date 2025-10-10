'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';


export default function DoctorsPage() {

  return (
    <>
      <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <div>
                    <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                    <CardDescription>
                    Vorschau der aktuell auf der Webseite angezeigten Ärzte-Karten.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-12">
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
  </>
  );
}
