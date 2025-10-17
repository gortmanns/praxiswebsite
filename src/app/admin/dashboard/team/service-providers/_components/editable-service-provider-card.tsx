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
    onCardClick?: (e: React.MouseEvent) => void;
    isBeingEdited?: boolean;
    showBackside?: boolean;
    showBacksideOnly?: boolean;
}

export const EditableServiceProviderCard: React.FC<EditableServiceProviderCardProps> = ({ provider, onCardClick, isBeingEdited, showBackside = false, showBacksideOnly = false }) => {
    
    const backsideElement = provider.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: provider.backsideContent }} />
    ) : null;

     const cardContent = (
        <TeamMemberCard
            name={provider.name}
            role={provider.role}
            role2={provider.role2}
            imageUrl={provider.imageUrl}
            imageHint="service provider portrait"
            languages={provider.languages}
            backsideContent={backsideElement}
        />
    );

    if (showBacksideOnly) {
         return (
             <div 
                id="card-root"
                className="group relative w-full max-w-sm"
                onClick={onCardClick}
            >
                <div className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-accent/95 text-background shadow-xl aspect-[2/3]">
                    <div className="p-6 text-center text-lg">{backsideElement || <p>Rückseite leer</p>}</div>
                </div>
                 {isBeingEdited && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90 rounded-lg">
                        <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <div 
            id="card-root"
            className={cn(
                "group relative w-full max-w-sm",
                 showBackside && "shadow-lg"
            )}
            onClick={onCardClick}
        >
             {cardContent}
            
            {isBeingEdited && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/90 rounded-lg">
                    <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                </div>
            )}
        </div>
    );
};
