'use client';

import React from 'react';
import { PartnerEditor, type Partner } from '../_components/partner-editor';
import { PartnerCard } from '../_components/partner-card';
import ReusableCardManager from '../../../dashboard/_components/reusable-card-manager';

const initialOtherPartnerState: Omit<Partner, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://",
    logoHtml: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>',
    imageUrl: '',
    logoScale: 100,
    logoX: 0,
    logoY: 0,
    openInNewTab: true,
    hidden: false,
};

export default function OtherPartnersPage() {
    return (
         <ReusableCardManager<Partner>
            collectionName="otherPartners"
            pageTitle="Weitere Kooperationspartner verwalten"
            pageDescription="Erstellen, bearbeiten und ordnen Sie hier die Karten der sonstigen Partner."
            initialCardState={initialOtherPartnerState}
            EditorCardComponent={PartnerEditor}
            DisplayCardComponent={PartnerCard}
            entityName="Weiterer Partner"
        />
    );
}
