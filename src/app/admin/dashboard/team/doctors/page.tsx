'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
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
    const firestore = useFirestore();
    const [dbLog, setDbLog] = useState('');
    
    const handleReadFromDb = async () => {
        setDbLog('Attempting to read from Firestore...');
        if (!firestore) {
            const errorMsg = 'Firestore instance is not available. Ensure Firebase is initialized correctly.';
            console.error(errorMsg);
            setDbLog(errorMsg);
            return;
        }

        const docRef = doc(firestore, 'doctors', 'ortmanns');

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const successMsg = `SUCCESS: Document data read successfully.\n\nRAW DATA:\n${JSON.stringify(docSnap.data(), null, 2)}`;
                setDbLog(successMsg);
            } else {
                const notFoundMsg = 'No such document!';
                setDbLog(notFoundMsg);
            }
        } catch (error: any) {
            const errorMsg = `FAILED: An error occurred during the read operation.\n\nRAW ERROR OBJECT:\n${JSON.stringify(error, null, 2)}`;
            setDbLog(errorMsg);
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
                                Verwalten Sie die auf der Team-Seite angezeigten Ärzte. Klicken Sie auf den Button, um den Lesevorgang zu testen.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-col md:flex-row gap-4">
                        <Button onClick={handleReadFromDb} className="shrink-0">
                            Ortmanns Card aus DB lesen
                        </Button>
                        <Textarea
                            readOnly
                            placeholder="Die rohe Antwort der Datenbank wird hier angezeigt..."
                            value={dbLog}
                            className="h-32 w-full font-mono text-xs"
                        />
                    </div>
                    <div className="mt-8 space-y-4">
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
