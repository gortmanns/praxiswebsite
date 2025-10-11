'use client';

import React from 'react';
import { PartnerCard as DisplayCard } from './_components/partner-card';
import { PartnerEditor as EditorComponent } from './_components/partner-editor';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import type { Partner as CardData } from './_components/partner-card';
import { SeedButton } from './_components/seed-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://example.com",
    logoUrl: "https://picsum.photos/seed/otherpartner/400/130",
    width: 400,
    height: 130,
    hint: "partner logo",
    hidden: false,
};

export default function OtherPartnersPage() {
    return (
        <>
            <div className="p-4 sm:p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Daten-Übertragung</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SeedButton collectionName='otherPartners' />
                    </CardContent>
                </Card>
            </div>
            <ReusableCardManager
                collectionName="otherPartners"
                pageTitle="Sonstige Kooperationspartner"
                pageDescription="Verwalten Sie die sonstigen Kooperationspartner, die auf der Startseite angezeigt werden."
                initialCardState={initialPartnerState}
                DisplayCardComponent={DisplayCard}
                EditorCardComponent={EditorComponent}
                entityName="Partner"
            />
        </>
    );
}
