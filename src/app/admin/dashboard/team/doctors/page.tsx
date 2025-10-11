'use client';

import React, { useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrtmannsCard } from '@/app/team/_components/doctors/ortmanns-card';
import { SchemmerCard } from '@/app/team/_components/doctors/schemmer-card';
import { RosenovCard } from '@/app/team/_components/doctors/rosenov-card';
import { HerschelCard } from '@/app/team/_components/doctors/herschel-card';
import { SlezakCard } from '@/app/team/_components/doctors/slezak-card';
import { Button } from '@/components/ui/button';
import { EyeOff, ArrowUp, ArrowDown, Info, Database, AlertCircle, CheckCircle, TriangleAlert } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { addDoctor } from '@/firebase/firestore/doctors';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Skeleton } from '@/components/ui/skeleton';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    [key: string]: any;
}

const localDoctors = [
    { id: 'ortmanns', name: 'G. Ortmanns', Component: OrtmannsCard },
    { id: 'schemmer', name: 'P. Schemmer', Component: SchemmerCard },
    { id: 'rosenov', name: 'A. Rosenov', Component: RosenovCard },
    { id: 'herschel', name: 'R. Herschel', Component: HerschelCard },
    { id: 'slezak', name: 'A. Slezak', Component: SlezakCard },
];

export default function DoctorsPage() {
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
    const [isSavingToDb, setIsSavingToDb] = useState(false);
    const firestore = useFirestore();

    const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);

    const { data: dbDoctors, isLoading: isLoadingDbDoctors, refetch: refetchDbDoctors } = useCollection<Doctor>(doctorsQuery);

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 8000);
          return () => clearTimeout(timer);
        }
    }, [status]);


    const handleEditClick = (doctorId: string, doctorName: string) => {
        setEditingDoctorId(doctorId);
        setStatus({ type: 'info', message: `Sie bearbeiten nun das Profil von ${doctorName}. Alle Änderungen werden in der Vorschau angezeigt.` });
    };
    
    const handleCancel = () => {
        setEditingDoctorId(null);
        setStatus(null);
    };

    const handleSaveAllToDb = async () => {
        if (!firestore) {
            setStatus({ type: 'error', message: 'Firestore-Instanz nicht verfügbar.' });
            return;
        }
        setIsSavingToDb(true);
        setStatus(null);
        
        try {
            const promises = DOCTOR_CARDS_INITIAL_DATA.map(doctorData => 
                addDoctor(firestore, doctorData, doctorData.id)
            );
            
            // We don't await the promises here because addDoctor is now non-blocking
            // and handles its own errors. We just fire and forget.
            await Promise.all(promises);

            setStatus({
                type: "success",
                message: "Alle 5 Ärztekarten wurden erfolgreich in die Datenbank gespeichert.",
            });
            
            // Give Firestore a moment to process writes before refetching
            setTimeout(() => {
                 if (refetchDbDoctors) {
                    refetchDbDoctors();
                }
            }, 500);

        } catch (error) {
            // This catch block might not even be hit if addDoctor handles all errors,
            // but it's good practice to have it.
            console.error("Unerwarteter Fehler beim Initiieren des Speicherns:", error);
            setStatus({
                type: "error",
                message: "Ein unerwarteter Fehler ist aufgetreten. Details in der Konsole.",
            });
        } finally {
            setIsSavingToDb(false);
        }
    };

    const editingDoctor = localDoctors.find(d => d.id === editingDoctorId);

    const getStatusAlert = () => {
        if (!status) return null;

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
            <Alert variant={variant} className={cn("border-2", alertClasses)}>
                {icon}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {status.message}
                </AlertDescription>
            </Alert>
        );
    };

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                            <CardDescription>
                                Hier können Sie die Profile der Ärzte bearbeiten.
                            </CardDescription>
                        </div>
                        <Button onClick={handleSaveAllToDb} disabled={isSavingToDb} className="w-full sm:w-auto">
                            <Database className="mr-2 h-4 w-4" />
                            {isSavingToDb ? 'Wird gespeichert...' : 'Alle Karten in DB speichern'}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Live-Vorschau & Bearbeitung</h3>
                            {editingDoctorId && (
                                <div className="flex gap-2">
                                    <Button onClick={() => alert('Speichern noch nicht implementiert.')}>
                                        Änderungen speichern
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Abbrechen
                                    </Button>
                                </div>
                            )}
                        </div>
                        {editingDoctor ? (
                            <div className="rounded-lg bg-muted p-4 md:p-6 border-2 border-dashed border-red-500">
                                <div className="mx-auto w-full max-w-[1000px] p-2">
                                   <editingDoctor.Component />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted p-12 text-center">
                                <h4 className="text-lg font-semibold text-muted-foreground">Wählen Sie unten eine Karte zur Bearbeitung aus.</h4>
                            </div>
                        )}
                         <div className="mt-4 min-h-[76px]">
                            {getStatusAlert()}
                         </div>
                    </div>

                    <Separator className="my-12" />

                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten (DB)</h3>
                        <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten so an, wie sie aus der Firestore-Datenbank geladen werden.
                        </p>
                    </div>
                    <div className="mt-8 space-y-12">
                        {isLoadingDbDoctors ? (
                             Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="mx-auto flex w-full max-w-[1000px] justify-center p-2">
                                    <Skeleton className="w-full aspect-[1000/495] rounded-lg" />
                                </div>
                            ))
                        ) : dbDoctors && dbDoctors.length > 0 ? (
                            dbDoctors.map(doctor => (
                                <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                     <div className="flex w-36 flex-col gap-2">
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={true} className="justify-start">
                                            <ArrowUp className="mr-2 h-4 w-4" /> Nach oben
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={true} className="justify-start">
                                            <ArrowDown className="mr-2 h-4 w-4" /> Nach unten
                                        </Button>
                                        <Separator className="my-2" />
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={true} className="justify-start">
                                            <EyeOff className="mr-2 h-4 w-4" /> Ausblenden
                                        </Button>
                                        <Button variant="default" size="sm" onClick={() => {}} disabled={true} className="justify-start">
                                            <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                        </Button>
                                    </div>
                                    <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                         <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">Keine Ärztekarten in der Datenbank gefunden.</p>
                        )}
                    </div>

                    <Separator className="my-12" />

                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten (Lokal)</h3>
                         <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten an, wie sie in den lokalen Anwendungsdateien definiert sind.
                        </p>
                    </div>

                    <div className="mt-8 space-y-12">
                        {localDoctors.map((doctor) => {
                            const isEditing = editingDoctorId === doctor.id;
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
                                        <Button variant="outline" size="sm" onClick={() => {}} disabled={isEditing} className="justify-start">
                                            <EyeOff className="mr-2 h-4 w-4" /> Ausblenden
                                        </Button>
                                        <Button variant="default" size="sm" onClick={() => handleEditClick(doctor.id, doctor.name)} disabled={isEditing || !!editingDoctorId} className="justify-start">
                                            <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                        </Button>
                                    </div>

                                    <div className={cn("relative flex-1 w-full max-w-[1000px] p-2")}>
                                        <doctor.Component />
                                        {isEditing && (
                                            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/90">
                                                <span className="text-2xl font-bold text-primary-foreground">Wird bearbeitet</span>
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
    );
}
