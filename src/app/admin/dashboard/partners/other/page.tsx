
'use client';

import React from 'react';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import { PartnerCard as DisplayCard } from '../_components/partner-card';
import { PartnerEditor as EditorComponent } from '../_components/partner-editor';
import type { Partner as CardData } from '../_components/partner-editor';


const initialOtherPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
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

export const otherPartnersSeedData = [
    {
      order: 1,
      name: 'Go-Medical',
      websiteUrl: 'https://www.go-medical.ch/',
      logoHtml: '<img src="/images/go-medical-logo.png" alt="Go-Medical Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="medical services logo" />',
      imageUrl: '/images/go-medical-logo.png',
      hidden: false,
    },
    {
      order: 2,
      name: 'MCL',
      websiteUrl: 'https://www.mcl.ch/',
      logoHtml: '<img src="/images/mcl-labor-logo.png" alt="MCL Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="laboratory logo" />',
      imageUrl: '/images/mcl-labor-logo.png',
      hidden: false,
    },
    {
      order: 3,
      name: 'doxnet',
      websiteUrl: 'https://www.doxnet.ch/',
      logoHtml: '<img src="/images/doxnet-logo.jpg" alt="doxnet Logo" style="object-fit: contain; width: 100%; height: 100%;" data-ai-hint="medical network logo" />',
      imageUrl: '/images/doxnet-logo.jpg',
      hidden: false,
    },
];


export default function OtherPartnersPage() {
    return (
        <ReusableCardManager
            collectionName="otherPartners"
            pageTitle="Sonstige Partner verwalten"
            pageDescription="Verwalten Sie die auf der Startseite angezeigten Karten der sonstigen Partner."
            initialCardState={initialOtherPartnerState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Sonstiger Partner"
        />
    );
}
