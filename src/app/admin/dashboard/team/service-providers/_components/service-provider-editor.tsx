/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { TextEditDialog } from '../../doctors/_components/text-edit-dialog';
import { LanguageSelectDialog } from '../../doctors/_components/language-select-dialog';
import { ImageSourceDialog } from '../../doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '../../doctors/_components/image-library-dialog';
import { ImageCropDialog } from '../../doctors/_components/image-crop-dialog';
import { LogoFunctionSelectDialog } from '../../doctors/_components/logo-function-select-dialog';
import { useToast } from '@/hooks/use-toast';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { type ServiceProvider, EditableServiceProviderCard } from './initial-state';


interface ServiceProviderEditorProps {
    cardData: ServiceProvider;
    onUpdate: (updatedData: Partial<ServiceProvider>) => void;
    isCreatingNew: boolean;
}

export const ServiceProviderEditor: React.FC<ServiceProviderEditorProps> = ({ cardData, onUpdate, isCreatingNew }) => {
    const { toast } = useToast();
    const storage = useStorage();

    const [dialogState, setDialogState] = useState<{ type: string | null; data?: any }>({ type: null });
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleImageUpload = useCallback(async (dataUrl: string, field: string) => {
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }
        const imagePath = `service-provider-images/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            const snapshot = await uploadString(imageRef, dataUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            const fieldToUpdate = field === 'image' ? 'imageUrl' : 'positionImageUrl';
            onUpdate({ [fieldToUpdate]: downloadURL, [field === 'image' ? 'positionImageUrl' : 'imageUrl']: cardData[field === 'image' ? 'positionImageUrl' : 'imageUrl'] });
            toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich aktualisiert.' });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: `Das Bild konnte nicht hochgeladen werden: ${error.message}` });
        }
    }, [storage, onUpdate, toast, cardData]);
    
    const handleCropComplete = useCallback(async (croppedDataUrl: string, field: string) => {
        setDialogState({ type: null });
        handleImageUpload(croppedDataUrl, field);
    }, [handleImageUpload]);


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (dialogState.data) {
                    const { field } = dialogState.data;
                    setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, field } });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target) e.target.value = '';
    };
    
    const handleTextSave = (newValue: string) => {
        if (!dialogState.data) return;
        const { field } = dialogState.data;
        if (!field) return;

        const fieldToUpdate = {
            title: 'title',
            name: 'name',
            specialty: 'specialty',
            position: 'positionText'
        }[field] || field;


        onUpdate({ [fieldToUpdate]: newValue });
        setDialogState({ type: null });
    };
    

    const handleCardClick = (e: React.MouseEvent) => {
        let target = e.target as HTMLElement;
        
        while (target && target.id !== 'card-root' && target.id !== 'doctor-editor-root') {
            const id = target.id;

            if (id && id.startsWith('edit-')) {
                e.stopPropagation();
                const field = id.substring(5);

                const textFields: { [key: string]: { title: string; label: string, isTextArea?: boolean, initialValue: string } } = {
                    title: { title: "Titel bearbeiten", label: "Neuer Titel", initialValue: cardData.title || '' },
                    name: { title: "Name bearbeiten", label: "Neuer Name", initialValue: cardData.name },
                    specialty: { title: "Spezialisierung bearbeiten", label: "Neue Spezialisierung", initialValue: cardData.specialty || '' },
                };

                if (textFields[field]) {
                    setDialogState({ type: 'text', data: { ...textFields[field], field } });
                } else if (field === 'image') {
                    setDialogState({ type: 'imageSource', data: { field: 'image' } });
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
    
    const handleInputChange = (field: keyof ServiceProvider, value: string | boolean) => {
        onUpdate({ [field]: value });
    };

    return (
        <div id="doctor-editor-root">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <EditableServiceProviderCard serviceProvider={cardData} onCardClick={handleCardClick} />
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input 
                            id="websiteUrl" 
                            value={cardData.websiteUrl || ''}
                            onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                            placeholder="https://beispiel-website.ch"
                        />
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="openInNewTab"
                            checked={cardData.openInNewTab === undefined ? true : cardData.openInNewTab}
                            onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                        />
                        <Label htmlFor="openInNewTab">In neuem Tab öffnen</Label>
                    </div>
                </div>
            </div>

            <Alert variant="info" className="mt-8">
                <Info className="h-4 w-4" />
                <AlertTitle>Anleitung</AlertTitle>
                <AlertDescription>
                    Klicken Sie auf ein Element auf der Karte, um dieses zu bearbeiten. Rechts können Sie die URL für die Verlinkung eingeben. Die Übernahme in die Datenbank erfolgt erst am Ende als separater Schritt mit dem Klick auf die Schaltfläche "{isCreatingNew ? 'Neue Karte speichern' : 'Änderungen speichern'}".
                </AlertDescription>
            </Alert>


            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialogState.type === 'text' && ( <TextEditDialog isOpen={true} onOpenChange={() => setDialogState({ type: null })} {...dialogState.data} onSave={handleTextSave} /> )}
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
                    onImageSelect={(imageUrl) => handleImageUpload(imageUrl, dialogState.data.field)} />
            )}
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialogState.data.imageUrl}
                    onCropComplete={(croppedImage) => handleCropComplete(croppedImage, dialogState.data.field)}
                    onClose={() => setDialogState({ type: null })}
                />
            )}
        </div>
    );
};
