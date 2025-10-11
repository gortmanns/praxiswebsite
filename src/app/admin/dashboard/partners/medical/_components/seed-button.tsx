
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { seedMedicalPartnersData } from './medical-seed-action';

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const [isSeeding, setIsSeeding] = useState(false);
    const [alertState, setAlertState] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        const checkInitialState = async () => {
            const result = await seedMedicalPartnersData();
            if (result.success && result.message.includes('bereits befüllt')) {
                setAlertState({ type: 'info', message: result.message });
            } else if (!result.success) {
                setAlertState({ type: 'error', message: result.error || 'Fehler beim Prüfen des Datenbankstatus.' });
            }
            setInitialCheckDone(true);
        };

        checkInitialState();
    }, []);

    const handleSeed = async () => {
        setIsSeeding(true);
        setAlertState(null);
        
        try {
            const result = await seedMedicalPartnersData();
            if (result.success) {
                setAlertState({ type: 'info', message: result.message.includes('bereits befüllt') ? 'Datenbank ist bereits befüllt.' : 'Daten erfolgreich geschrieben.' });
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
    
    if (!initialCheckDone) {
        return (
             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Prüfe Datenbank...</span>
            </div>
        );
    }
    
    if (alertState) {
        return (
            <Alert variant={alertState.type === 'error' ? 'destructive' : alertState.type === 'info' ? 'info' : 'default'} className="mt-4">
               {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : alertState.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
               <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : alertState.type === 'error' ? 'Fehler' : 'Info'}</AlertTitle>
               <AlertDescription>{alertState.message}</AlertDescription>
           </Alert>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                Die Datenbank-Sammlung `{collectionName}` ist leer. Klicken Sie auf den Button, um die initialen Partnerdaten in die Datenbank zu übertragen.
            </p>
            <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSeeding ? 'Übertrage Daten...' : 'Partnerdaten in Datenbank schreiben'}
            </Button>
        </div>
    );
}
