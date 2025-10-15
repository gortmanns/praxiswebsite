
'use client';

import React from 'react';
import { useState, useRef, type ReactNode } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { TextEditDialog } from '@/app/admin/dashboard/team/doctors/_components/text-edit-dialog';
import { useToast } from '@/hooks/use-toast';
import { Code2, ImageUp, RotateCcw, MoveHorizontal, MoveVertical } from 'lucide-react';
import { projectImages } from '../project-images';
import { Slider } from '@/components/ui/slider';


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
    children?: ReactNode; 
}


export const PartnerEditor: React.FC<PartnerEditorProps> = ({ cardData, onUpdate, children }) => {
    const { toast } = useToast();
    const storage = useStorage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'htmlEditor' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof Partner, value: string | boolean | number) => {
        onUpdate({ ...cardData, [field]: value });
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
            reader.onload = async (event) => {
                const dataUrl = event.target?.result as string;
                if (!storage) {
                    toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
                    return;
                }
            
                const imagePath = `partners/${uuidv4()}.jpg`;
                const imageRef = storageRef(storage, imagePath);
            
                try {
                    const snapshot = await uploadString(imageRef, dataUrl, 'data_url');
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    
                    onUpdate({ ...cardData, imageUrl: downloadURL, logoHtml: '' });
                
                } catch (error) {
                    console.error("Error uploading image: ", error);
                    toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = ''; // Reset file input
    };

    const handleImageLibrarySelect = (imageUrl: string) => {
        onUpdate({ ...cardData, imageUrl, logoHtml: '' });
        setDialogState({ type: null, data: {} });
    };

    const handleHtmlSave = (newHtml: string) => {
        // When custom HTML is saved, clear the image-based properties
        onUpdate({ 
            ...cardData, 
            logoHtml: newHtml, 
            imageUrl: '', 
            logoScale: 100, 
            logoX: 0, 
            logoY: 0 
        });
        setDialogState({ type: null, data: {} });
    }

    return (
        <div className="relative">
            <div className="grid md:grid-cols-2 h-[400px]">
                {/* Left side: Editor Form */}
                <div className="space-y-6 p-10 rounded-l-lg bg-muted z-20">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-xs text-muted-foreground">(zur internen Verwendung, wird nicht angezeigt)</span></Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2">
                        <Label htmlFor="websiteUrl">Website URL <span className="text-xs text-muted-foreground">(für Verlinkung)</span></Label>
                        <Label htmlFor="openInNewTab" className="text-center">in neuem Tab öffnen</Label>

                        <Input id="websiteUrl" value={cardData.websiteUrl || ''} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                        <div className="flex justify-center">
                            <Checkbox
                                id="openInNewTab"
                                checked={cardData.openInNewTab}
                                onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
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
                    </div>

                    <div className="space-y-4 pt-4">
                       
                    </div>

                </div>

                {/* Right side: Visual Live Preview Area */}
                 <div className="px-10 pb-10 pt-4 bg-primary rounded-r-lg flex flex-col z-0 min-h-[400px] grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex flex-col items-center justify-end pb-2">
                         <Button onClick={handleResetControls} variant="secondary" size="sm" className="w-4/5 pointer-events-auto flex flex-col h-auto p-2 gap-1">
                            <RotateCcw className="h-4 w-4" />
                            <span>Zurück</span>
                        </Button>
                    </div>
                    <div className="col-span-2 flex flex-col items-center py-4">
                        <div className='w-full max-w-xs space-y-4'>
                            <h3 className="text-xl font-bold text-primary-foreground text-center">Live Vorschau</h3>
                            <div className="space-y-2">
                                <div className="text-center text-primary-foreground text-sm flex items-center justify-center gap-2">Grösse: {cardData.logoScale || 100}%</div>
                                <Slider id="logoScale" value={[cardData.logoScale || 100]} onValueChange={(value) => handleSliderChange('logoScale', value)} max={200} step={1} className="w-full [&_[role=slider]]:bg-white [&>span:first-child]:bg-accent [&>span:first-child>span]:bg-popover" />
                            </div>
                        </div>

                        <div className="mt-auto w-full max-w-xs space-y-4">
                             <div className="space-y-2">
                                <Slider id="logoX" value={[cardData.logoX || 0]} onValueChange={(value) => handleSliderChange('logoX', value)} min={-100} max={100} step={1} className="w-full [&_[role=slider]]:bg-white [&>span:first-child]:bg-accent [&>span:first-child>span]:bg-popover" />
                                <div className="text-center text-primary-foreground text-sm flex items-center justify-center gap-2">
                                    <MoveHorizontal/> <span>Horizontale Position: {cardData.logoX || 0}px</span>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="col-span-1 flex justify-center items-center py-4">
                         <div className="flex items-center justify-center gap-4 h-full">
                            <Slider
                                id="logoY"
                                orientation="vertical"
                                value={[cardData.logoY || 0]}
                                onValueChange={(value) => handleSliderChange('logoY', value)}
                                min={-100}
                                max={100}
                                step={1}
                                className="h-[200px] [&_[role=slider]]:bg-white [&>span:first-child]:bg-accent [&>span:first-child>span]:bg-popover"
                                inverted
                            />
                             <div className="text-center text-primary-foreground text-sm flex flex-col items-center justify-center gap-2">
                                <MoveVertical/>
                                <span>Vertikale</span>
                                <span>Position</span>
                                <span>{cardData.logoY || 0}px</span>
                            </div>
                         </div>
                     </div>
                </div>
            </div>

            {children}

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
                    onImageSelect={handleImageLibrarySelect}
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
        </div>
    );
};
