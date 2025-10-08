'use client';

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, Pencil, Trash2, Replace, GalleryHorizontal, Text, Image as ImageIcon, Save, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { VitaEditorDialog } from './vita-editor-dialog';
import { ImageCropDialog } from './image-crop-dialog';
import DOMPurify from 'dompurify';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface DoctorData {
    title: string;
    name: string;
    specialty: string;
    imageUrl: string | null;
    imageHint: string;
    qualifications: string[];
    additionalInfoType: 'text' | 'logo';
    additionalInfoText: string;
    additionalInfoLogo: string | null;
    vita: string;
    displayOrder: number;
}

interface EditableDoctorCardProps {
    onSave: (data: DoctorData) => void;
    initialData?: DoctorData | null;
    isSubmitting: boolean;
}

const initialVita = `<p>Diesen Text können Sie frei anpassen</p>`;
const emptyDoctorData: DoctorData = {
    title: '',
    name: '',
    specialty: '',
    imageUrl: null,
    imageHint: 'doctor portrait',
    qualifications: ['', ''],
    additionalInfoType: 'text',
    additionalInfoText: '',
    additionalInfoLogo: null,
    vita: initialVita,
    displayOrder: 0
};

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

const VitaRenderer: React.FC<{ text: string }> = ({ text }) => {
  const sanitizedHtml = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return { __html: DOMPurify.sanitize(text) };
    }
    return { __html: '' };
  }, [text]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={sanitizedHtml}
    />
  );
};


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

