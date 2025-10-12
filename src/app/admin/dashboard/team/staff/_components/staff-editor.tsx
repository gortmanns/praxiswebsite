
'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImageUp, Languages, Pencil, User as UserIcon } from 'lucide-react';
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
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return setDialogState({ type: null, data: {} });
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
        setDialogState({ type: null, data: {} });
    };

    const handleVitaSave = (newVita: string) => {
        onUpdate({ ...cardData, backsideContent: newVita });
        setDialogState({ type: null, data: {} });
    };

    const isNewCard = !cardData.id;
    const hasImage = cardData.imageUrl && !cardData.imageUrl.includes('placeholder');

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="md:col-span-1 space-y-6 rounded-lg border p-6">
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
                        <div className="flex items-center gap-4">
                            <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                                <ImageUp className="mr-2 h-4 w-4" /> {isNewCard ? 'Foto wählen' : 'Foto ändern'}
                            </Button>
                            <Button variant="default" onClick={() => setDialogState({ type: 'language', data: {} })}>
                                <Languages className="mr-2 h-4 w-4" /> Sprachen
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 relative">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="group relative w-full max-w-sm overflow-hidden rounded-lg border bg-background text-card-foreground shadow-xl">
                                <div className="flex h-full flex-col p-6">
                                    <div className={cn("relative w-full overflow-hidden rounded-md aspect-[2/3]")}>
                                        {hasImage ? (
                                            <Image
                                                src={cardData.imageUrl}
                                                alt={`Portrait von ${cardData.name}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                                data-ai-hint="staff portrait preview"
                                            />
                                        ) : (
                                            <button onClick={() => setDialogState({ type: 'imageSource', data: {} })} className="flex h-full w-full flex-col items-center justify-center bg-neutral-200 text-neutral-500 hover:bg-neutral-300 transition-colors">
                                                <span className="mb-2 text-base font-semibold">Foto</span>
                                                <UserIcon className="h-40 w-40 text-black stroke-2" />
                                                <span className="mt-2 text-base font-semibold">Zum Bearbeiten klicken</span>
                                            </button>
                                        )}
                                    </div>
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
                        <div className="relative w-full max-w-sm mx-auto h-full rounded-lg bg-accent">
                            {cardData.backsideContent ? (
                                <div className="h-full w-full p-6 text-accent-foreground text-center text-lg overflow-auto">
                                    <div dangerouslySetInnerHTML={{ __html: cardData.backsideContent }} />
                                </div>
                             ) : (
                                <button 
                                    onClick={() => setDialogState({ type: 'vita', data: { initialValue: cardData.backsideContent } })}
                                    className="absolute top-4 right-4 text-white hover:text-white/80"
                                >
                                    <Pencil className="h-10 w-10" />
                                </button>
                             )}
                              {cardData.backsideContent && (
                                <button 
                                    onClick={() => setDialogState({ type: 'vita', data: { initialValue: cardData.backsideContent } })}
                                    className="absolute top-4 right-4 text-white hover:text-white/80"
                                >
                                    <Pencil className="h-6 w-6" />
                                </button>
                             )}
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
                             setDialogState({ type: 'imageCrop', data: { imageUrl, aspectRatio: 2/3 } })
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
