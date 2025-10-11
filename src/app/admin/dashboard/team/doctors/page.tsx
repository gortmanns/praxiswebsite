'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableDoctorCard } from './_components/editable-doctor-card';
import { DOCTOR_CARDS_INITIAL_DATA } from './_data/doctor-cards-data';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Textarea } from '@/components/ui/textarea';
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
    const [dbLog, setDbLog] = useState('');
    
    const handleWriteToDb = async () => {
        setDbLog('Attempting to write to Firestore...');
        if (!firestore) {
            const errorMsg = 'Firestore instance is not available. Ensure Firebase is initialized correctly.';
            console.error(errorMsg);
            setDbLog(errorMsg);
            return;
        }

        const doctorsToWrite = DOCTOR_CARDS_INITIAL_DATA.filter(d => ['schemmer', 'rosenov', 'herschel', 'slezak'].includes(d.id));

        try {
            const writePromises = doctorsToWrite.map(doctorData => {
                const docRef = doc(firestore, 'doctors', doctorData.id);
                // The data being written must be a plain object.
                const dataToWrite = {
                    id: doctorData.id,
                    name: doctorData.name,
                    order: doctorData.order,
                    frontSideCode: doctorData.frontSideCode,
                    backSideCode: doctorData.backSideCode
                };
                return setDoc(docRef, dataToWrite, { merge: true });
            });
            
            await Promise.all(writePromises);
            
            const successMsg = `SUCCESS: Documents for ${doctorsToWrite.map(d => d.name).join(', ')} written/merged successfully.`;
            setDbLog(successMsg);

        } catch (error: any) {
            const errorMsg = `FAILED: An error occurred during the write operation.\n\nRAW ERROR OBJECT:\n${JSON.stringify(error, null, 2)}`;
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
                                Verwalten Sie die auf der Team-Seite angezeigten Ärzte. Klicken Sie auf den Button, um den Schreibvorgang auszulösen.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-col md:flex-row gap-4">
                        <Button onClick={handleWriteToDb} className="shrink-0">
                           Schemmer bis Slezak in DB schreiben
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
