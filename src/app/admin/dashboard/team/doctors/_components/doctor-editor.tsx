'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextEditDialog } from './text-edit-dialog';
import { VitaEditorDialog } from './vita-editor-dialog';
import { LanguageSelectDialog } from './language-select-dialog';
import { ImageSourceDialog } from './image-source-dialog';
import { ImageLibraryDialog } from './image-library-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import { LogoFunctionSelectDialog } from './logo-function-select-dialog';
import { EditableDoctorCard, type Doctor } from './editable-doctor-card';
import { useToast } from '@/hooks/use-toast';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
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

export const DoctorEditor: React.FC<DoctorEditorProps> = ({ cardData, onUpdate, isCreatingNew }) => {
    const { toast } = useToast();
    const storage = useStorage();

    const [dialogState, setDialogState] = useState<{ type: string | null; data?: any }>({ type: null });
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleImageUpload = useCallback(async (dataUrl: string, field: 'image' | 'position') => {
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }
        const imagePath = `doctor-images/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            const snapshot = await uploadString(imageRef, dataUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            const fieldToUpdate = field === 'image' ? 'imageUrl' : 'positionImageUrl';
            const textToClear = field === 'image' ? {} : { positionText: '' };
            
            onUpdate({ [fieldToUpdate]: downloadURL, ...textToClear });
            toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich aktualisiert.' });
        } catch (error: any) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: `Das Bild konnte nicht hochgeladen werden: ${error.message}` });
        }
    }, [storage, onUpdate, toast]);
    
    const handleCropComplete = useCallback(async (croppedDataUrl: string, field: 'image' | 'position') => {
        setDialogState({ type: null });
        handleImageUpload(croppedDataUrl, field);
    }, [handleImageUpload]);


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (dialogState.data) {
                    const { field } = dialogState.data;
                    const aspectRatio = field === 'position' ? (1600/463.75) : (2/3);
                    setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio, field } });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target) e.target.value = '';
    };

    const handleImageLibrarySelect = (imageUrl: string, field: 'image' | 'position') => {
        const fieldToUpdate = field === 'image' ? 'imageUrl' : 'positionImageUrl';
        const textToClear = field === 'image' ? {} : { positionText: '' };

        onUpdate({ [fieldToUpdate]: imageUrl, ...textToClear });
        toast({ variant: 'success', title: 'Erfolg', description: 'Bild aus Bibliothek ausgewählt.' });
        setDialogState({ type: null });
    };
    
    const handleTextSave = (newValue: string) => {
        if (!dialogState.data) return;
        const { field } = dialogState.data;
        if (!field) return;

        let update: Partial<Doctor> = {};
        switch (field) {
            case 'title':
                update.title = newValue;
                break;
            case 'name':
                update.name = newValue;
                break;
            case 'specialty':
                update.specialty = newValue;
                break;
            case 'qual1':
                update.qual1 = newValue;
                break;
            case 'qual2':
                update.qual2 = newValue;
                break;
            case 'qual3':
                update.qual3 = newValue;
                break;
            case 'qual4':
                update.qual4 = newValue;
                break;
            case 'position':
                update.positionText = newValue;
                update.positionImageUrl = ''; // Clear image if text is set
                break;
        }

        onUpdate(update);
        setDialogState({ type: null });
    };
    
    const handleVitaSave = (newVita: string) => {
        onUpdate({ backSideCode: newVita });
        setDialogState({ type: null });
    };

    const handleCardClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        
        while (target && target.id !== 'card-root' && target.id !== 'doctor-editor-root') {
            const id = target.id;
            if (id && id.startsWith('edit-')) {
                e.stopPropagation();
                e.preventDefault();
                const field = id.substring(5);

                const textFields: { [key: string]: { title: string; label: string, initialValue: string } } = {
                    title: { title: "Titel bearbeiten", label: "Neuer Titel", initialValue: cardData.title || '' },
                    name: { title: "Name bearbeiten", label: "Neuer Name", initialValue: cardData.name },
                    specialty: { title: "Spezialisierung bearbeiten", label: "Neue Spezialisierung", initialValue: cardData.specialty || '' },
                    qual1: { title: "Qualifikation 1 bearbeiten", label: "Text", initialValue: cardData.qual1 || '' },
                    qual2: { title: "Qualifikation 2 bearbeiten", label: "Text", initialValue: cardData.qual2 || '' },
                    qual3: { title: "Qualifikation 3 bearbeiten", label: "Text", initialValue: cardData.qual3 || '' },
                    qual4: { title: "Qualifikation 4 bearbeiten", label: "Text", initialValue: cardData.qual4 || '' },
                };

                if (textFields[field]) {
                    setDialogState({ type: 'text', data: { ...textFields[field], field } });
                } else if (field === 'image') {
                    setDialogState({ type: 'imageSource', data: { field: 'image' } });
                } else if (field === 'vita') {
                    setDialogState({ type: 'vita', data: { initialValue: cardData.backSideCode || '' } });
                } else if (field === 'language') {
                    setDialogState({ type: 'language', data: {} });
                } else if (field === 'position') {
                    setDialogState({ type: 'logoFunction', data: { field: 'position' } });
                }
                return;
            }
            target = target.parentElement as HTMLElement;
        }
    };


    return (
        <div id="doctor-editor-root">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <EditableDoctorCard doctor={cardData} onCardClick={handleCardClick} />
                <EditableDoctorCard doctor={cardData} showBackside={true} onCardClick={handleCardClick} />
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
                    onSelectFunction={() => setDialogState(prev => ({ type: 'text', data: { ...prev?.data, title: 'Funktion bearbeiten', label: 'Funktion', isTextArea: true, initialValue: cardData.positionText || '' } }))} 
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
                    onImageSelect={(imageUrl) => handleImageLibrarySelect(imageUrl, dialogState.data.field)} />
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
