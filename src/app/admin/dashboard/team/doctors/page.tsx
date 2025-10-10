
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Doctor as DoctorType } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Eye, EyeOff, ArrowUp, ArrowDown, PlusCircle, Save, Loader2, CheckCircle, AlertCircle, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TextEditDialog } from './_components/text-edit-dialog';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { LogoFunctionSelectDialog } from './_components/logo-function-select-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import { LanguageSelectDialog } from './_components/language-select-dialog';
import { SchemmerWorniLogo, AgnieszkaSlezakLogo, OrthozentrumLogo, VascAllianceLogo } from '@/components/logos';
import Image from 'next/image';
import { addDoctor, updateDoctor } from '@/firebase/firestore/doctors';
import { Skeleton } from '@/components/ui/skeleton';
import { DoctorCard } from '@/app/team/_components/doctor-card';

// Re-exporting Doctor type to avoid confusion with Doctor component
export type Doctor = DoctorType;


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

// Fallback data from original components
const staticDoctorsData: Doctor[] = [
    {
        id: "ortmanns",
        order: 1,
        title: "Dipl. med.",
        name: "G. Ortmanns",
        imageUrl: "/images/team/Ortmanns.jpg",
        imageHint: "man portrait",
        specialty: "Praktischer Arzt",
        languages: ['de', 'en'],
        qualifications: [
            'Master of Public Health (UNSW)',
            'Master of Health Management (UNSW)',
        ],
        vita: `<h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">2022</span> Niederlassung als Hausarzt im Praxiszentrum im Ring</li><li><span style="color: var(--color-tiptap-blue);">2021-22</span> Tätigkeit in der Hausarztpraxis Dr. G. Gyger, Thun</li><li><span style="color: var(--color-tiptap-blue);">2019-21</span> Oberarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2018</span> Oberarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2017</span> Assistenzarzt Kardiologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2016-17</span> Assistenzarzt Pneumologie, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2015-16</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2015</span> Erlangung des Facharzttitels für Innere Medizin</li><li><span style="color: var(--color-tiptap-blue);">2014-15</span> Assistenzarzt Intensivmedizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2013-14</span> Assistenzarzt Innere Medizin, Spital STS AG Thun</li><li><span style="color: var(--color-tiptap-blue);">2011-13</span> Assistenzarzt Innere Medizin, Spital Interlaken</li><li><span style="color: var(--color-tiptap-blue);">2011</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">2010-11</span> Assistenzarzt Chirurgie, Klinik für Viszerale Chirurgie und Medizin, Inselspital Bern</li><li><span style="color: var(--color-tiptap-blue);">2009</span> Staatsexamen</li><li><span style="color: var(--color-tiptap-blue);">2003-09</span> Studium der Humanmedizin an der Universität zu Köln</li></ul><br><p class="is-small">Mitgliedschaften:<br>Verbindung der Schweizer Ärztinnen und Ärzte (FMH)<br>Ärztegesellschaft des Kantons Bern (BEKAG)<br>Schweizerische Gesellschaft für Ultraschall in der Medizin (SGUM)</p>`,
        additionalInfo: "Ärztliche und administrative Leitung Praxiszentrum im Ring",
    },
    {
        id: "schemmer",
        order: 2,
        title: "Prof. Dr. med. Dr. h. c.",
        name: "P. Schemmer",
        imageUrl: "/images/team/Prof.Schemmer.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Chirurgie",
        languages: ['de', 'en'],
        qualifications: [],
        vita: `<p>Prof. Schemmer war von 2013 bis 2022 Direktor der Universitätsklinik für Viszerale Transplantationschirurgie am Inselspital in Bern.</p><br><p>Seit 2022 ist er Chefarzt für Chirurgie an der Universitätsklinik für Allgemein-, Viszeral- und Transplantationschirurgie in Graz.</p><br><p>Seine Patienten in der Schweiz behandelt er weiterhin, neu aber wohnortnah und unkompliziert auch hier im Praxiszentrum im Ring, wo er eine regelmässige Sprechstunde abhält.</p>`,
        partnerLogoComponent: 'SchemmerWorniLogo',
    },
    {
        id: "rosenov",
        order: 3,
        title: "Prof. Dr. med.",
        name: "A. Rosenov",
        imageUrl: "/images/team/Dr.Rosenov.jpg",
        imageHint: "man portrait",
        specialty: "Facharzt für Angiologie",
        languages: ['de', 'en'],
        qualifications: [],
        vita: `<p>Prof. Rosenov hat sich bereit erklärt, ab Mai 2024 die Patienten mit Krampfaderleiden im Praxiszentrum im Ring zu behandeln.</p><br><p>Er wird regelmässig, i.d.R. am Montagnachmittag, eine Sprechstunde im Praxiszentrum anbieten.</p><br><h4>Curriculum Vitae</h4><ul><li><span style="color: var(--color-tiptap-blue);">Seit 2004</span> Chefarzt Herzchirurgie, Spital Triemli, Zürich</li><li><span style="color: var(--color-tiptap-blue);">2002</span> Habilitation und Ernennung zum Privatdozenten an der Universität Ulm</li><li><span style="color: var(--color-tiptap-blue);">1997-2004</span> Oberarzt an der Klinik für Herz-, Thorax- und Gefässchirurgie, Ulm</li><li><span style="color: var(--color-tiptap-blue);">1991-1996</span> Facharztausbildung in der Herzchirurgie an der Medizinischen Hochschule Hannover</li><li><span style="color: var(--color-tiptap-blue);">1990</span> Promotion zum Dr. med.</li><li><span style="color: var(--color-tiptap-blue);">1882-1989</span> Studium der Humanmedizin an der Westfälischen Wilhelms-Universität in Münster</li></ul>`,
        partnerLogoComponent: 'VascAllianceLogo',
    },
    {
        id: "herschel",
        order: 4,
        title: "Dr. med.",
        name: "R. Herschel",
        imageUrl: "/images/team/Dr.Herschel.jpg",
        imageHint: "man portrait",
        specialty: (
            <div>
              <span>Facharzt Orthopädische Chirurgie und</span>
              <br />
              <span>Traumatologie des Bewegungsapparates</span>
            </div>
          ),
        languages: ['de', 'fr', 'it', 'en', 'es'],
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: 'OrthozentrumLogo',
    },
    {
        id: "slezak",
        order: 5,
        title: "Dr. med.",
        name: "A. Slezak",
        imageUrl: "/images/team/Dr.Slezak.jpg",
        imageHint: "woman portrait",
        specialty: "Fachärztin für Neurologie",
        languages: ['de'],
        qualifications: [],
        vita: `<p>Vita folgt in Kürze.</p>`,
        partnerLogoComponent: 'AgnieszkaSlezakLogo',
    }
];

