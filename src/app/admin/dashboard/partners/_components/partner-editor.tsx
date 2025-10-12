
'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { TextEditDialog } from '@/app/admin/dashboard/team/doctors/_components/text-edit-dialog';
import { useToast } from '@/hooks/use-toast';
import { Code2, ImageUp, RotateCcw } from 'lucide-react';
import { projectImages } from '../project-images';
import { Slider } from '@/components/ui/slider';
import { PartnerCard } from '../_components/partner-card';


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
    logoScale?: number;
    logoX?: number;
    logoY?: number;
    [key: string]: any;
}

interface PartnerEditorProps {
    cardData: Partner;
    onUpdate: (updatedData: Partner) => void;
}

const generateLogoHtml = (imageUrl: string | undefined, name: string, scale: number = 100, x: number = 0, y: number = 0): string => {
    if (!imageUrl) {
        return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`;
    }
    const transformStyle = `transform: scale(${scale / 100}) translate(${x}px, ${y}px);`;
    return `<img src="${imageUrl}" alt="${name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%; transition: transform 0.2s ease-out; ${transformStyle}" />`;
};


export const PartnerEditor: React.FC<PartnerEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();
    const storage = useStorage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | 'htmlEditor' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof Partner, value: string | boolean | number) => {
        const newCardData = { ...cardData, [field]: value };
        onUpdate(newCardData);
    };
    
    const handleSliderChange = (field: 'logoScale' | 'logoX' | 'logoY', value: number[]) => {
        const singleValue = value[0];
        handleInputChange(field, singleValue);
    };

    const handleResetControls = () => {
        onUpdate({
            ...cardData,
            logoScale: 100,
            logoX: 0,
            logoY: 0,
        });
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
            
            onUpdate({ 
                ...cardData, 
                imageUrl: downloadURL,
            });
        
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
        setDialogState({ type: null, data: {} });
    };
    
    const handleHtmlSave = (newHtml: string) => {
        onUpdate({ ...cardData, logoHtml: newHtml, imageUrl: '', logoScale: 100, logoX: 0, logoY: 0 });
        setDialogState({ type: null, data: {} });
    }

    // This effect updates the parent component with the generated HTML whenever dependencies change.
    useEffect(() => {
        const newHtml = generateLogoHtml(
            cardData.imageUrl,
            cardData.name,
            cardData.logoScale,
            cardData.logoX,
            cardData.logoY
        );
        if (cardData.imageUrl && newHtml !== cardData.logoHtml) {
            onUpdate({ ...cardData, logoHtml: newHtml });
        }
    }, [cardData.imageUrl, cardData.name, cardData.logoScale, cardData.logoX, cardData.logoY, onUpdate, cardData, cardData.logoHtml]);


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-full">
                {/* Left side: Editor Form */}
                <div className="space-y-6 p-4 md:p-10">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-xs text-muted-foreground">(zur internen Verwendung, wird nicht angezeigt)</span></Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                         <div className="space-y-2">
                            <Label htmlFor="websiteUrl">Website URL <span className="text-xs text-muted-foreground">(für Verlinkung)</span></Label>
                            <Input id="websiteUrl" value={cardData.websiteUrl || ''} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                        </div>
                        <div className="flex flex-col items-start justify-end space-y-1 pt-2">
                            <Label htmlFor="openInNewTab" className="cursor-pointer whitespace-nowrap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                in neuem Tab öffnen
                            </Label>
                            <Checkbox
                                id="openInNewTab"
                                checked={cardData.openInNewTab}
                                onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                                className="ml-1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                        <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })} variant="default">
                            <ImageUp className="mr-2 h-4 w-4" /> Logo wählen
                        </Button>
                        <Button variant="secondary" onClick={() => setDialogState({ type: 'htmlEditor', data: {} })}>
                            <Code2 className="mr-2 h-4 w-4" /> HTML bearbeiten
                        </Button>
                        <div className="ml-auto">
                            <Button onClick={handleResetControls} variant="secondary" size="sm">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Normalwerte wiederherstellen
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right side: Live Preview Area */}
                 <div className="p-4 bg-primary rounded-r-lg">
                    <h3 className="text-xl font-bold text-primary-foreground mb-2 text-center">Live Vorschau</h3>
                    <div className="space-y-2 w-[70%] mx-auto">
                        <div className="text-center text-primary-foreground">
                            <label htmlFor="logoScale" className="text-sm">Grösse: {cardData.logoScale || 100}%</label>
                            <Slider
                                id="logoScale"
                                value={[cardData.logoScale || 100]}
                                onValueChange={(value) => handleSliderChange('logoScale', value)}
                                max={200}
                                step={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* This is the logical container that gets overlayed */}
            <div className="col-start-6 col-span-2 pointer-events-auto z-20">
                <PartnerCard {...cardData} />
                <div className="mt-2">
                    <Slider
                        id="logoX"
                        value={[cardData.logoX || 0]}
                        onValueChange={(value) => handleSliderChange('logoX', value)}
                        min={-100}
                        max={100}
                        step={1}
                    />
                    <div className="text-center text-xs mt-1">
                        <p>Horizontale Position</p>
                        <p>{cardData.logoX || 0}px</p>
                    </div>
                </div>
            </div>

            <div className="col-start-8 col-span-1 flex items-center justify-start h-full pointer-events-auto z-20 pl-2">
                <div className="flex items-center gap-2">
                    <Slider
                        id="logoY"
                        orientation="vertical"
                        value={[cardData.logoY || 0]}
                        onValueChange={(value) => handleSliderChange('logoY', value)}
                        min={-100}
                        max={100}
                        step={1}
                        className="h-32"
                    />
                    <div className="text-center text-xs">
                        <p>Vertikale</p>
                        <p>Position</p>
                        <p>{cardData.logoY || 0}px</p>
                    </div>
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

    

    