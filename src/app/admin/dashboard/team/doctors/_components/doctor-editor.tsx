
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Languages, Type } from 'lucide-react';

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

// Helper function to extract text content
const extractText = (html: string, id: string): string => {
    if (typeof window === 'undefined') return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const element = doc.getElementById(id);
    if(element) {
        const pOrH3 = element.querySelector('p') || element.querySelector('h3');
        return pOrH3?.textContent || '';
    }
    return '';
};


export const DoctorEditor: React.FC<DoctorEditorProps> = ({ cardData, onUpdate }) => {
    const storage = useStorage();
    const { toast } = useToast();

    const [dialogState, setDialogState] = useState<{ type: string | null; data: any }>({ type: null, data: {} });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Memoize extracted text values
    const textFields = useMemo(() => ({
        title: extractText(cardData.frontSideCode, 'edit-title'),
        name: extractText(cardData.frontSideCode, 'edit-name'),
        specialty: extractText(cardData.frontSideCode, 'edit-specialty'),
        qual1: extractText(cardData.frontSideCode, 'edit-qual1'),
        qual2: extractText(cardData.frontSideCode, 'edit-qual2'),
        qual3: extractText(cardData.frontSideCode, 'edit-qual3'),
        qual4: extractText(cardData.frontSideCode, 'edit-qual4'),
        position: extractText(cardData.frontSideCode, 'edit-position'),
    }), [cardData.frontSideCode]);

    const handleTextChange = (field: keyof typeof textFields, value: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(cardData.frontSideCode, 'text/html');
        const element = doc.getElementById(`edit-${field}`);
        if(element) {
            const pOrH3 = element.querySelector('p') || element.querySelector('h3');
            if (pOrH3) {
                pOrH3.textContent = value;
            } else if (field === 'position') {
                 element.innerHTML = `<button id="edit-position" class="w-full text-left"><p class="text-base">${value}</p></button>`;
            }
        }
        onUpdate({ ...cardData, frontSideCode: doc.body.innerHTML });
    };

    const projectImages = [
        '/images/luftbild.jpg', '/images/VASC-Alliance-Logo.png', '/images/schemmer-worni-logo.png', '/images/go-medical-logo.png', '/images/mcl-labor-logo.png', '/images/doxnet-logo.jpg', '/images/logos/slezak-logo.png', '/images/praxiszentrum-logo.png', '/images/praxiszentrum-logo-icon.png', '/images/mehrfacharzt-logo.png', '/images/rtw-bern.jpg', '/images/medphone_logo.png', '/images/toxinfo-logo.svg', '/images/foto-medis.jpg', '/images/team/Ortmanns.jpg', '/images/team/Prof.Schemmer.jpg', '/images/team/Dr.Rosenov.jpg', '/images/team/Dr.Herschel.jpg', '/images/team/Dr.Slezak.jpg', '/images/team/Garcia.jpg', '/images/team/Aeschlimann.jpg', '/images/team/Huber.jpg', '/images/team/Oetztuerk.jpg', '/images/team/Sommer.jpg', '/images/leistungen/audiometrie.jpg', '/images/leistungen/ekg.jpg', '/images/leistungen/labor.jpg', '/images/leistungen/praxisapotheke.jpg', '/images/leistungen/roentgen.jpg', '/images/leistungen/spirometrie.jpg', '/images/leistungen/twint_logo.png', '/images/leistungen/VMU.png', '/images/leistungen/wundversorgung.jpg',
    ];
    
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
        handleTextChange(field, newValue);
        setDialogState({ type: null, data: {} });
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name-input">Name</Label>
                        <Input id="edit-name-input" value={textFields.name} onChange={(e) => handleTextChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-title-input">Titel</Label>
                        <Input id="edit-title-input" value={textFields.title} onChange={(e) => handleTextChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-specialty-input">Spezialisierung</Label>
                        <Input id="edit-specialty-input" value={textFields.specialty} onChange={(e) => handleTextChange('specialty', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-qual1-input">Qualifikation 1</Label>
                            <Input id="edit-qual1-input" value={textFields.qual1} onChange={(e) => handleTextChange('qual1', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-qual2-input">Qualifikation 2</Label>
                            <Input id="edit-qual2-input" value={textFields.qual2} onChange={(e) => handleTextChange('qual2', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-qual3-input">Qualifikation 3</Label>
                            <Input id="edit-qual3-input" value={textFields.qual3} onChange={(e) => handleTextChange('qual3', e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="edit-qual4-input">Qualifikation 4</Label>
                            <Input id="edit-qual4-input" value={textFields.qual4} onChange={(e) => handleTextChange('qual4', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-3 pt-2">
                         <Button variant="outline" size="sm" onClick={() => setDialogState({ type: 'imageSource', data: { field: 'image' } })}>
                            <ImageIcon className="mr-2 h-4 w-4" /> Porträtbild ändern
                        </Button>
                         <Button variant="outline" size="sm" onClick={() => setDialogState({ type: 'logoFunction', data: { field: 'position' } })}>
                            <Type className="mr-2 h-4 w-4" /> Position/Logo ändern
                        </Button>
                         <Button variant="outline" size="sm" onClick={() => setDialogState({ type: 'language', data: {} })}>
                            <Languages className="mr-2 h-4 w-4" /> Sprachen bearbeiten
                        </Button>
                         <Button variant="outline" size="sm" onClick={() => setDialogState({ type: 'vita', data: { initialValue: cardData.backSideCode.includes("Zum Bearbeiten klicken") ? '' : cardData.backSideCode } })}>
                           Text der Rückseite bearbeiten
                        </Button>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <div className="flex-1">
                        <Label className="text-center block mb-2 text-sm font-medium text-muted-foreground">Vorderseite</Label>
                        <CardHtmlRenderer html={cardData.frontSideCode} />
                    </div>
                    <div className="flex-1">
                        <Label className="text-center block mb-2 text-sm font-medium text-muted-foreground">Rückseite</Label>
                         <div className="bg-accent/95 rounded-lg">
                            <CardHtmlRenderer html={cardData.backSideCode} className="text-background" />
                        </div>
                    </div>
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
                <LogoFunctionSelectDialog isOpen={true} onOpenChange={() => setDialogState({ type: null, data: {} })} onSelectFunction={() => setDialogState({ type: 'text', data: { title: `Funktion bearbeiten`, label: 'Funktion', initialValue: textFields.position, field: 'position' } })} onSelectFromLibrary={() => setDialogState(prev => ({ type: 'imageLibrary', data: prev.data }))} onUploadNew={() => fileInputRef.current?.click()} />
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

    