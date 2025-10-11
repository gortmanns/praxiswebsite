
'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info } from 'lucide-react';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const staffData = [
    {
      order: 1,
      name: 'S. Garcia',
      role: 'Leitende Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Garcia.jpg',
      backsideContent: "<p>Früher habe ich schon einmal für rund 10 Jahre in dieser Praxis gearbeitet, damals noch bei Dr. Segginger.</p><br /><p>Inzwischen bin ich – jetzt in der Funktion der Leitenden MPA – zurückgekehrt an meine alte Wirkungsstätte.</p>",
      hidden: false,
    },
    {
      order: 2,
      name: 'B. Aeschlimann',
      role: 'Medizinische Praxisassistentin',
      role2: 'Berufsbildnerin',
      imageUrl: '/images/team/Aeschlimann.jpg',
      backsideContent: "<p>Ich blicke zurück auf eine lange Erfahrung im Beruf als MPA, bin aber neu im Praxiszentrum im Ring.</p><br /><p>Als Berufsbildnerin bin ich für die Ausbildung der Lernenden zur MPA verantwortlich.</p>",
      hidden: false,
    },
    {
      order: 3,
      name: 'K. Huber',
      role: 'Medizinische Praxisassistentin',
      role2: '',
      imageUrl: '/images/team/Huber.jpg',
      backsideContent: "<p>Viele Jahre war ich in einer kleinen chirurgischen Praxis tätig. Inzwischen jetzt zusätzlich an meist einem Tag in der Woche auch hier im Praxiszentrum im Ring.</p>",
      hidden: false,
    },
    {
      order: 4,
      name: 'G. Öztürk',
      role: 'Praxishilfe',
      role2: '',
      imageUrl: '/images/team/Oetztuerk.jpg',
      backsideContent: "<p>Eigentlich bin ich Arzt und stamme aus der Türkei, aber noch läuft das Anerkennungsverfahren für die Qualifikation als Hausarzt hier in der Schweiz.</p><br /><p>Dass ich aktuell „nur“ als Praxishilfe tätig bin, ist eine Auflage der Schweizer Behörden für die Anerkennung meiner Qualifikation. Hoffentlich bin ich bald als weiterer Hausarzt hier im Praxiszentrum tätig.</p>",
      hidden: false,
    },
    {
      order: 5,
      name: 'E. Sommer',
      role: 'Medizinische Praxisassistentin',
      role2: 'in Ausbildung',
      imageUrl: '/images/team/Sommer.jpg',
      backsideContent: "<p>Ganz neu im Berufsleben und auch im Praxiszentrum im Ring, werde ich hier in den nächsten Jahren den Beruf der MPA erlernen.</p><br /><p>Aller Anfang ist bekanntlich schwer und ich bitte um Geduld, wenn noch nicht jeder Handgriff so schnell und sicher sitzt oder mir Fehler unterlaufen.</p>",
      hidden: false,
    },
];

interface SeedButtonProps {
    collectionName: string;
}

export function SeedButton({ collectionName }: SeedButtonProps) {
    const firestore = useFirestore();
    const [isSeeding, setIsSeeding] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const collectionQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, collectionName);
    }, [firestore, collectionName]);

    const { data, isLoading, error: collectionError } = useCollection(collectionQuery);

    const handleSeed = async () => {
        if (!firestore) {
            setError('Firestore ist nicht verfügbar.');
            return;
        }

        setIsSeeding(true);
        setError(null);
        setSuccess(null);
        
        try {
            const staffCollectionRef = collection(firestore, 'staff');

            for (const member of staffData) {
                const newDocPromise = addDocumentNonBlocking(staffCollectionRef, {
                    ...member,
                    createdAt: new Date(),
                });
                
                newDocPromise.then(newDocRef => {
                    if (newDocRef) {
                        setDocumentNonBlocking(newDocRef, { id: newDocRef.id }, { merge: true });
                    }
                }).catch(e => {
                    console.error("Fehler beim Hinzufügen des Dokuments oder Aktualisieren der ID: ", e);
                    setError(e.message || 'Ein Dokument konnte nicht geschrieben werden.');
                });
            }

            // We assume success optimistically for the UI, as the operations are non-blocking.
            // A more robust implementation might track promises and update on completion.
            setSuccess(`${staffData.length} Mitarbeiter-Einträge werden in die Datenbank geschrieben.`);
        } catch (err: any) {
            console.error('Client-side Seeding failed:', err);
            setError(err.message || 'Die Daten konnten nicht geschrieben werden.');
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

    if (collectionError) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Datenbankfehler</AlertTitle>
                <AlertDescription>
                    Die Daten konnten nicht geladen werden: {collectionError.message}
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
            {error && (
                 <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Fehler beim Seeding</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {success && (
                 <Alert variant="default" className="mt-4">
                    <AlertTitle>Erfolgreich</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
