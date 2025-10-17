/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde neu erstellt und stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Languages, User as UserIcon, Info, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveCroppedImage } from '../../../image-test/actions';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import { LanguageSelectDialog } from '@/app/admin/dashboard/team/doctors/_components/language-select-dialog';
import { VitaEditorDialog } from '@/app/admin/dashboard/team/doctors/_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LanguageFlags } from '@/app/admin/dashboard/team/doctors/_components/language-flags';
import type { ServiceProvider } from '../page';


interface ServiceProviderEditorProps {
    cardData: ServiceProvider;
    onUpdate: (updatedData: Partial<ServiceProvider>) => void;
}

export const ServiceProviderEditor: React.FC<ServiceProviderEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | 'language' | 'vita' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof ServiceProvider, value: string | boolean | string[]) => {
        onUpdate({ [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio: 2 / 3 } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target) e.target.value = '';
    };

    const handleImageLibrarySelect = (imageUrl: string) => {
       setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: 2 / 3 } });
    };

    const handleCropComplete = useCallback(async (croppedDataUrl: string) => {
        setDialogState({ type: null, data: {} });
        if (!croppedDataUrl) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Keine Bilddaten vom Zuschneide-Dialog erhalten.' });
            return;
        }

        try {
            const result = await saveCroppedImage(croppedDataUrl);
            if (result.success && result.filePath) {
                onUpdate({ imageUrl: result.filePath });
                toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich aktualisiert.' });
            } else {
                throw new Error(result.error || 'Unbekannter Fehler beim Speichern des Bildes.');
            }
        } catch (error: any) {
            console.error("Error saving image: ", error);
            toast({ variant: 'destructive', title: 'Speicher-Fehler', description: error.message });
        }
    }, [onUpdate, toast]);
    
    const handleVitaSave = (newVita: string) => {
        onUpdate({ backsideContent: newVita });
        setDialogState({ type: null, data: {} });
    };
    
    const backsideElement = cardData.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: cardData.backsideContent }} />
    ) : null;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Funktion</Label>
                        <Input id="role" value={cardData.role} onChange={(e) => handleInputChange('role', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role2">Zusatzqualifikation (optional)</Label>
                        <Input id="role2" value={cardData.role2 || ''} onChange={(e) => handleInputChange('role2', e.target.value)} />
                    </div>
                    <div className="flex gap-2 pt-2">
                         <Button variant="outline" size="sm" onClick={() => setDialogState({ type: 'language', data: {} })}>
                            <Languages className="mr-2 h-4 w-4" /> Sprachen bearbeiten
                        </Button>
                    </div>
                     <Alert variant="info" className="mt-8">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Bearbeitungsmodus</AlertTitle>
                        <AlertDescription>
                            Füllen Sie die Felder aus. Ein Klick auf die Vorschau rechts erlaubt das Ändern des Bildes und des Rückseitentextes.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-background text-card-foreground shadow-xl">
                            <div className="flex h-full flex-col p-6">
                                <button className="relative w-full overflow-hidden rounded-md aspect-[2/3] cursor-pointer" onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                                    {cardData.imageUrl ? (
                                        <img
                                            src={cardData.imageUrl}
                                            alt={`Portrait von ${cardData.name}`}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-secondary aspect-[2/3]">
                                            <UserIcon className="h-24 w-24 text-muted-foreground" />
                                        </div>
                                    )}
                                </button>
                                <div className="flex-grow pt-6 text-center min-h-[110px]">
                                    <h4 className="text-xl font-bold text-primary">{cardData.name}</h4>
                                    <p className="mt-2 text-base font-bold text-muted-foreground">{cardData.role}</p>
                                    {cardData.role2 && <p className="mt-1 text-base text-muted-foreground">{cardData.role2}</p>}
                                </div>
                                <div className="flex h-8 items-end justify-end pt-4">
                                    {cardData.languages && <LanguageFlags languages={cardData.languages} />}
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-accent/95 text-background shadow-xl aspect-[2/3]">
                            <button className="absolute top-2 right-2 z-10 p-2 text-white/80 hover:text-white" onClick={() => setDialogState({ type: 'vita', data: { initialValue: cardData.backsideContent || '' } })}>
                                <Pencil className="h-8 w-8 font-bold" />
                            </button>
                            <div className="p-6 text-center text-lg">{backsideElement}</div>
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
                    onImageSelect={handleImageLibrarySelect}
                />
            )}
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    {...dialogState.data}
                    onCropComplete={handleCropComplete}
                    onClose={() => setDialogState({ type: null, data: {} })}
                />
            )}
            {dialogState.type === 'language' && (
                <LanguageSelectDialog 
                    isOpen={true} 
                    onOpenChange={() => setDialogState({ type: null, data: {} })} 
                    initialLanguages={cardData.languages || []} 
                    onSave={(langs) => handleInputChange('languages', langs)} 
                />
            )}
            {dialogState.type === 'vita' && (
                <VitaEditorDialog
                    isOpen={true}
                    onOpenChange={() => setDialogState({ type: null, data: {} })}
                    initialValue={dialogState.data.initialValue || ''}
                    onSave={handleVitaSave}
                />
            )}
        </>
    );
};
