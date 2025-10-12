
'use client';

import React, { useState, useRef } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PartnerCard } from './partner-card';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { TextEditDialog } from '@/app/admin/dashboard/team/doctors/_components/text-edit-dialog';
import { useToast } from '@/hooks/use-toast';
import { Code2, Pencil } from 'lucide-react';
import { projectImages } from '../project-images';


export interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl?: string;
    logoHtml: string;
    imageUrl?: string; 
    openInNewTab?: boolean;
    hidden?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface PartnerEditorProps {
    cardData: Partner;
    onUpdate: (updatedData: Partner) => void;
}

export const PartnerEditor: React.FC<PartnerEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();
    const storage = useStorage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | 'htmlEditor' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof Partner, value: string | boolean) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio: 16 / 9 } });
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
    
        const imagePath = `partners/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);
    
        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            const newLogoHtml = `<img src="${downloadURL}" alt="${cardData.name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%;" />`;

            onUpdate({ 
                ...cardData, 
                imageUrl: downloadURL,
                logoHtml: newLogoHtml
            });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
        setDialogState({ type: null, data: {} });
    };
    
    const handleHtmlSave = (newHtml: string) => {
        onUpdate({ ...cardData, logoHtml: newHtml });
        setDialogState({ type: null, data: {} });
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6 rounded-lg border p-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input id="websiteUrl" value={cardData.websiteUrl || ''} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                       <Label>Logo</Label>
                       <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                                <Pencil className="mr-2 h-4 w-4" /> Logo ändern
                            </Button>
                             <Button variant="secondary" onClick={() => setDialogState({ type: 'htmlEditor', data: {} })}>
                                <Code2 className="mr-2 h-4 w-4" /> HTML bearbeiten
                            </Button>
                       </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="openInNewTab"
                            checked={cardData.openInNewTab}
                            onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                        />
                        <Label htmlFor="openInNewTab" className="cursor-pointer">
                            Link in neuem Tab öffnen
                        </Label>
                    </div>
                </div>

                <div className="relative">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <PartnerCard {...cardData} />
                </div>
            </div>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />

            {dialogState.type === 'imageSource' && (
                <ImageSourceDialog
                    isOpen={true}
                    onOpenChange={() => setDialogState({ type: null, data: {} })}
                    onUpload={() => fileInputRef.current?.click()}
                    onSelect={() => setDialogState({ type: 'imageLibrary', data: {} })}
                />
            )}
            {dialogState.type === 'imageLibrary' && (
                <ImageLibraryDialog
                    isOpen={true}
                    onOpenChange={() => setDialogState({ type: null, data: {} })}
                    images={projectImages}
                    onImageSelect={(imageUrl) => {
                        setDialogState({ type: null, data: {} });
                        setTimeout(() => {
                             setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: 16/9 } })
                        }, 100);
                    }}
                />
            )}
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    {...dialogState.data}
                    onCropComplete={handleCropComplete}
                    onClose={() => setDialogState({ type: null, data: {} })}
                />
            )}
             {dialogState.type === 'htmlEditor' && (
                <TextEditDialog
                    isOpen={true}
                    onOpenChange={() => setDialogState({ type: null, data: {} })}
                    title="Logo HTML bearbeiten"
                    label="HTML Code"
                    initialValue={cardData.logoHtml}
                    onSave={handleHtmlSave}
                    isTextArea={true}
                />
            )}
        </>
    );
};
