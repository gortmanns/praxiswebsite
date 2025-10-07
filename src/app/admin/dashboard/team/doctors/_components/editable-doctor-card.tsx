'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, Info, Pencil, AlertCircle, Trash2, Replace, GalleryHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { VitaEditorDialog } from './vita-editor-dialog';
import { VitaRenderer } from './vita-renderer';

const initialVita = `[blau][fett]Dies ist ein blauer, fetter Text[/fett][/blau]
[weiss]Dies ist normaler weisser Text auf dunklem Grund.[/weiss]
[break]
[grau][klein]Dieser Text ist klein und grau.[/klein][/grau]
[linie]
[liste]Ein Listenpunkt[/liste]
[liste]Noch ein Listenpunkt[/liste]
`;

const existingImages = [
    '/images/team/Dr.Herschel.jpg',
    '/images/team/Dr.Rosenov.jpg',
    '/images/team/Prof.Schemmer.jpg',
    '/images/team/Dr.Slezak.jpg',
    '/images/team/Ortmanns.jpg',
];

interface EditDialogProps {
    trigger: React.ReactNode;
    dialogTitle: string;
    dialogDescription: string;
    initialValue: string;
    onSave: (value: string) => void;
    inputLabel: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
    trigger,
    dialogTitle,
    dialogDescription,
    initialValue,
    onSave,
    inputLabel,
}) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        onSave(currentValue);
        setIsDialogOpen(false);
    };
    
    React.useEffect(() => {
        if (isDialogOpen) {
            setCurrentValue(initialValue);
        }
    }, [initialValue, isDialogOpen]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="edit-input">{inputLabel}</Label>
                    <Input
                        id="edit-input"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Abbrechen</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Speichern</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const EditableDoctorCard = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [qualification1, setQualification1] = useState('');
    const [qualification2, setQualification2] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [vita, setVita] = useState(initialVita);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageSourceType, setImageSourceType] = useState<'none' | 'new-upload' | 'existing-gallery'>('none');
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageSourceType('new-upload');
                setIsImageDialogOpen(false); 
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleDeleteImage = () => {
        setImagePreview(null);
        setImageSourceType('none');
        setIsImageDialogOpen(false);
    };

    const handleSelectFromGallery = (imageSrc: string) => {
        setImagePreview(imageSrc);
        setImageSourceType('existing-gallery');
        setIsGalleryOpen(false);
        setIsImageDialogOpen(false);
    };

    const triggerDiv = (children: React.ReactNode, className?: string) => (
        <div className={cn("group relative cursor-pointer", className)}>
            {children}
            <Pencil className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    );

    return (
        <div className="mx-auto max-w-7xl">
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div 
                            className="relative w-full bg-card"
                            style={{ 'containerType': 'inline-size', aspectRatio: '1000 / 495' } as React.CSSProperties}
                        >
                             <div className="grid h-full grid-cols-3 items-center gap-[4.5%] p-6">
                                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                                    <DialogTrigger asChild>
                                        <div className="group relative col-span-1 h-full w-full cursor-pointer overflow-hidden rounded-md bg-muted transition-colors hover:bg-muted/80">
                                            {imagePreview ? (
                                                <Image
                                                    src={imagePreview}
                                                    alt="Vorschau des Arztportraits"
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <User className="h-1/2 w-1/2 text-muted-foreground" />
                                                </div>
                                            )}
                                             <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                {imagePreview ? <Replace className="h-10 w-10 text-white" /> : <Upload className="h-10 w-10 text-white" />}
                                             </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Bild für Arztprofil</DialogTitle>
                                            <DialogDescription>
                                                Verwalten Sie das Profilbild. Für eine optimale Darstellung sollte das Bild ein Seitenverhältnis von 2:3 haben.
                                            </DialogDescription>
                                        </DialogHeader>
                                        
                                        {!name && imageSourceType === 'new-upload' && (
                                            <Alert variant="destructive" className="mt-4">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Fehlender Name</AlertTitle>
                                                <AlertDescription>
                                                    Bitte geben Sie zuerst einen Namen für den Arzt ein, bevor Sie ein neues Bild hochladen.
                                                </AlertDescription>
                                            </Alert>
                                        )}

                                        {imagePreview ? (
                                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <Button variant="outline" onClick={handleImageUploadClick}>
                                                    <Replace className="mr-2 h-4 w-4" />
                                                    Bild ersetzen
                                                </Button>
                                                <Button variant="destructive" onClick={handleDeleteImage}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Bild löschen
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline">
                                                            <GalleryHorizontal className="mr-2 h-4 w-4" />
                                                            Bestehendes auswählen
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Bestehendes Bild auswählen</DialogTitle>
                                                            <DialogDescription>
                                                                Wählen Sie ein bereits hochgeladenes Bild aus dem Team-Ordner.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto p-1">
                                                            {existingImages.map(imgSrc => (
                                                                <div key={imgSrc} className="cursor-pointer group" onClick={() => handleSelectFromGallery(imgSrc)}>
                                                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border-2 border-transparent group-hover:border-primary">
                                                                        <Image src={imgSrc} alt={imgSrc} fill className="object-cover" />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="inline-block w-full">
                                                                <Button onClick={handleImageUploadClick} disabled={!name} className="w-full">
                                                                    <Upload className="mr-2 h-4 w-4" />
                                                                    Neu hochladen
                                                                </Button>
                                                            </div>
                                                        </TooltipTrigger>
                                                        {!name && (
                                                            <TooltipContent>
                                                                <p>Bitte geben Sie zuerst einen Namen ein.</p>
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                                
                                <div className="col-span-2">
                                    <div className="flex h-full flex-col justify-center gap-1 text-left text-foreground/80">
                                       <EditDialog 
                                         dialogTitle="Titel bearbeiten"
                                         dialogDescription="Geben Sie den akademischen Titel des Arztes ein."
                                         initialValue={title}
                                         onSave={setTitle}
                                         inputLabel="Titel"
                                         trigger={triggerDiv(<p className="text-[2.2cqw] text-primary">{title || '[Titel]'}</p>)}
                                       />
                                       <EditDialog 
                                         dialogTitle="Name bearbeiten"
                                         dialogDescription="Geben Sie den Vor- und Nachnamen des Arztes ein."
                                         initialValue={name}
                                         onSave={setName}
                                         inputLabel="Name"
                                         trigger={triggerDiv(<h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">{name || '[Name]'}</h4>)}
                                       />
                                       <div className="mt-[1.5cqw] space-y-1 text-[2.2cqw] leading-tight">
                                           <EditDialog 
                                             dialogTitle="Spezialisierung bearbeiten"
                                             dialogDescription="Geben Sie die Spezialisierung des Arztes ein."
                                             initialValue={specialty}
                                             onSave={setSpecialty}
                                             inputLabel="Spezialisierung"
                                             trigger={triggerDiv(<p className="font-bold">{specialty || '[Spezialisierung]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 1 bearbeiten"
                                             dialogDescription="Geben Sie eine optionale Zusatzqualifikation ein."
                                             initialValue={qualification1}
                                             onSave={setQualification1}
                                             inputLabel="Zusatzqualifikation 1"
                                             trigger={triggerDiv(<p>{qualification1 || '[Zusatzqualifikation 1]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 2 bearbeiten"
                                             dialogDescription="Geben Sie eine weitere optionale Zusatzqualifikation ein."
                                             initialValue={qualification2}
                                             onSave={setQualification2}
                                             inputLabel="Zusatzqualifikation 2"
                                             trigger={triggerDiv(<p>{qualification2 || '[Zusatzqualifikation 2]'}</p>)}
                                           />
                                       </div>
                                       <EditDialog
                                            dialogTitle="Zusatzinformationen bearbeiten"
                                            dialogDescription="Geben Sie Zusatzinformationen oder die Position des Arztes ein. Dies kann auch für ein Partnerlogo verwendet werden."
                                            initialValue={additionalInfo}
                                            onSave={setAdditionalInfo}
                                            inputLabel="Zusatzinformationen"
                                            trigger={triggerDiv(<p className="italic">{additionalInfo || '[Zusatzinfo / Logo]'}</p>, "mt-[2.5cqw] text-[1.6cqw]")}
                                       />
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="relative flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                            <VitaEditorDialog
                                initialValue={vita}
                                onSave={setVita}
                                trigger={<Pencil className="absolute top-4 right-4 h-5 w-5 text-primary/80 cursor-pointer hover:text-primary z-10" />}
                            />

                            <div className="w-full text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                                <VitaRenderer text={vita} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

    