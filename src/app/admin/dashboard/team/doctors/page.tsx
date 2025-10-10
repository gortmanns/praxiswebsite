'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, addDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Separator } from '@/components/ui/separator';
import { VitaEditorDialog } from './_components/vita-editor-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Eye, EyeOff, ArrowUp, ArrowDown, PlusCircle, Save, Loader2, CheckCircle, AlertCircle, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { DoctorCard } from '@/app/team/_components/doctor-card';
import type { Doctor as DoctorType } from '@/app/team/_components/doctor-card';

// Import individual doctor card props
import { ortmannsProps } from '@/app/team/_components/doctors/ortmanns-card';
import { schemmerProps } from '@/app/team/_components/doctors/schemmer-card';
import { rosenovProps } from '@/app/team/_components/doctors/rosenov-card';
import { herschelProps } from '@/app/team/_components/doctors/herschel-card';
import { slezakProps } from '@/app/team/_components/doctors/slezak-card';

export type Doctor = DoctorType;

const staticDoctorsData: Omit<Doctor, 'frontSideCode' | 'backSideCode'>[] = [
    ortmannsProps,
    schemmerProps,
    rosenovProps,
    herschelProps,
    slezakProps,
];

const createDefaultDoctor = (): Omit<Doctor, 'id'> => ({
    name: 'Neuer Arzt',
    order: 99,
    frontSideCode: `
<div class="relative w-full h-full bg-card" style="container-type: inline-size;">
    <div class="grid h-full grid-cols-3 items-stretch gap-[4.5%] p-6">
        <div class="relative col-span-1 w-full overflow-hidden rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
            <div class="relative h-full w-full aspect-[2/3] bg-muted">
                <div class="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-1/2 w-1/2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span class="px-4 text-center text-lg">Klicken zum Ändern</span>
                </div>
            </div>
        </div>
        <div class="col-span-2 flex flex-col justify-center">
            <div class="text-left text-foreground/80">
                <p class="text-[clamp(0.8rem,2.2cqw,1.2rem)] text-primary cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1">Titel</p>
                <h4 class="font-headline text-[clamp(1.5rem,4.8cqw,2.5rem)] font-bold leading-tight text-primary cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1">
                    Name
                </h4>
                <div class="mt-[1.5cqw] text-[clamp(0.8rem,2.2cqw,1.2rem)] leading-tight space-y-1">
                    <p class="font-bold cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1">Spezialisierung</p>
                    <p class="cursor-pointer hover:bg-primary/10 rounded-sm px-1 -mx-1">Qualifikation 1</p>
                </div>
                <div class="mt-[2.5cqw] cursor-pointer hover:bg-primary/10 rounded-sm p-1 -m-1">
                    <p class="text-[clamp(0.6rem,1.6cqw,1rem)] italic text-muted-foreground">
                        Funktion oder Logo
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-6 right-6 flex items-center gap-2">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 gap-2 px-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="m7 2 5 5"/><path d="m8 8 5 5"/><path d="M14 4-2 16"/><path d="M2 22h20"/><path d="m20 15-4-4-3 1-4-4-3 1-2-2"/></svg> Sprachen
        </button>
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="h-5 w-auto rounded-sm shadow-md"><rect width="5" height="3" fill="#FFCE00"></rect><rect width="5" height="2" fill="#DD0000"></rect><rect width="5" height="1" fill="#000"></rect></svg>
        </div>
    </div>
</div>
`,
    backSideCode: '<p>Dieser Text kann frei angepasst werden.</p>'
});

