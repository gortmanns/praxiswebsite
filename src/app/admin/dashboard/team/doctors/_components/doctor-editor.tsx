
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { TextEditDialog } from './text-edit-dialog';
import { VitaEditorDialog } from './vita-editor-dialog';
import { LanguageSelectDialog } from './language-select-dialog';
import { ImageSourceDialog } from './image-source-dialog';
import { ImageLibraryDialog } from './image-library-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import { LogoFunctionSelectDialog } from './logo-function-select-dialog';
import { cn } from '@/lib/utils';
import { renderToStaticMarkup } from 'react-dom/server';
import { DeFlag, EnFlag, EsFlag, FrFlag, ItFlag, PtFlag, RuFlag, SqFlag, ArFlag, BsFlag, ZhFlag, DaFlag, FiFlag, ElFlag, HeFlag, HiFlag, JaFlag, KoFlag, HrFlag, NlFlag, NoFlag, FaFlag, PlFlag, PaFlag, RoFlag, SvFlag, SrFlag, TaFlag, CsFlag, TrFlag, UkFlag, HuFlag, UrFlag } from '@/components/logos/flags';
import { useToast } from '@/hooks/use-toast';

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

interface DoctorEditorProps {
    cardData: Doctor;
    onUpdate: (updatedData: Doctor) => void;
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
        window.addEventListener('resize', calculateScale);
        const observer = new MutationObserver(calculateScale);
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        
        return () => {
            window.removeEventListener('resize', calculateScale);
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


export const DoctorEditor: React.FC<DoctorEditorProps> = ({ cardData, onUpdate }) => {
    const storage = useStorage();
    const { toast } = useToast();

    const [dialogState, setDialogState] = useState<{ type: string | null; data: any }>({ type: null, data: {} });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editableCard = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(cardData.frontSideCode, 'text/html');
        
        const langContainer = doc.getElementById('language-container');
        if (langContainer) {
            const langToFlagHtml: Record<string, string> = {
                de: renderToStaticMarkup(React.createElement(DeFlag)), en: renderToStaticMarkup(React.createElement(EnFlag)), fr: renderToStaticMarkup(React.createElement(FrFlag)), it: renderToStaticMarkup(React.createElement(ItFlag)), es: renderToStaticMarkup(React.createElement(EsFlag)), pt: renderToStaticMarkup(React.createElement(PtFlag)), ru: renderToStaticMarkup(React.createElement(RuFlag)), sq: renderToStaticMarkup(React.createElement(SqFlag)), ar: renderToStaticMarkup(React.createElement(ArFlag)), bs: renderToStaticMarkup(React.createElement(BsFlag)), zh: renderToStaticMarkup(React.createElement(ZhFlag)), da: renderToStaticMarkup(React.createElement(DaFlag)), fi: renderToStaticMarkup(React.createElement(FiFlag)), el: renderToStaticMarkup(React.createElement(ElFlag)), he: renderToStaticMarkup(React.createElement(HeFlag)), hi: renderToStaticMarkup(React.createElement(HiFlag)), ja: renderToStaticMarkup(React.createElement(JaFlag)), ko: renderToStaticMarkup(React.createElement(KoFlag)), hr: renderToStaticMarkup(React.createElement(HrFlag)), nl: renderToStaticMarkup(React.createElement(NlFlag)), no: renderToStaticMarkup(React.createElement(NoFlag)), fa: renderToStaticMarkup(React.createElement(FaFlag)), pl: renderToStaticMarkup(React.createElement(PlFlag)), pa: renderToStaticMarkup(React.createElement(PaFlag)), ro: renderToStaticMarkup(React.createElement(RoFlag)), sv: renderToStaticMarkup(React.createElement(SvFlag)), sr: renderToStaticMarkup(React.createElement(SrFlag)), ta: renderToStaticMarkup(React.createElement(TaFlag)), cs: renderToStaticMarkup(React.createElement(CsFlag)), tr: renderToStaticMarkup(React.createElement(TrFlag)), uk: renderToStaticMarkup(React.createElement(UkFlag)), hu: renderToStaticMarkup(React.createElement(HuFlag)), ur: renderToStaticMarkup(React.createElement(UrFlag)),
            };
            const languages = cardData.languages || [];
            const languageOrder = ['de', 'fr', 'it', 'en'];
            const sortedLangs = [...languages].sort((a, b) => {
                const indexA = languageOrder.indexOf(a);
                const indexB = languageOrder.indexOf(b);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
                return a.localeCompare(b);
            });
            const flagsHtml = sortedLangs.map(lang => langToFlagHtml[lang]?.replace('<svg', '<svg class="h-5 w-auto rounded-sm shadow-md"')).join('') || '';
            const buttonHtml = `<button id="edit-languages" style="display: flex; align-items: center; gap: 0.5rem; height: 2rem; padding: 0 0.75rem; font-size: 0.875rem; font-weight: 500; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-radius: 0.375rem;" onmouseover="this.style.backgroundColor='hsl(var(--primary) / 0.9)'" onmouseout="this.style.backgroundColor='hsl(var(--primary))'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg><span>Sprachen</span></button>`;
            langContainer.innerHTML = buttonHtml + flagsHtml;
        }

        return { ...cardData, frontSideCode: doc.body.innerHTML };
    }, [cardData]);
    
