/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDE OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React from 'react';
import { EditableServiceProviderCard, type ServiceProvider } from './initial-state';

interface DisplayCardProps {
    serviceProvider: ServiceProvider;
    isBeingEdited?: boolean;
}

export const DisplayCard: React.FC<DisplayCardProps> = ({ serviceProvider, isBeingEdited }) => {
    // This component now simply wraps the canonical EditableServiceProviderCard,
    // but without passing the onCardClick handler, making it non-interactive for display.
    return (
        <div className="relative">
            <EditableServiceProviderCard serviceProvider={serviceProvider} />
             {isBeingEdited && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/80">
                    <span className="text-xl font-bold text-primary-foreground">In Bearbeitung</span>
                </div>
            )}
        </div>
    );
};