const AdditionalInfoDialog: React.FC<{
    trigger: React.ReactNode;
    initialText: string;
    initialLogo: string | null;
    onSave: (type: 'text' | 'logo', value: string | null) => void;
}> = ({ trigger, initialText, initialLogo, onSave }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(initialLogo ? 'logo' : 'text');
    const [currentText, setCurrentText] = useState(initialText);
    const [currentLogo, setCurrentLogo] = useState<string | null>(initialLogo);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCroppedImage = (croppedImage: string) => {
        setCurrentLogo(croppedImage);
        setImageToCrop(null); // Close the crop dialog
    };
    
    const handleSave = () => {
        if (activeTab === 'text') {
            onSave('text', currentText);
        } else if (activeTab === 'logo') {
            onSave('logo', currentLogo);
        }
        setIsDialogOpen(false);
    };

    const handleSelectFromGallery = (imageSrc: string) => {
        setCurrentLogo(imageSrc);
    };

    useEffect(() => {
        if (isDialogOpen) {
            setCurrentText(initialText);
            setCurrentLogo(initialLogo);
            setActiveTab(initialLogo ? 'logo' : 'text');
        }
    }, [isDialogOpen, initialText, initialLogo]);

    return (
        <>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
            {imageToCrop && (
                <ImageCropDialog
                    imageUrl={imageToCrop}
                    aspectRatio={3/1}
                    onCropComplete={handleCroppedImage}
                    onClose={() => setImageToCrop(null)}
                />
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Zusatzinformationen / Logo bearbeiten</DialogTitle>
                        <DialogDescription>Wählen Sie, ob Sie einen Text oder ein Logo anzeigen möchten.</DialogDescription>
                    </DialogHeader>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="text"><Text className="mr-2 h-4 w-4" /> Text</TabsTrigger>
                            <TabsTrigger value="logo"><ImageIcon className="mr-2 h-4 w-4" /> Logo</TabsTrigger>
                        </TabsList>
                        <TabsContent value="text" className="mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="info-text">Zusatzinformationen Text</Label>
                                <Textarea
                                    id="info-text"
                                    value={currentText}
                                    onChange={(e) => setCurrentText(e.target.value)}
                                    placeholder="z.B. (Ärztliche und administrative Leitung)"
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="logo" className="mt-4">
                            <div className="space-y-4">
                                {currentLogo && (
                                     <div className="relative w-full aspect-[3/1] rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                        <Image src={currentLogo} alt="Vorschau Logo" fill className="object-contain p-2"/>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                     <Dialog>
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
                                                    <DialogClose key={imgSrc} asChild>
                                                        <div className="cursor-pointer group" onClick={() => handleSelectFromGallery(imgSrc)}>
                                                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border-2 border-transparent group-hover:border-primary">
                                                                <Image src={imgSrc} alt={imgSrc} fill className="object-cover" />
                                                            </div>
                                                        </div>
                                                    </DialogClose>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Neu hochladen
                                    </Button>
                                </div>
                                {currentLogo && (
                                     <Button variant="destructive" onClick={() => setCurrentLogo(null)} className="w-full">
                                        <Trash2 className="mr-2 h-4 w-4" /> Logo entfernen
                                     </Button>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="mt-6 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Abbrechen</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Speichern</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export const EditableDoctorCard: React.FC<EditableDoctorCardProps> = ({ onSave, initialData, isSubmitting }) => {
    
    const [doctor, setDoctor] = useState<DoctorData>(initialData || emptyDoctorData);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = <K extends keyof DoctorData>(field: K, value: DoctorData[K]) => {
        setDoctor(prev => ({ ...prev, [field]: value }));
    };
    
    const updateQualification = (index: number, value: string) => {
        const newQualifications = [...doctor.qualifications];
        newQualifications[index] = value;
        updateField('qualifications', newQualifications);
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handlePortraitFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCroppedPortrait = (croppedImage: string) => {
        updateField('imageUrl', croppedImage);
        setImageToCrop(null); // Close the crop dialog
    };
    
    const handleSaveAdditionalInfo = (type: 'text' | 'logo', value: string | null) => {
        updateField('additionalInfoType', type);
        if (type === 'text') {
            updateField('additionalInfoText', value || '');
            updateField('additionalInfoLogo', null);
        } else {
            updateField('additionalInfoLogo', value);
            updateField('additionalInfoText', '');
        }
    };

    const handleSaveClick = () => {
        onSave(doctor);
    };

    const handleReset = () => {
        setDoctor(initialData || emptyDoctorData);
    };

    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handleDeleteImage = () => {
        updateField('imageUrl', null);
        setIsImageDialogOpen(false);
    };

    const handleSelectFromGallery = (imageSrc: string) => {
        updateField('imageUrl', imageSrc);
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
                onChange={handlePortraitFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
             {imageToCrop && (
                <ImageCropDialog
                    imageUrl={imageToCrop}
                    onCropComplete={handleCroppedPortrait}
                    onClose={() => setImageToCrop(null)}
                />
            )}
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
                                            {doctor.imageUrl ? (
                                                <Image
                                                    src={doctor.imageUrl}
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
                                                {doctor.imageUrl ? <Replace className="h-10 w-10 text-white" /> : <Upload className="h-10 w-10 text-white" />}
                                             </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Bild für Arztprofil</DialogTitle>
                                            <DialogDescription>
                                                Verwalten Sie das Profilbild. Ein hochgeladenes Bild muss auf ein Seitenverhältnis von 2:3 zugeschnitten werden.
                                            </DialogDescription>
                                        </DialogHeader>

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

                                            <Button onClick={handleImageUploadClick} className="w-full">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Neu hochladen
                                            </Button>
                                        </div>
                                         {doctor.imageUrl && (
                                            <div className="mt-4">
                                                <Button variant="destructive" onClick={handleDeleteImage} className="w-full">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Bild löschen
                                                </Button>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                                
                                <div className="col-span-2">
                                    <div className="flex h-full flex-col justify-center gap-1 text-left text-foreground/80">
                                       <EditDialog 
                                         dialogTitle="Titel bearbeiten"
                                         dialogDescription="Geben Sie den akademischen Titel des Arztes ein."
                                         initialValue={doctor.title}
                                         onSave={(value) => updateField('title', value)}
                                         inputLabel="Titel"
                                         trigger={triggerDiv(<p className="text-[2.2cqw] text-primary">{doctor.title || '[Titel]'}</p>)}
                                       />
                                       <EditDialog 
                                         dialogTitle="Name bearbeiten"
                                         dialogDescription="Geben Sie den Vor- und Nachnamen des Arztes ein."
                                         initialValue={doctor.name}
                                         onSave={(value) => updateField('name', value)}
                                         inputLabel="Name"
                                         trigger={triggerDiv(<h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">{doctor.name || '[Name]'}</h4>)}
                                       />
                                       <div className="mt-[1.5cqw] space-y-1 text-[2.2cqw] leading-tight">
                                           <EditDialog 
                                             dialogTitle="Spezialisierung bearbeiten"
                                             dialogDescription="Geben Sie die Spezialisierung des Arztes ein."
                                             initialValue={doctor.specialty}
                                             onSave={(value) => updateField('specialty', value)}
                                             inputLabel="Spezialisierung"
                                             trigger={triggerDiv(<p className="font-bold">{doctor.specialty || '[Spezialisierung]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 1 bearbeiten"
                                             dialogDescription="Geben Sie eine optionale Zusatzqualifikation ein."
                                             initialValue={doctor.qualifications[0] || ''}
                                             onSave={(value) => updateQualification(0, value)}
                                             inputLabel="Zusatzqualifikation 1"
                                             trigger={triggerDiv(<p>{doctor.qualifications[0] || '[Zusatzqualifikation 1]'}</p>)}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 2 bearbeiten"
                                             dialogDescription="Geben Sie eine weitere optionale Zusatzqualifikation ein."
                                             initialValue={doctor.qualifications[1] || ''}
                                             onSave={(value) => updateQualification(1, value)}
                                             inputLabel="Zusatzqualifikation 2"
                                             trigger={triggerDiv(<p>{doctor.qualifications[1] || '[Zusatzqualifikation 2]'}</p>)}
                                           />
                                       </div>
                                       <AdditionalInfoDialog
                                            initialText={doctor.additionalInfoText}
                                            initialLogo={doctor.additionalInfoLogo}
                                            onSave={handleSaveAdditionalInfo}
                                            trigger={
                                                <div className="group relative mt-[2.5cqw] cursor-pointer text-[1.6cqw]">
                                                    {doctor.additionalInfoType === 'logo' && doctor.additionalInfoLogo ? (
                                                        <div className="relative w-[30cqw] aspect-[3/1]">
                                                            <Image src={doctor.additionalInfoLogo} alt="Partner Logo" fill className="object-contain" />
                                                        </div>
                                                    ) : (
                                                        <p className="italic">{doctor.additionalInfoText || '[Zusatzinfo / Logo]'}</p>
                                                    )}
                                                    <Pencil className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                             </div>
                        </div>
                         <div className="relative bg-accent/95 p-6 text-left text-background">
                            <VitaEditorDialog
                                initialValue={doctor.vita}
                                onSave={(value) => updateField('vita', value)}
                                trigger={<Pencil className="absolute top-4 right-4 h-5 w-5 cursor-pointer text-background hover:text-background/80 z-10" />}
                            />
                            <div className="h-full overflow-y-auto text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight">
                                <VitaRenderer text={doctor.vita} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={handleReset} disabled={isSubmitting}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Zurücksetzen
                </Button>
                <Button onClick={handleSaveClick} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Wird gespeichert...
                        </>
                    ) : (
                        <>
                           <Save className="mr-2 h-4 w-4" />
                           {initialData ? 'Änderungen speichern' : 'Neuen Arzt speichern'}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};