const createDefaultDoctor = (): Omit<Doctor, 'id'> => ({
    title: 'Titel',
    name: 'Name',
    specialty: 'Spezialisierung',
    qualifications: ['Qualifikation 1', 'Qualifikation 2', 'Qualifikation 3', 'Qualifikation 4'],
    vita: '<p>Dieser Text kann frei angepasst werden.</p>',
    imageUrl: '',
    imageHint: 'placeholder',
    languages: ['de'],
    additionalInfo: undefined,
    partnerLogoComponent: undefined,
    order: 99,
});

const logoMap: { [key: string]: React.FC<{ className?: string }> } = {
    SchemmerWorniLogo,
    AgnieszkaSlezakLogo,
    OrthozentrumLogo,
    VascAllianceLogo,
};


export default function DoctorsPage() {
    const firestore = useFirestore();
    const doctorsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'doctors'), orderBy('order', 'asc')) : null, [firestore]);
    const { data: doctorsFromDb, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsQuery);

    const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
    const [doctorInEdit, setDoctorInEdit] = useState<Partial<Doctor> | null>(null);
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [hiddenDoctorIds, setHiddenDoctorIds] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    
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
    const [isLanguageSelectOpen, setLanguageSelectOpen] = useState(false);

    useEffect(() => {
        if (status && status.type !== 'info') {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 60000);
          return () => clearTimeout(timer);
        }
    }, [status]);
    
    useEffect(() => {
        if (!isLoadingDoctors) {
            if (doctorsFromDb && doctorsFromDb.length > 0) {
                 setDoctorsList(doctorsFromDb);
            } else {
                setDoctorsList(staticDoctorsData);
            }
        }
    }, [doctorsFromDb, isLoadingDoctors]);
    
    const displayedDoctorInEdit: Omit<Doctor, 'id'> = useMemo(() => {
        return {
            ...(createDefaultDoctor()),
            ...(doctorInEdit ?? {}),
        } as Omit<Doctor, 'id'>;
    }, [doctorInEdit]);
    
    const ensureEditingState = useCallback((isNew: boolean = false) => {
        if (isNew) {
            setDoctorInEdit(createDefaultDoctor());
            setEditingDoctorId(null);
            setStatus({ type: 'info', message: 'Erstellen Sie eine neue Arztkarte. Klicken Sie auf Elemente, um sie zu bearbeiten.' });
        } else if (!doctorInEdit) {
            setDoctorInEdit(createDefaultDoctor());
        }
    }, [doctorInEdit]);

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctorId(doctor.id);
        setDoctorInEdit(doctor);
        setStatus({ type: 'info', message: 'Klicken Sie auf ein Element in der Vorschau, um es zu bearbeiten. Mit "Abbrechen" werden alle Änderungen verworfen.' });
    };

    const handleCancel = () => {
        setDoctorInEdit(null);
        setEditingDoctorId(null);
        setStatus(null);
    };

    const isDoctorFromDB = (id: string | null): boolean => {
        if (!id) return false;
        return doctorsFromDb?.some(d => d.id === id) ?? false;
    };
    
    const handleSave = async () => {
        if (!firestore || !doctorInEdit) return;

        const isUpdating = editingDoctorId && isDoctorFromDB(editingDoctorId);

        const saveData = {
            title: doctorInEdit.title || 'Titel',
            name: doctorInEdit.name || 'Name',
            specialty: typeof doctorInEdit.specialty === 'object' ? 'Spezialisierung' : doctorInEdit.specialty || 'Spezialisierung',
            qualifications: doctorInEdit.qualifications || [],
            vita: doctorInEdit.vita || '<p></p>',
            imageUrl: doctorInEdit.imageUrl || '',
            imageHint: doctorInEdit.imageHint || 'placeholder',
            languages: doctorInEdit.languages || [],
            additionalInfo: doctorInEdit.additionalInfo,
            partnerLogoComponent: doctorInEdit.partnerLogoComponent as string | undefined,
            order: doctorInEdit.order || (doctorsList[doctorsList.length - 1]?.order || 0) + 1,
        };

        setIsSaving(true);
        setStatus(null);
        try {
            if (isUpdating) {
                await updateDoctor(firestore, editingDoctorId, saveData);
                setStatus({ type: 'success', message: 'Die Änderungen wurden erfolgreich gespeichert.' });
            } else {
                // This covers both new cards (editingDoctorId is null)
                // and saving a fallback card for the first time (editingDoctorId is set, but not in DB)
                await addDoctor(firestore, saveData, editingDoctorId);
                setStatus({ type: 'success', message: 'Die neue Arztkarte wurde erfolgreich angelegt.' });
            }
            handleCancel();
        } catch (error: any) {
            console.error("Error saving doctor: ", error);
            const errorMessage = `Die Daten konnten nicht gespeichert werden. Fehler: ${error.message || String(error)}`;
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setIsSaving(false);
        }
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
            } else if (editingField.key === 'additionalInfo') {
                return { ...currentDoctor, additionalInfo: newValue, partnerLogoComponent: undefined };
            } else if (editingField.key === 'specialty' && typeof currentDoctor.specialty !== 'string') {
                // Cannot update complex specialty node, do nothing or handle as needed
                return currentDoctor;
            } else {
                return { ...currentDoctor, [editingField.key]: newValue };
            }
        });
    
        setIsTextEditorOpen(false);
        setEditingField(null);
    }, [editingField]);
    
    const currentValueForDialog = useMemo(() => {
        const currentDoctor = doctorInEdit ?? createDefaultDoctor();
        if (!editingField) return '';
    
        const key = editingField.key;
        const defaultPlaceholders = ['Titel', 'Name', 'Spezialisierung', 'Qualifikation 1', 'Qualifikation 2', 'Qualifikation 3', 'Qualifikation 4'];
        
        if (key === 'qualifications' && editingField.index !== undefined) {
            const value = (currentDoctor.qualifications || [])[editingField.index];
            return defaultPlaceholders.includes(value) ? '' : value || '';
        }
        
        const specialty = currentDoctor.specialty;
        if (key === 'specialty') {
            if (typeof specialty === 'string') {
                return defaultPlaceholders.includes(specialty) ? '' : specialty;
            }
            return ''; // Cannot edit ReactNode, return empty
        }
        
        const value = currentDoctor[key as keyof Omit<Doctor, 'specialty'>] as string;
        if (defaultPlaceholders.includes(value)) {
            return '';
        }
        
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

     // --- Language Handling ---
    const handleLanguagesClick = useCallback(() => {
        ensureEditingState();
        setLanguageSelectOpen(true);
    }, [ensureEditingState]);

    const handleLanguagesSave = (selectedLanguages: string[]) => {
        setDoctorInEdit(prev => {
            const current = prev ?? createDefaultDoctor();
            return { ...current, languages: selectedLanguages };
        });
        setLanguageSelectOpen(false);
    };

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
    
    const getStatusAlert = () => {
        const defaultInfo = { type: 'info', message: 'Klicken Sie auf ein Element in der Vorschau, um es zu bearbeiten. Mit "Abbrechen" werden alle Änderungen verworfen.' };
        const currentStatus = status || (doctorInEdit ? defaultInfo : null);
    
        if (!currentStatus) return <div className="min-h-[76px] mt-4"></div>;
    
        const commonClasses = "border-2";
        let variant: 'default' | 'destructive' | 'info' = 'default';
        let icon = <CheckCircle className="h-4 w-4" />;
        let title = "Erfolg";
        let alertClasses = "border-green-500 text-green-800 bg-green-50";
    
        switch(currentStatus.type) {
            case 'error':
                variant = 'destructive';
                icon = <AlertCircle className="h-4 w-4" />;
                title = "Fehler";
                alertClasses = "border-red-500 text-red-800 bg-red-50";
                break;
            case 'info':
                variant = 'info';
                icon = <Info className="h-4 w-4" />;
                title = "Information";
                alertClasses = "border-blue-500 text-blue-800 bg-blue-50";
                break;
            case 'success':
                 // Already default
                break;
        }
        
        return (
            <div className="min-h-[76px] mt-4">
                <Alert variant={variant} className={cn(commonClasses, alertClasses)}>
                    {icon}
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>
                        {currentStatus.message}
                    </AlertDescription>
                </Alert>
            </div>
        );
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
                                {doctorInEdit && (
                                    <div className="flex gap-2">
                                        <Button onClick={handleSave} disabled={isSaving}>
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                            {editingDoctorId ? 'Änderungen speichern' : 'Als neue Karte anlegen'}
                                        </Button>
                                        <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                                            Abbrechen
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {doctorInEdit ? (
                                <div className="rounded-lg bg-muted p-4 md:p-6">
                                    <EditableDoctorCard 
                                        doctor={displayedDoctorInEdit as Doctor}
                                        onImageClick={handleImageClick}
                                        onVitaClick={handleVitaClick}
                                        onTextClick={handleTextEditClick}
                                        onLanguagesClick={handleLanguagesClick}
                                    />
                                    {getStatusAlert()}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted p-12 text-center">
                                    <h4 className="text-lg font-semibold text-muted-foreground">Keine Karte zum Bearbeiten ausgewählt.</h4>
                                    <p className="text-sm text-muted-foreground">Wählen Sie unten eine Karte zur Bearbeitung aus oder fügen Sie eine neue hinzu.</p>
                                    <Button onClick={() => ensureEditingState(true)}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Neue Karte erstellen
                                     </Button>
                                </div>
                            )}
                        </div>

                        <Separator className="my-12" />

                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten</h3>
                        </div>

                        <div className="mt-8 space-y-12">
                             {isLoadingDoctors ? (
                                <div className="space-y-12">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex w-full items-center justify-center gap-4">
                                            <div className="flex w-36 flex-col gap-2">
                                                <Skeleton className="h-9 w-full" />
                                                <Skeleton className="h-9 w-full" />
                                                <Separator className="my-2" />
                                                <Skeleton className="h-9 w-full" />
                                            </div>
                                            <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                                <div className="w-full aspect-[1000/495] overflow-hidden rounded-lg shadow-sm">
                                                    <Skeleton className="h-full w-full" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                doctorsList.map((doctor) => {
                                    const isEditing = editingDoctorId === doctor.id;
                                    const isHidden = hiddenDoctorIds.has(doctor.id);
                                    const LogoComponent = typeof doctor.partnerLogoComponent === 'string' ? logoMap[doctor.partnerLogoComponent] : undefined;

                                    return (
                                        <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                            <div className="flex w-36 flex-col gap-2">
                                                <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing || isSaving} className="justify-start">
                                                    <ArrowUp className="mr-2 h-4 w-4" /> Nach oben
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing || isSaving} className="justify-start">
                                                    <ArrowDown className="mr-2 h-4 w-4" /> Nach unten
                                                </Button>
                                                <Separator className="my-2" />
                                                <Button variant="outline" size="sm" onClick={() => toggleHideDoctor(doctor.id)} disabled={isEditing || isSaving} className="justify-start">
                                                    {isHidden ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                                                    {isHidden ? 'Einblenden' : 'Ausblenden'}
                                                </Button>
                                                <Button variant="default" size="sm" onClick={() => handleEditClick(doctor)} disabled={isEditing || isSaving || !!editingDoctorId} className="justify-start">
                                                    <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                                                </Button>
                                            </div>

                                            <div className={cn("relative flex-1 w-full max-w-[1000px] p-2", isHidden && "grayscale opacity-50")}>
                                                <DoctorCard
                                                {...doctor}
                                                specialty={typeof doctor.specialty === 'string' ? doctor.specialty : (
                                                    <div>
                                                      <span>Facharzt Orthopädische Chirurgie und</span>
                                                      <br />
                                                      <span>Traumatologie des Bewegungsapparates</span>
                                                    </div>
                                                  )}
                                                partnerLogoComponent={LogoComponent as React.FC<{ className?: string; }> | string | undefined}
                                                />
                                                {isEditing && (
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/90">
                                                        <span className="text-2xl font-bold text-primary-foreground">Wird bearbeitet</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
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
            {isVitaEditorOpen && (
                <VitaEditorDialog
                    isOpen={isVitaEditorOpen}
                    onOpenChange={setVitaEditorOpen}
                    initialValue={displayedDoctorInEdit.vita as string}
                    onSave={handleVitaSave}
                />
            )}
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
            {isLanguageSelectOpen && (
                 <LanguageSelectDialog
                    isOpen={isLanguageSelectOpen}
                    onOpenChange={setLanguageSelectOpen}
                    initialLanguages={displayedDoctorInEdit.languages || []}
                    onSave={handleLanguagesSave}
                />
            )}
        </>
    );
}