export default function DoctorsPage() {
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();
    
    const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);

    const { data: dbDoctors, isLoading: areDoctorsLoading } = useCollection<Doctor>(doctorsQuery);
    
    const doctorsList = useMemo(() => {
        const dbDataMap = new Map(dbDoctors?.map(d => [d.id, d]));
        
        const mergedList = staticDoctorsData.map(staticDoctor => {
            const dbData = dbDataMap.get(staticDoctor.id);
            const staticProps = [ortmannsProps, schemmerProps, rosenovProps, herschelProps, slezakProps].find(p => p.id === staticDoctor.id);

            if (dbData) {
                return { ...staticDoctor, ...dbData };
            }
            return {
                ...staticDoctor,
                frontSideCode: staticProps?.frontSideCode || '',
                backSideCode: staticProps?.backSideCode || '',
            };
        });

        dbDoctors?.forEach(dbDoctor => {
            if (!mergedList.some(d => d.id === dbDoctor.id)) {
                mergedList.push(dbDoctor);
            }
        });
        
        return mergedList.sort((a, b) => a.order - b.order);
    }, [dbDoctors]);
    
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [isVitaEditorOpen, setVitaEditorOpen] = useState(false);
    const [hiddenDoctorIds, setHiddenDoctorIds] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
    

    const handleEditClick = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setStatus({ type: 'info', message: `Sie bearbeiten nun das Profil von ${doctor.name}. Alle Änderungen werden in der Vorschau angezeigt.`});
    };

    const handleCancel = () => {
        setEditingDoctor(null);
        setStatus(null);
    };
    
    const handleSave = async () => {
        if (!firestore || !editingDoctor || !user) {
            setStatus({ type: 'error', message: 'Speichern fehlgeschlagen: Wichtige Daten fehlen.' });
            return;
        }

        if (!editingDoctor.name || editingDoctor.name.trim() === '' || editingDoctor.name === 'Name') {
            setStatus({ type: 'error', message: 'Speichern nicht möglich: Bitte geben Sie einen Namen für den Arzt an, bevor Sie speichern.' });
            return;
        }
        
        setIsSaving(true);
        setStatus(null);
        
        const dataToSave = {
            name: editingDoctor.name,
            order: editingDoctor.order,
            frontSideCode: editingDoctor.frontSideCode,
            backSideCode: editingDoctor.backSideCode,
        };

        try {
            const docRef = doc(firestore, 'doctors', editingDoctor.id);
            await setDoc(docRef, dataToSave, { merge: true });

            const isNew = !dbDoctors?.some(d => d.id === editingDoctor.id);
            setStatus({ 
                type: 'success', 
                message: `Arztprofil für ${editingDoctor.name} erfolgreich ${isNew ? 'erstellt' : 'aktualisiert'}.` 
            });
            handleCancel();

        } catch (error: any) {
            console.error("Error saving doctor: ", error);
            setStatus({ type: 'error', message: `Die Daten konnten nicht gespeichert werden: ${error.message || String(error)}` });
        } finally {
            setIsSaving(false);
        }
    };

    const handleVitaClick = useCallback(() => {
        if (editingDoctor) {
            setVitaEditorOpen(true);
        }
    }, [editingDoctor]);

    const handleVitaSave = useCallback((newVita: string) => {
        if (editingDoctor) {
            setEditingDoctor(prev => prev ? { ...prev, backSideCode: newVita } : null);
        }
        setVitaEditorOpen(false);
    }, [editingDoctor]);

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
            }, 10000);
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
    
    const handleAddNewClick = () => {
        const newDoctor = createDefaultDoctor() as Doctor;
        newDoctor.id = `new_${Date.now()}`;
        newDoctor.order = doctorsList.length > 0 ? Math.max(...doctorsList.map(d => d.order)) + 1 : 1;
        setEditingDoctor(newDoctor);
        setStatus({ type: 'info', message: 'Erstellen Sie eine neue Arztkarte. Klicken Sie auf die Rückseite, um den Inhalt zu bearbeiten.' });
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
                                {editingDoctor && (
                                    <div className="flex gap-2">
                                        <Button onClick={handleSave} disabled={isSaving || isUserLoading}>
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                            {dbDoctors?.some(d => d.id === editingDoctor.id) ? 'Änderungen speichern' : 'Als neue Karte anlegen'}
                                        </Button>
                                        <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                                            Abbrechen
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {editingDoctor ? (
                                <div className="rounded-lg bg-muted p-4 md:p-6">
                                    <EditableDoctorCard 
                                        doctor={editingDoctor}
                                        onVitaClick={handleVitaClick}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted p-12 text-center">
                                    <h4 className="text-lg font-semibold text-muted-foreground">Keine Karte zum Bearbeiten ausgewählt.</h4>
                                    <p className="text-sm text-muted-foreground">Wählen Sie unten eine Karte zur Bearbeitung aus oder fügen Sie eine neue hinzu.</p>
                                    <Button onClick={handleAddNewClick}>
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
                                    const isEditing = editingDoctor?.id === doctor.id;
                                    const isHidden = hiddenDoctorIds.has(doctor.id);
                                    
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
                                                <Button variant="default" size="sm" onClick={() => handleEditClick(doctor)} disabled={isEditing || isSaving || !!editingDoctor} className="justify-start">
                                                    <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                                </Button>
                                            </div>

                                            <div className={cn("relative flex-1 w-full max-w-[1000px] p-2", isHidden && "grayscale opacity-50")}>
                                                <DoctorCard
                                                    {...doctor}
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
            {editingDoctor && (
                <VitaEditorDialog
                    isOpen={isVitaEditorOpen}
                    onOpenChange={setVitaEditorOpen}
                    initialValue={editingDoctor.backSideCode}
                    onSave={handleVitaSave}
                />
            )}
        </>
    );
}