
'use client';

// WICHTIGER HINWEIS: Bei der Implementierung neuer Sammlungen mit dieser Komponente
// muss sichergestellt werden, dass die `firestore.rules`-Datei angepasst wird,
// um authentifizierten Benutzern Lese- und Schreibzugriff (read, write)
// auf die neue Sammlung (z.B. /neueSammlung/{docId}) zu gewähren.
// Andernfalls führt dies zu "Missing or insufficient permissions"-Fehlern.

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pencil, EyeOff, Eye, Info, Trash2, Plus, Save, XCircle, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export interface BaseCardData {
    id: string;
    order: number;
    hidden?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface ReusableCardManagerProps<T extends BaseCardData> {
    collectionName: string;
    pageTitle: string;
    pageDescription: string;
    initialCardState: Omit<T, 'id' | 'order' | 'createdAt'>;
    DisplayCardComponent: React.ComponentType<T>;
    EditorCardComponent: React.ComponentType<{ cardData: T; onUpdate: (updatedData: T) => void }>;
    entityName: string;
    seedData?: Omit<T, 'id' | 'order' | 'createdAt'>[];
}

export function ReusableCardManager<T extends BaseCardData>({
    collectionName,
    pageTitle,
    pageDescription,
    initialCardState,
    DisplayCardComponent,
    EditorCardComponent,
    entityName,
    seedData,
}: ReusableCardManagerProps<T>) {
    const firestore = useFirestore();

    const dataQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, collectionName) as CollectionReference<DocumentData>, orderBy('order', 'asc'));
    }, [firestore, collectionName]);

    const { data: dbData, isLoading: isLoadingData, error: dbError } = useCollection<T>(dataQuery as any);

    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [editorCardState, setEditorCardState] = useState<T>(initialCardState as T);
    const [deleteConfirmState, setDeleteConfirmState] = useState<{ isOpen: boolean; cardId?: string; cardName?: string }>({ isOpen: false });
    const [alertState, setAlertState] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isSeeding, setIsSeeding] = useState(false);


    const isEditing = editingCardId !== null || isCreatingNew;

    const handleEdit = (card: T) => {
        setEditingCardId(card.id);
        setIsCreatingNew(false);
        setEditorCardState(card);
        setAlertState(null);
    };

    const handleCreateNew = () => {
        setEditingCardId(null);
        setIsCreatingNew(true);
        setEditorCardState(initialCardState as T);
        setAlertState(null);
    };

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
        setAlertState(null);
    };
    
    const handleSeedData = async () => {
        if (!firestore || !seedData || seedData.length === 0) {
            setAlertState({ type: 'error', message: 'Keine Seed-Daten verfügbar oder Datenbankverbindung fehlgeschlagen.' });
            return;
        }
        setIsSeeding(true);
        setAlertState(null);
        try {
            const batch = writeBatch(firestore);
            const collectionRef = collection(firestore, collectionName);
            
            // Delete all existing documents in the collection first
            const existingDocsSnapshot = await getDocs(collectionRef);
            existingDocsSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            
            // Now add the new seed data
            seedData.forEach((item, index) => {
                const docRef = doc(collectionRef);
                const dataWithTimestamp = {
                    ...item,
                    order: index + 1,
                    id: docRef.id,
                    createdAt: serverTimestamp(),
                };
                batch.set(docRef, dataWithTimestamp);
            });
            await batch.commit();
            setAlertState({ type: 'success', message: `${seedData.length} ${entityName}-Einträge erfolgreich geschrieben.` });
        } catch (error: any) {
            console.error('Seeding failed:', error);
            setAlertState({ type: 'error', message: `Fehler beim Schreiben der Daten: ${error.message}` });
        } finally {
            setIsSeeding(false);
        }
    };


    const handleMove = async (cardId: string, direction: 'up' | 'down') => {
        if (!dbData || !firestore) return;
        setAlertState(null);

        const visibleItems = dbData.filter(d => !d.hidden);
        const currentIndex = visibleItems.findIndex(item => item.id === cardId);

        if (direction === 'up' && currentIndex > 0) {
            const item1 = visibleItems[currentIndex];
            const item2 = visibleItems[currentIndex - 1];
            const batch = writeBatch(firestore);
            const item1Ref = doc(firestore, collectionName, item1.id);
            const item2Ref = doc(firestore, collectionName, item2.id);
            batch.update(item1Ref, { order: item2.order });
            batch.update(item2Ref, { order: item1.order });
            await batch.commit();
        } else if (direction === 'down' && currentIndex < visibleItems.length - 1) {
            const item1 = visibleItems[currentIndex];
            const item2 = visibleItems[currentIndex + 1];
            const batch = writeBatch(firestore);
            const item1Ref = doc(firestore, collectionName, item1.id);
            const item2Ref = doc(firestore, collectionName, item2.id);
            batch.update(item1Ref, { order: item2.order });
            batch.update(item2Ref, { order: item1.order });
            await batch.commit();
        }
    };

    const handleToggleHidden = async (card: T) => {
        if (!firestore) return;
        setAlertState(null);
        const docRef = doc(firestore, collectionName, card.id);
        try {
            await setDoc(docRef, { hidden: !card.hidden }, { merge: true });
        } catch (error: any) {
            console.error('Error toggling hidden state:', error);
            setAlertState({ type: 'error', message: `Sichtbarkeit konnte nicht geändert werden: ${error.message}` });
        }
    };

    const openDeleteConfirmation = (cardId: string, cardName: string) => {
        setDeleteConfirmState({ isOpen: true, cardId, cardName });
    };

    const handleDelete = async () => {
        if (!firestore || !deleteConfirmState.cardId) return;
        try {
            const docRef = doc(firestore, collectionName, deleteConfirmState.cardId);
            await deleteDoc(docRef);
            setAlertState({ type: 'success', message: 'Karte wurde erfolgreich gelöscht.' });
            setDeleteConfirmState({ isOpen: false });
        } catch (error) {
            console.error("Error deleting document: ", error);
            setAlertState({ type: 'error', message: 'Karte konnte nicht gelöscht werden.' });
        }
    };

    const handleSaveChanges = async () => {
        if (!firestore || !dbData) {
            setAlertState({ type: 'error', message: 'Datenbankverbindung nicht verfügbar.' });
            return;
        }

        try {
            const finalCardData: Partial<T> = { ...editorCardState };
            delete finalCardData.id;
            delete finalCardData.createdAt;

            if (editingCardId && !isCreatingNew) {
                const docRef = doc(firestore, collectionName, editingCardId);
                await setDoc(docRef, finalCardData, { merge: true });
                setAlertState({ type: 'success', message: 'Änderungen erfolgreich gespeichert.' });
            } else {
                const highestOrder = dbData.reduce((max, item) => item.order > max ? item.order : max, 0);
                const collectionRef = collection(firestore, collectionName);
                const newCardData = {
                    ...finalCardData,
                    order: highestOrder + 1,
                    createdAt: serverTimestamp(),
                    hidden: false,
                };
                const newDocRef = await addDoc(collectionRef, newCardData);
                await setDoc(newDocRef, { id: newDocRef.id }, { merge: true });

                setAlertState({ type: 'success', message: `Neue ${entityName}-Karte erfolgreich erstellt.` });
            }
            handleCancelEdit();
        } catch (error: any) {
            console.error("Error saving changes: ", error);
            setAlertState({ type: 'error', message: `Die Änderungen konnten nicht gespeichert werden: ${error.message}` });
        }
    };

    const visibleItems = useMemo(() => dbData?.filter(d => !d.hidden) || [], [dbData]);
    const hiddenItems = useMemo(() => dbData?.filter(d => d.hidden) || [], [dbData]);

    const isPartnerManager = collectionName.toLowerCase().includes('partner');
    
    const DisplayWrapper: React.FC<{ item: T, index: number }> = ({ item, index }) => (
        isPartnerManager ? (
            <div className="flex flex-col gap-2 p-2">
                <DisplayCardComponent {...item} />
                <div className="flex w-full flex-shrink-0 items-center justify-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'up')} disabled={index === 0 || isEditing}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'down')} disabled={index === visibleItems.length - 1 || isEditing}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                        <EyeOff className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={isEditing}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        ) : (
            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex sm:flex-col w-full sm:w-36 order-2 sm:order-1 flex-shrink-0 items-center justify-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'up')} disabled={index === 0 || isEditing}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'down')} disabled={index === visibleItems.length - 1 || isEditing}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                        <EyeOff className="h-4 w-4" />
                    </Button>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={isEditing}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
                <div className={cn("relative flex-1 w-full max-w-sm sm:max-w-none order-1 sm:order-2")}>
                    <DisplayCardComponent {...item} />
                </div>
            </div>
        )
    );

    const HiddenDisplayWrapper: React.FC<{ item: T }> = ({ item }) => (
         isPartnerManager ? (
            <div className="flex flex-col gap-2 p-2">
                <div className="relative">
                    <div className="absolute inset-0 z-10 bg-black/50 rounded-lg"></div>
                    <DisplayCardComponent {...item} />
                </div>
                <div className="flex w-full mt-2 flex-shrink-0 items-center justify-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={isEditing}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => openDeleteConfirmation(item.id, (item as any).name || 'diese Karte')} disabled={isEditing}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
         ) : (
            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex sm:flex-col w-full sm:w-36 order-2 sm:order-1 flex-shrink-0 items-center justify-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={isEditing}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                        <Button variant="destructive" size="icon" onClick={() => openDeleteConfirmation(item.id, (item as any).name || 'diese Karte')} disabled={isEditing}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className={cn("relative flex-1 w-full max-w-sm sm:max-w-none order-1 sm:order-2 grayscale")}>
                    <DisplayCardComponent {...item} />
                </div>
            </div>
         )
    );


    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">{pageTitle}</CardTitle>
                            <CardDescription>
                                {isEditing ? `Bearbeiten oder erstellen Sie eine ${entityName}-Karte.` : pageDescription}
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                             {isEditing ? (
                                <>
                                    <Button onClick={handleSaveChanges}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isCreatingNew ? `Neue Karte speichern` : 'Änderungen speichern'}
                                    </Button>
                                    <Button variant="outline" onClick={handleCancelEdit}>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Abbrechen
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleCreateNew}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Neue Karte erstellen
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isEditing && (
                        <div className="w-full rounded-lg border-2 border-dashed border-primary p-4 mb-12">
                           <EditorCardComponent cardData={editorCardState} onUpdate={setEditorCardState} />
                            <Alert variant="info" className="mt-4">
                                <Info className="h-4 w-4" />
                                <AlertTitle>Bearbeitungsmodus</AlertTitle>
                                <AlertDescription>
                                    {isCreatingNew ? `Erstellen Sie eine neue Karte. Klicken Sie auf Elemente, um sie zu bearbeiten.` : `Sie bearbeiten gerade die Karte.`}
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                    
                    {alertState && (
                        <Alert variant={alertState.type === 'error' ? 'destructive' : 'default'} className="mb-8">
                             {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            <AlertTitle>{alertState.type === 'success' ? 'Erfolgreich' : 'Fehler'}</AlertTitle>
                            <AlertDescription>{alertState.message}</AlertDescription>
                        </Alert>
                    )}
                     
                    {seedData && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-primary">Daten-Übertragung</CardTitle>
                                <CardDescription>
                                    Schreiben Sie die initialen Demodaten in die Datenbank. Achtung: Alle bestehenden Daten in der `{collectionName}`-Sammlung werden dabei gelöscht.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleSeedData} disabled={isSeeding}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    {isSeeding ? 'Übertrage Daten...' : `Demodaten für ${entityName} übertragen`}
                                </Button>
                            </CardContent>
                        </Card>
                    )}


                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Aktive Karten</h3>
                         <p className="text-sm text-muted-foreground">
                            Klicken Sie auf &quot;Bearbeiten&quot;, um eine Karte in den Bearbeitungsmodus zu laden.
                        </p>
                    </div>
                     <div className={cn(
                        "mt-8",
                        isPartnerManager ? "rounded-lg bg-primary p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-12"
                     )}>
                        {isLoadingData && (
                            isPartnerManager ? 
                                Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32 w-full rounded-lg bg-primary-foreground/20" />) :
                                Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="flex w-full items-center justify-center gap-4">
                                        <div className="w-36 flex-shrink-0"></div>
                                        <div className="relative flex-1 w-full max-w-sm sm:max-w-none p-2">
                                            <Skeleton className="w-full aspect-[4/5] rounded-lg" />
                                        </div>
                                    </div>
                                ))
                        )}
                        {dbError && (
                             <Alert variant="destructive" className={cn(isPartnerManager ? "sm:col-span-2 md:col-span-3 xl:col-span-4" : "lg:col-span-2")}>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Datenbankfehler</AlertTitle>
                                <AlertDescription>
                                    Die Daten konnten nicht geladen werden: {dbError.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        {!isLoadingData && visibleItems.map((item, index) => (
                            <DisplayWrapper key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {hiddenItems.length > 0 && (
                        <>
                            <div className="mt-16 space-y-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Ausgeblendete Karten</h3>
                            </div>
                            <div className={cn(
                                "mt-8",
                                isPartnerManager ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-12"
                            )}>
                                {hiddenItems.map((item) => (
                                    <HiddenDisplayWrapper key={item.id} item={item} />
                                ))}
                            </div>
                        </>
                    )}

                </CardContent>
            </Card>

            <AlertDialog open={deleteConfirmState.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirmState({ isOpen: false })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Möchten Sie die Karte für <strong>{deleteConfirmState.cardName}</strong> wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className={cn(buttonVariants({ variant: "destructive" }))}>Löschen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

    