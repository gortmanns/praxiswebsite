/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ImageUp, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { ImageSourceDialog } from '../team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '../team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '../team/doctors/_components/image-crop-dialog';
import { projectImages } from '../partners/project-images';

export default function ImageTestPage() {
    const { toast } = useToast();
    const storage = useStorage();

    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dialogState, setDialogState] = useState<{
        type: 'imageSource' | 'imageLibrary' | 'imageCrop' | null;
        data: any;
    }>({ type: null, data: {} });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDialogState({ type: 'imageCrop', data: { imageUrl: event.target?.result as string, aspectRatio: 2/3 } });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleCropComplete = useCallback(async (croppedDataUrl: string) => {
        setDialogState({ type: null, data: {} });
        if (!storage) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Speicherdienst nicht verfügbar.' });
            return;
        }
        if (!croppedDataUrl) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Keine Bilddaten vom Zuschneide-Dialog erhalten.' });
            return;
        }

        setIsLoading(true);

        const imagePath = `uploads/${uuidv4()}.jpg`;
        const imageRef = storageRef(storage, imagePath);

        try {
            // Upload the cropped image data URL to Firebase Storage
            const snapshot = await uploadString(imageRef, croppedDataUrl, 'data_url');
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            setImageUrl(downloadURL);
            toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich hochgeladen und angezeigt.' });
        } catch (error: any) {
            console.error("Error uploading image: ", error);
            toast({ variant: 'destructive', title: 'Upload-Fehler', description: `Das Bild konnte nicht hochgeladen werden: ${error.message}` });
        } finally {
            setIsLoading(false);
        }
    }, [toast, storage]);

    return (
        <div className="flex flex-1 items-start p-4 sm:p-6">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Isolierter Bild-Upload-Test</CardTitle>
                    <CardDescription>
                        Dieser Test validiert den Prozess: Bild auswählen, zuschneiden und auf Firebase Storage hochladen. Das Ergebnis wird unten angezeigt.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                            <ImageUp className="mr-2 h-4 w-4" />
                            Bild auswählen
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Dieser Button startet den Dialog zur Auswahl einer Bildquelle (Upload oder Bibliothek), gefolgt vom Zuschneide-Dialog.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Vorschau:</h3>
                        <div className="relative flex h-80 w-full items-center justify-center rounded-md border border-dashed bg-muted">
                            {isLoading ? (
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            ) : imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt="Vorschau des hochgeladenen Bildes"
                                    fill
                                    className="object-contain p-2"
                                    key={imageUrl}
                                />
                            ) : (
                                <span className="text-muted-foreground">Hier erscheint die Vorschau</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Bild-URL (Firebase Storage):</h3>
                        <Input
                            readOnly
                            value={imageUrl}
                            placeholder="Die Firebase Storage URL wird hier angezeigt"
                        />
                    </div>
                </CardContent>
            </Card>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />

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
                    onImageSelect={(selectedImageUrl) => {
                        setDialogState({ type: 'imageCrop', data: { imageUrl: selectedImageUrl, aspectRatio: 2/3 } });
                    }}
                 />
            )}
            
            {dialogState.type === 'imageCrop' && (
                <ImageCropDialog
                    imageUrl={dialogState.data.imageUrl}
                    aspectRatio={dialogState.data.aspectRatio}
                    onCropComplete={handleCropComplete}
                    onClose={() => setDialogState({ type: null, data: {} })}
                />
            )}
        </div>
    );
}
