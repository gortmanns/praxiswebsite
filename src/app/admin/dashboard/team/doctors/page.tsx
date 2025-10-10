'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Doctor as DoctorType } from '@/app/team/_components/doctor-card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { ImageCropDialog } from './_components/image-crop-dialog';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Eye, EyeOff, ArrowUp, ArrowDown, PlusCircle, Save, Loader2, CheckCircle, AlertCircle, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TextEditDialog } from './_components/text-edit-dialog';
import { ImageSourceDialog } from './_components/image-source-dialog';
import { LogoFunctionSelectDialog } from './_components/logo-function-select-dialog';
import { ImageLibraryDialog } from './_components/image-library-dialog';
import { LanguageSelectDialog } from './_components/language-select-dialog';
import { SchemmerWorniLogo, AgnieszkaSlezakLogo, OrthozentrumLogo, VascAllianceLogo } from '@/components/logos';
import Image from 'next/image';
import { addDoctor, updateDoctor, type DoctorData } from '@/firebase/firestore/doctors';
import { Skeleton } from '@/components/ui/skeleton';
import { DoctorCard } from '@/app/team/_components/doctor-card';

// Import individual doctor card props
import { ortmannsProps } from '@/app/team/_components/doctors/ortmanns-card';
import { schemmerProps } from '@/app/team/_components/doctors/schemmer-card';
import { rosenovProps } from '@/app/team/_components/doctors/rosenov-card';
import { herschelProps } from '@/app/team/_components/doctors/herschel-card';
import { slezakProps } from '@/app/team/_components/doctors/slezak-card';

export type Doctor = DoctorType;

