
'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
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
import type { Doctor } from '../page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Languages, Image as ImageIcon, Type, User, FileText, Award, Badge, Workflow, Hash } from 'lucide-react';


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
    const storage = useStorage();
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
    
    const handleCropComplete = useCallback(async (croppedImageUrl: string, field: string) => {
        setDialog({ type: null });
    
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }
    
        const imagePath = `doctors/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);
    
        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            const newFrontSideCode = updateHtmlWithImage(cardData.frontSideCode, downloadURL, field);
            onUpdate({ ...cardData, frontSideCode: newFrontSideCode });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
    }, [storage, cardData, onUpdate, toast]);


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

    const handleButtonClick = (field: string, title?: string, isTextArea = false) => {
        const textFields = {
            title: extractText(cardData.frontSideCode, 'edit-title'),
            name: cardData.name,
            specialty: extractText(cardData.frontSideCode, 'edit-specialty'),
            qual1: extractText(cardData.frontSideCode, 'edit-qual1'),
            qual2: extractText(cardData.frontSideCode, 'edit-qual2'),
            qual3: extractText(cardData.frontSideCode, 'edit-qual3'),
            qual4: extractText(cardData.frontSideCode, 'edit-qual4'),
            position: extractText(cardData.frontSideCode, 'edit-position'),
        };

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
             setDialog({ type: 'text', data: { title, label: 'Neuer Text', initialValue: textFields[field as keyof typeof textFields], field, isTextArea } });
        }
    };

    const editButtons = [
        { label: 'Name', field: 'name', icon: User, dialogTitle: "Name bearbeiten" },
        { label: 'Titel', field: 'title', icon: Award, dialogTitle: "Titel bearbeiten" },
        { label: 'Spezialisierung', field: 'specialty', icon: Badge, dialogTitle: "Spezialisierung bearbeiten" },
        { label: 'Qualifikationen (4 Zeilen)', field: 'qual1', icon: Hash, dialogTitle: "Qualifikationen bearbeiten" },
        { label: 'Position/Logo', field: 'position', icon: Workflow, dialogTitle: "Position/Logo bearbeiten" },
        { label: 'Portraitbild', field: 'image', icon: ImageIcon, dialogTitle: "Portraitbild ändern" },
        { label: 'Sprachen', field: 'language', icon: Languages, dialogTitle: "Sprachen bearbeiten" },
        { label: 'Rückseitentext (Vita)', field: 'vita', icon: FileText, dialogTitle: "Rückseitentext bearbeiten" },
    ];


    return (
        <div id="doctor-editor-root" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
                 <div className="space-y-2">
                    <Label htmlFor="internalName">Name (für interne Sortierung)</Label>
                    <Input id="internalName" value={cardData.name} onChange={(e) => onUpdate({...cardData, name: e.target.value})} placeholder="z.B. Dr. Müller" />
                </div>
                 <Separator className="my-4" />
                {editButtons.map(({label, field, icon: Icon, dialogTitle}) => (
                     <Button key={field} variant="outline" className="w-full justify-start mb-2" onClick={() => handleButtonClick(field, dialogTitle)}>
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                    </Button>
                ))}
            </div>

            <div className="space-y-4">
                 <p className="text-center block mb-2 text-sm font-medium text-muted-foreground">Live-Vorschau</p>
                 <EditableDoctorCard doctor={cardData} isBeingEdited={true} />
                 <EditableDoctorCard doctor={cardData} isBeingEdited={true} showBackside={true} />
            </div>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialog.type === 'text' && ( <TextEditDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleTextSave} /> )}
            {dialog.type === 'vita' && ( <VitaEditorDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} {...dialog.data} onSave={handleVitaSave} /> )}
            {dialog.type === 'language' && ( <LanguageSelectDialog isOpen={true} onOpenChange={() => setDialog({ type: null })} initialLanguages={cardData.languages || []} onSave={(langs) => onUpdate({ languages: langs })} /> )}
            {dialog.type === 'logoFunction' && (
                <LogoFunctionSelectDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialog({ type: null })} 
                    onSelectFunction={() => handleButtonClick('position', 'Funktion bearbeiten', true)} 
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
