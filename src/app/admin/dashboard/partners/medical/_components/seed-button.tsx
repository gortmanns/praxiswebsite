
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, getDocs, query, orderBy, addDoc, doc } from 'firebase/firestore';

interface SeedButtonProps {
    collectionName: string;
    seedData: any[];
    entityName: string;
}

export function SeedButton({ collectionName, seedData, entityName }: SeedButtonProps) {
    const firestore = useFirestore();
    const [isSeeding, setIsSeeding] = useState(false);
    const [alertState, setAlertState] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        const checkInitialState = async () => {
            if (!firestore) return;
            try {
                const collectionRef = collection(firestore, collectionName);
                const q = query(collectionRef, orderBy('order', 'asc'));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setAlertState({ type: 'info', message: `Datenbank-Sammlung '${collectionName}' ist bereits befüllt.` });
                }
            } catch (error: any) {
                setAlertState({ type: 'error', message: `Fehler beim Prüfen der Datenbank: ${error.message}` });
            } finally {
                setInitialCheckDone(true);
            }
        };

        checkInitialState();
    }, [firestore, collectionName]);

    const handleSeed = async () => {
        if (!firestore) {
            setAlertState({ type: 'error', message: 'Firestore ist nicht verfügbar.' });
            return;
        }

        setIsSeeding(true);
        setAlertState(null);

        try {
            const collectionRef = collection(firestore, collectionName);
            const snapshot = await getDocs(collectionRef);
            
            // Delete existing documents
            if (!snapshot.empty) {
                const deleteBatch = writeBatch(firestore);
                snapshot.docs.forEach(doc => {
                    deleteBatch.delete(doc.ref);
                });
                await deleteBatch.commit();
            }

            // Add new seed data
            const addBatch = writeBatch(firestore);
            seedData.forEach(item => {
                const docRef = doc(collectionRef);
                const newItem = { ...item, id: docRef.id };
                addBatch.set(docRef, newItem);
            });
            await addBatch.commit();
            
            setAlertState({ type: 'success', message: `${entityName} wurden erfolgreich in die Datenbank geschrieben.` });
        } catch (err: any) {
            console.error('Seeding failed:', err);
            setAlertState({ type: 'error', message: `Die Daten konnten nicht geschrieben werden: ${err.message}` });
        } finally {
            setIsSeeding(false);
        }
    };

    if (!initialCheckDone) {
        return (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Prüfe Datenbank...</span>
            </div>
        );
    }
    
    if (alertState && alertState.type !== 'error') {
        return (
            <div>
                 <Alert variant={alertState.type} className="mb-4">
                    {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : 'Info'}</AlertTitle>
                    <AlertDescription>{alertState.message}</AlertDescription>
                </Alert>
                 <Button onClick={handleSeed} disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Daten erneut schreiben
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {!alertState && (
                <p className="text-sm text-muted-foreground">
                    Klicken Sie auf den Button, um die initialen Daten für '{entityName}' in die Datenbank zu übertragen.
                </p>
            )}
             {alertState && alertState.type === 'error' && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>{alertState.message}</AlertDescription>
                </Alert>
             )}
            <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSeeding ? 'Übertrage Daten...' : `Daten für ${entityName} in Datenbank schreiben`}
            </Button>
        </div>
    );
}