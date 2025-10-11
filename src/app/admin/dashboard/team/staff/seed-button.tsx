'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { seedStaffData } from './staff-seed-action';

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const firestore = useFirestore();
    const [isSeeding, setIsSeeding] = React.useState(false);
    const [alertState, setAlertState] = React.useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

    const collectionQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, collectionName);
    }, [firestore, collectionName]);

    const { data, isLoading, error: collectionError } = useCollection(collectionQuery);

    const handleSeed = async () => {
        setIsSeeding(true);
        setAlertState(null);
        
        try {
            const result = await seedStaffData();
            if (result.success) {
                setAlertState({ type: 'success', message: result.message });
            } else {
                throw new Error(result.error || 'Ein unbekannter Fehler ist aufgetreten.');
            }
        } catch (err: any) {
            console.error('Seeding failed:', err);
            setAlertState({ type: 'error', message: err.message || 'Die Daten konnten nicht geschrieben werden.' });
        } finally {
            setIsSeeding(false);
        }
    };
    
    if (isLoading) {
        return (
             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Prüfe Datenbank...</span>
            </div>
        );
    }

    if (collectionError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Datenbankfehler</AlertTitle>
                <AlertDescription>
                    Die Daten konnten nicht geladen werden: {collectionError.message}
                </AlertDescription>
            </Alert>
        );
    }
    
    if (data && data.length > 0) {
        return (
             <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Daten bereits vorhanden</AlertTitle>
                <AlertDescription>
                    Die `{collectionName}`-Sammlung in der Datenbank enthält bereits Daten. Ein erneutes Seeding ist nicht erforderlich.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                Die Datenbank-Sammlung `{collectionName}` ist leer. Klicken Sie auf den Button, um die initialen Personaldaten in die Datenbank zu übertragen.
            </p>
            <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSeeding ? 'Übertrage Daten...' : 'Personaldaten in Datenbank schreiben'}
            </Button>
            {alertState && (
                 <Alert variant={alertState.type === 'error' ? 'destructive' : alertState.type === 'info' ? 'info' : 'default'} className="mt-4">
                    {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : alertState.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : alertState.type === 'error' ? 'Fehler' : 'Info'}</AlertTitle>
                    <AlertDescription>{alertState.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
