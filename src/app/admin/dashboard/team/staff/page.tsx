
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
    imageUrl: "/images/team/placeholder.jpg",
    backsideContent: "<p>Hier klicken, um Text hinzuzufügen.</p>",
    hidden: false,
};

const staffSeedData = [
  {
    name: 'Manuela Garcia',
    role: 'Leitende MPA',
    imageUrl: '/images/team/Garcia.jpg',
    backsideContent: 'Manuela Garcia ist die gute Seele der Praxis. Sie sorgt dafür, dass alles rund läuft und hat immer ein offenes Ohr für die Anliegen der Patienten.',
    hidden: false,
  },
  {
    name: 'Jris Aeschlimann',
    role: 'MPA',
    imageUrl: '/images/team/Aeschlimann.jpg',
    backsideContent: '',
    hidden: false,
  },
  {
    name: 'Janine Huber',
    role: 'MPA',
    imageUrl: '/images/team/Huber.jpg',
    backsideContent: '',
    hidden: false,
  },
  {
    name: 'Esma Öztürk',
    role: 'MPA in Ausbildung',
    imageUrl: '/images/team/Oetztuerk.jpg',
    backsideContent: '',
    hidden: false,
  },
  {
    name: 'Elena Sommer',
    role: 'MPA in Ausbildung',
    imageUrl: '/images/team/Sommer.jpg',
    backsideContent: '',
    hidden: false,
  },
];


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
            seedData={staffSeedData}
        />
    );
}

    