'use client';

import React, { useRef, useState } from 'react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartnerCard } from './partner-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ImageUp } from 'lucide-react';
import { ImageSourceDialog } from '@/app/admin/dashboard/team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '@/app/admin/dashboard/team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '@/app/admin/dashboard/team/doctors/_components/image-crop-dialog';

export interface Partner {
    id: string;
    order: number;
    name: string;
    websiteUrl: string;
    logoUrl: string;
    openInNewTab?: boolean;
    hidden?: boolean;
    [key: string]: any;
}


const projectImages = [
    '/images/luftbild.jpg', '/images/VASC-Alliance-Logo.png', '/images/schemmer-worni-logo.png', '/images/go-medical-logo.png', '/images/mcl-labor-logo.png', '/images/doxnet-logo.jpg', '/images/logos/slezak-logo.png', '/images/praxiszentrum-logo.png', '/images/praxiszentrum-logo-icon.png', '/images/mehrfacharzt-logo.png', '/images/rtw-bern.jpg', '/images/medphone_logo.png', '/images/toxinfo-logo.svg', '/images/foto-medis.jpg', '/images/team/Ortmanns.jpg', '/images/team/Prof.Schemmer.jpg', '/images/team/Dr.Rosenov.jpg', '/images/team/Dr.Herschel.jpg', '/images/team/Dr.Slezak.jpg', '/images/team/Garcia.jpg', '/images/team/Aeschlimann.jpg', '/images/team/Huber.jpg', '/images/team/Oetztuerk.jpg', '/images/team/Sommer.jpg', '/images/leistungen/audiometrie.jpg', '/images/leistungen/ekg.jpg', '/images/leistungen/labor.jpg', '/images/leistungen/praxisapotheke.jpg', '/images/leistungen/roentgen.jpg', '/images/leistungen/spirometrie.jpg', '/images/leistungen/twint_logo.png', '/images/leistungen/VMU.png', '/images/leistungen/wundversorgung.jpg',
];

export const PartnerEditor: React.FC<{ cardData: Partner; onUpdate: (data: Partner) => void }> = ({ cardData, onUpdate }) => {
    const storage = useStorage();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dialogState, setDialogState] = useState<'imageSource' | 'imageLibrary' | 'imageCrop' | null>(null);

    const handleInputChange = (field: keyof Partner, value: string | boolean) => {
        onUpdate({ ...cardData, [field]: value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState('imageCrop');
                onUpdate({ ...cardData, logoUrl: event.target?.result as string });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = async (croppedImageUrl: string) => {
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return setDialogState(null);
        }
        const imagePath = `partners/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);
        try {
            const snapshot = await uploadString(imageRef, croppedImageUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            onUpdate({ ...cardData, logoUrl: downloadURL });
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: 'Das Bild konnte nicht hochgeladen werden.' });
        }
        setDialogState(null);
    };

    return (
        <>
            <div className="flex flex-col gap-8 items-start">
                <div className="w-full space-y-6 rounded-lg border p-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name (für interne Verwendung)</Label>
                        <Input id="name" value={cardData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <Button variant="outline" className="w-full justify-start" onClick={() => setDialogState('imageSource')}>
                            <ImageUp className="mr-2 h-4 w-4" />
                            Logo einfügen/ändern
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">URL die beim Klick geöffnet werden soll</Label>
                        <Input id="websiteUrl" value={cardData.websiteUrl} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="openInNewTab" 
                            checked={cardData.openInNewTab} 
                            onCheckedChange={(checked) => handleInputChange('openInNewTab', !!checked)}
                        />
                        <Label htmlFor="openInNewTab" className="cursor-pointer">In neuer Seite öffnen</Label>
                    </div>
                </div>

                <div className="relative w-full mt-8">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-center">Live-Vorschau</p>
                    <div className="rounded-lg bg-primary p-4 flex justify-center">
                       <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]">
                            <PartnerCard {...cardData} />
                        </div>
                    </div>
                </div>
            </div>
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            
            {dialogState === 'imageSource' && (
                <ImageSourceDialog isOpen={true} onOpenChange={() => setDialogState(null)} onUpload={() => fileInputRef.current?.click()} onSelect={() => setDialogState('imageLibrary')} />
            )}
            
            {dialogState === 'imageLibrary' && (
                <ImageLibraryDialog isOpen={true} onOpenChange={() => setDialogState(null)} images={projectImages} onImageSelect={(imageUrl) => {
                    onUpdate({ ...cardData, logoUrl: imageUrl });
                    setDialogState('imageCrop');
                }} />
            )}

            {dialogState === 'imageCrop' && (
                <ImageCropDialog imageUrl={cardData.logoUrl} aspectRatio={16 / 9} onCropComplete={handleCropComplete} onClose={() => setDialogState(null)} />
            )}
        </>
    );
};
