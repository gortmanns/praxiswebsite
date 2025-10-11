'use client';

import React from 'react';
import { StaffCard as DisplayCard } from './_components/staff-card';
import { StaffEditor as EditorComponent } from './_components/staff-editor';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import type { StaffMember as CardData } from './_components/staff-editor';
import { SeedButton } from './_components/seed-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialStaffState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Mitarbeiter",
    role: "Rolle",
    role2: "",
    imageUrl: "/images/team/placeholder.jpg",
    backsideContent: "<p>Hier klicken, um Text hinzuzufügen.</p>",
    hidden: false,
};


export default function StaffPage() {
    
    return (
        <>
            <div className="p-4 sm:p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Daten-Übertragung</dCardTitle>
                    </CardHeader>
                    <CardContent>
                        <SeedButton collectionName='staff' />
                    </CardContent>
                </Card>
            </div>
            <ReusableCardManager
                collectionName="staff"
                pageTitle="Praxispersonal verwalten"
                pageDescription="Verwalten Sie das auf der Team-Seite angezeigte Praxispersonal."
                initialCardState={initialStaffState}
                DisplayCardComponent={DisplayCard}
                EditorCardComponent={EditorComponent}
                entityName="Mitarbeiter"
            />
        </>
    );
}
