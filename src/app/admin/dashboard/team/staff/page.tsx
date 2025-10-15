'use client';

import React from 'react';
import { StaffCard as DisplayCard } from './_components/staff-card';
import { StaffEditor as EditorComponent } from './_components/staff-editor';
import { StaffCardManager } from './_components/staff-card-manager';
import type { StaffMember as CardData } from './_components/staff-editor';

const initialStaffState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Name",
    role: "Funktion",
    role2: "",
    imageUrl: "",
    backsideContent: "Zum Bearbeiten klicken",
    languages: ['de'],
    hidden: false,
    fullWidth: false,
};

export default function StaffPage() {
    
    return (
        <StaffCardManager
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
