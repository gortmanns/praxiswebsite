'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, ImageIcon, Info, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const initialVita = `Medizinstudium in Bonn (Deutschland) und Hobart (Australien)
Masterstudium Public Health und Health Management in Sydney (Australien)
Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor
---
Projektmanagement im Gesundheitswesen in Europa und Australien
<Meilensteine>
Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)
Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien
Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien
</Meilenstealen>
---
Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
<Meilensteine>
Universitätsspital Basel (USB)
Kantonsspital Baselland (KSBL)
Kantonsspital Winterthur (KSW)
Kantonsspital Wil (SRFT)
Hausarztpraxis in Winterthur
</Meilenstealen>
---
Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)
Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)
`;

interface EditDialogProps {
    triggerText: React.ReactNode;
    dialogTitle: string;
    dialogDescription: string;
    initialValue: string;
    onSave: (value: string) => void;
    inputLabel: string;
    isTextarea?: boolean;
    className?: string;
    textClassName?: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
    triggerText,
    dialogTitle,
    dialogDescription,
    initialValue,
    onSave,
    inputLabel,
    isTextarea = false,
    className,
    textClassName
}) => {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        onSave(currentValue);
        setIsDialogOpen(false);
    };
    
    React.useEffect(() => {
        setCurrentValue(initialValue);
    }, [initialValue]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div className={cn("group relative cursor-pointer", className)}>
                    <div className={cn(textClassName)}>{triggerText}</div>
                    <Pencil className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="edit-input">{inputLabel}</Label>
                    {isTextarea ? (
                         <Textarea
                            id="edit-input"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            rows={5}
                        />
                    ) : (
                        <Input
                            id="edit-input"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                        />
                    )}
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
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
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
                setIsImageDialogOpen(false); 
            };
            reader.readAsDataURL(file);
        }
    };

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
                        {/* Linke Spalte: Hauptkarte */}
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
                                                <Upload className="h-10 w-10 text-white" />
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Bild für Arztprofil auswählen</DialogTitle>
                                            <DialogDescription>
                                                Wählen Sie ein bestehendes Bild aus oder laden Sie ein neues hoch. 
                                                Für eine optimale Darstellung sollte das Bild ein Seitenverhältnis von 2:3 haben.
                                                Bitte geben Sie zuerst einen Namen für den Arzt ein.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <Button variant="outline" disabled>
                                                <ImageIcon className="mr-2 h-4 w-4" />
                                                Bestehendes auswählen
                                            </Button>
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
                                                    { !name && (
                                                        <TooltipContent>
                                                            <p>Bitte geben Sie zuerst einen Namen ein.</p>
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
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
                                         triggerText={title || '[Titel]'}
                                         textClassName="text-[2.2cqw] text-primary"
                                       />
                                       <EditDialog 
                                         dialogTitle="Name bearbeiten"
                                         dialogDescription="Geben Sie den Vor- und Nachnamen des Arztes ein."
                                         initialValue={name}
                                         onSave={setName}
                                         inputLabel="Name"
                                         triggerText={<h4 className="font-headline text-[4.8cqw] font-bold leading-tight text-primary">{name || '[Name]'}</h4>}
                                       />
                                       <div className="mt-[1.5cqw] space-y-1 text-[2.2cqw] leading-tight">
                                           <EditDialog 
                                             dialogTitle="Spezialisierung bearbeiten"
                                             dialogDescription="Geben Sie die Spezialisierung des Arztes ein."
                                             initialValue={specialty}
                                             onSave={setSpecialty}
                                             inputLabel="Spezialisierung"
                                             triggerText={<p className="font-bold">{specialty || '[Spezialisierung]'}</p>}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 1 bearbeiten"
                                             dialogDescription="Geben Sie eine optionale Zusatzqualifikation ein."
                                             initialValue={qualification1}
                                             onSave={setQualification1}
                                             inputLabel="Zusatzqualifikation 1"
                                             triggerText={qualification1 || '[Zusatzqualifikation 1]'}
                                           />
                                            <EditDialog 
                                             dialogTitle="Zusatzqualifikation 2 bearbeiten"
                                             dialogDescription="Geben Sie eine weitere optionale Zusatzqualifikation ein."
                                             initialValue={qualification2}
                                             onSave={setQualification2}
                                             inputLabel="Zusatzqualifikation 2"
                                             triggerText={qualification2 || '[Zusatzqualifikation 2]'}
                                           />
                                       </div>
                                       <EditDialog
                                            dialogTitle="Zusatzinformationen bearbeiten"
                                            dialogDescription="Geben Sie Zusatzinformationen oder die Position des Arztes ein. Dies kann auch für ein Partnerlogo verwendet werden."
                                            initialValue={additionalInfo}
                                            onSave={setAdditionalInfo}
                                            inputLabel="Zusatzinformationen"
                                            triggerText={<p className="italic">{additionalInfo || '[Zusatzinfo / Logo]'}</p>}
                                            className="mt-[2.5cqw]"
                                            textClassName="text-[1.6cqw]"
                                       />
                                    </div>
                                </div>
                             </div>
                        </div>
                        {/* Rechte Spalte: Vita */}
                        <div className="flex flex-col items-start justify-start overflow-auto bg-accent/95 p-6 text-left text-background">
                            <div className="flex w-full items-center justify-between">
                                <h3 className="mb-4 font-bold text-primary">Vita / Lebenslauf</h3>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-primary/80" />
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="max-w-xs">
                                            <p>Verwenden Sie "---" (drei Bindestriche) in einer neuen Zeile, um Abschnitte zu trennen.</p>
                                            <p>Verwenden Sie "&lt;Meilensteine&gt;" zu Beginn einer Zeile, um eine Liste von Meilensteinen zu erstellen.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Textarea
                                value={vita}
                                onChange={(e) => setVita(e.target.value)}
                                className="h-full w-full flex-1 resize-none border-0 bg-transparent p-0 text-[clamp(0.8rem,2.5cqw,1.2rem)] leading-tight text-background placeholder:text-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
