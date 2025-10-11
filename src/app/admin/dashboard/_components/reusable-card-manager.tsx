
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, Pencil, EyeOff, Eye, Info, Trash2, Plus, Save, XCircle, AlertCircle, CheckCircle } from 'lucide-react';
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
}

export function ReusableCardManager<T extends BaseCardData>({
    collectionName,
    pageTitle,
    pageDescription,
    initialCardState,
    DisplayCardComponent,
    EditorCardComponent,
    entityName
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
                           <EditorComponent cardData={editorCardState} onUpdate={setEditorCardState} />
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

                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Aktive Karten</h3>
                         <p className="text-sm text-muted-foreground">
                            Klicken Sie auf &quot;Bearbeiten&quot;, um eine Karte in den Bearbeitungsmodus zu laden.
                        </p>
                    </div>
                     <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {isLoadingData && (
                            Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="flex w-full items-center justify-center gap-4">
                                    <div className="w-36 flex-shrink-0"></div>
                                    <div className="relative flex-1 w-full max-w-sm sm:max-w-none p-2">
                                        <Skeleton className="w-full aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-[500px] rounded-lg" />
                                    </div>
                                </div>
                            ))
                        )}
                        {dbError && (
                             <Alert variant="destructive" className="lg:col-span-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Datenbankfehler</AlertTitle>
                                <AlertDescription>
                                    Die Daten konnten nicht geladen werden: {dbError.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        {!isLoadingData && visibleItems.map((item, index) => (
                            <div key={item.id} className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                                <div className="flex sm:flex-col w-full sm:w-36 order-2 sm:order-1 flex-shrink-0 items-center justify-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'up')} disabled={index === 0 || isEditing}>
                                        <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleMove(item.id, 'down')} disabled={index === visibleItems.length - 1 || isEditing}>
                                        <ChevronDown className="h-4 w-4" />
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
                        ))}
                    </div>

                    {hiddenItems.length > 0 && (
                        <>
                            <div className="mt-16 space-y-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Ausgeblendete Karten</h3>
                            </div>
                            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {hiddenItems.map((item) => (
                                    <div key={item.id} className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
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

