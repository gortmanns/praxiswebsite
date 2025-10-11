'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info } from 'lucide-react';
import { seedStaffData } from '../actions';
import { useToast } from '@/hooks/use-toast';

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isSeeding, setIsSeeding] = React.useState(false);

    const collectionQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, collectionName);
    }, [firestore, collectionName]);

    const { data, isLoading, error } = useCollection(collectionQuery);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            const result = await seedStaffData();
            if (result.success) {
                toast({
                    title: 'Erfolgreich',
                    description: `${result.count} Mitarbeiter-Einträge wurden in die Datenbank geschrieben.`,
                });
            } else {
                throw new Error(result.error);
            }
        } catch (err: any) {
            console.error('Seeding failed:', err);
            toast({
                variant: 'destructive',
                title: 'Fehler beim Seeding',
                description: err.message || 'Die Daten konnten nicht geschrieben werden.',
            });
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
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Datenbankfehler</AlertTitle>
                <AlertDescription>
                    Die Daten konnten nicht geladen werden: {error.message}
                </AlertDescription>
            </Alert>
        )
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
        )
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
        </div>
    );
}
