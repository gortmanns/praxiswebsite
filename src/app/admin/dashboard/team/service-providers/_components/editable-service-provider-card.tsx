/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';
import type { ServiceProvider } from '../page';


interface EditableServiceProviderCardProps {
    provider: ServiceProvider;
    isBeingEdited?: boolean;
}

export const EditableServiceProviderCard: React.FC<EditableServiceProviderCardProps> = ({ provider, isBeingEdited }) => {
    
    const backsideElement = provider.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: provider.backsideContent }} />
    ) : null;

    return (
        <div 
            id="card-root"
            className={cn(
                "group relative w-full max-w-sm",
                isBeingEdited && "opacity-50 pointer-events-none grayscale"
            )}
        >
             <TeamMemberCard
                name={provider.name}
                role={provider.role}
                role2={provider.role2}
                imageUrl={provider.imageUrl}
                imageHint="service provider portrait"
                languages={provider.languages}
                backsideContent={backsideElement}
            />
        </div>
    );
};
