
'use client';

import React, { useState, useMemo, useRef } from 'react';
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
import { EditableDoctorCard } from './editable-doctor-card';
import { useToast } from '@/hooks/use-toast';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import type { Doctor } from './editable-doctor-card';

interface DoctorEditorProps {
    cardData: Doctor;
    onUpdate: (updatedData: Partial<Doctor>) => void;
}

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

    const [dialog, setDialog] = useState<{ type: string | null; data?: any }>({ type: null });
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const updateFrontSideCode = (field: string, value: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(cardData.frontSideCode, 'text/html');
        const element = doc.getElementById(`edit-${field}`);
        if(element) {
            const pOrH3 = element.querySelector('p') || element.querySelector('h3');
            if (pOrH3) {
                pOrH3.textContent = value;
            } else if (field === 'position') {
                 element.innerHTML = `<div class="w-full text-left"><p class="text-base">${value}</p></div>`;
            }
        }
        return doc.body.innerHTML;
    };
    
    const handleTextSave = (newValue: string) => {
        const { field } = dialog.data;
        if (!field) return;

        const newFrontSideCode = updateFrontSideCode(field, newValue);
        let updatedCardData: Partial<Doctor> = { frontSideCode: newFrontSideCode };
        
        if (field === 'name') {
            updatedCardData.name = newValue;
        }

        onUpdate(updatedCardData);
        setDialog({ type: null });
    };

    const handleVitaSave = (newVita: string) => {
        const wrapInButton = (html: string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const vitaContainer = doc.querySelector('div#edit-vita');
            if (vitaContainer) {
                const contentDiv = vitaContainer.querySelector('.vita-content');
                if (contentDiv) {
                    contentDiv.innerHTML = html;
                    return doc.body.innerHTML;
                }
            }
            
            const style = `<style>.vita-content { color: hsl(var(--background)); } .vita-content p { margin: 0; } .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; } .vita-content li { margin-bottom: 0.5em; } .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; } .vita-content .is-small { font-size: 0.8em; font-weight: normal; } .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); } .vita-content span[style*="color: var(--color-tiptap-gray)"] { color: hsl(var(--secondary-foreground)); }</style>`;
            const contentDiv = `<div class="vita-content w-full h-full">${html}</div>`;
            return `<div class="w-full h-full text-left">${style}<div id="edit-vita" class="w-full h-full text-left p-8">${contentDiv}</div></div>`;
        };
        onUpdate({ backSideCode: wrapInButton(newVita) });
        setDialog({ type: null });
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const { field } = dialog.data;
                const aspectRatio = field === 'position' ? 1600/265 : 2/3;
                setDialog({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio, field } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target) e.target.value = '';
    };

    const updateHtmlWithImage = (html: string, url: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const container = doc.getElementById('image-container');
        
        if (container) {
            const newHtml = `<div id="edit-image" class="image-button w-full h-full relative"><img src="${url}" alt="Portrait" class="h-full w-full object-cover relative" /></div>`;
            container.innerHTML = newHtml;
        }
        
        return doc.body.innerHTML;
    };
    
    const handleCropComplete = async (croppedImageUrl: string) => {
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return setDialog({ type: null });
        }
    
        const imagePath = `doctors/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);
    
        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            const newFrontSideCode = updateHtmlWithImage(cardData.frontSideCode, downloadURL);
            onUpdate({ frontSideCode: newFrontSideCode });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
        setDialog({ type: null });
    };

    const handleCardClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        let field: string | null = null;
        let dialogTitle: string | undefined = undefined;

        while (target && target.id !== 'card-root') {
            if (target.id.startsWith('edit-')) {
                field = target.id.replace('edit-', '');
                break;
            }
            target = target.parentElement as HTMLElement;
        }

        if (field) {
            if (field === 'image') {
                setDialog({ type: 'imageSource', data: { field: 'image' } });
            } else if (field === 'vita') {
                const initialHtml = cardData.backSideCode;
                const parser = new DOMParser();
                const doc = parser.parseFromString(initialHtml, 'text/html');
                const contentDiv = doc.querySelector('.vita-content');
                const vitaContent = contentDiv ? contentDiv.innerHTML : '';
                const finalContent = vitaContent.includes("Zum Bearbeiten klicken") ? '' : vitaContent;
                setDialog({ type: 'vita', data: { initialValue: finalContent } });
            } else if (field === 'language') {
                setDialog({ type: 'language', data: {} });
            } else if (field === 'position') {
                setDialog({ type: 'logoFunction', data: { field: 'position' } });
            } else {
                 const titles: { [key: string]: string } = {
                    title: "Titel bearbeiten",
                    name: "Name bearbeiten",
                    specialty: "Spezialisierung bearbeiten",
                    qual1: "Qualifikation 1 bearbeiten",
                    qual2: "Qualifikation 2 bearbeiten",
                    qual3: "Qualifikation 3 bearbeiten",
                    qual4: "Qualifikation 4 bearbeiten",
                };
                dialogTitle = titles[field] || "Text bearbeiten";
                setDialog({ type: 'text', data: { title: dialogTitle, label: 'Neuer Text', initialValue: textFields[field as keyof typeof textFields], field } });
            }
        }
    };


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                    <p className="text-center block mb-2 text-sm font-medium text-muted-foreground">Vorderseite</p>
                    <EditableDoctorCard doctor={cardData} onCardClick={handleCardClick} />
                </div>
                <div>
                    <p className="text-center block mb-2 text-sm font-medium text-muted-foreground">Rückseite</p>
                    <div className="bg-accent/95 rounded-lg">
                        <EditableDoctorCard 
                            doctor={cardData} 
                            onCardClick={handleCardClick}
                            showBackside
                        />
                    </div>
                </div>
            </div>
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />

            {dialog.type === 'text' && (
                <TextEditDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleTextSave} />
            )}
            {dialog.type === 'vita' && (
                <VitaEditorDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleVitaSave} />
            )}
            {dialog.type === 'language' && (
                <LanguageSelectDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} initialLanguages={cardData.languages || []} onSave={(langs) => onUpdate({ languages: langs })} />
            )}
             {dialog.type === 'logoFunction' && (
                <LogoFunctionSelectDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} onSelectFunction={() => setDialog({ type: 'text', data: { title: `Funktion bearbeiten`, label: 'Funktion', initialValue: textFields.position, field: 'position' } })} onSelectFromLibrary={() => setDialog(prev => ({ type: 'imageLibrary', data: prev.data }))} onUploadNew={() => fileInputRef.current?.click()} />
            )}
            {dialog.type === 'imageSource' && (
                <ImageSourceDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} onUpload={() => fileInputRef.current?.click()} onSelect={() => setDialog(prev => ({ type: 'imageLibrary', data: prev.data }))} />
            )}
            {dialog.type === 'imageLibrary' && (
                <ImageLibraryDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} images={projectImages} onImageSelect={(imageUrl) => setDialog({ type: 'imageCrop', data: { ...dialog.data, imageUrl, aspectRatio: dialog.data.field === 'position' ? 1600/265 : 2/3 } })} />
            )}
            {dialog.type === 'imageCrop' && (
                <ImageCropDialog {...dialog.data} onCropComplete={handleCropComplete} onClose={() => setDialog({ type: null })} />
            )}
        </>
    );
};
