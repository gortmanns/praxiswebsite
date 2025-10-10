'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Doctor } from '@/app/team/_components/doctor-card';
import { DoctorCard } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Eye, EyeOff, Pencil, ArrowUp, ArrowDown, PlusCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TextEditDialog } from './_components/text-edit-dialog';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { LogoFunctionSelectDialog } from './_components/logo-function-select-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SchemmerWorniLogo } from '@/components/logos/schemmer-worni-logo';
import { AgnieszkaSlezakLogo } from '@/components/logos/agnieszka-slezak-logo';
import { OrthozentrumLogo } from '@/components/logos/orthozentrum-logo';
import Image from 'next/image';

const staticDoctorsData: Doctor[] = [
    {
        id: 'ortmanns',
        order: 1,
        title: "Dipl. med.",
        name: "G. Ortmanns",
        imageUrl: "/images/team/Ortmanns.jpg",
        imageHint: "man portrait",
        specialty: "Praktischer Arzt",
        qualifications: ['Master of Public Health (UNSW)', 'Master of Health Management (UNSW)'],
        vita: `<h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li><li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li><li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li><li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li><li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li></ul><br><p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>`,
        additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
    },
    {
        id: 'schemmer',
        order: 2,
        title: "Prof. Dr. med. Dr. h. c.",
        name: "P. Schemmer",
        imageUrl: "/images/team/Prof.Schemmer.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Chirurgie",
        qualifications: [],
        vita: `<p>Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.</p><br><p>Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.</p><br><p>Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.</p>`,
        partnerLogoComponent: "SchemmerWorniLogo",
    },
    {
        id: 'rosenov',
        order: 3,
        title: "Prof. Dr. med.",
        name: "A. Rosenov",
        imageUrl: "/images/team/Dr.Rosenov.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Angiologie",
        qualifications: [],
        vita: `<p>Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.</p><br><p>Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.</p><br><h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li><li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li><li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li><li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li><li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li></ul>`,
        partnerLogoComponent: "VascAllianceLogo",
    },
    {
        id: 'herschel',
        order: 4,
        title: "Dr. med.",
        name: "R. Herschel",
        imageUrl: "/images/team/Dr.Herschel.jpg",
        imageHint: "man portrait",
        specialty: <span>Facharzt für <span className="whitespace-nowrap">Orthopädische Chirurgie</span> und <span className="whitespace-nowrap">Traumatologie des Bewegungsapparates</span></span>,
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: "OrthozentrumLogo",
    },
    {
        id: 'slezak',
        order: 5,
        title: "Dr. med.",
        name: "A. Slezak",
        imageUrl: "/images/team/Dr.Slezak.jpg",
        imageHint: "woman portrait",
        specialty: "Fachärztin für Neurologie",
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: "AgnieszkaSlezakLogo",
    }
];

const allProjectImages = [
  // Team
  "/images/team/Ortmanns.jpg",
  "/images/team/Prof.Schemmer.jpg",
  "/images/team/Dr.Rosenov.jpg",
  "/images/team/Dr.Herschel.jpg",
  "/images/team/Dr.Slezak.jpg",
  "/images/team/Garcia.jpg",
  "/images/team/Aeschlimann.jpg",
  "/images/team/Huber.jpg",
  "/images/team/Oetztuerk.jpg",
  "/images/team/Sommer.jpg",
  // Logos
  "/images/VASC-Alliance-Logo.png",
  "/images/schemmer-worni-logo.png",
  "/images/go-medical-logo.png",
  "/images/mcl-labor-logo.png",
  "/images/doxnet-logo.jpg",
  "/images/mehrfacharzt-logo.png",
  "/images/praxiszentrum-logo.png",
  "/images/praxiszentrum-logo-icon.png",
  "/images/medphone_logo.png",
  "/images/toxinfo-logo.svg",
  // Leistungen
  "/images/leistungen/audiometrie.jpg",
  "/images/leistungen/ekg.jpg",
  "/images/leistungen/labor.jpg",
  "/images/leistungen/praxisapotheke.jpg",
  "/images/leistungen/roentgen.jpg",
  "/images/leistungen/spirometrie.jpg",
  "/images/leistungen/twint_logo.png",
  "/images/leistungen/VMU.png",
  "/images/leistungen/wundversorgung.jpg",
  // Sonstige
  "/images/luftbild.jpg",
  "/images/foto-medis.jpg",
  "/images/rtw-bern.jpg",
];
const uniqueProjectImages = [...new Set(allProjectImages)];

