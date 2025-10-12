
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeedButton } from './_components/seed-button';
import { medicalPartnersData, slezakPartner } from './_components/medical-partners-data';

export default function MedicalPartnersPage() {
    const combinedSeedData = [...medicalPartnersData, slezakPartner];

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">Ärztliche Kooperationspartner verwalten</CardTitle>
                    <CardDescription>
                       Benutzen Sie diesen Button, um die initialen Partnerdaten in die Datenbank zu schreiben oder sie zurückzusetzen.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SeedButton
                        collectionName="medicalPartners"
                        seedData={combinedSeedData}
                        entityName="Ärztliche Partner"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
