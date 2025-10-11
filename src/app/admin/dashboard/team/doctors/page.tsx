
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


export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
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
        frontSideCode: `
            <style>
                .template-card button { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; border-radius: 0.25rem; display: block; padding: 0.125rem 0.25rem; margin: -0.125rem -0.25rem; }
                .template-card button:hover:not(.image-button) { background-color: rgba(0,0,0,0.1); }
                .template-card .image-button { position: relative; height: 100%; aspect-ratio: 2/3; overflow: hidden; border-radius: 0.375rem; background-color: #f1f5f9; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem; color: #64748b; }
                .template-card .image-button:hover { background-color: rgba(0,0,0,0.2); }
                .template-card .lang-button { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; height: 2.5rem; padding: 0 1rem; font-size: 0.875rem; font-weight: 500; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-radius: 0.375rem; }
                .template-card .lang-button:hover { background-color: hsla(var(--primary), 0.9); }
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
                        <div class="absolute bottom-0 right-0">
                            <button id="edit-languages" class="lang-button">
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
                .vita-content-button { all: unset; box-sizing: border-box; width: 100%; height: 100%; cursor: pointer; display: block; }
                .vita-content-button:hover { background-color: rgba(0,0,0,0.1); }
                .vita-content { color: hsl(var(--background)); }
                .vita-content p { margin: 0; }
                .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            </style>
            <button id="edit-vita" class="vita-content-button">
                <div class="vita-content p-8 w-full h-full text-left">
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
        while (target && (!target.tagName || target.tagName.toLowerCase() !== 'button' || !target.id.startsWith('edit-'))) {
            if (target.classList.contains('template-card')) {
                target = null!;
                break;
            }
            target = target.parentElement as HTMLElement;
        }

        if (target && target.id && target.id.startsWith('edit-')) {
            e.stopPropagation();
            const field = target.id.replace('edit-', '');
            const openDialog = (type: any, data: any) => {
                setDialogState({ type, data });
            };

            switch(field) {
                case 'vita':
                    openDialog('vita', { initialValue: '' });
                    break;
                case 'languages':
                    openDialog('language', { initialLanguages: [] });
                    break;
                case 'image':
                    openDialog('imageSource', {});
                    break;
                case 'position':
                    openDialog('logoFunction', {});
                    break;
                case 'title':
                case 'name':
                case 'specialty':
                case 'qual1':
                case 'qual2':
                case 'qual3':
                case 'qual4':
                    openDialog('text', { title: `Feld bearbeiten`, label: 'Text', initialValue: '' });
                    break;
            }
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio: 2 / 3 } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = (croppedImageUrl: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(exampleDoctor.frontSideCode, 'text/html');
        
        const imageButton = doc.getElementById('edit-image');
        if (imageButton) {
            const newImageDiv = doc.createElement('div');
            newImageDiv.id = 'edit-image'; // Keep the ID for future edits
            newImageDiv.className = 'image-button'; // Keep classes for styling and interactions
            newImageDiv.style.padding = '0'; // Remove padding to let image fill the space

            const img = doc.createElement('img');
            img.src = croppedImageUrl;
            img.alt = "Portrait";
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            newImageDiv.appendChild(img);
            
            imageButton.replaceWith(newImageDiv);
        }
        
        const updatedHtml = doc.body.innerHTML;

        setExampleDoctor(prev => ({
            ...prev,
            frontSideCode: updatedHtml,
        }));
        setDialogState({ type: null, data: {} });
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

            {dialogState.type === 'logoFunction' && (
                <LogoFunctionSelectDialog
                    isOpen={true}
                    onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}
                    onSelectFunction={() => {
                        setDialogState({ type: 'text', data: { title: `Funktion bearbeiten`, label: 'Funktion', initialValue: '' } });
                    }}
                    onSelectFromLibrary={() => {
                        setDialogState({ type: 'imageLibrary', data: {} });
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
                        setDialogState({ type: null, data: {} });
                        setTimeout(() => {
                             setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: 2 / 3 } })
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
