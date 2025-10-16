
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { saveCroppedImage } from '../../../image-test/actions';
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
import type { Doctor } from '../page';

interface DoctorEditorProps {
    cardData: Doctor;
    onUpdate: (updatedData: Partial<Doctor>) => void;
}

const extractText = (html: string, id: string): string => {
    if (typeof window === 'undefined' || !html) return '';
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const element = doc.getElementById(id);
        if (element) {
            const pOrH3 = element.querySelector('p') || element.querySelector('h3');
            return pOrH3?.textContent || '';
        }
    } catch (e) {
        console.error("Error parsing HTML for text extraction", e);
    }
    return '';
};


export const DoctorEditor: React.FC<DoctorEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();

    const [dialog, setDialog] = useState<{ type: string | null; data?: any }>({ type: null });
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const updateHtmlWithImage = (html: string, url: string, field: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const containerId = field === 'position' ? 'position-container' : 'image-container';
        const container = doc.getElementById(containerId);
        
        if (container) {
             const newHtml = `<div id="edit-${field}" class="w-full h-full relative"><img src="${url}" alt="Dynamisches Bild" class="h-full w-full ${field === 'position' ? 'object-contain' : 'object-cover'} relative" /></div>`;
            container.innerHTML = newHtml;
        } else {
             console.error(`Container with id '${containerId}' not found in HTML.`);
        }
        
        return doc.body.innerHTML;
    };
    
    const handleCropComplete = useCallback(async (croppedDataUrl: string, field: string) => {
        setDialog({ type: null });
        if (!croppedDataUrl) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Keine Bilddaten vom Zuschneide-Dialog erhalten.' });
            return;
        }
    
        try {
            const result = await saveCroppedImage(croppedDataUrl);
    
            if (result.success && result.filePath) {
                const newFrontSideCode = updateHtmlWithImage(cardData.frontSideCode, result.filePath, field);
                onUpdate({ frontSideCode: newFrontSideCode });
                toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich aktualisiert.' });
            } else {
                throw new Error(result.error || 'Unbekannter Fehler beim Speichern des Bildes.');
            }
        } catch (error: any) {
            console.error("Error saving image: ", error);
            toast({ variant: 'destructive', title: 'Speicher-Fehler', description: error.message });
        }
    }, [cardData.frontSideCode, onUpdate, toast]);


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
        const parser = new DOMParser();
        const doc = parser.parseFromString(cardData.backSideCode, 'text/html');
        const vitaContainer = doc.querySelector('#edit-vita');
        if(vitaContainer) {
            const contentDiv = vitaContainer.querySelector('.vita-content');
            if(contentDiv) {
                contentDiv.innerHTML = newVita;
                onUpdate({ backSideCode: doc.body.innerHTML });
            }
        }
        setDialog({ type: null });
    };

    const handleCardClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        
        while (target && target.id !== 'card-root') {
            const id = target.id;

            if (id.startsWith('edit-')) {
                e.stopPropagation();
                const field = id.substring(5);

                const textFields: { [key: string]: { title: string; label: string, isTextArea?: boolean, initialValue: string } } = {
                    title: { title: "Titel bearbeiten", label: "Neuer Titel", initialValue: extractText(cardData.frontSideCode, 'edit-title') },
                    name: { title: "Name bearbeiten", label: "Neuer Name", initialValue: cardData.name },
                    specialty: { title: "Spezialisierung bearbeiten", label: "Neue Spezialisierung", initialValue: extractText(cardData.frontSideCode, 'edit-specialty') },
                    qual1: { title: "Qualifikation 1 bearbeiten", label: "Text", initialValue: extractText(cardData.frontSideCode, 'edit-qual1') },
                    qual2: { title: "Qualifikation 2 bearbeiten", label: "Text", initialValue: extractText(cardData.frontSideCode, 'edit-qual2') },
                    qual3: { title: "Qualifikation 3 bearbeiten", label: "Text", initialValue: extractText(cardData.frontSideCode, 'edit-qual3') },
                    qual4: { title: "Qualifikation 4 bearbeiten", label: "Text", initialValue: extractText(cardData.frontSideCode, 'edit-qual4') },
                };

                if (textFields[field]) {
                    setDialog({ type: 'text', data: { ...textFields[field], field } });
                } else if (field === 'image') {
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
                }
                
                return;
            }
            target = target.parentElement as HTMLElement;
        }
    };

    return (
        <div id="doctor-editor-root" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                 <p className="text-center block mb-2 text-sm font-medium text-muted-foreground">Vorderseite (Live-Vorschau)</p>
                 <EditableDoctorCard doctor={cardData} onCardClick={handleCardClick} />
            </div>
            <div className="space-y-4">
                 <p className="text-center block mb-2 text-sm font-medium text-muted-foreground">Rückseite (Live-Vorschau)</p>
                 <EditableDoctorCard doctor={cardData} showBackside={true} onCardClick={handleCardClick} />
            </div>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialog.type === 'text' && ( <TextEditDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleTextSave} /> )}
            {dialog.type === 'vita' && ( <VitaEditorDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleVitaSave} /> )}
            {dialog.type === 'language' && ( <LanguageSelectDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} initialLanguages={cardData.languages || []} onSave={(langs) => onUpdate({ languages: langs })} /> )}
            {dialog.type === 'logoFunction' && (
                <LogoFunctionSelectDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialog({ type: null })} 
                    onSelectFunction={() => setDialog(prev => ({ type: 'text', data: { ...prev.data, title: 'Funktion bearbeiten', label: 'Funktion', isTextArea: true, initialValue: extractText(cardData.frontSideCode, 'edit-position') } }))} 
                    onSelectFromLibrary={() => setDialog(prev => ({ type: 'imageLibrary', data: prev.data }))} 
                    onUploadNew={() => fileInputRef.current?.click()} />
            )}
            {dialog.type === 'imageSource' && (
                <ImageSourceDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialog({ type: null })} 
                    onUpload={() => fileInputRef.current?.click()} 
                    onSelect={() => setDialog(prev => ({ type: 'imageLibrary', data: prev.data }))} />
            )}
            {dialog.type === 'imageLibrary' && (
                 <ImageLibraryDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialog({ type: null })} 
                    images={projectImages} 
                    onImageSelect={(imageUrl) => setDialog({ type: 'imageCrop', data: { ...dialog.data, imageUrl, aspectRatio: dialog.data.field === 'position' ? 1600/265 : 2/3 } })} />
            )}
            {dialog.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialog.data.imageUrl}
                    aspectRatio={dialog.data.aspectRatio}
                    onCropComplete={(croppedImage) => handleCropComplete(croppedImage, dialog.data.field)}
                    onClose={() => setDialog({ type: null })}
                />
            )}
        </div>
    );
};
