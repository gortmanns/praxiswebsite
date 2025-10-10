
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
import { Info, Eye, EyeOff, Pencil, ArrowUp, ArrowDown, PlusCircle, Save, Trash2, Loader2 } from 'lucide-react';
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
import { SchemmerWorniLogo, AgnieszkaSlezakLogo, OrthozentrumLogo, VascAllianceLogo } from '@/components/logos';
import Image from 'next/image';
import { addDoctor, updateDoctor, deleteDoctor } from '@/firebase/firestore/doctors';
import { toast } from 'sonner';
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

const createDefaultDoctor = (): Omit<Doctor, 'id'> => ({
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
    const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);
    
    useEffect(() => {
        if (doctorsFromDb) {
            setDoctorsList(doctorsFromDb);
        }
    }, [doctorsFromDb]);
    
    const displayedDoctorInEdit: Omit<Doctor, 'id'> = useMemo(() => {
        return {
            ...(createDefaultDoctor()),
            ...(doctorInEdit ?? {}),
        } as Omit<Doctor, 'id'>;
    }, [doctorInEdit]);
    
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

    const handleAddNewDoctor = async () => {
        if (!firestore || !doctorInEdit) return;

        const newDoctorData: Omit<Doctor, 'id' | 'specialty'> & {specialty: string} = {
            title: doctorInEdit.title || 'Titel',
            name: doctorInEdit.name || 'Name',
            specialty: (doctorInEdit.specialty as string) || 'Spezialisierung',
            qualifications: doctorInEdit.qualifications || [],
            vita: doctorInEdit.vita || '<p></p>',
            imageUrl: doctorInEdit.imageUrl || '',
            imageHint: doctorInEdit.imageHint || 'placeholder',
            additionalInfo: doctorInEdit.additionalInfo,
            partnerLogoComponent: doctorInEdit.partnerLogoComponent as string | undefined,
            order: (doctorsList[doctorsList.length - 1]?.order || 0) + 1,
        };

        setIsSaving(true);
        try {
            await addDoctor(firestore, newDoctorData);
            toast.success("Neue Arztkarte wurde erfolgreich angelegt.");
            handleCancel();
        } catch (error) {
            console.error("Error adding doctor: ", error);
            toast.error("Die Arztkarte konnte nicht angelegt werden.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateDoctor = async () => {
        if (!firestore || !editingDoctorId || !doctorInEdit) return;
        
        const { id, ...updateData } = doctorInEdit;
        
        const finalUpdateData = {
            ...updateData,
            specialty: typeof updateData.specialty === 'object' ? 'Spezialisierung' : updateData.specialty,
        };

        setIsSaving(true);
        try {
            await updateDoctor(firestore, editingDoctorId, finalUpdateData);
            toast.success("Die Änderungen wurden erfolgreich gespeichert.");
            handleCancel();
        } catch (error) {
            console.error("Error updating doctor: ", error);
            toast.error("Die Änderungen konnten nicht gespeichert werden.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteDoctor = async () => {
        if (!firestore || !doctorToDelete) return;

        setIsSaving(true);
        try {
            await deleteDoctor(firestore, doctorToDelete.id);
            toast.success(`Die Karte für ${doctorToDelete.name} wurde gelöscht.`);
            setDoctorToDelete(null);
        } catch (error) {
            console.error("Error deleting doctor:", error);
            toast.error("Fehler beim Löschen der Arztkarte.");
        } finally {
            setIsSaving(false);
        }
    }

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
                const currentSpecialty = currentDoctor.specialty;
                const newSpecialty = editingField.key === 'specialty' && typeof currentSpecialty === 'object' ? newValue : currentDoctor.specialty;
                
                return { 
                    ...currentDoctor, 
                    [editingField.key]: newValue,
                    ...(editingField.key === 'specialty' && { specialty: newSpecialty })
                };
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
        const value = currentDoctor[editingField.key as keyof Omit<Doctor, 'specialty'>] as string;
        if (editingField.key === 'specialty') {
            const specialty = currentDoctor.specialty;
            if (typeof specialty === 'string') return specialty;
            return 'Komplexe Spezialisierung';
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
                                        <Button onClick={handleUpdateDoctor} disabled={isSaving}>
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                            Änderungen speichern
                                        </Button>
                                    ) : (
                                        <Button onClick={handleAddNewDoctor} disabled={!doctorInEdit || isSaving}>
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                            Als neue Karte übernehmen
                                        </Button>
                                    )}
                                    
                                    <Button variant="outline" onClick={handleCancel} disabled={(!doctorInEdit && !editingDoctorId) || isSaving}>
                                        Abbrechen
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg bg-muted p-4 md:p-6">
                                <EditableDoctorCard 
                                    doctor={displayedDoctorInEdit as Doctor}
                                    onImageClick={handleImageClick}
                                    onVitaClick={handleVitaClick}
                                    onTextClick={handleTextEditClick}
                                />
                                <Alert variant="info" className="mt-4 border-2 border-blue-500 text-blue-800 bg-blue-50">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Hinweis</AlertTitle>
                                    <AlertDescription>
                                        Klicken Sie auf ein Element in der Vorschau, um es zu bearbeiten. Mit "Abbrechen" werden alle Änderungen verworfen.
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
                             {isLoadingDoctors ? (
                                <div className="space-y-12">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex w-full items-center justify-center gap-4">
                                            <div className="flex w-36 flex-col gap-2">
                                                <Skeleton className="h-9 w-full" />
                                                <Skeleton className="h-9 w-full" />
                                                <Separator className="my-2" />
                                                <Skeleton className="h-9 w-full" />
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
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm" disabled={isEditing || isSaving} className="justify-start" onClick={() => setDoctorToDelete(doctor)}>
                                                            <Trash2 className="mr-2 h-4 w-4" /> Löschen
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    {doctorToDelete === doctor && (
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Arztkarte löschen?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Möchten Sie die Karte für {doctor.name} wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel onClick={() => setDoctorToDelete(null)} disabled={isSaving}>Abbrechen</AlertDialogCancel>
                                                                <AlertDialogAction onClick={handleDeleteDoctor} disabled={isSaving}>
                                                                    {isSaving ? "Wird gelöscht..." : "Ja, löschen"}
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    )}
                                                </AlertDialog>
                                                <Button variant="default" size="sm" onClick={() => handleEditClick(doctor)} disabled={isEditing || isSaving} className="justify-start">
                                                    <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                                                </Button>
                                            </div>

                                            <div className={cn("relative flex-1 w-full max-w-[1000px] p-2", isHidden && "grayscale opacity-50")}>
                                                <DoctorCard
                                                {...doctor}
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
        </>
    );
}
