
'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PartnerCard } from './partner-card';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { TextEditDialog } from '@/app/admin/dashboard/team/doctors/_components/text-edit-dialog';
import { useToast } from '@/hooks/use-toast';
import { Code2, ImageUp, RotateCcw } from 'lucide-react';
import { projectImages } from '../project-images';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';


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
        // No need to regenerate HTML here, it's done in the useMemo below
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

    const currentCardData = useMemo(() => {
        const logoHtml = generateLogoHtml(
            cardData.imageUrl,
            cardData.name,
            cardData.logoScale,
            cardData.logoX,
            cardData.logoY
        );
        return { ...cardData, logoHtml };
    }, [cardData]);

    // This effect updates the parent component with the generated HTML whenever dependencies change.
    useEffect(() => {
        const newHtml = generateLogoHtml(
            cardData.imageUrl,
            cardData.name,
            cardData.logoScale,
            cardData.logoX,
            cardData.logoY
        );
        if (newHtml !== cardData.logoHtml) {
            onUpdate({ ...cardData, logoHtml: newHtml });
        }
    }, [cardData.imageUrl, cardData.name, cardData.logoScale, cardData.logoX, cardData.logoY, cardData, onUpdate]);


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-xs text-muted-foreground">(zur internen Verwendung, wird nicht angezeigt)</span></Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL <span className="text-xs text-muted-foreground">(für Verlinkung)</span></Label>
                        <div className="flex items-center gap-2">
                           <Input id="websiteUrl" value={cardData.websiteUrl || ''} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                            <div className="flex items-center space-x-2 shrink-0">
                                <Checkbox
                                    id="openInNewTab"
                                    checked={cardData.openInNewTab}
                                    onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                                />
                                <Label htmlFor="openInNewTab" className="cursor-pointer whitespace-nowrap">
                                    in neuem Tab
                                </Label>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 pt-4">
                        <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })} variant="default">
                            <ImageUp className="mr-2 h-4 w-4" /> Logo wählen
                        </Button>
                        <Button variant="secondary" onClick={() => setDialogState({ type: 'htmlEditor', data: {} })}>
                            <Code2 className="mr-2 h-4 w-4" /> HTML bearbeiten
                        </Button>
                    </div>

                </div>

                <div className="relative min-h-[280px]">
                    {/* The "ghost" container that dictates the size */}
                    <div className="absolute inset-x-0 top-0 -z-10 rounded-lg bg-primary p-4 flex flex-wrap justify-center gap-8 opacity-0 pointer-events-none">
                       <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                            <div className="h-32"></div>
                       </div>
                    </div>
                    
                    {/* The actual live preview, positioned on top */}
                    <div className="relative z-10 flex flex-col items-center">
                        <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                        <div className="relative w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                            <div className="w-full">
                                <PartnerCard {...currentCardData} />
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="logoScale" className="text-center text-xs">Grösse: {cardData.logoScale || 100}%</Label>
                                    <Slider
                                        id="logoScale"
                                        value={[cardData.logoScale || 100]}
                                        onValueChange={(value) => handleSliderChange('logoScale', value)}
                                        max={200}
                                        step={1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logoX" className="text-center text-xs">Horizontale Position: {cardData.logoX || 0}px</Label>
                                    <Slider
                                        id="logoX"
                                        value={[cardData.logoX || 0]}
                                        onValueChange={(value) => handleSliderChange('logoX', value)}
                                        min={-100}
                                        max={100}
                                        step={1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logoY" className="text-center text-xs">Vertikale Position: {-(cardData.logoY || 0)}px</Label>
                                    <Slider
                                        id="logoY"
                                        value={[-(cardData.logoY || 0)]}
                                        onValueChange={(value) => handleSliderChange('logoY', [-value[0]])}
                                        min={-100}
                                        max={100}
                                        step={1}
                                    />
                                </div>
                                <Button onClick={handleResetControls} variant="outline" size="sm" className="w-full">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Steuerung zurücksetzen
                                </Button>
                            </div>
                        </div>
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
