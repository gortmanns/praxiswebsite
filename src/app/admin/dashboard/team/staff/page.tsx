'use client';

import React from 'react';
import { StaffEditor, type StaffMember } from './_components/staff-editor';
import ReusableStaffManager from './_components/reusable-staff-manager';


const initialStaffState: Omit<StaffMember, 'id' | 'order' | 'createdAt'> = {
    name: "Neues Mitglied",
    role: "Funktion",
    imageUrl: "",
    languages: ['de'],
    hidden: false,
    fullWidth: false,
};


export default function StaffPage() {
    return (
         <ReusableStaffManager
            collectionName="staff"
            pageTitle="Praxispersonal verwalten"
            pageDescription="Erstellen, bearbeiten und ordnen Sie hier die Profilkarten der Praxis-Mitarbeiter."
            initialCardState={initialStaffState}
            EditorComponent={StaffEditor}
            entityName="Mitarbeiter"
        />
    );
}
