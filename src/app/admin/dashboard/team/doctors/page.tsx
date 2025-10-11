'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useFirestore, useCollection, useMemoFirebase, refetchCollection } from '@/firebase';
import { collection, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeOff, ArrowUp, ArrowDown, Info, Database, AlertCircle, CheckCircle, TriangleAlert, Binary } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { addDoctor } from '@/firebase/firestore/doctors';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    [key: string]: any;
}

export default function DoctorsPage() {
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
    const [isSavingToDb, setIsSavingToDb] = useState(false);
    const [debugData, setDebugData] = useState<string | null>(null);
    const firestore = useFirestore();

    const doctorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'doctors'), orderBy('order', 'asc'));
    }, [firestore]);

    const { data: dbDoctors, isLoading: isLoadingDbDoctors, setData: setDbDoctors } = useCollection<Doctor>(doctorsQuery);

    const refetchDbDoctors = async () => {
        if (firestore && doctorsQuery) {
            const freshData = await refetchCollection<Doctor>(doctorsQuery);
            setDbDoctors(freshData);
        }
    };

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 8000);
          return () => clearTimeout(timer);
        }
    }, [status]);


    const handleSaveAllToDb = useCallback(async () => {
        if (!firestore) {
            setStatus({ type: 'error', message: 'Firestore ist nicht initialisiert.' });
            return;
        }

        setIsSavingToDb(true);
        setStatus({ type: 'info', message: 'Speichere alle Karten in der Datenbank...' });
        setDebugData(null);

        try {
            const savePromises = DOCTOR_CARDS_INITIAL_DATA.map(doctor => 
                addDoctor(firestore, {
                    name: doctor.name,
                    order: doctor.order,
                    frontSideCode: doctor.frontSideCode,
                    backSideCode: doctor.backSideCode,
                }, doctor.id)
            );

            await Promise.all(savePromises);
            
            setStatus({ type: 'success', message: 'Alle 5 Karten wurden erfolgreich in der Datenbank gespeichert.' });

            // Kurze Verzögerung, um Firestore Zeit zur Konsistenz zu geben, bevor neu geladen wird.
            setTimeout(() => {
                refetchDbDoctors();
            }, 500);

        } catch (error: any) {
            console.error("Fehler beim Speichern aller Karten:", error);
            setStatus({ type: 'error', message: `Fehler beim Speichern der Karten: ${error.message}` });
        } finally {
            setIsSavingToDb(false);
        }
    }, [firestore]);

    const handleEditClick = (doctorId: string, doctorName: string) => {
        setEditingDoctorId(doctorId);
        setStatus({ type: 'info', message: `Sie bearbeiten nun das Profil von ${doctorName}. Alle Änderungen werden in der Vorschau angezeigt.` });
    };
    
    const handleCancel = () => {
        setEditingDoctorId(null);
        setStatus(null);
    };

    const handleDebugRead = async () => {
        if (!firestore) {
            setDebugData("Firestore ist nicht initialisiert.");
            return;
        }
        setDebugData("Lese Dokument 'ortmanns' aus der Datenbank...");
        try {
            const docRef = doc(firestore, 'doctors', 'ortmanns');
            // Force a server read to bypass the offline cache
            const docSnap = await getDoc(docRef, { source: 'server' });

            if (docSnap.exists()) {
                const data = docSnap.data();
                const content = `Dokument 'ortmanns' gefunden:\n\n--- FRONT-SEITE CODE ---\n\n${data.frontSideCode}\n\n--- RÜCKSEITE CODE ---\n\n${data.backSideCode}`;
                setDebugData(content);
            } else {
                setDebugData("FEHLER: Dokument 'ortmanns' wurde in der 'doctors'-Sammlung nicht gefunden.");
            }
        } catch (error: any) {
            console.error("Fehler beim Auslesen des Dokuments:", error);
            setDebugData(`FEHLER BEIM AUSLESEN:\n\n${error.message}\n\nStack: ${error.stack}`);
        }
    };

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
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Button onClick={handleSaveAllToDb} disabled={isSavingToDb} className="w-full sm:w-auto">
                                <Database className="mr-2 h-4 w-4" />
                                {isSavingToDb ? 'Wird gespeichert...' : 'Alle Karten in DB speichern'}
                            </Button>
                            <Button onClick={handleDebugRead} className="w-full sm:w-auto">
                                <Binary className="mr-2 h-4 w-4" />
                                Ortmanns Card auslesen
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {debugData && (
                        <div className="mb-8">
                            <h3 className="font-headline text-xl font-bold tracking-tight text-primary mb-4">Debugging-Ausgabe</h3>
                            <Textarea
                                readOnly
                                value={debugData}
                                className="h-96 w-full font-mono text-xs bg-muted"
                                placeholder="Hier werden die Rohdaten aus der Datenbank angezeigt..."
                            />
                        </div>
                    )}

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
                                        <Button variant="default" size="sm" onClick={() => handleEditClick(doctor.id, doctor.name)} disabled={isSavingToDb || !!editingDoctorId} className="justify-start">
                                            <Info className="mr-2 h-4 w-4" /> Bearbeiten
                                        </Button>
                                    </div>
                                    <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                         <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} />
                                    </div>
                                </div>
                            ))
                        ) : (
                             <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted p-12 text-center">
                                <h4 className="text-lg font-semibold text-muted-foreground">Keine Karten in der Datenbank gefunden.</h4>
                            </div>
                        )}
                    </div>
                    
                    <Separator className="my-12" />

                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten (Lokal)</h3>
                         <p className="text-sm text-muted-foreground">
                            Dieser Bereich zeigt die Karten so an, wie sie aus der lokalen Datei `doctor-cards-data.ts` geladen werden.
                        </p>
                    </div>
                     <div className="mt-8 space-y-12">
                        {DOCTOR_CARDS_INITIAL_DATA.map(doctor => (
                            <div key={doctor.id} className="flex w-full items-center justify-center gap-4">
                                    <div className="w-36"></div>
                                <div className="relative flex-1 w-full max-w-[1000px] p-2">
                                        <EditableDoctorCard doctor={doctor} onVitaClick={() => {}} />
                                </div>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
