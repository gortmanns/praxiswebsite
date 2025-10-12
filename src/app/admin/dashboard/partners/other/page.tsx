
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SeedButton } from '../medical/_components/seed-button'; // Re-using the same seed button component
import { otherPartnersSeedData } from './_components/other-partners-data';


export default function OtherPartnersPage() {
    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-primary">Sonstige Kooperationspartner verwalten</CardTitle>
                    <CardDescription>
                       Benutzen Sie diesen Button, um die initialen Partnerdaten in die Datenbank zu schreiben oder sie zurückzusetzen.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SeedButton
                        collectionName="otherPartners"
                        seedData={otherPartnersSeedData}
                        entityName="Sonstige Partner"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
