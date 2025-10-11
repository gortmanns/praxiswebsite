'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'dompurify';
import { User, Languages, Pencil, Image as ImageIcon, ExternalLink, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextEditDialog } from './_components/text-edit-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { LanguageSelectDialog, availableLanguages } from './_components/language-select-dialog';
import { LanguageFlags } from './_components/language-flags';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    [key: string]: any;
}

const CardHtmlRenderer: React.FC<{ html: string; className?: string }> = ({ html, className }) => {
    const sanitizedHtml = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const config = {
                ADD_TAGS: ["svg", "path", "g", "text", "image", "rect", "polygon", "circle", "line", "defs", "clipPath", "style", "img", "foreignObject", "button", "span"],
                ADD_ATTR: ['style', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'font-family', 'font-size', 'font-weight', 'x', 'y', 'dominant-baseline', 'text-anchor', 'aria-label', 'width', 'height', 'alt', 'data-ai-hint', 'class', 'className', 'fill-rule', 'clip-rule', 'id', 'transform', 'points', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'href', 'target', 'rel', 'src', 'preserveAspectRatio', 'type']
            };
            return { __html: DOMPurify.sanitize(html, config) };
        }
        return { __html: '' };
    }, [html]);

    return (
        <div className={className}>
             <div className="w-[1000px] h-[495px]">
                <div dangerouslySetInnerHTML={sanitizedHtml} />
            </div>
        </div>
    );
};


export default function DoctorsPage() {
    const firestore = useFirestore();
    const [dialogState, setDialogState] = useState<{
        type: 'text' | 'vita' | 'language' | 'imageSource' | 'imageLibrary' | 'imageCrop' | null;
        data: any;
    }>({ type: null, data: {} });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const exampleDoctor: Doctor = useMemo(() => ({
        id: "template",
        name: "Template",
        order: 0,
        frontSideCode: `
            <style>
                .template-card button { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; border-radius: 0.25rem; }
                .template-card button:hover:not(.image-button) { background-color: rgba(255,255,255,0.1); }
                .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            </style>
            <div class="template-card group relative w-full max-w-[1000px] aspect-[1000/495] overflow-hidden rounded-lg shadow-sm bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <button id="edit-image" class="image-button relative h-full aspect-[2/3] overflow-hidden rounded-md bg-muted flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="mt-2 text-sm">Zum Ändern klicken</span>
                    </button>
                    <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                        <div>
                             <button id="edit-title" class="text-2xl font-bold text-primary p-1 -m-1 block">Titel</button>
                             <button id="edit-name" class="text-5xl font-bold text-primary my-2 p-1 -m-1 block">Name</button>
                             <button id="edit-specialty" class="text-xl font-bold p-1 -m-1 block">Spezialisierung</button>
                            <div class="mt-6 text-xl space-y-1">
                                <button id="edit-qual1" class="p-1 -m-1 block">Qualifikation 1</button>
                                <button id="edit-qual2" class="p-1 -m-1 block">Qualifikation 2</button>
                                <button id="edit-qual3" class="p-1 -m-1 block">Qualifikation 3</button>
                                <button id="edit-qual4" class="p-1 -m-1 block">Qualifikation 4</button>
                            </div>
                            <div class="mt-6 text-base">
                                <button id="edit-position" class="p-1 -m-1 block">Position oder Logo</button>
                            </div>
                        </div>
                        <div class="absolute bottom-0 right-0">
                           <button id="edit-languages" class="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6-6 6"/><path d="m12 4-6 6 6 6"/><path d="m19 12-6-6 6-6"/></svg>
                                Sprachen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        backSideCode: `
             <style>
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
                .vita-content-button { all: unset; box-sizing: border-box; width: 100%; height: 100%; cursor: pointer; }
                .vita-content-button:hover { background-color: rgba(0,0,0,0.1); }
            </style>
            <button id="edit-vita" class="vita-content-button">
                <div class="vita-content p-8 w-full max-w-[1000px] text-left">
                    <h4>Curriculum Vitae</h4>
                </div>
            </button>
        `
    }), []);
    
    // This is a placeholder for actual image data fetching
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
        // Traverse up the DOM to find the button if a child was clicked
        while (target && target.tagName !== 'BUTTON' && target.id !== 'template-container') {
            target = target.parentElement as HTMLElement;
        }

        if (target && target.id) {
            const id = target.id;
            if (id.startsWith('edit-')) {
                const field = id.replace('edit-', '');
                switch(field) {
                    case 'vita':
                        setDialogState({ type: 'vita', data: { initialValue: '' } });
                        break;
                    case 'languages':
                        setDialogState({ type: 'language', data: { initialLanguages: ['de', 'en'] } });
                        break;
                    case 'image':
                        setDialogState({ type: 'imageSource', data: {} });
                        break;
                    default:
                        setDialogState({ type: 'text', data: { title: `Edit ${field}`, label: field, initialValue: 'Placeholder' } });
                        break;
                }
            }
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        // Reset file input to allow selecting the same file again
        e.target.value = '';
    };

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
                    <div id="template-container" className="w-full rounded-lg border-2 border-dashed border-muted" onClick={handleTemplateClick}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                           <div className="relative aspect-[1000/495] w-full transform-origin-top-left overflow-hidden bg-muted/50">
                                <div className="absolute w-full h-full">
                                    <CardHtmlRenderer html={exampleDoctor.frontSideCode} />
                                </div>
                            </div>
                            <div className="relative aspect-[1000/495] w-full transform-origin-top-left overflow-hidden bg-accent/95">
                                 <div className="absolute w-full h-full">
                                    <CardHtmlRenderer html={exampleDoctor.backSideCode} className="text-background" />
                                 </div>
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
                    initialValue={dialogState.data.initialValue}
                    onSave={(newValue) => console.log('Saved:', newValue)}
                />
            )}

            {dialogState.type === 'vita' && (
                <VitaEditorDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    initialValue={dialogState.data.initialValue}
                    onSave={(newValue) => console.log('Saved vita:', newValue)}
                />
            )}
            
            {dialogState.type === 'language' && (
                <LanguageSelectDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    initialLanguages={dialogState.data.initialLanguages}
                    onSave={(newLanguages) => console.log('Saved languages:', newLanguages)}
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
                        setDialogState({ type: null, data: {} });
                        fileInputRef.current?.click();
                    }}
                    onSelect={() => setDialogState({ type: 'imageLibrary', data: {} })}
                />
            )}

            {dialogState.type === 'imageLibrary' && (
                <ImageLibraryDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    images={projectImages}
                    onImageSelect={(imageUrl) => {
                        setDialogState({ type: null, data: {} }); // Close library
                        setTimeout(() => { // Open cropper after a tick
                             setDialogState({ type: 'imageCrop', data: { imageUrl } })
                        }, 100);
                    }}
                />
            )}

            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialogState.data.imageUrl}
                    aspectRatio={2 / 3}
                    onCropComplete={(croppedImageUrl) => {
                        console.log('Cropped Image URL:', croppedImageUrl);
                        setDialogState({ type: null, data: {} });
                    }}
                    onClose={() => setDialogState({ type: null, data: {} })}
                />
            )}
        </div>
    );
}