    const projectImages = [
        '/images/luftbild.jpg', '/images/VASC-Alliance-Logo.png', '/images/schemmer-worni-logo.png', '/images/go-medical-logo.png', '/images/mcl-labor-logo.png', '/images/doxnet-logo.jpg', '/images/logos/slezak-logo.png', '/images/praxiszentrum-logo.png', '/images/praxiszentrum-logo-icon.png', '/images/mehrfacharzt-logo.png', '/images/rtw-bern.jpg', '/images/medphone_logo.png', '/images/toxinfo-logo.svg', '/images/foto-medis.jpg', '/images/team/Ortmanns.jpg', '/images/team/Prof.Schemmer.jpg', '/images/team/Dr.Rosenov.jpg', '/images/team/Dr.Herschel.jpg', '/images/team/Dr.Slezak.jpg', '/images/team/Garcia.jpg', '/images/team/Aeschlimann.jpg', '/images/team/Huber.jpg', '/images/team/Oetztuerk.jpg', '/images/team/Sommer.jpg', '/images/leistungen/audiometrie.jpg', '/images/leistungen/ekg.jpg', '/images/leistungen/labor.jpg', '/images/leistungen/praxisapotheke.jpg', '/images/leistungen/roentgen.jpg', '/images/leistungen/spirometrie.jpg', '/images/leistungen/twint_logo.png', '/images/leistungen/VMU.png', '/images/leistungen/wundversorgung.jpg',
    ];

    const handleTemplateClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        while (target && !target.id?.startsWith('edit-')) {
            if (target.classList.contains('template-card') || !target.parentElement) return;
            target = target.parentElement;
        }

        if (target?.id?.startsWith('edit-')) {
            e.stopPropagation();
            const field = target.id.replace('edit-', '');
            const openDialog = (type: string, data: any) => setDialogState({ type, data });

            switch(field) {
                case 'vita':
                    openDialog('vita', { initialValue: cardData.backSideCode.includes("Zum Bearbeiten klicken") ? '' : cardData.backSideCode });
                    break;
                case 'languages':
                    openDialog('language', { initialLanguages: cardData.languages || [] });
                    break;
                case 'image':
                    openDialog('imageSource', { field });
                    break;
                case 'position':
                    openDialog('logoFunction', { field });
                    break;
                default: // text fields
                    openDialog('text', { title: `Feld bearbeiten`, label: 'Text', initialValue: target.textContent || '', field });
                    break;
            }
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
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
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return setDialogState({ type: null, data: {} });
        }
    
