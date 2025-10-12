
'use client';

import React from 'react';
import { DoctorCard as DisplayCard } from '@/app/team/_components/doctor-card';
import { DoctorEditor as EditorComponent } from './_components/doctor-editor';
import { ReusableCardManager } from '../../_components/reusable-card-manager';
import type { Doctor as CardData } from '@/app/admin/dashboard/team/doctors/_components/doctor-editor';

const initialDoctorState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Arzt",
    languages: ['de'],
    hidden: false,
    frontSideCode: `
        <style>
            .template-card button { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
            .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            .template-card .image-button-background { background-color: white !important; }
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
        </style>
         <div class="template-card w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div id="image-container" class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    <button id="edit-image" class="image-button w-full h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="font-extrabold"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="mt-2 text-sm font-bold">Zum Ändern klicken</span>
                    </button>
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <button id="edit-title" class="w-full text-left">
                            <p class="text-2xl font-bold text-primary">Titel</p>
                        </button>
                        <button id="edit-name" class="w-full text-left">
                            <h3 class="text-5xl font-bold text-primary my-2">Name</h3>
                        </button>
                        <button id="edit-specialty" class="w-full text-left">
                            <p class="text-xl font-bold">Spezialisierung</p>
                        </button>
                        <div class="mt-6 text-xl">
                            <button id="edit-qual1" class="w-full text-left"><p>Qualifikation 1</p></button>
                            <button id="edit-qual2" class="w-full text-left"><p>Qualifikation 2</p></button>
                            <button id="edit-qual3" class="w-full text-left"><p>Qualifikation 3</p></button>
                            <button id="edit-qual4" class="w-full text-left"><p>Qualifikation 4</p></button>
                        </div>
                        <div id="position-container" class="mt-6">
                            <button id="edit-position"><div class="w-full text-left"><p class="text-base">Position oder Logo</p></div></button>
                        </div>
                    </div>
                    <div id="language-container" class="absolute bottom-0 right-0 flex items-center gap-2">
                    </div>
                </div>
            </div>
        </div>
    `,
    backSideCode: `
        <style>
            .vita-content { color: hsl(var(--background)); }
            .vita-content p { margin: 0; }
            .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
            .vita-content li { margin-bottom: 0.5em; }
            .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
            .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            .vita-content span[style*="color: var(--color-tiptap-gray)"] { color: hsl(var(--secondary-foreground)); }
        </style>
        <div class="w-full h-full text-left">
            <button id="edit-vita" class="w-full h-full text-left p-8">
                <div class="vita-content w-full h-full">
                    <h4>Curriculum Vitae</h4>
                    <p>Zum Bearbeiten klicken</p>
                </div>
            </button>
        </div>
    `,
};


export default function DoctorsPage() {
    
    return (
        <ReusableCardManager
            collectionName="doctors"
            pageTitle="Ärzte verwalten"
            pageDescription="Verwalten Sie die auf der Team-Seite angezeigten Ärzte."
            initialCardState={initialDoctorState}
            DisplayCardComponent={DisplayCard}
            EditorCardComponent={EditorComponent}
            entityName="Arzt"
        />
    );
}
