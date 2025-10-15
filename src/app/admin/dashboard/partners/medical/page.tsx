
/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React from 'react';
import ReusableCardManager from '../../_components/reusable-card-manager';
import { PartnerCard as DisplayCard } from '../_components/partner-card';
import { PartnerEditor as EditorComponent } from '../_components/partner-editor';
import type { Partner as CardData } from '../_components/partner-editor';

const initialMedicalPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://",
    logoHtml: `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`,
    imageUrl: "",
    openInNewTab: true,
    hidden: false,
    logoScale: 100,
    logoX: 0,
    logoY: 0,
};

export default function MedicalPartnersPage() {
    return (
        <ReusableCardManager
            collectionName="medicalPartners"
            pageTitle="Kooperationspartner-Karten Ärzte verwalten"
            pageDescription=""
            initialCardState={initialMedicalPartnerState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Ärztlicher Partner"
        />
    );
}