        const { field = 'image' } = dialogState.data;
        const imagePath = `doctors/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);
    
        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            onUpdate({ ...cardData, frontSideCode: updateHtmlWithImage(cardData.frontSideCode, field, downloadURL) });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
        setDialogState({ type: null, data: {} });
    };

    const updateHtmlWithImage = (html: string, field: string, url: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const containerId = field === 'image' ? 'image-container' : 'position-container';
        const buttonId = field === 'image' ? 'edit-image' : 'edit-position';
        const altText = field === 'image' ? 'Portrait' : 'Logo';
        const objectFitClass = field === 'image' ? 'object-cover' : 'object-contain';
        const customStyle = field === 'position' ? 'max-width: 75%;' : '';

        const container = doc.getElementById(containerId);
        if (container) {
            const newHtml = `<button id="${buttonId}" class="image-button-background w-full h-full relative"><img src="${url}" alt="${altText}" class="h-full w-full ${objectFitClass} relative" style="${customStyle}" /></button>`;
            if (field === 'image') {
                container.innerHTML = newHtml;
            } else {
                container.innerHTML = newHtml;
            }
        }
        return doc.body.innerHTML;
    };

    const handleVitaSave = (newVita: string) => {
        const wrapInButton = (html: string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            if (doc.querySelector('button#edit-vita')) return html;
            
            const style = `<style>.vita-content { color: hsl(var(--background)); } .vita-content p { margin: 0; } .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; } .vita-content li { margin-bottom: 0.5em; } .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; } .vita-content .is-small { font-size: 0.8em; font-weight: normal; } .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); } .vita-content span[style*="color: var(--color-tiptap-gray)"] { color: hsl(var(--secondary-foreground)); }</style>`;
            const contentDiv = `<div class="vita-content w-full h-full">${html}</div>`;
            return `<div class="w-full h-full text-left">${style}<button id="edit-vita" class="w-full h-full text-left p-8">${contentDiv}</button></div>`;
        };
        onUpdate({ ...cardData, backSideCode: wrapInButton(newVita) });
        setDialogState({ type: null, data: {} });
    };

    const handleTextSave = (newValue: string) => {
        const { field } = dialogState.data;
        if (!field) return;
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(cardData.frontSideCode, 'text/html');
        const containerId = field === 'position' ? 'position-container' : `edit-${field}`;
        const container = doc.getElementById(containerId);

        if (container) {
            if (field === 'position') {
                container.innerHTML = `<button id="edit-position" class="w-full text-left"><p class="text-base">${newValue}</p></button>`;
            } else {
                const p = container.querySelector('p') || container.querySelector('h3');
                if (p) p.textContent = newValue;
            }
        }
        onUpdate({ ...cardData, frontSideCode: doc.body.innerHTML });
        setDialogState({ type: null, data: {} });
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardHtmlRenderer html={editableCard.frontSideCode} onClick={handleTemplateClick} />
                <div className="bg-accent/95 rounded-lg">
                    <CardHtmlRenderer html={editableCard.backSideCode} className="text-background" onClick={handleTemplateClick} />
                </div>
            </div>

            {dialogState.type === 'text' && (
                <TextEditDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} {...dialogState.data} onSave={handleTextSave} />
            )}
            {dialogState.type === 'vita' && (
                <VitaEditorDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} {...dialogState.data} onSave={handleVitaSave} />
            )}
            {dialogState.type === 'language' && (
                <LanguageSelectDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} initialLanguages={cardData.languages || []} onSave={(langs) => onUpdate({ ...cardData, languages: langs })} />
            )}
            {dialogState.type === 'logoFunction' && (
                <LogoFunctionSelectDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} onSelectFunction={() => setDialogState({ type: 'text', data: { title: `Funktion bearbeiten`, label: 'Funktion', initialValue: '', field: 'position' } })} onSelectFromLibrary={() => setDialogState(prev => ({ type: 'imageLibrary', data: prev.data }))} onUploadNew={() => fileInputRef.current?.click()} />
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            {dialogState.type === 'imageSource' && (
                <ImageSourceDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} onUpload={() => fileInputRef.current?.click()} onSelect={() => setDialogState(prev => ({ type: 'imageLibrary', data: prev.data }))} />
            )}
            {dialogState.type === 'imageLibrary' && (
                <ImageLibraryDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} images={projectImages} onImageSelect={(imageUrl) => setDialogState({ type: 'imageCrop', data: { ...dialogState.data, imageUrl, aspectRatio: dialogState.data.field === 'position' ? 1600/265 : 2/3 } })} />
            )}
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog {...dialogState.data} onCropComplete={handleCropComplete} onClose={() => setDialogState({ type: null, data: {} })} />
            )}
        </>
    );
};
