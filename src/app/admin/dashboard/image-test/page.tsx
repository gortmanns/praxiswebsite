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
import { saveCroppedImage } from './actions';

import { ImageSourceDialog } from '../team/doctors/_components/image-source-dialog';
import { ImageLibraryDialog } from '../team/doctors/_components/image-library-dialog';
import { ImageCropDialog } from '../team/doctors/_components/image-crop-dialog';
import { projectImages } from '../partners/project-images';

export default function ImageTestPage() {
    const { toast } = useToast();

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
        if (!croppedDataUrl) {
            toast({ variant: 'destructive', title: 'Fehler', description: 'Keine Bilddaten vom Zuschneide-Dialog erhalten.' });
            return;
        }

        setIsLoading(true);

        try {
            const result = await saveCroppedImage(croppedDataUrl);

            if (result.success && result.filePath) {
                // Wichtig: Füge einen Zeitstempel hinzu, um Caching-Probleme im Browser zu vermeiden
                setImageUrl(`${result.filePath}?t=${new Date().getTime()}`);
                toast({ variant: 'success', title: 'Erfolg', description: 'Bild erfolgreich gespeichert und angezeigt.' });
            } else {
                throw new Error(result.error || 'Unbekannter Fehler beim Speichern des Bildes.');
            }
        } catch (error: any) {
            console.error("Error saving image: ", error);
            toast({ variant: 'destructive', title: 'Speicher-Fehler', description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    return (
        <div className="flex flex-1 items-start p-4 sm:p-6">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Isolierter Bild-Upload-Test</CardTitle>
                    <CardDescription>
                        Dieser Test validiert den Prozess: Bild auswählen, zuschneiden und lokal im Projektordner `/public/images/uploads` speichern.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Button onClick={() => setDialogState({ type: 'imageSource', data: {} })}>
                            <ImageUp className="mr-2 h-4 w-4" />
                            Bild auswählen
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Dieser Button startet den Dialog zur Auswahl einer Bildquelle (Upload oder Bibliothek), gefolgt vom Zuschneide-Dialog. Das Ergebnis wird unten angezeigt.
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
                                    // Wichtig: 'key' erzwingt ein Neuladen des Bildes, wenn sich die URL ändert
                                    key={imageUrl}
                                />
                            ) : (
                                <span className="text-muted-foreground">Hier erscheint die Vorschau</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Bild-URL (lokaler Pfad):</h3>
                        <Input
                            readOnly
                            value={imageUrl}
                            placeholder="Der lokale Bildpfad wird hier angezeigt"
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