const createDefaultDoctor = (): Doctor => ({
    id: 'placeholder',
    title: 'Titel',
    name: 'Name',
    specialty: 'Spezialisierung',
    qualifications: ['Qualifikation 1', 'Qualifikation 2', 'Qualifikation 3', 'Qualifikation 4'],
    vita: '<p>Dieser Text kann frei angepasst werden.</p>',
    imageUrl: '',
    imageHint: 'placeholder',
    additionalInfo: undefined,
    partnerLogoComponent: undefined,
    order: 99,
});


const VascAllianceLogo = (props: {className?: string}) => (
    <Image
        src="/images/VASC-Alliance-Logo.png"
        alt="VASC Alliance Logo"
        width={800}
        height={268}
        className={props.className}
        data-ai-hint="partner logo"
    />
);

const logoMap: { [key: string]: React.FC<{ className?: string }> } = {
    SchemmerWorniLogo,
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    VascAllianceLogo,
};


export default function DoctorsPage() {
    const [doctorsList, setDoctorsList] = useState<Doctor[]>(() => staticDoctorsData.sort((a, b) => a.order - b.order));
    const [doctorInEdit, setDoctorInEdit] = useState<Doctor | null>(null);
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [hiddenDoctorIds, setHiddenDoctorIds] = useState<Set<string>>(new Set());
    
    // Dialog states
    const [isImageSourceDialogOpen, setImageSourceDialogOpen] = useState(false);
    const [isImageCropDialogOpen, setImageCropDialogOpen] = useState(false);
    const [isImageLibraryOpen, setImageLibraryOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [imageEditContext, setImageEditContext] = useState<'portrait' | 'logo' | null>(null);
    const [isVitaEditorOpen, setVitaEditorOpen] = useState(false);
    const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
    const [editingField, setEditingField] = useState<{ key: keyof Doctor; label: string, index?: number } | null>(null);
    const [isLogoFunctionSelectOpen, setLogoFunctionSelectOpen] = useState(false);
    
    const displayedDoctorInEdit = doctorInEdit ?? createDefaultDoctor();
    
    const ensureEditingState = useCallback(() => {
        if (!doctorInEdit) {
            setDoctorInEdit(createDefaultDoctor());
        }
    }, [doctorInEdit]);

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctorId(doctor.id);
        setDoctorInEdit(doctor);
    };

    const handleCancel = () => {
        setDoctorInEdit(null);
        setEditingDoctorId(null);
    };

    const handleAddNewDoctor = () => {
        if (!doctorInEdit) return;

        const newDoctor: Doctor = {
            ...doctorInEdit,
            id: `new-${Date.now()}`,
            order: (doctorsList[doctorsList.length - 1]?.order || 0) + 1,
            imageUrl: doctorInEdit.imageUrl || '', // Ensure imageUrl is at least an empty string
        };
        
        setDoctorsList(prev => [...prev, newDoctor]);
        handleCancel();
    };

    const handleUpdateDoctor = () => {
        if (!editingDoctorId || !doctorInEdit) return;

        setDoctorsList(prevList => 
            prevList.map(doc => 
                doc.id === editingDoctorId ? doctorInEdit : doc
            )
        );
        handleCancel();
    };

    // --- Image Handling ---
    const handleImageClick = useCallback(() => {
        ensureEditingState();
        setImageEditContext('portrait');
        setImageSourceDialogOpen(true);
    }, [ensureEditingState]);

    const handleUploadNewImage = useCallback(() => {
        setImageSourceDialogOpen(false);
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageToCrop(event.target?.result as string);
                    setImageCropDialogOpen(true);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }, []);

    const handleSelectFromLibrary = useCallback(() => {
        setImageSourceDialogOpen(false);
        setImageLibraryOpen(true);
    }, []);

    const handleImageSelectedFromLibrary = (imageUrl: string) => {
        setImageLibraryOpen(false);
        setImageToCrop(imageUrl);
        setImageCropDialogOpen(true);
    };
    
    const handleCropComplete = useCallback((croppedImageUrl: string) => {
        setDoctorInEdit(prev => {
             const current = prev ?? createDefaultDoctor();
            if (imageEditContext === 'logo') {
                return { ...current, partnerLogoComponent: croppedImageUrl, additionalInfo: undefined };
            }
            return { ...current, imageUrl: croppedImageUrl };
        });
        setImageCropDialogOpen(false);
        setImageToCrop(null);
        setImageEditContext(null);
    }, [imageEditContext]);

    // --- Vita Handling ---
    const handleVitaClick = useCallback(() => {
        ensureEditingState();
        setVitaEditorOpen(true);
    }, [ensureEditingState]);

    const handleVitaSave = useCallback((newVita: string) => {
        setDoctorInEdit(prev => {
            const current = prev ?? createDefaultDoctor();
            return { ...current, vita: newVita };
        });
        setVitaEditorOpen(false);
    }, []);

    // --- Text Field Handling ---
    const handleTextEditClick = useCallback((fieldKey: keyof Doctor, fieldLabel: string, index?: number) => {
        ensureEditingState();
        if (fieldKey === 'additionalInfo' || fieldKey === 'partnerLogoComponent') {
            setLogoFunctionSelectOpen(true);
        } else {
            setEditingField({ key: fieldKey, label: fieldLabel, index });
            setIsTextEditorOpen(true);
        }
    }, [ensureEditingState]);
    
    const handleTextSave = useCallback((newValue: string) => {
        if (!editingField) return;
    
        setDoctorInEdit(prev => {
            const currentDoctor = prev ?? createDefaultDoctor();
            if (editingField.key === 'qualifications' && editingField.index !== undefined) {
                const updatedQualifications = [...(currentDoctor.qualifications || [])];
                updatedQualifications[editingField.index] = newValue;
                return { ...currentDoctor, qualifications: updatedQualifications };
            } else {
                 if (editingField.key === 'additionalInfo') {
                    return { ...currentDoctor, additionalInfo: newValue, partnerLogoComponent: undefined };
                }
                return { ...currentDoctor, [editingField.key]: newValue };
            }
        });
    
        setIsTextEditorOpen(false);
        setEditingField(null);
    }, [editingField]);
    
    const currentValueForDialog = useMemo(() => {
        const currentDoctor = doctorInEdit ?? createDefaultDoctor();
        if (!editingField) return '';
        if (editingField.key === 'qualifications' && editingField.index !== undefined) {
            return (currentDoctor.qualifications || [])[editingField.index] || '';
        }
        const value = currentDoctor[editingField.key as keyof Doctor] as string;
        return value || '';
    }, [editingField, doctorInEdit]);

    // --- Logo/Function Handling ---
    const handleSelectFunction = () => {
        setLogoFunctionSelectOpen(false);
        setEditingField({ key: 'additionalInfo', label: 'Funktion' });
        setIsTextEditorOpen(true);
    };
    
    const handleSelectLogoFromLibrary = useCallback(() => {
        setLogoFunctionSelectOpen(false);
        ensureEditingState();
        setImageEditContext('logo');
        setImageLibraryOpen(true);
    }, [ensureEditingState]);

    const handleUploadNewLogo = useCallback(() => {
        setLogoFunctionSelectOpen(false);
        ensureEditingState();
        setImageEditContext('logo');
        handleUploadNewImage();
    }, [ensureEditingState, handleUploadNewImage]);
    
    const imageAspectRatio = useMemo(() => {
        if (imageEditContext === 'logo') {
            return 1600 / 268; // Aspect ratio for testing
        }
        return 2 / 3; // Default portrait aspect ratio
    }, [imageEditContext]);

    // --- General UI ---
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
                             <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                                <div className="flex gap-2">
                                    {editingDoctorId ? (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="default">
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Änderungen speichern
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Änderungen speichern?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                       Möchten Sie die Änderungen an dieser Arztkarte speichern? Die bisherigen Werte werden überschrieben.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Nein, abbrechen</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleUpdateDoctor}>Ja, speichern</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    ) : (
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="default" disabled={!doctorInEdit}>
                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                    Als neue Karte übernehmen
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Neue Arztkarte anlegen?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                       Möchten Sie die aktuellen Eingaben als neue Arztkarte am Ende der Liste hinzufügen?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Nein, abbrechen</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleAddNewDoctor}>Ja, hinzufügen</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                    
                                    <Button variant="outline" onClick={handleCancel} disabled={!doctorInEdit && !editingDoctorId}>
                                        Abbrechen
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg bg-muted p-4 md:p-6">
                                <EditableDoctorCard 
                                    doctor={displayedDoctorInEdit}
                                    onImageClick={handleImageClick}
                                    onVitaClick={handleVitaClick}
                                    onTextClick={handleTextEditClick}
                                />
                                <Alert variant="info" className="mt-4 border-2 border-blue-500 text-blue-800 bg-blue-50">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Hinweis</AlertTitle>
                                    <AlertDescription>
                                        Klicken Sie auf ein Element in der Vorschau, um es zu verändern. Mit "Abbrechen" werden alle Änderungen verworfen.
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
                                const isEditing = editingDoctorId === doctor.id;
                                const isHidden = hiddenDoctorIds.has(doctor.id);
                                const LogoComponent = typeof doctor.partnerLogoComponent === 'string' ? logoMap[doctor.partnerLogoComponent] : doctor.partnerLogoComponent;

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
                                            <DoctorCard
                                              {...doctor}
                                              partnerLogoComponent={LogoComponent as React.FC<{ className?: string; }> | undefined}
                                            />
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

            {/* --- Dialogs --- */}
            <ImageSourceDialog
                isOpen={isImageSourceDialogOpen}
                onOpenChange={setImageSourceDialogOpen}
                onUpload={handleUploadNewImage}
                onSelect={handleSelectFromLibrary}
            />
            {isImageCropDialogOpen && imageToCrop && (
                <ImageCropDialog
                    imageUrl={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setImageCropDialogOpen(false)}
                    aspectRatio={imageAspectRatio}
                />
            )}
             <ImageLibraryDialog
                isOpen={isImageLibraryOpen}
                onOpenChange={setImageLibraryOpen}
                images={uniqueProjectImages}
                onImageSelect={handleImageSelectedFromLibrary}
            />
            <VitaEditorDialog
                isOpen={isVitaEditorOpen}
                onOpenChange={setVitaEditorOpen}
                initialValue={displayedDoctorInEdit.vita}
                onSave={handleVitaSave}
            />
            {editingField && (
                <TextEditDialog
                    isOpen={isTextEditorOpen}
                    onOpenChange={setIsTextEditorOpen}
                    title={`Bearbeiten: ${editingField.label}`}
                    label={editingField.label}
                    initialValue={currentValueForDialog}
                    onSave={handleTextSave}
                />
            )}
            <LogoFunctionSelectDialog
                isOpen={isLogoFunctionSelectOpen}
                onOpenChange={setLogoFunctionSelectOpen}
                onSelectFunction={handleSelectFunction}
                onSelectFromLibrary={handleSelectLogoFromLibrary}
                onUploadNew={handleUploadNewLogo}
            />
        </>
    );
}
