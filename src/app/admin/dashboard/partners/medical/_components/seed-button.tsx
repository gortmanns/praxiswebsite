
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { seedMedicalPartnersData } from './medical-seed-action';

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const [isSeeding, setIsSeeding] = useState(false);
    const [alertState, setAlertState] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSeed = async () => {
        setIsSeeding(true);
        setAlertState(null);
        
        try {
            const result = await seedMedicalPartnersData();
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
    
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                Klicken Sie auf den Button, um die initialen Partnerdaten für `{collectionName}` in die Datenbank zu übertragen.
            </p>
            <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSeeding ? 'Übertrage Daten...' : 'Partnerdaten in Datenbank schreiben'}
            </Button>

            {alertState && (
                <Alert variant={alertState.type === 'error' ? 'destructive' : 'default'} className="mt-4">
                   {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                   <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : 'Fehler'}</AlertTitle>
                   <AlertDescription>{alertState.message}</AlertDescription>
               </Alert>
            )}
        </div>
    );
}
