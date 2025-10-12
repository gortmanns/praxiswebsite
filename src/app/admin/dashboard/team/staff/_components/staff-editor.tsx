
'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TeamMemberCard } from '@/app/team/_components/team-member-card';
import { Button } from '@/components/ui/button';
import { ImageUp, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';
import { projectImages } from '@/app/admin/dashboard/partners/project-images';
import { Checkbox } from '@/components/ui/checkbox';


export interface StaffMember {
    id: string;
    order: number;
    name: string;
    role: string;
    role2?: string;
    imageUrl: string;
    backsideContent?: string;
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
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | null;
        data: any;
    }>({ type: null, data: {} });

    const handleInputChange = (field: keyof StaffMember, value: string | boolean) => {
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

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left side: Editor Form */}
                <div className="space-y-6 rounded-lg border p-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Rolle</Label>
                        <Input id="role" value={cardData.role} onChange={(e) => handleInputChange('role', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role2">Rolle 2 (optional)</Label>
                        <Input id="role2" value={cardData.role2 || ''} onChange={(e) => handleInputChange('role2', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Bild</Label>
                        <div className="flex items-center gap-2">
                            <Input id="imageUrl" value={cardData.imageUrl} onChange={(e) => handleInputChange('imageUrl', e.target.value)} readOnly />
                             <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                                <ImageUp className="mr-2 h-4 w-4" /> Bild ändern
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
                     <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="fullWidth"
                            checked={cardData.fullWidth}
                            onCheckedChange={(checked) => handleInputChange('fullWidth', !!checked)}
                        />
                        <Label htmlFor="fullWidth" className="cursor-pointer">
                            Karte über die volle Breite anzeigen
                        </Label>
                    </div>
                </div>

                {/* Right side: Live Preview */}
                <div className="relative">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <TeamMemberCard
                        name={cardData.name}
                        role={cardData.role}
                        role2={cardData.role2}
                        imageUrl={cardData.imageUrl}
                        imageHint="staff portrait preview"
                        backsideContent={
                            cardData.backsideContent ? (
                                <div dangerouslySetInnerHTML={{ __html: cardData.backsideContent }} />
                            ) : null
                        }
                    />
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
        </>
    );
};
