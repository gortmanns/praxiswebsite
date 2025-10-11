'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { seedStaffData } from './staff-seed-action';

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const [isSeeding, setIsSeeding] = useState(false);
    const [alertState, setAlertState] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        // This effect runs once on mount to check the initial state from the server.
        const checkInitialState = async () => {
            const result = await seedStaffData(); // The action now also serves as a check
            if (result.success && result.message.includes('bereits befüllt')) {
                setAlertState({ type: 'info', message: result.message });
            } else if (!result.success) {
                // If the initial check fails, show an error.
                setAlertState({ type: 'error', message: result.error || 'Fehler beim Prüfen des Datenbankstatus.' });
            }
            // If the DB is empty, no alert is set, and the button remains visible.
            setInitialCheckDone(true);
        };

        checkInitialState();
    }, []); // Empty dependency array ensures it runs only once.

    const handleSeed = async () => {
        setIsSeeding(true);
        setAlertState(null);
        
        try {
            const result = await seedStaffData();
            if (result.success) {
                // After successful seeding, set the info message permanently.
                setAlertState({ type: 'info', message: 'Datenbank ist bereits befüllt.' });
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
    
    // While checking the initial state, show a loader
    if (!initialCheckDone) {
        return (
             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Prüfe Datenbank...</span>
            </div>
        );
    }
    
    // If an alert is set (either info, success, or error), display it.
    // The button for seeding will no longer be visible if seeding isn't needed.
    if (alertState) {
        return (
            <Alert variant={alertState.type === 'error' ? 'destructive' : alertState.type === 'info' ? 'info' : 'default'} className="mt-4">
               {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : alertState.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
               <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : alertState.type === 'error' ? 'Fehler' : 'Info'}</AlertTitle>
               <AlertDescription>{alertState.message}</AlertDescription>
           </Alert>
        );
    }

    // Only show the seeding button if the initial check is done and no data was found.
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                Die Datenbank-Sammlung `{collectionName}` ist leer. Klicken Sie auf den Button, um die initialen Personaldaten in die Datenbank zu übertragen.
            </p>
            <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSeeding ? 'Übertrage Daten...' : 'Personaldaten in Datenbank schreiben'}
            </Button>
        </div>
    );
}
