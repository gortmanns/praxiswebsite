'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User, Upload, ImageIcon, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const initialVita = `Medizinstudium in Bonn (Deutschland) und Hobart (Australien)
Masterstudium Public Health und Health Management in Sydney (Australien)
Unternehmensberatung mit Spezialisierung auf den Gesundheitssektor
---
Projektmanagement im Gesundheitswesen in Europa und Australien
<Meilensteine>
Leiter Klinische Entwicklung und Analytik bei DxCG Gesundheitsanalytik GmbH (Deutschland)
Verantwortlicher Manager für Klinische Sicherheit und Design Assurance bei der Entwicklung der Nationalen Elektronischen Gesundheitsakte in Australien
Direktor der Memory-Strategie (Elektronisches Medikamenten-Management und Elektronische Patientenakten) für das Netzwerk der Kinderkrankenhäuser in Sydney, Australien
</Meilensteine>
---
Weiterbildung in Allgemeiner Innerer Medizin in der Schweiz
<Meilensteine>
Universitätsspital Basel (USB)
Kantonsspital Baselland (KSBL)
Kantonsspital Winterthur (KSW)
Kantonsspital Wil (SRFT)
Hausarztpraxis in Winterthur
</Meilensteine>
---
Wissenschaftlicher Mitarbeiter an der Universität Zürich / USZ (Abteilung für Pneumologie)
Lehrbeauftragter für Hausarztmedizin (Institut für Hausarztmedizin der Universität Bern)
`;

const VitaSection = ({ content }: { content: string }) => {
    const sections = content.split('---').map(s => s.trim());

    return (
        <ul className="space-y-1.5 leading-tight">
            {sections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                    {section.split('\n').map((line, lineIndex) => {
                        if (line.startsWith('<Meilensteine>')) {
                            const subItemsText = section.split('<Meilensteine>')[1] || '';
                            const subItems = subItemsText.split('\n').filter(item => item.trim() !== '' && !item.startsWith('</Meilensteine>'));
                            const mainMilestoneLine = line.replace('<Meilensteine>', '').trim();
                            
                            return (
                                <li key={`${sectionIndex}-${lineIndex}`} className="font-bold text-primary mt-6 mb-4">
                                    {mainMilestoneLine}
                                    <div className="mt-1 pl-9 text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug text-background/80">
                                        <h5 className="mb-1 tracking-wide text-background/90">Meilensteine</h5>
                                        <ul className="list-disc space-y-px pl-5 font-normal">
                                            {subItems.map((item, subIndex) => (
                                                <li key={`${sectionIndex}-${lineIndex}-${subIndex}`}>{item.trim()}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        }
                        if (line.includes('</Meilensteine>') || (section.includes('<Meilensteine>') && !line.startsWith('<Meilensteine>'))) {
                            return null;
                        }
                        return <li key={`${sectionIndex}-${lineIndex}`}>{line}</li>;
                    })}
                    {sectionIndex < sections.length - 1 && <li className='py-2'></li>}
                </React.Fragment>
            ))}
        </ul>
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                setIsDialogOpen(false); 
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
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                                        {/* The Tooltip needs a child that can accept a ref, so we wrap the button */}
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
                                        <Input
                                            placeholder="Titel"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="h-auto border-0 bg-transparent p-0 text-[2.2cqw] text-primary placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                        <Input
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-auto border-0 bg-transparent p-0 font-headline text-[4.8cqw] font-bold leading-tight text-primary placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                        <div className="mt-[1.5cqw] space-y-1 text-[2.2cqw] leading-tight">
                                            <Input
                                                placeholder="Spezialisierung"
                                                value={specialty}
                                                onChange={(e) => setSpecialty(e.target.value)}
                                                className="h-auto border-0 bg-transparent p-0 font-bold placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                            <Input
                                                placeholder="Zusatzqualifikation 1 (Optional)"
                                                value={qualification1}
                                                onChange={(e) => setQualification1(e.target.value)}
                                                className="h-auto border-0 bg-transparent p-0 placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                            <Input
                                                placeholder="Zusatzqualifikation 2 (Optional)"
                                                value={qualification2}
                                                onChange={(e) => setQualification2(e.target.value)}
                                                className="h-auto border-0 bg-transparent p-0 placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Zusatzinformationen / Position (alternativ Logo)"
                                            value={additionalInfo}
                                            onChange={(e) => setAdditionalInfo(e.target.value)}
                                            className="mt-[2.5cqw] h-auto border-0 bg-transparent p-0 text-[1.6cqw] italic placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
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

    