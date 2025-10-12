
'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';
import { Button } from '@/components/ui/button';
import { ImageUp, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import { LanguageSelectDialog } from '@/app/admin/dashboard/team/doctors/_components/language-select-dialog';


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
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | 'language' | null;
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

    const isNewCard = !cardData.id;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left side: Live Preview */}
                <div className="md:col-span-1 relative">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <TeamMemberCard
                        name={cardData.name}
                        role={cardData.role}
                        role2={cardData.role2}
                        imageUrl={cardData.imageUrl}
                        imageHint="staff portrait preview"
                        languages={cardData.languages}
                        backsideContent={
                            cardData.backsideContent ? (
                                <div dangerouslySetInnerHTML={{ __html: cardData.backsideContent }} />
                            ) : null
                        }
                    />
                </div>

                {/* Right side: Editor Form */}
                <div className="md:col-span-2 space-y-6 rounded-lg border p-6">
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
                    <div className="space-y-2">
                        <Label htmlFor="backsideContent">Text für Kartenrückseite</Label>
                        <Textarea
                            id="backsideContent"
                            value={cardData.backsideContent || ''}
                            onChange={(e) => handleInputChange('backsideContent', e.target.value)}
                            placeholder="Geben Sie hier den Text für die Rückseite ein (einfaches HTML ist erlaubt)..."
                            rows={6}
                        />
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
        </>
    );
};
