
'use client';

import React from 'react';
import { StaffCard as DisplayCard } from './_components/staff-card';
import { StaffEditor as EditorComponent } from './_components/staff-editor';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import type { StaffMember as CardData } from './_components/staff-editor';

const initialStaffState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Mitarbeiter",
    role: "Rolle",
    role2: "",
    imageUrl: "https://picsum.photos/seed/placeholder/400/600",
    backsideContent: "<p>Hier klicken, um Text hinzuzufügen.</p>",
    hidden: false,
    fullWidth: false,
};

export default function StaffPage() {
    
    return (
        <ReusableCardManager
            collectionName="staff"
            pageTitle="Praxispersonal verwalten"
            pageDescription="Verwalten Sie das auf der Team-Seite angezeigte Praxispersonal."
            initialCardState={initialStaffState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Mitarbeiter"
        />
    );
}
