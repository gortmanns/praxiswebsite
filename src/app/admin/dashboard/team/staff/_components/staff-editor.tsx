
'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Languages, User as UserIcon, Info, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import { LanguageSelectDialog } from '@/app/admin/dashboard/team/doctors/_components/language-select-dialog';
import { VitaEditorDialog } from '@/app/admin/dashboard/team/doctors/_components/vita-editor-dialog';
import { LanguageFlags } from '@/app/admin/dashboard/team/doctors/_components/language-flags';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export interface StaffMember {
    id: string;
    order: number;
    name: string;
    role: string;
    role2?: string;
    imageUrl: string;
    backsideContent?: string;
    languages?: string[];
    hidden?: boolean;
    fullWidth?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface StaffEditorProps {
    cardData: StaffMember;
    onUpdate: (updatedData: StaffMember) => void;
}

export const StaffEditor: React.FC<StaffEditorProps> = ({ cardData, onUpdate }) => {
    const { toast } = useToast();
    const storage = useStorage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | 'language' | 'vita' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof StaffMember, value: string | boolean | string[]) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio: 2 / 3 } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = async (croppedImageUrl: string) => {
        setDialogState({ type: null, data: {} });
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }

        const imagePath = `staff/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            onUpdate({ ...cardData, imageUrl: downloadURL });
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
    };

    const handleVitaSave = (newVita: string) => {
        onUpdate({ ...cardData, backsideContent: newVita });
        setDialogState({ type: null, data: {} });
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-10">
                <div className="flex flex-col h-full">
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
                        <div className="space-y-3 pt-2">
                             <Button variant="default" onClick={() => setDialogState({ type: 'language', data: {} })}>
                                <Languages className="mr-2 h-4 w-4" /> Sprachen
                            </Button>
                        </div>
                    </div>
                     <div className="flex-grow flex items-end">
                        <Alert variant="info" className="mt-8">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Bearbeitungsmodus</AlertTitle>
                            <AlertDescription>
                                Füllen Sie bitte die Felder aus. Das Feld "Zusatzqualifikation" ist optional. Durch Klicken auf den Platzhalter kann ein Foto eingefügt werden, dieses sollte im Format 2:3 sein und die ungefähren Masse 340x510 Px haben (ein genauer Zuschnitt ist beim Hinzufügen noch möglich). Der Text für das SlideOver Element kann mit Klick auf das Stiftymbol bearbeitet werden.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

                <div className="relative">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full max-w-[280px] mx-auto">
                            <div className="group relative w-full overflow-hidden rounded-lg border bg-background text-card-foreground shadow-xl">
                                <div className="flex h-full flex-col p-6">
                                    <button onClick={() => setDialogState({ type: 'imageSource', data: {} })} className={cn("relative w-full overflow-hidden rounded-md aspect-[2/3]")}>
                                        {cardData.imageUrl && !cardData.imageUrl.includes('picsum.photos') ? (
                                            <Image
                                                src={cardData.imageUrl}
                                                alt={`Portrait von ${cardData.name}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                                data-ai-hint="staff portrait preview"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-200 text-neutral-500 hover:bg-neutral-300 transition-colors p-4">
                                                <UserIcon className="h-40 w-40 text-black stroke-2" />
                                                <span className="mt-2 text-base font-semibold text-center">Zum Bearbeiten klicken</span>
                                            </div>
                                        )}
                                    </button>
                                    <div className="flex-grow pt-6 text-center">
                                        <h4 className="text-xl font-bold text-primary">{cardData.name}</h4>
                                        <p className="mt-2 text-base font-bold text-muted-foreground">{cardData.role}</p>
                                        {cardData.role2 && <p className="mt-1 text-base text-muted-foreground">{cardData.role2}</p>}
                                    </div>
                                    <div className="flex h-8 items-end justify-end pt-4">
                                    {cardData.languages && <LanguageFlags languages={cardData.languages} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-[280px] mx-auto h-full rounded-lg bg-accent flex items-center justify-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-16 w-16 text-accent-foreground/50 hover:text-accent-foreground hover:bg-transparent"
                                onClick={() => setDialogState({ type: 'vita', data: { initialValue: cardData.backsideContent } })}
                            >
                                <Pencil className="h-12 w-12" />
                            </Button>
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
                        setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: 2/3 } });
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
}

    