const staticDoctorsData: Doctor[] = [
    ortmannsProps,
    schemmerProps,
    rosenovProps,
    herschelProps,
    slezakProps,
].map(props => props as Doctor).sort((a, b) => a.order - b.order);


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
  "/images/leistungen/wundversorgung.jpg",
  "/images/leistungen/twint_logo.png",
  "/images/leistungen/VMU.png",
  // Sonstige
  "/images/luftbild.jpg",
  "/images/foto-medis.jpg",
  "/images/rtw-bern.jpg",
];
const uniqueProjectImages = [...new Set(allProjectImages)];

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
    const { user, isUserLoading } = useUser();
    
    const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);
    const { data: dbDoctors, isLoading: areDoctorsLoading, error: doctorsError } = useCollection<Doctor>(doctorsQuery);
    
    const [doctorsList, setDoctorsList] = useState<Doctor[]>(staticDoctorsData);
    const prevDbDoctorsRef = useRef<Doctor[]>();

    useEffect(() => {
        if (dbDoctors) {
            // Only update if dbDoctors has actually changed to prevent loops
            if (JSON.stringify(dbDoctors) !== JSON.stringify(prevDbDoctorsRef.current)) {
                const staticDataMap = new Map(staticDoctorsData.map(d => [d.id, d]));
                
                const mergedList = Array.from(staticDataMap.keys()).map(id => {
                    const dbDoc = dbDoctors.find(d => d.id === id);
                    return dbDoc || staticDataMap.get(id);
                }) as Doctor[];

                dbDoctors.forEach(dbDoc => {
                    if (!staticDataMap.has(dbDoc.id)) {
                        mergedList.push(dbDoc);
                    }
                });

                const sortedList = mergedList.sort((a,b) => a.order - b.order);
                setDoctorsList(sortedList);
                prevDbDoctorsRef.current = dbDoctors; // Update the ref
            }
        }
    }, [dbDoctors]);


    const [doctorInEdit, setDoctorInEdit] = useState<Partial<Doctor> | null>(null);
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [hiddenDoctorIds, setHiddenDoctorIds] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
    
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
            setStatus({ type: 'info', message: 'Erstellen Sie eine neue Arztkarte. Klicken Sie auf Elemente, um sie zu bearbeiten.'});
        } else if (!doctorInEdit) {
            setDoctorInEdit(createDefaultDoctor());
        }
    }, [doctorInEdit]);

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctorId(doctor.id);
        setDoctorInEdit(doctor);
        setStatus({ type: 'info', message: `Sie bearbeiten nun das Profil von ${doctor.name}. Alle Änderungen werden in der Vorschau angezeigt.`});
    };

    const handleCancel = () => {
        setDoctorInEdit(null);
        setEditingDoctorId(null);
        setStatus(null);
    };
    
    const handleSave = async () => {
        if (!firestore || !doctorInEdit || !user) {
            setStatus({ type: 'error', message: 'Speichern fehlgeschlagen: Benutzer nicht authentifiziert oder Datenbank nicht bereit.' });
            return;
        };

        if (!doctorInEdit.name || doctorInEdit.name.trim() === '' || doctorInEdit.name === 'Name') {
            setStatus({ type: 'error', message: 'Speichern nicht möglich: Bitte geben Sie einen Namen für den Arzt an, bevor Sie speichern.' });
            return;
        }
        
        setIsSaving(true);
        setStatus(null);
        const isUpdatingExistingDBEntry = !!editingDoctorId;

        // --- Data Sanitization ---
        const { specialty, partnerLogoComponent, ...restOfDoctor } = doctorInEdit;

        // Convert specialty ReactNode to string if it's not a string already
        const specialtyString = typeof specialty === 'string' ? specialty : '';

        // Convert partnerLogoComponent to a string identifier if it's a function
        let partnerLogoString: string | undefined = undefined;
        if (typeof partnerLogoComponent === 'function') {
            const logoName = Object.keys(logoMap).find(key => logoMap[key] === partnerLogoComponent);
            partnerLogoString = logoName;
        } else if (typeof partnerLogoComponent === 'string') {
            partnerLogoString = partnerLogoComponent;
        }

        const saveData: DoctorData = {
            ...createDefaultDoctor(),
            ...restOfDoctor,
            specialty: specialtyString,
            partnerLogoComponent: partnerLogoString,
            order: doctorInEdit.order || (doctorsList.length > 0 ? Math.max(...doctorsList.map(d => d.order)) + 1 : 1),
        };
    
        try {
            if (isUpdatingExistingDBEntry) {
                await updateDoctor(firestore, editingDoctorId, saveData);
                setStatus({ type: 'success', message: `Arztprofil für ${saveData.name} erfolgreich aktualisiert.` });
            } else {
                 await addDoctor(firestore, saveData, editingDoctorId || undefined);
                 setStatus({ type: 'success', message: `Arztprofil für ${saveData.name} erfolgreich erstellt.` });
            }
            
            handleCancel();

        } catch (error: any) {
            console.error("Error saving doctor: ", error);
            setStatus({ type: 'error', message: `Die Daten konnten nicht gespeichert werden: ${error.message || String(error)}` });
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
    
      useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);


    const getStatusAlert = () => {
        if (!status) return null;

        const commonClasses = "border-2";
        let variant: 'default' | 'destructive' | 'warning' | 'info' = 'default';
        let icon = <CheckCircle className="h-4 w-4" />;
        let title = "Erfolg";
        let alertClasses = "border-green-500 text-green-800 bg-green-50";

        switch(status.type) {
            case 'error':
                variant = 'destructive';
                icon = <AlertCircle className="h-4 w-4" />;
                title = "Fehler";
                alertClasses = "border-red-500 text-red-800 bg-red-50";
                break;
            case 'warning':
                variant = 'warning';
                icon = <TriangleAlert className="h-4 w-4" />;
                title = "Warnung";
                alertClasses = "border-yellow-500 text-yellow-800 bg-yellow-50";
                break;
            case 'info':
                variant = 'info';
                icon = <Info className="h-4 w-4" />;
                title = "Information";
                alertClasses = "border-blue-500 text-blue-800 bg-blue-50";
                break;
        }
        
        return (
            <Alert variant={variant} className={cn(commonClasses, alertClasses)}>
                {icon}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {status.message}
                </AlertDescription>
            </Alert>
        );
    };

    return (
        <>
            <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                                <CardDescription>
                                    Hier können Sie die Profile der Ärzte bearbeiten.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                                {doctorInEdit && (
                                    <div className="flex gap-2">
                                        <Button onClick={handleSave} disabled={isSaving || isUserLoading}>
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
                             <div className="mt-4 min-h-[76px]">
                                {getStatusAlert()}
                             </div>
                        </div>

                        <Separator className="my-12" />

                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten</h3>
                        </div>

                        <div className="mt-8 space-y-12">
                             { areDoctorsLoading || isUserLoading ? (
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
                                    
                                    let partnerLogo: React.FC<{ className?: string; }> | string | undefined = doctor.partnerLogoComponent;
                                    if (typeof partnerLogo === 'string' && logoMap[partnerLogo]) {
                                       partnerLogo = logoMap[partnerLogo];
                                    }

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
                                                    <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                                </Button>
                                            </div>

                                            <div className={cn("relative flex-1 w-full max-w-[1000px] p-2", isHidden && "grayscale opacity-50")}>
                                                <DoctorCard
                                                    {...doctor}
                                                    qualifications={doctor.qualifications || []}
                                                    partnerLogoComponent={partnerLogo}
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
