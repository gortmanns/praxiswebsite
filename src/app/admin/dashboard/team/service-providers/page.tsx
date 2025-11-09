'use client';

import React from 'react';
import { ServiceProviderEditor } from './_components/service-provider-editor';
import { initialServiceProviderState, type ServiceProvider } from './_components/initial-state';
import { DisplayCard } from './_components/display-card';
import ReusableCardManager from '../../../dashboard/_components/reusable-card-manager';

export default function ServiceProvidersPage() {
    return (
         <ReusableCardManager<ServiceProvider>
            collectionName="serviceProviders"
            pageTitle="Externe Dienstleister verwalten"
            pageDescription="Erstellen, bearbeiten und ordnen Sie hier die Profilkarten der externen Dienstleister."
            initialCardState={initialServiceProviderState}
            EditorComponent={ServiceProviderEditor}
            DisplayCardComponent={DisplayCard}
            entityName="Dienstleister"
        />
    );
}
