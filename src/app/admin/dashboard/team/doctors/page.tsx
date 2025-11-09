'use client';

import React from 'react';
import { DoctorEditor } from './_components/doctor-editor';
import { initialDoctorState, type Doctor } from './_components/editable-doctor-card';
import { DisplayCard } from './_components/display-card';
import ReusableCardManager from '../../../dashboard/_components/reusable-card-manager';

export default function DoctorsPage() {
    return (
         <ReusableCardManager<Doctor>
            collectionName="doctors"
            pageTitle="Ärzte verwalten"
            pageDescription="Erstellen, bearbeiten und ordnen Sie hier die Profilkarten der Ärzte."
            initialCardState={initialDoctorState}
            EditorComponent={DoctorEditor as React.ComponentType<any>} // Cast because of props mismatch for creation
            DisplayCardComponent={DisplayCard}
            entityName="Ärzte"
        />
    );
}
