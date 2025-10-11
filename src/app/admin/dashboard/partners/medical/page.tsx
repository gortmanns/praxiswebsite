
'use client';

import React from 'react';
import { PartnerCard as DisplayCard } from './_components/partner-card';
import { PartnerEditor as EditorComponent } from './_components/partner-editor';
import { ReusableCardManager } from '../../../_components/reusable-card-manager';
import type { Partner as CardData } from './_components/partner-card';

const initialPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://example.com",
    logoUrl: "https://picsum.photos/seed/partner/400/130",
    width: 400,
    height: 130,
    hint: "partner logo",
    hidden: false,
};

export default function MedicalPartnersPage() {
    return (
        <ReusableCardManager
            collectionName="medicalPartners"
            pageTitle="Ärztliche Kooperationspartner"
            pageDescription="Verwalten Sie die ärztlichen Kooperationspartner, die auf der Startseite angezeigt werden."
            initialCardState={initialPartnerState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Partner"
        />
    );
}
