'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export interface Doctor {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    [key: string]: any;
}

export default function DoctorsPage() {
    const firestore = useFirestore();
    const { toast } = useToast();
    
    const handleWriteToDb = async () => {
        if (!firestore) {
            toast({
                variant: 'destructive',
                title: 'Fehler',
                description: 'Firestore ist nicht verfügbar.',
            });
            return;
        }
        const ortmannsData = DOCTOR_CARDS_INITIAL_DATA.find(d => d.id === 'ortmanns');
        if (ortmannsData) {
            try {
                const docRef = doc(firestore, 'doctors', ortmannsData.id);
                await setDoc(docRef, ortmannsData, { merge: true });
                toast({
                    title: 'Erfolg!',
                    description: 'Daten erfolgreich in die Datenbank geschrieben.',
                });
            } catch (error: any) {
                 toast({
                    variant: 'destructive',
                    title: 'Fehler beim Schreiben in die DB',
                    description: error.message,
                });
            }
        }
    };

    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">Ärzte verwalten</CardTitle>
                            <CardDescription>
                                Verwalten Sie die auf der Team-Seite angezeigten Ärzte.
                            </CardDescription>
                        </div>
                        <Button onClick={handleWriteToDb}>
                            Ortmanns Card in DB schreiben
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Vorhandene Ärztekarten (Lokale Daten)</h3>
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
