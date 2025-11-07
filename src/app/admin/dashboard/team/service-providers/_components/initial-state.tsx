/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// 1. Define a clear data structure for the card
export interface ServiceProvider {
    id: string;
    order: number;
    name: string;
    title?: string;
    specialty?: string;
    imageUrl?: string;
    positionText?: string;
    positionImageUrl?: string;
    logoScale?: number;
    languages: string[];
    hidden: boolean;
    websiteUrl?: string;
    openInNewTab?: boolean;
    createdAt?: any;
    _dialog?: { type: string; data: any };
    // Deprecated fields, no longer used for rendering but might exist in old DB entries
    frontSideCode?: string;
    backSideCode?: string;
}

// 2. Define the initial state for a new card using this data structure
export const initialServiceProviderState: Omit<ServiceProvider, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Dienstleister",
    title: "Titel",
    specialty: "Spezialisierung",
    languages: ['de'],
    hidden: false,
    websiteUrl: "https://",
    openInNewTab: true,
    imageUrl: '',
    positionText: 'Position oder Logo',
    positionImageUrl: '',
    logoScale: 100,
};


// 3. Create a single, reliable component that builds the card from the data structure
interface EditableServiceProviderCardProps {
    serviceProvider: ServiceProvider;
    onCardClick?: (e: React.MouseEvent) => void;
}

export const EditableServiceProviderCard: React.FC<EditableServiceProviderCardProps> = ({ serviceProvider, onCardClick }) => {
    const logoScale = serviceProvider.logoScale || 100;
    const logoStyle = {
        transform: `scale(${logoScale / 100})`,
        transformOrigin: 'left center',
    };

    return (
        <div id="card-root" className="template-card w-full h-full bg-background text-card-foreground p-6 font-headline" onClick={onCardClick}>
            <style>{templateStyles}</style>
            <div className="flex h-full w-full items-start">
                {/* Image Section */}
                <div id="image-container" className="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    <div id="edit-image" className="image-button w-full h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        {serviceProvider.imageUrl ? (
                            <Image src={serviceProvider.imageUrl} alt={`Portrait von ${serviceProvider.name}`} fill className="object-cover" />
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="font-extrabold"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span className="mt-2 text-sm font-bold">Zum Ändern klicken</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Text Section */}
                <div className="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div id="edit-title" className="w-full text-left">
                            <p className="text-2xl font-bold text-primary">{serviceProvider.title || 'Titel'}</p>
                        </div>
                        <div id="edit-name" className="w-full text-left">
                            <h3 className="text-5xl font-bold text-primary my-2">{serviceProvider.name || 'Name'}</h3>
                        </div>
                        <div id="edit-specialty" className="w-full text-left">
                            <p className="text-xl font-bold">{serviceProvider.specialty || 'Spezialisierung'}</p>
                        </div>
                        <div id="position-container" className="mt-6">
                            <div id="edit-position">
                                {serviceProvider.positionImageUrl ? (
                                    <div className="w-full text-left h-[50px] relative" style={logoStyle}>
                                        <Image src={serviceProvider.positionImageUrl} alt="Position Logo" layout="fill" objectFit="contain" className="object-left"/>
                                    </div>
                                ) : (
                                    <div className="w-full text-left"><p className="text-base">{serviceProvider.positionText || 'Position oder Logo'}</p></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Centralized styles for the template
const templateStyles = `
    .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
    .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
    .template-card .image-button-background { background-color: white; }
    .template-card p, .template-card h3, .template-card span { margin:0; }
    .template-card .font-headline { font-family: var(--font-headline); }
    .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
    .template-card .bg-background { background-color: hsl(var(--background)); }
    .template-card .p-6 { padding: 1.5rem; }
    .template-card .flex { display: flex; }
    .template-card .h-full { height: 100%; }
    .template-card .w-full { width: 100%; }
    .template-card .items-start { align-items: flex-start; }
    .template-card .relative { position: relative; }
    .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
    .template-card .overflow-hidden { overflow: hidden; }
    .template-card .rounded-md { border-radius: 0.375rem; }
    .template-card .flex-grow { flex-grow: 1; }
    .template-card .flex-col { flex-direction: column; }
    .template-card .justify-center { justify-content: center; }
    .template-card .ml-6 { margin-left: 1.5rem; }
    .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .template-card .font-bold { font-weight: 700; }
    .template-card .text-primary { color: hsl(var(--primary)); }
    .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .template-card .text-5xl { font-size: 3rem; line-height: 1; }
    .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .template-card .mt-6 { margin-top: 1.5rem; }
    .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
    .template-card .text-left { text-align: left; }
    .template-card .absolute { position: absolute; }
    .template-card .bottom-0 { bottom: 0; }
    .template-card .right-0 { right: 0; }
    .template-card .items-center { align-items: center; }
    .template-card .gap-2 { gap: 0.5rem; }
    .template-card .object-contain { object-fit: contain; }
    .template-card .object-cover { object-fit: cover; }
    .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
    .template-card .bg-muted { background-color: hsl(var(--muted)); }
    .template-card .text-center { text-align: center; }
    .template-card .mt-2 { margin-top: 0.5rem; }
    .template-card .font-extrabold { font-weight: 800; }
    .template-card .bg-white { background-color: white; }
    .template-card .shrink-0 { flex-shrink: 0; }
`;

    