'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';


interface DoctorEditorProps {
    cardData: Doctor;
    onUpdate: (updatedData: Partial<Doctor>) => void;
    isCreatingNew: boolean;
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


export const DoctorEditor: React.FC<DoctorEditorProps> = ({ cardData, onUpdate, isCreatingNew }) => {
    const { toast } = useToast();
    const storage = useStorage();

    const [dialogState, setDialogState] = useState<{ type: string | null; data?: any }>({ type: null });
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Effect to handle dialog opening requests from parent
    useEffect(() => {
        if (cardData._dialog?.type) {
            setDialogState({ type: cardData._dialog.type as any, data: cardData._dialog.data });
            onUpdate({ _dialog: undefined }); // Clear the request
        }
    }, [cardData._dialog, onUpdate]);

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
        setDialogState({ type: null });
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }
        if (!croppedDataUrl) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Keine Bilddaten vom Zuschneide-Dialog erhalten.' });
            return;
        }

        const imagePath = `doctor-images/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            const snapshot = await uploadString(imageRef, croppedDataUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            const newFrontSideCode = updateHtmlWithImage(cardData.frontSideCode, downloadURL, field);
            onUpdate({ frontSideCode: newFrontSideCode });
            toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich aktualisiert.' });
        } catch (error: any) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: `Das Bild konnte nicht hochgeladen werden: ${error.message}` });
        }
    }, [storage, cardData.frontSideCode, onUpdate, toast]);


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
        if (!dialogState.data) return;
        const { field } = dialogState.data;
        if (!field) return;

        const newFrontSideCode = updateFrontSideCode(field, newValue);
        let updatedCardData: Partial<Doctor> = { frontSideCode: newFrontSideCode };
        
        if (field === 'name') {
            updatedCardData.name = newValue;
        }

        onUpdate(updatedCardData);
        setDialogState({ type: null });
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
        setDialogState({ type: null });
    };

    const openDialogFor = (field: string) => {
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
            setDialogState({ type: 'text', data: { ...textFields[field], field } });
        } else if (field === 'image') {
            setDialogState({ type: 'imageSource', data: { field: 'image' } });
        } else if (field === 'vita') {
            const initialHtml = cardData.backSideCode;
            const parser = new DOMParser();
            const doc = parser.parseFromString(initialHtml, 'text/html');
            const contentDiv = doc.querySelector('.vita-content');
            const vitaContent = contentDiv ? contentDiv.innerHTML : '';
            const finalContent = vitaContent.includes("Zum Bearbeiten klicken") ? '' : vitaContent;
            setDialogState({ type: 'vita', data: { initialValue: finalContent } });
        } else if (field === 'language') {
            setDialogState({ type: 'language', data: {} });
        } else if (field === 'position') {
            setDialogState({ type: 'logoFunction', data: { field: 'position' } });
        }
    };


    return (
        <div id="doctor-editor-root">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <EditableDoctorCard doctor={cardData} onEditRequest={openDialogFor} />
                <EditableDoctorCard doctor={cardData} showBacksideOnly={true} onEditRequest={openDialogFor} />
            </div>

            <Alert variant="info" className="mt-8">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-bold">Anleitung</AlertTitle>
                <AlertDescription>
                    Klicken Sie auf ein Element, um dieses zu bearbeiten. Die Live-Vorschau wird sofort entsprechend der Bearbeitung aktualisiert. Die Übernahme in die Datenbank erfolgt erst am Ende als separater Schritt mit dem Klick auf die Schaltfläche "{isCreatingNew ? 'Neue Karte speichern' : 'Änderungen speichern'}".
                </AlertDescription>
            </Alert>


            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialogState.type === 'text' && ( <TextEditDialog isOpen={true} onOpenChange={() => setDialogState({ type: null })} {...dialogState.data} onSave={handleTextSave} /> )}
            {dialogState.type === 'vita' && ( <VitaEditorDialog isOpen={true} onOpenChange={() => setDialogState({ type: null })} {...dialogState.data} onSave={handleVitaSave} /> )}
            {dialogState.type === 'language' && ( <LanguageSelectDialog isOpen={true} onOpenChange={() => setDialogState({ type: null })} initialLanguages={cardData.languages || []} onSave={(langs) => onUpdate({ languages: langs })} /> )}
            {dialogState.type === 'logoFunction' && (
                <LogoFunctionSelectDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialogState({ type: null })} 
                    onSelectFunction={() => setDialogState(prev => ({ type: 'text', data: { ...prev?.data, title: 'Funktion bearbeiten', label: 'Funktion', isTextArea: true, initialValue: extractText(cardData.frontSideCode, 'edit-position') } }))} 
                    onSelectFromLibrary={() => setDialogState(prev => ({ type: 'imageLibrary', data: prev?.data }))} 
                    onUploadNew={() => fileInputRef.current?.click()} />
            )}
            {dialogState.type === 'imageSource' && (
                <ImageSourceDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialogState({ type: null })} 
                    onUpload={() => fileInputRef.current?.click()} 
                    onSelect={() => setDialogState(prev => ({ type: 'imageLibrary', data: prev?.data }))} />
            )}
            {dialogState.type === 'imageLibrary' && (
                 <ImageLibraryDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialogState({ type: null })} 
                    images={projectImages} 
                    onImageSelect={(imageUrl) => setDialogState({ type: 'imageCrop', data: { ...dialogState.data, imageUrl, aspectRatio: dialogState.data.field === 'position' ? 1600/265 : 2/3 } })} />
            )}
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialogState.data.imageUrl}
                    aspectRatio={dialogState.data.aspectRatio}
                    onCropComplete={(croppedImage) => handleCropComplete(croppedImage, dialogState.data.field)}
                    onClose={() => setDialogState({ type: null })}
                />
            )}
        </div>
    );
};
