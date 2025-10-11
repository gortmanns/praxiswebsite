'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { useFirestore, useCollection, useMemoFirebase, useStorage } from '@/firebase';
import { collection, query, orderBy, setDoc, doc, writeBatch, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { TextEditDialog } from './_components/text-edit-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { LanguageSelectDialog } from './_components/language-select-dialog';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { LogoFunctionSelectDialog } from './_components/logo-function-select-dialog';
import { cn } from '@/lib/utils';
import { renderToStaticMarkup } from 'react-dom/server';
import { DeFlag, EnFlag, EsFlag, FrFlag, ItFlag, PtFlag, RuFlag, SqFlag, ArFlag, BsFlag, ZhFlag, DaFlag, FiFlag, ElFlag, HeFlag, HiFlag, JaFlag, KoFlag, HrFlag, NlFlag, NoFlag, FaFlag, PlFlag, PaFlag, RoFlag, SvFlag, SrFlag, TaFlag, CsFlag, TrFlag, UkFlag, HuFlag, UrFlag } from '@/components/logos/flags';
import { ChevronUp, ChevronDown, Pencil, EyeOff, Eye, Globe, Image as ImageIcon, User, Info, Trash2, Plus, Save, XCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    languages?: string[];
    hidden?: boolean;
    createdAt?: any;
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
    const storage = useStorage();
     const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);
    const { data: dbDoctors, isLoading: isLoadingDbDoctors, error: dbError } = useCollection<Doctor>(doctorsQuery);


    const [dialogState, setDialogState] = useState<{
        type: 'text' | 'vita' | 'language' | 'imageSource' | 'imageLibrary' | 'imageCrop' | 'logoFunction' | 'deleteConfirm' | null;
        data: any;
    }>({ type: null, data: {} });

    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    
    const initialExampleDoctorState: Doctor = useMemo(() => ({
        id: "template",
        name: "Template",
        order: 0,
        languages: ['de'],
        frontSideCode: `
            <style>
                .template-card button { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
                .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
                .template-card .image-button-background { background-color: white !important; }
                .template-card p, .template-card h3, .template-card span { margin:0; }
                .template-card .font-headline { font-family: var(--font-headline); }
                .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
                .template-card .bg-card { background-color: hsl(var(--card)); }
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
                .template-card .text-center { text-align: center; }
                .template-card .mt-2 { margin-top: 0.5rem; }
                .template-card .font-extrabold { font-weight: 800; }
                .template-card .bg-white { background-color: white; }
                .template-card .shrink-0 { flex-shrink: 0; }
            </style>
             <div class="template-card w-full h-full bg-card text-card-foreground p-6 font-headline">
                <div class="flex h-full w-full items-start">
                    <div id="image-container" class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0">
                        <button id="edit-image" class="image-button w-full h-full bg-muted flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
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
            </style>
            <div class="w-full h-full text-left">
                <button id="edit-vita" class="w-full h-full text-left p-8">
                    <div class="vita-content w-full h-full">
                        <h4>Curriculum Vitae</h4>
                        <p>Zum Bearbeiten klicken</p>
                    </div>
                </button>
            </div>
        `
    }), []);

    const [editorCardState, setEditorCardState] = useState<Doctor>(initialExampleDoctorState);
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

    useEffect(() => {
        const langToFlagHtml: Record<string, string> = {
            de: renderToStaticMarkup(React.createElement(DeFlag)),
            en: renderToStaticMarkup(React.createElement(EnFlag)),
            fr: renderToStaticMarkup(React.createElement(FrFlag)),
            it: renderToStaticMarkup(React.createElement(ItFlag)),
            es: renderToStaticMarkup(React.createElement(EsFlag)),
            pt: renderToStaticMarkup(React.createElement(PtFlag)),
            ru: renderToStaticMarkup(React.createElement(RuFlag)),
            sq: renderToStaticMarkup(React.createElement(SqFlag)),
            ar: renderToStaticMarkup(React.createElement(ArFlag)),
            bs: renderToStaticMarkup(React.createElement(BsFlag)),
            zh: renderToStaticMarkup(React.createElement(ZhFlag)),
            da: renderToStaticMarkup(React.createElement(DaFlag)),
            fi: renderToStaticMarkup(React.createElement(FiFlag)),
            el: renderToStaticMarkup(React.createElement(ElFlag)),
            he: renderToStaticMarkup(React.createElement(HeFlag)),
            hi: renderToStaticMarkup(React.createElement(HiFlag)),
            ja: renderToStaticMarkup(React.createElement(JaFlag)),
            ko: renderToStaticMarkup(React.createElement(KoFlag)),
            hr: renderToStaticMarkup(React.createElement(HrFlag)),
            nl: renderToStaticMarkup(React.createElement(NlFlag)),
            no: renderToStaticMarkup(React.createElement(NoFlag)),
            fa: renderToStaticMarkup(React.createElement(FaFlag)),
            pl: renderToStaticMarkup(React.createElement(PlFlag)),
            pa: renderToStaticMarkup(React.createElement(PaFlag)),
            ro: renderToStaticMarkup(React.createElement(RoFlag)),
            sv: renderToStaticMarkup(React.createElement(SvFlag)),
            sr: renderToStaticMarkup(React.createElement(SrFlag)),
            ta: renderToStaticMarkup(React.createElement(TaFlag)),
            cs: renderToStaticMarkup(React.createElement(CsFlag)),
            tr: renderToStaticMarkup(React.createElement(TrFlag)),
            uk: renderToStaticMarkup(React.createElement(UkFlag)),
            hu: renderToStaticMarkup(React.createElement(HuFlag)),
            ur: renderToStaticMarkup(React.createElement(UrFlag)),
        };

        const languages = editorCardState.languages || [];
        const languageOrder = ['de', 'fr', 'it', 'en', 'es', 'pt', 'ru'];

        const sortedLangs = [...languages].sort((a, b) => {
            const indexA = languageOrder.indexOf(a);
            const indexB = languageOrder.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });

        const flagsHtml = sortedLangs.map(lang => {
            const flagHtml = langToFlagHtml[lang];
            if (!flagHtml) return '';
            return flagHtml.replace('<svg', '<svg class="h-5 w-auto rounded-sm shadow-md"');
        }).join('');

        const buttonHtml = `<button id="edit-languages" style="display: flex; align-items: center; gap: 0.5rem; height: 2rem; padding: 0 0.75rem; font-size: 0.875rem; font-weight: 500; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-radius: 0.375rem;" onmouseover="this.style.backgroundColor='hsl(var(--primary) / 0.9)'" onmouseout="this.style.backgroundColor='hsl(var(--primary))'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span>Sprachen</span>
        </button>`;
        
        const parser = new DOMParser();
        const docParser = parser.parseFromString(editorCardState.frontSideCode, 'text/html');
        const langContainer = docParser.getElementById('language-container');
        
        if (langContainer) {
            langContainer.innerHTML = buttonHtml + flagsHtml;
            const updatedCode = docParser.body.innerHTML;
            if (editorCardState.frontSideCode !== updatedCode) {
                 setEditorCardState(prev => ({ ...prev, frontSideCode: updatedCode }));
            }
        }
    }, [editorCardState.languages, editorCardState.frontSideCode]);

    const handleTemplateClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        while (target && !target.id.startsWith('edit-')) {
            if (target.classList.contains('template-card') || target.parentElement === null) {
                return;
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
                    openDialog('vita', { initialValue: editorCardState.backSideCode.includes("Zum Bearbeiten klicken") ? '' : editorCardState.backSideCode });
                    break;
                case 'languages':
                     openDialog('language', { 
                        initialLanguages: editorCardState.languages || [] 
                    });
                    break;
                case 'image':
                    openDialog('imageSource', { field });
                    break;
                case 'position':
                     openDialog('logoFunction', { field });
                    break;
                case 'title':
                case 'name':
                case 'specialty':
                case 'qual1':
                case 'qual2':
                case 'qual3':
                case 'qual4':
                    openDialog('text', { title: `Feld bearbeiten`, label: 'Text', initialValue: target.textContent || '', field });
                    break;
            }
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const { field } = dialogState.data;
                const aspectRatio = field === 'position' ? 1600/265 : 2/3;
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio, field } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = async (croppedImageUrl: string) => {
        if (!storage) return;

        const field = dialogState.data.field || 'image';
        const imagePath = `doctors/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);

            setEditorCardState(prev => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(prev.frontSideCode, 'text/html');
                
                if (field === 'image') {
                    const imageContainer = doc.getElementById('image-container');
                    if (imageContainer) {
                         imageContainer.innerHTML = `
                            <button id="edit-image" class="image-button-background w-full h-full relative">
                                <img src="${downloadURL}" alt="Portrait" class="h-full w-full object-cover relative" />
                            </button>`;
                    }
                } else {
                    const positionContainer = doc.getElementById('position-container');
                     if (positionContainer) {
                        positionContainer.innerHTML = `
                            <button id="edit-position" class="image-button-background">
                                <div class="relative">
                                    <img src="${downloadURL}" alt="Logo" class="h-auto object-contain relative" style="max-width: 75%;" />
                                </div>
                            </button>`;
                    }
                }
                
                return { ...prev, frontSideCode: doc.body.innerHTML };
            });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
        
        setDialogState({ type: null, data: {} });
    };

    const handleVitaSave = (newVita: string) => {
        let contentToSave = newVita;
        
        const wrapInButton = (html: string) => {
            if (html.trim().startsWith('<button id="edit-vita"')) return html;
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const style = `<style>.vita-content { color: hsl(var(--background)); } .vita-content p { margin: 0; } .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; } .vita-content li { margin-bottom: 0.5em; } .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; } .vita-content .is-small { font-size: 0.8em; font-weight: normal; } .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }</style>`;
            
            const contentDiv = `<div class="vita-content w-full h-full">${html}</div>`;
            const button = `<button id="edit-vita" class="w-full h-full text-left p-8">${contentDiv}</button>`;
            return `<div class="w-full h-full text-left">${style}${button}</div>`;
        }

        contentToSave = wrapInButton(newVita);
        setEditorCardState(prev => ({ ...prev, backSideCode: contentToSave }));
        setDialogState({ type: null, data: {} });
    };

    const handleTextSave = (newValue: string) => {
        const field = dialogState.data.field;
        if (!field) return;
        
        setEditorCardState(prev => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(prev.frontSideCode, 'text/html');
            
            if(field === 'position') {
                const container = doc.getElementById('position-container');
                 if (container) {
                    container.innerHTML = `<button id="edit-position" class="w-full text-left"><p class="text-base">${newValue}</p></button>`;
                }
            } else {
                let button = doc.getElementById(`edit-${field}`);
                if (button) {
                    const p = button.querySelector('p') || button.querySelector('h3');
                    if (p) {
                        p.textContent = newValue;
                    }
                }
            }
            return { ...prev, frontSideCode: doc.body.innerHTML };
        });
        setDialogState({ type: null, data: {} });
    };

    const handleLanguageSave = (selectedLanguages: string[]) => {
        setEditorCardState(prev => ({ ...prev, languages: selectedLanguages }));
        setDialogState({ type: null, data: {} });
    };
    
    const handleMove = async (doctorId: string, direction: 'up' | 'down') => {
        if (!dbDoctors || !firestore) return;
    
        const visibleDoctors = dbDoctors.filter(d => !d.hidden);
        const currentIndex = visibleDoctors.findIndex(doc => doc.id === doctorId);
    
        if (direction === 'up' && currentIndex > 0) {
            const doc1 = visibleDoctors[currentIndex];
            const doc2 = visibleDoctors[currentIndex - 1];
            const batch = writeBatch(firestore);
            const doc1Ref = doc(firestore, 'doctors', doc1.id);
            const doc2Ref = doc(firestore, 'doctors', doc2.id);
            batch.update(doc1Ref, { order: doc2.order });
            batch.update(doc2Ref, { order: doc1.order });
            await batch.commit();
        } else if (direction === 'down' && currentIndex < visibleDoctors.length - 1) {
            const doc1 = visibleDoctors[currentIndex];
            const doc2 = visibleDoctors[currentIndex + 1];
            const batch = writeBatch(firestore);
            const doc1Ref = doc(firestore, 'doctors', doc1.id);
            const doc2Ref = doc(firestore, 'doctors', doc2.id);
            batch.update(doc1Ref, { order: doc2.order });
            batch.update(doc2Ref, { order: doc1.order });
            await batch.commit();
        }
    };

    const handleEdit = (doctor: Doctor) => {
        setEditingDoctorId(doctor.id);
        setEditorCardState(doctor);
    };

    const handleDelete = async (doctorId: string) => {
        if (!firestore) return;
        const docRef = doc(firestore, 'doctors', doctorId);
        await deleteDoc(docRef);
        setDialogState({ type: null, data: {} });
    };

    const handleToggleHidden = async (doctor: Doctor) => {
        if (!firestore) return;
        const docRef = doc(firestore, 'doctors', doctor.id);
        await setDoc(docRef, { hidden: !doctor.hidden }, { merge: true });
    };

    const handleSaveChanges = async () => {
        if (!firestore || !dbDoctors) return;

        // Clean up the HTML before saving
        const parser = new DOMParser();
        const docParser = parser.parseFromString(editorCardState.frontSideCode, 'text/html');
        docParser.querySelectorAll('button[id^="edit-"]').forEach(button => {
            // Replace button with its content
            const parent = button.parentElement;
            if (parent) {
                while(button.firstChild) {
                    parent.insertBefore(button.firstChild, button);
                }
                parent.removeChild(button);
            }
        });
        
        const cleanedFrontSideCode = docParser.body.innerHTML;
        const finalCardData = { ...editorCardState, frontSideCode: cleanedFrontSideCode };

        if (editingDoctorId) {
            // Update existing document
            const docRef = doc(firestore, 'doctors', editingDoctorId);
            await setDoc(docRef, finalCardData, { merge: true });
        } else {
            // Create new document
            const highestOrder = dbDoctors.reduce((max, doc) => doc.order > max ? doc.order : max, 0);
            const newDoctorData: Omit<Doctor, 'id'> = {
                name: editorCardState.name === 'Template' ? 'Neuer Arzt' : editorCardState.name,
                frontSideCode: finalCardData.frontSideCode,
                backSideCode: editorCardState.backSideCode,
                languages: editorCardState.languages || [],
                order: highestOrder + 1,
                createdAt: serverTimestamp(),
                hidden: false,
            };
            const newDocRef = await addDoc(collection(firestore, 'doctors'), newDoctorData);
            await setDoc(newDocRef, { id: newDocRef.id }, { merge: true });
        }

        setEditingDoctorId(null);
        setEditorCardState(initialExampleDoctorState);
    };

    const handleCreateNew = () => {
        setEditingDoctorId(null);
        setEditorCardState(initialExampleDoctorState);
    };


    const handleCancelEdit = () => {
        setEditingDoctorId(null);
        setEditorCardState(initialExampleDoctorState);
    };

    const visibleDoctors = useMemo(() => dbDoctors?.filter(d => !d.hidden) || [], [dbDoctors]);
    const hiddenDoctors = useMemo(() => dbDoctors?.filter(d => d.hidden) || [], [dbDoctors]);

    useEffect(() => {
        const currentDoc = dbDoctors?.find(d => d.id === editingDoctorId);
        if (currentDoc) {
            setEditorCardState(currentDoc);
        } else if (editingDoctorId === null) {
            setEditorCardState(initialExampleDoctorState);
        }
    }, [editingDoctorId, dbDoctors, initialExampleDoctorState]);

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                            <CardDescription>
                                Verwalten Sie die auf der Team-Seite angezeigten Ärzte. Klicken Sie auf ein Element, um es zu bearbeiten.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                             {editingDoctorId !== null || editorCardState.id === 'template' ? (
                                <>
                                    <Button onClick={handleSaveChanges}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {editingDoctorId ? 'Änderungen speichern' : 'Neue Karte speichern'}
                                    </Button>
                                    <Button variant="outline" onClick={handleCancelEdit}>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Bearbeitung abbrechen
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleCreateNew}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Neue Karte erstellen
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-full rounded-lg border-2 border-dashed border-muted p-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CardHtmlRenderer html={editorCardState.frontSideCode} onClick={handleTemplateClick} />
                            <div className="bg-accent/95 rounded-lg">
                                <CardHtmlRenderer html={editorCardState.backSideCode} className="text-background" onClick={handleTemplateClick} />
                            </div>
                       </div>
                        <Alert variant="info" className="mt-4">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Bearbeitungsmodus</AlertTitle>
                            <AlertDescription>
                                {editingDoctorId ? `Sie bearbeiten gerade die Karte von ${editorCardState.name}.` : 'Erstellen Sie eine neue Karte. Klicken Sie auf Elemente, um sie zu bearbeiten.'}
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Aktive Ärztekarten</h3>
                         <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten so an, wie sie live aus der Firestore-Datenbank geladen werden.
                        </p>
                    </div>
                     <div className="mt-8 space-y-12">
                        {isLoadingDbDoctors && (
                            Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="flex w-full items-center justify-center gap-4">
                                    <div className="w-36 flex-shrink-0"></div>
                                    <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                        <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                                    </div>
                                </div>
                            ))
                        )}
                        {dbError && <p className="text-destructive">Fehler beim Laden der Daten: {dbError.message}</p>}
                        {!isLoadingDbDoctors && visibleDoctors.map((doctor, index) => (
                            <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                <div className="flex w-36 flex-shrink-0 flex-col items-center justify-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => handleMove(doctor.id, 'up')} disabled={index === 0 || !!editingDoctorId || editorCardState.id !== 'template'}>
                                        <ChevronUp className="h-4 w-4" />
                                        <span className="sr-only">Nach oben</span>
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleMove(doctor.id, 'down')} disabled={index === visibleDoctors.length - 1 || !!editingDoctorId || editorCardState.id !== 'template'}>
                                        <ChevronDown className="h-4 w-4" />
                                        <span className="sr-only">Nach unten</span>
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleToggleHidden(doctor)} disabled={!!editingDoctorId || editorCardState.id !== 'template'}>
                                        <EyeOff className="h-4 w-4" />
                                        <span className="sr-only">Ausblenden</span>
                                    </Button>
                                     <Button variant="outline" size="icon" onClick={() => handleEdit(doctor)} disabled={!!editingDoctorId || editorCardState.id !== 'template'}>
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Bearbeiten</span>
                                    </Button>
                                </div>
                                <div className={cn("relative flex-1 w-full max-w-[1000px] p-2 rounded-lg border-2", editingDoctorId === doctor.id ? 'border-primary' : 'border-transparent')}>
                                    <EditableDoctorCard 
                                      doctor={doctor} 
                                      onVitaClick={() => {
                                        if (editingDoctorId === doctor.id) {
                                            setDialogState({ type: 'vita', data: { initialValue: doctor.backSideCode }})
                                        }
                                      }}
                                      isBeingEdited={editingDoctorId === doctor.id}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {hiddenDoctors.length > 0 && (
                        <>
                            <div className="mt-16 space-y-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Ausgeblendete Ärztekarten</h3>
                            </div>
                            <div className="mt-8 space-y-12">
                                {hiddenDoctors.map((doctor) => (
                                    <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                        <div className="flex w-36 flex-shrink-0 flex-col items-center justify-center gap-2">
                                            <Button variant="outline" size="icon" onClick={() => handleToggleHidden(doctor)} disabled={!!editingDoctorId || editorCardState.id !== 'template'}>
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">Einblenden</span>
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => handleEdit(doctor)} disabled={!!editingDoctorId || editorCardState.id !== 'template'}>
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Bearbeiten</span>
                                            </Button>
                                             <Button variant="destructive" size="icon" onClick={() => setDialogState({ type: 'deleteConfirm', data: { doctorId: doctor.id, doctorName: doctor.name } })} disabled={!!editingDoctorId || editorCardState.id !== 'template'}>
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Löschen</span>
                                            </Button>
                                        </div>
                                        <div className={cn("relative flex-1 w-full max-w-[1000px] p-2 rounded-lg border-2 grayscale", editingDoctorId === doctor.id ? 'border-primary' : 'border-transparent')}>
                                            <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} isBeingEdited={editingDoctorId === doctor.id} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

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
                    initialLanguages={editorCardState.languages || []}
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
                       setDialogState(prev => ({ type: 'imageLibrary', data: { ...prev.data } }));
                    }}
                    onUploadNew={() => {
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
                        const { field } = dialogState.data;
                        const aspectRatio = field === 'position' ? 1600/265 : 2/3;
                        setDialogState({ type: null, data: {} });
                        setTimeout(() => {
                             setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio, field } })
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

            {dialogState.type === 'deleteConfirm' && (
                <AlertDialog open={true} onOpenChange={(isOpen) => !isOpen && setDialogState({ type: null, data: {} })}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Möchten Sie die Karte für <strong>{dialogState.data.doctorName}</strong> wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(dialogState.data.doctorId)} className={cn(buttonVariants({ variant: "destructive" }))}>Löschen</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
