
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Eye, EyeOff, Pencil, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Statische Daten für die Kartenkomponenten
const staticDoctorsData: Doctor[] = [
    {
        id: 'ortmanns',
        title: "Dipl. med.",
        name: "G. Ortmanns",
        imageUrl: "/images/team/Ortmanns.jpg",
        imageHint: "man portrait",
        specialty: "Praktischer Arzt",
        qualifications: ['Master of Public Health (UNSW)', 'Master of Health Management (UNSW)'],
        vita: `<h4>Curriculum Vitae</h4><ul>...</ul>`, // Gekürzt für die Seitenlogik
        additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
        order: 1,
    },
    {
        id: 'schemmer',
        title: "Prof. Dr. med. Dr. h. c.",
        name: "P. Schemmer",
        imageUrl: "/images/team/Prof.Schemmer.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Chirurgie",
        qualifications: [],
        vita: `<p>Prof. Schemmer war von 2013 bis 2022 Direktor...</p>`,
        partnerLogoComponent: "SchemmerWorniLogo",
        order: 2,
    },
    {
        id: 'rosenov',
        title: "Prof. Dr. med.",
        name: "A. Rosenov",
        imageUrl: "/images/team/Dr.Rosenov.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Angiologie",
        qualifications: [],
        vita: `<p>Prof. Rosenov hat sich bereit erklärt...</p>`,
        partnerLogoComponent: "VascAllianceLogo",
        order: 3,
    },
    {
        id: 'herschel',
        title: "Dr. med.",
        name: "R. Herschel",
        imageUrl: "/images/team/Dr.Herschel.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt Orthopädische Chirurgie und Traumatologie des Bewegungsapparates",
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: "OrthozentrumLogo",
        order: 4,
    },
    {
        id: 'slezak',
        title: "Dr. med.",
        name: "A. Slezak",
        imageUrl: "/images/team/Dr.Slezak.jpg",
        imageHint: "woman portrait",
        specialty: "Fachärztin für Neurologie",
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: "AgnieszkaSlezakLogo",
        order: 5,
    }
];

const doctorCardComponents: { [key: string]: React.FC } = {
    ortmanns: OrtmannsCard,
    schemmer: SchemmerCard,
    rosenov: RosenovCard,
    herschel: HerschelCard,
    slezak: SlezakCard,
};

const createDefaultDoctor = (): Doctor => ({
    id: 'mustermann',
    title: 'Dr. med.',
    name: 'Max Mustermann',
    specialty: 'Facharzt für Allgemeinmedizin',
    qualifications: ['Zusatzbezeichnung Sportmedizin', 'Fähigkeitsausweis Praxislabor (KHM)'],
    vita: '<p>Dieser Text kann frei angepasst werden.</p>',
    imageUrl: `https://picsum.photos/seed/mustermann/400/600`,
    imageHint: 'portrait placeholder',
    additionalInfo: 'Belegarzt',
    order: 99,
});


export default function DoctorsPage() {
    const [doctorInEdit, setDoctorInEdit] = useState<Doctor>(createDefaultDoctor());
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [hiddenDoctorIds, setHiddenDoctorIds] = useState<Set<string>>(new Set());
    const [isImageEditorOpen, setImageEditorOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [isVitaEditorOpen, setVitaEditorOpen] = useState(false);
    
    const doctorsList = useMemo(() => staticDoctorsData.sort((a, b) => a.order - b.order), []);

    const handleImageClick = () => {
        if (!editingDoctorId) return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageToCrop(event.target?.result as string);
                    setImageEditorOpen(true);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleCropComplete = (croppedImageUrl: string) => {
        setDoctorInEdit(prev => prev ? { ...prev, imageUrl: croppedImageUrl } : null);
        setImageEditorOpen(false);
        setImageToCrop(null);
    };

    const handleVitaClick = () => {
        if (!editingDoctorId) return;
        setVitaEditorOpen(true);
    };

    const handleVitaSave = (newVita: string) => {
        setDoctorInEdit(prev => prev ? { ...prev, vita: newVita } : null);
        setVitaEditorOpen(false);
    };

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctorId(doctor.id);
        setDoctorInEdit(doctor);
    };

    const toggleHideDoctor = (doctorId: string) => {
        setHiddenDoctorIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(doctorId)) {
                newSet.delete(doctorId);
            } else {
                newSet.add(doctorId);
            }
            return newSet;
        });
    };
    

    return (
        <>
            <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
                <Card className="w-full">
                    <CardHeader>
                        <div>
                            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                            <CardDescription>
                                Hier können Sie die Profile der Ärzte bearbeiten.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                            <div className="rounded-lg bg-muted p-4 md:p-6">
                                <EditableDoctorCard 
                                    doctor={doctorInEdit}
                                    onImageClick={handleImageClick}
                                    onVitaClick={handleVitaClick}
                                />
                                <Alert variant="info" className="mt-4 border-2 border-blue-500 text-blue-800 bg-blue-50">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Hinweis</AlertTitle>
                                    <AlertDescription>
                                        Klicken Sie auf ein Element in der Vorschau, um es zu verändern. Die Bearbeitung ist nur aktiv, wenn Sie unten eine Karte zum Bearbeiten ausgewählt haben.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </div>

                        <Separator className="my-12" />

                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärzteprofile</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Verwalten Sie die hier angezeigten Karten.
                            </p>
                        </div>

                        <div className="mt-8 space-y-12">
                            {doctorsList.map((doctor) => {
                                const CardComponent = doctorCardComponents[doctor.id];
                                const isEditing = editingDoctorId === doctor.id;
                                const isHidden = hiddenDoctorIds.has(doctor.id);

                                return (
                                    <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                        <div className="flex w-36 flex-col gap-2">
                                            <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                                <ArrowUp className="mr-2 h-4 w-4" /> Nach oben
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                                <ArrowDown className="mr-2 h-4 w-4" /> Nach unten
                                            </Button>
                                             <Separator className="my-2" />
                                            <Button variant="outline" size="sm" onClick={() => toggleHideDoctor(doctor.id)} disabled={isEditing} className="justify-start">
                                                {isHidden ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                                                {isHidden ? 'Einblenden' : 'Ausblenden'}
                                            </Button>
                                            <Button variant="default" size="sm" onClick={() => handleEditClick(doctor)} disabled={isEditing} className="justify-start">
                                                <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                                            </Button>
                                        </div>

                                        <div className={cn("relative flex-1 w-full max-w-[1000px] p-2", isHidden && "grayscale opacity-50")}>
                                            <CardComponent />
                                            {isEditing && (
                                                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/90">
                                                    <span className="text-2xl font-bold text-primary-foreground">In Bearbeitung</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {isImageEditorOpen && imageToCrop && (
                <ImageCropDialog
                    imageUrl={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setImageEditorOpen(false)}
                />
            )}
            {isVitaEditorOpen && doctorInEdit && (
              <VitaEditorDialog
                isOpen={isVitaEditorOpen}
                onOpenChange={setVitaEditorOpen}
                initialValue={doctorInEdit.vita}
                onSave={handleVitaSave}
              />
            )}
        </>
    );
}
