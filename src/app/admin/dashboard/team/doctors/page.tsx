'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, setDoc, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { TextEditDialog } from './_components/text-edit-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { LanguageSelectDialog } from './_components/language-select-dialog';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { LogoFunctionSelectDialog } from './_components/logo-function-select-dialog';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { DeFlag, EnFlag, FrFlag, ItFlag, EsFlag, PtFlag, RuFlag, SqFlag, ArFlag, BsFlag, ZhFlag, DaFlag, FiFlag, ElFlag, HeFlag, HiFlag, JaFlag, KoFlag, HrFlag, NlFlag, NoFlag, FaFlag, PlFlag, PaFlag, RoFlag, SvFlag, SrFlag, TaFlag, CsFlag, TrFlag, UkFlag, HuFlag, UrFlag } from '@/components/logos/flags';


export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    languages?: string[];
    [key: string]: any;
}

const CardHtmlRenderer: React.FC<{ html: string; className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ html, className, onClick }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            if (wrapperRef.current) {
                const parentWidth = wrapperRef.current.offsetWidth;
                if (parentWidth > 0) {
                   setScale(parentWidth / 1000);
                }
            }
        };

        calculateScale();
        const handleResize = () => calculateScale();
        window.addEventListener('resize', handleResize);

        const sidebar = document.querySelector('[data-sidebar="sidebar"]');
        if (!sidebar) return;
        
        const observer = new MutationObserver(handleResize);
        observer.observe(sidebar, { attributes: true, attributeFilter: ['style', 'class', 'data-state'] });
        
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={wrapperRef} className={cn("relative w-full aspect-[1000/495] overflow-hidden", className)} onClick={onClick}>
             <div 
                className="absolute top-0 left-0 origin-top-left"
                style={{ 
                    width: '1000px', 
                    height: '495px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};


export default function DoctorsPage() {
    const firestore = useFirestore();
    const [dialogState, setDialogState] = useState<{
        type: 'text' | 'vita' | 'language' | 'imageSource' | 'imageLibrary' | 'imageCrop' | 'logoFunction' | null;
        data: any;
    }>({ type: null, data: {} });
    
    const [exampleDoctor, setExampleDoctor] = useState<Doctor>({
        id: "template",
        name: "Template",
        order: 0,
        languages: ['de'],
        frontSideCode: `
            <style>
                .template-card button { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; border-radius: 0.25rem; display: block; padding: 0.125rem 0.25rem; margin: -0.125rem -0.25rem; }
                .template-card button:hover:not(.image-button) { background-color: rgba(0,0,0,0.1); }
                .template-card .image-button { position: relative; height: 100%; aspect-ratio: 2/3; overflow: hidden; border-radius: 0.375rem; background-color: #f1f5f9; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem; color: #64748b; }
                .template-card .image-button img { width: 100%; height: 100%; object-fit: cover; }
                .template-card .image-button:hover { background-color: rgba(0,0,0,0.2); }
                .template-card .lang-button-container { display: flex; align-items: center; gap: 0.5rem; }
                .template-card .lang-button:hover { background-color: hsla(var(--primary-foreground), 0.1); }
                .template-card p, .template-card h3 { padding: 0.125rem 0.25rem; margin: 0; }
                .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
                .template-card .text-5xl { font-size: 3rem; line-height: 1; }
                .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
                .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
                .template-card .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                .template-card .font-bold { font-weight: 700; }
                .template-card .text-primary { color: hsl(var(--primary)); }
                .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
                .template-card .mt-2 { margin-top: 0.5rem; }
                .template-card .mt-6 { margin-top: 1.5rem; }
                .template-card .ml-6 { margin-left: 1.5rem; }
                .template-card .flex { display: flex; }
                .template-card .flex-col { flex-direction: column; }
                .template-card .flex-grow { flex-grow: 1; }
                .template-card .items-start { align-items: flex-start; }
                .template-card .items-center { align-items: center; }
                .template-card .justify-center { justify-content: center; }
                .template-card .relative { position: relative; }
                .template-card .absolute { position: absolute; }
                .template-card .bottom-0 { bottom: 0; }
                .template-card .right-0 { right: 0; }
                .template-card .h-full { height: 100%; }
                .template-card .w-full { width: 100%; }
                .template-card .gap-2 { gap: 0.5rem; }
            </style>
            <div class="template-card group relative w-full h-full overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <button id="edit-image" class="image-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="mt-2 text-sm">Zum Ändern klicken</span>
                    </button>
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
                            <div class="mt-6 text-base">
                                <button id="edit-position" class="w-full text-left"><p>Position oder Logo</p></button>
                            </div>
                        </div>
                        <div id="language-container" class="absolute bottom-0 right-0 flex items-center gap-2">
                             <button id="edit-languages" class="lang-button inline-flex items-center justify-center gap-2 h-8 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                Sprachen
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
             <style>
                .vita-content-button { all: unset; box-sizing: border-box; width: 100%; height: 100%; cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; }
                .vita-content-button:hover { background-color: rgba(0,0,0,0.1); }
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            </style>
            <button id="edit-vita" class="vita-content-button">
                <div class="vita-content p-8">
                    <h4>Curriculum Vitae</h4>
                    <p>Zum Bearbeiten klicken</p>
                </div>
            </button>
        `
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const projectImages = [
        '/images/luftbild.jpg',
        '/images/VASC-Alliance-Logo.png',
        '/images/schemmer-worni-logo.png',
        '/images/go-medical-logo.png',
        '/images/mcl-labor-logo.png',
        '/images/doxnet-logo.jpg',
        '/images/logos/slezak-logo.png',
        '/images/praxiszentrum-logo.png',
        '/images/praxiszentrum-logo-icon.png',
        '/images/mehrfacharzt-logo.png',
        '/images/rtw-bern.jpg',
        '/images/medphone_logo.png',
        '/images/toxinfo-logo.svg',
        '/images/foto-medis.jpg',
        '/images/team/Ortmanns.jpg', 
        '/images/team/Prof.Schemmer.jpg', 
        '/images/team/Dr.Rosenov.jpg',
        '/images/team/Dr.Herschel.jpg',
        '/images/team/Dr.Slezak.jpg',
        '/images/team/Garcia.jpg',
        '/images/team/Aeschlimann.jpg',
        '/images/team/Huber.jpg',
        '/images/team/Oetztuerk.jpg',
        '/images/team/Sommer.jpg',
        '/images/leistungen/audiometrie.jpg',
        '/images/leistungen/ekg.jpg',
        '/images/leistungen/labor.jpg',
        '/images/leistungen/praxisapotheke.jpg',
        '/images/leistungen/roentgen.jpg',
        '/images/leistungen/spirometrie.jpg',
        '/images/leistungen/twint_logo.png',
        '/images/leistungen/VMU.png',
        '/images/leistungen/wundversorgung.jpg',
    ];

    const handleTemplateClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        // Traverse up the DOM to find the button with the ID
        while (target && !target.id.startsWith('edit-')) {
            if (target.classList.contains('template-card') || target.parentElement === null) {
                // Stop if we reach the card's root or the top of the tree
                return;
            }
            target = target.parentElement;
        }

        if (target && target.id && target.id.startsWith('edit-')) {
            e.stopPropagation();
            const field = target.id.replace('edit-', '');
            const openDialog = (type: any, data: any) => {
                setDialogState({ type, data });
            };

            switch(field) {
                case 'vita':
                    openDialog('vita', { initialValue: exampleDoctor.backSideCode.includes("Zum Bearbeiten klicken") ? '' : exampleDoctor.backSideCode });
                    break;
                case 'languages':
                     openDialog('language', { 
                        initialLanguages: exampleDoctor.languages || ['de'] 
                    });
                    break;
                case 'image':
                    openDialog('imageSource', { field, aspectRatio: 2/3 });
                    break;
                case 'position':
                    openDialog('logoFunction', { field, aspectRatio: 1600/265 });
                    break;
                case 'title':
                case 'name':
                case 'specialty':
                case 'qual1':
                case 'qual2':
                case 'qual3':
                case 'qual4':
                    openDialog('text', { title: `Feld bearbeiten`, label: 'Text', initialValue: '', field });
                    break;
            }
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const aspectRatio = dialogState.data.aspectRatio || 2/3;
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio, field: dialogState.data.field } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = (croppedImageUrl: string) => {
        const field = dialogState.data.field || 'image';
        const parser = new DOMParser();
        const doc = parser.parseFromString(exampleDoctor.frontSideCode, 'text/html');
        
        const targetButton = doc.getElementById(`edit-${field}`);
        if (targetButton) {
            if (field === 'image') {
              targetButton.innerHTML = `<img src="${croppedImageUrl}" alt="Neues Bild" style="width: 100%; height: 100%; object-fit: cover;" />`;
              targetButton.style.padding = '0';
            } else { // It's a logo
              targetButton.innerHTML = `<img src="${croppedImageUrl}" alt="Neues Logo" style="height: auto; width: 75%; max-width: 75%; object-fit: contain; background: transparent;" />`;
              targetButton.style.textAlign = 'left';
              targetButton.style.justifyContent = 'flex-start';
            }
        }
        
        const updatedHtml = doc.body.innerHTML;

        setExampleDoctor(prev => ({
            ...prev,
            frontSideCode: updatedHtml,
        }));
        setDialogState({ type: null, data: {} });
    };

    const handleVitaSave = (newVita: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(exampleDoctor.backSideCode, 'text/html');
        const button = doc.getElementById('edit-vita');
        if (button) {
            // Re-create the inner div with content
            const vitaContainer = doc.createElement('div');
            vitaContainer.className = 'vita-content p-8';
            vitaContainer.innerHTML = newVita;
            
            // Clear the button and append the new structure
            button.innerHTML = '';
            button.appendChild(vitaContainer);
        }
        
        const updatedHtml = doc.body.innerHTML;
        
        setExampleDoctor(prev => ({
            ...prev,
            backSideCode: updatedHtml,
        }));
    };

    const handleTextSave = (newValue: string) => {
        const field = dialogState.data.field;
        if (!field) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(exampleDoctor.frontSideCode, 'text/html');
        const button = doc.getElementById(`edit-${field}`);
        
        if (button) {
            if (field === 'position') {
                 button.innerHTML = `<p class="text-base">${newValue}</p>`;
            } else {
                const p = button.querySelector('p') || button.querySelector('h3');
                if (p) {
                    p.textContent = newValue;
                }
            }
        }
        const updatedHtml = doc.body.innerHTML;
        setExampleDoctor(prev => ({ ...prev, frontSideCode: updatedHtml }));
        setDialogState({ type: null, data: {} });
    };

    const handleLanguageSave = (selectedLanguages: string[]) => {
        setExampleDoctor(prev => ({ ...prev, languages: selectedLanguages }));
        
        const langToFlagHtml: Record<string, string> = {
            de: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>`,
            en: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" class="h-5 w-auto rounded-sm shadow-md"><clipPath id="a-lang-en"><path d="M30 15h30v15zv-15z"></path></clipPath><path d="M0 0v30h60V0z" fill="#012169"></path><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"></path><path d="M0 0l60 30m0-30L0 30" clip-path="url(#a-lang-en)" stroke="#C8102E" stroke-width="4"></path><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"></path><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"></path></svg>`,
            fr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ED2939" d="M0 0h3v2H0z"></path><path fill="#fff" d="M0 0h2v2H0z"></path><path fill="#002395" d="M0 0h1v2H0z"></path></svg>`,
            it: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#008C45" d="M0 0h1v2H0z"></path><path fill="#F4F5F0" d="M1 0h1v2H1z"></path><path fill="#CD212A" d="M2 0h1v2H2z"></path></svg>`,
            es: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#c60b1e" d="M0 0h3v2H0z"></path><path fill="#ffc400" d="M0 .5h3v1H0z"></path></svg>`,
            pt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#006233" d="M0 0h1.2v2H0z"></path><path fill="#D21034" d="M1.2 0H3v2H1.2z"></path></svg>`,
            ru: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h9v3H0z"/><path fill="#d52b1e" d="M0 3h9v3H0z"/><path fill="#0039a6" d="M0 2h9v2H0z"/></svg>`,
            sq: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 5" class="h-5 w-auto rounded-sm shadow-md"><path d="M0 0h7v5H0z" fill="#e41e20"/><path d="M3.5 1.93L2.56 1.5 2.5 1.25l.44.63-.94.32.94.31-.44.63.06-.25.94-.43zm0 1.14L2.56 2.64l-.06.25.44-.63.94-.31-.94-.32.44-.63.06.25.94.43z" fill="#000"/></svg>`,
            ar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#007a3d" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 .67h3v.67H0z"/><path fill="#000" d="M0 1.33h3v.67H0z"/><path fill="red" d="M0 0v2l1-1z"/></svg>`,
            bs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" class="h-5 w-auto rounded-sm shadow-md"><path fill="#002395" d="M0 0h20v10H0z"/><path fill="#fecb00" d="M4 0L20 8V10L4 2z"/><path fill="#fff" d="M3.5 1.5l1 3h-3zM5.5 2.5l1 3h-3zM7.5 3.5l1 3h-3zM9.5 4.5l1 3h-3zM11.5 5.5l1 3h-3zM13.5 6.5l1 3h-3zM15.5 7.5l1 3h-3z"/></svg>`,
            zh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ee1c25" d="M0 0h3v2H0z"/><path fill="#ff0" d="M.5.5l.2.6L1 .6l-.2.5.5.2-.6.2.2.5-.5-.2-.5.2.2-.5-.6-.2.5-.2zM1.2 1l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.6 1.2l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.6.8l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1zM1.2.6l.1.2.2-.1-.1.2.2.1-.2-.1-.1.2.1.1-.2-.1.1-.2-.2-.1.2-.1z"/></svg>`,
            da: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28" class="h-5 w-auto rounded-sm shadow-md"><path fill="#c60b1e" d="M0 0h37v28H0z"/><path fill="#fff" d="M12 0h4v28h-4zM0 12h37v4H0z"/></svg>`,
            fi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h18v11H0z"/><path fill="#002f6c" d="M5 0h3v11H5zM0 4h18v3H0z"/></svg>`,
            el: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 18" class="h-5 w-auto rounded-sm shadow-md"><path fill="#0d5eaf" d="M0 0h27v18H0z"/><path fill="#fff" d="M0 2h27v2H0zm0 4h27v2H0zm0 4h27v2H0zm0 4h27v2H0z"/><path fill="#0d5eaf" d="M0 0h10v10H0z"/><path fill="#fff" d="M4 0h2v10H4zM0 4h10v2H0z"/></svg>`,
            he: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h11v8H0z"/><path fill="#0038b8" d="M0 0h11v1H0zm0 7h11v1H0zm4.5 3.5l1-1.73 1 1.73H4.5zm1-2.73l-1-1.73h2z"/></svg>`,
            hi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#f93" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 .67h3v.67H0z"/><path fill="#128807" d="M0 1.33h3v.67H0z"/><circle cx="1.5" cy="1" r=".3" fill="none" stroke="#000080" stroke-width=".05"/><path d="M1.5 1l.29.07m-.29-.07l.27.12m-.27-.12l.24.18m-.24-.18l.18.24m-.18-.24l.12.27m-.12-.27l.07.29m-.07-.29l-.07.29m.07-.29l-.12.27m.12-.27l-.18.24m.18-.24l-.24.18m.24-.18l-.27.12m.27-.12l-.29.07" stroke="#000080" stroke-width=".025" stroke-linecap="round"/></svg>`,
            ja: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h3v2H0z"/><circle cx="1.5" cy="1" r=".6" fill="#bc002d"/></svg>`,
            ko: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h3v2H0z"/><circle cx="1.5" cy="1" r=".5" fill="#cd2e3a"/><path d="M1.5 1a.5.5 0 000-1 .25.25 0 000 .5.25.25 0 010 .5z" fill="#0047a0"/><g fill="#000"><path d="M.2.3h.2v.2H.2zm0 .2h.2v.2H.2zM.4.3h.2v.2H.4zm2 .8h.2v.2H2.6zm0 .2h.2v.2H2.6zm-.2.2h.2v.2H2.4zM.2.9h.2v.2H.2zm0 .2h.2v.2H.2zM.4.9h.2v.2H.4zm2-1.2h.2v.2H2.6zm0 .2h.2v.2H2.6zm-.2-.2h.2v.2H2.4z"/></g></svg>`,
            hr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ff0000" d="M0 0h2v1H0z"/><path fill="#fff" d="M0 .333h2v.333H0z"/><path fill="#0000ff" d="M0 .667h2v.333H0z"/><path d="M1 .37a.16.16 0 100 .26.16.16 0 100-.26z" fill="#ff0000" stroke="#fff" stroke-width=".04"/></svg>`,
            nl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#21468B" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 0h3v1.33H0z"/><path fill="#AE1C28" d="M0 0h3v.67H0z"/></svg>`,
            no: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16" class="h-5 w-auto rounded-sm shadow-md"><path fill="#ba0c2f" d="M0 0h22v16H0z"/><path fill="#fff" d="M6 0h4v16H6zM0 6h22v4H0z"/><path fill="#00205b" d="M7 0h2v16H7zM0 7h22v2H0z"/></svg>`,
            fa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" class="h-5 w-auto rounded-sm shadow-md"><path fill="#239f40" d="M0 0h7v4H0z"/><path fill="#da0000" d="M0 2.67h7v1.33H0z"/><path fill="#fff" d="M0 1.33h7v1.33H0z"/><path d="M3.5 1.6a.2.2 0 00-.2.2.2.2 0 10.4 0 .2.2 0 00-.2-.2m0 .1a.1.1 0 110 .2.1.1 0 010-.2" fill="#da0000"/></svg>`,
            pl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h8v5H0z"/><path fill="#dc143c" d="M0 2.5h8v2.5H0z"/></svg>`,
            pa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path d="M0 0h3v2H0z" fill="#008000"/><path d="M0 1h3v1H0z" fill="#f93"/><circle r=".4" cx="1.5" cy="1" fill="#00f" stroke="#fff" stroke-width=".1"/></svg>`,
            ro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#002B7F" d="M0 0h1v2H0z"/><path fill="#FCD116" d="M1 0h1v2H1z"/><path fill="#CE1126" d="M2 0h1v2H2z"/></svg>`,
            sv: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" class="h-5 w-auto rounded-sm shadow-md"><path fill="#006aa7" d="M0 0h16v10H0z"/><path fill="#fecc00" d="M5 0h2v10H5zM0 4h16v2H0z"/></svg>`,
            sr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#C6363C" d="M0 0h3v.67H0z"/><path fill="#0C4076" d="M0 .67h3v.67H0z"/><path fill="#fff" d="M0 1.33h3V2H0z"/></svg>`,
            ta: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><path fill="#f93" d="M0 0h5v1H0z"/><path fill="green" d="M0 2h5v1H0z"/><path d="M0 1h5v1H0z" fill="#fff"/><circle cx="2.5" cy="1.5" r=".4" fill="#00f" stroke="#fff" stroke-width=".1"/></svg>`,
            cs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#fff" d="M0 0h3v1H0z"/><path fill="#d7141a" d="M0 1h3v1H0z"/><path fill="#11457e" d="M0 0v2l1.5-1z"/></svg>`,
            tr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#e30a17" d="M0 0h3v2H0z"/><circle cx="1.125" cy="1" r=".5" fill="#fff"/><path d="M1.25 1a.4.4 0 100-.8.5.5 0 010 .8z" fill="#fff"/><path d="M1.375 1l.1-.3.1.3-.2-.2z" fill="#e30a17"/></svg>`,
            uk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#0057b7" d="M0 0h3v2H0z"/><path fill="#ffd700" d="M0 1h3v1H0z"/></svg>`,
            hu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#436F4D" d="M0 1.33h3V2H0z"/><path fill="#fff" d="M0 .67h3v.66H0z"/><path fill="#CD2A3E" d="M0 0h3v.67H0z"/></svg>`,
            ur: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" class="h-5 w-auto rounded-sm shadow-md"><path fill="#006600" d="M0 0h3v2H0z"/><path fill="#fff" d="M.75 0h.5v2h-.5z"/><circle cx="1.75" cy="1" r=".4" fill="#fff"/><path d="M1.88 1a.3.3 0 100-.6.4.4 0 010 .6z" fill="#006600"/><path d="M2.2 1l-.2-.1.1.2-.1-.2z" fill="#fff"/></svg>`,
        };

        const languageOrder = ['de', 'fr', 'it', 'en', 'es', 'pt', 'ru'];
        const sortedLangs = [...selectedLanguages].sort((a, b) => {
            const indexA = languageOrder.indexOf(a);
            const indexB = languageOrder.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });

        const flagsHtml = sortedLangs.map(lang => langToFlagHtml[lang] || '').join('');
        
        const buttonHtml = `<button id="edit-languages" class="lang-button inline-flex items-center justify-center gap-2 h-8 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            Sprachen
        </button>`;

        const newHtml = `${buttonHtml}${flagsHtml}`;
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(exampleDoctor.frontSideCode, 'text/html');
        const langContainer = doc.getElementById('language-container');
        if (langContainer) {
            langContainer.innerHTML = newHtml;
        }

        setExampleDoctor(prev => ({
            ...prev,
            frontSideCode: doc.body.innerHTML,
        }));
        setDialogState({ type: null, data: {} });
    };
    
    useEffect(() => {
        // Run on mount to apply initial languages
        handleLanguageSave(exampleDoctor.languages || ['de']);
    }, []);

    const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);

    const { data: dbDoctors, isLoading: isLoadingDbDoctors, error: dbError } = useCollection<Doctor>(doctorsQuery);

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                            <CardDescription>
                                Verwalten Sie die auf der Team-Seite angezeigten Ärzte.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div id="template-container" className="w-full rounded-lg border-2 border-dashed border-muted p-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CardHtmlRenderer html={exampleDoctor.frontSideCode} onClick={handleTemplateClick} />
                            <div className="bg-accent/95 rounded-lg">
                                <CardHtmlRenderer html={exampleDoctor.backSideCode} className="text-background" onClick={handleTemplateClick} />
                            </div>
                       </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Datenbank Ärztekarten</h3>
                         <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten so an, wie sie live aus der Firestore-Datenbank geladen werden.
                        </p>
                    </div>
                     <div className="mt-8 space-y-12">
                        {isLoadingDbDoctors && (
                            Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="flex w-full items-center justify-center gap-4">
                                    <div className="w-36"></div>
                                    <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                        <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                                    </div>
                                </div>
                            ))
                        )}
                        {dbError && <p className="text-destructive">Fehler beim Laden der Daten: {dbError.message}</p>}
                        {!isLoadingDbDoctors && dbDoctors?.map(doctor => (
                            <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                <div className="w-36"></div>
                                <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                    <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Lokale Ärztekarten (Vergleich)</h3>
                         <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten so an, wie sie aus der lokalen Datei `doctor-cards-data.ts` geladen werden.
                        </p>
                    </div>
                     <div className="mt-8 space-y-12">
                        {DOCTOR_CARDS_INITIAL_DATA.map(doctor => (
                            <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                    <div className="w-36"></div>
                                <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                        <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} />
                                </div>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>

            {dialogState.type === 'text' && (
                <TextEditDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    title={dialogState.data.title}
                    label={dialogState.data.label}
                    initialValue={dialogState.data.initialValue || ''}
                    onSave={handleTextSave}
                />
            )}

            {dialogState.type === 'vita' && (
                <VitaEditorDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    initialValue={dialogState.data.initialValue}
                    onSave={handleVitaSave}
                />
            )}
            
            {dialogState.type === 'language' && (
                <LanguageSelectDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    initialLanguages={dialogState.data.initialLanguages}
                    onSave={handleLanguageSave}
                />
            )}

            {dialogState.type === 'logoFunction' && (
                <LogoFunctionSelectDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    onSelectFunction={() => {
                        setDialogState({ type: 'text', data: { title: `Funktion bearbeiten`, label: 'Funktion', initialValue: '', field: 'position' } });
                    }}
                    onSelectFromLibrary={() => {
                        setDialogState({ type: 'imageLibrary', data: { field: 'position', aspectRatio: 1600/265 } });
                    }}
                    onUploadNew={() => {
                        setDialogState({ type: null, data: {} });
                        fileInputRef.current?.click();
                    }}
                />
            )}
            
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />
            {dialogState.type === 'imageSource' && (
                <ImageSourceDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    onUpload={() => {
                        fileInputRef.current?.click();
                    }}
                    onSelect={() => setDialogState(prev => ({ type: 'imageLibrary', data: { ...prev.data } }))}
                />
            )}

            {dialogState.type === 'imageLibrary' && (
                <ImageLibraryDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    images={projectImages}
                    onImageSelect={(imageUrl) => {
                        const { field, aspectRatio } = dialogState.data;
                        setDialogState({ type: null, data: {} });
                        setTimeout(() => {
                             setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: aspectRatio || 2/3, field } })
                        }, 100);
                    }}
                />
            )}

            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialogState.data.imageUrl}
                    aspectRatio={dialogState.data.aspectRatio}
                    onCropComplete={handleCropComplete}
                    onClose={() => setDialogState({ type: null, data: {} })}
                />
            )}
        </div>
    );
}
