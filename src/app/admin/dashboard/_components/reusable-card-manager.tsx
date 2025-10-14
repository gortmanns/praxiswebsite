
'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pencil, EyeOff, Eye, Trash2, Plus, Save, XCircle, AlertCircle, ArrowLeft, ArrowRight, RectangleHorizontal } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';


export interface BaseCardData {
    id: string;
    order: number;
    name: string;
    hidden?: boolean;
    [key:string]: any;
}

interface ReusableCardManagerProps<T extends BaseCardData> {
    collectionName: string;
    pageTitle: string;
    pageDescription: string;
    initialCardState: Omit<T, 'id' | 'order' | 'createdAt'>;
    DisplayCardComponent: React.ComponentType<any>;
    EditorCardComponent: React.ComponentType<{ 
        cardData: T; 
        onUpdate: (updatedData: T) => void;
        children?: React.ReactNode;
    }>;
    entityName: string;
}

const generateFinalLogoHtml = (partner: BaseCardData): string => {
    if ('imageUrl' in partner && partner.imageUrl) {
        const scale = 'logoScale' in partner ? partner.logoScale : 100;
        const x = 'logoX' in partner ? partner.logoX : 0;
        const y = 'logoY' in partner ? partner.logoY : 0;
        const transformStyle = `transform: scale(${scale / 100}) translate(${x}px, ${y}px);`;
        return `<img src="${partner.imageUrl}" alt="${partner.name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%; transition: transform 0.2s ease-out; ${transformStyle}" />`;
    }
    if ('logoHtml' in partner && partner.logoHtml) {
        return partner.logoHtml;
    }
    return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`;
};


export function ReusableCardManager<T extends BaseCardData>({
    collectionName,
    pageTitle,
    pageDescription,
    initialCardState,
    DisplayCardComponent,
    EditorCardComponent,
    entityName,
}: ReusableCardManagerProps<T>) {
    const firestore = useFirestore();
    
    const [notification, setNotification] = useState<TimedAlertProps | null>(null);

    const dataQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, collectionName) as CollectionReference<DocumentData>, orderBy('order', 'asc'));
    }, [firestore, collectionName]);

    const { data: dbData, isLoading: isLoadingData, error: dbError } = useCollection<T>(dataQuery as any);

    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [editorCardState, setEditorCardState] = useState<T>({ ...initialCardState, id: '', order: 0 } as T);
    const [deleteConfirmState, setDeleteConfirmState] = useState<{ isOpen: boolean; cardId?: string; cardName?: string }>({ isOpen: false });

    const isEditing = editingCardId !== null || isCreatingNew;
    const isPartnerManager = collectionName.toLowerCase().includes('partner');
    const isStaffManager = collectionName === 'staff';

    const handleEdit = (card: T) => {
        setEditingCardId(card.id);
        setIsCreatingNew(false);
        setEditorCardState(card);
    };

    const handleCreateNew = () => {
        setEditingCardId(null);
        setIsCreatingNew(true);
        setEditorCardState({ ...initialCardState, id: '' } as T);
    };
    

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
    };
    
    const handleMove = async (cardId: string, direction: 'left' | 'right') => {
        if (!dbData || !firestore) return;
    
        const items = dbData.filter(d => d.name).sort((a, b) => a.order - b.order);
        const currentIndex = items.findIndex(item => item.id === cardId);
    
        if (currentIndex === -1) return;
    
        let otherIndex = -1;
        if (direction === 'left' && currentIndex > 0) {
            otherIndex = currentIndex - 1;
        } else if (direction === 'right' && currentIndex < items.length - 1) {
            otherIndex = currentIndex + 1;
        }
    
        if (otherIndex === -1) return;
    
        const item1 = items[currentIndex];
        const item2 = items[otherIndex];
    
        try {
            const batch = writeBatch(firestore);
            const item1Ref = doc(firestore, collectionName, item1.id);
            const item2Ref = doc(firestore, collectionName, item2.id);
    
            batch.update(item1Ref, { order: item2.order });
            batch.update(item2Ref, { order: item1.order });
    
            await batch.commit();
        } catch (error: any) {
            console.error('Error moving item:', error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Position konnte nicht geändert werden: ${error.message}` });
        }
    };


    const handleToggleHidden = async (card: T) => {
        if (!firestore) return;
        const docRef = doc(firestore, collectionName, card.id);
        try {
            await setDoc(docRef, { hidden: !card.hidden }, { merge: true });
        } catch (error: any) {
            console.error('Error toggling hidden state:', error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Sichtbarkeit konnte nicht geändert werden: ${error.message}` });
        }
    };

    const handleToggleFullWidth = async (card: T) => {
        if (!firestore || collectionName !== 'staff') return;
        const docRef = doc(firestore, collectionName, card.id);
        try {
            await setDoc(docRef, { fullWidth: !card.fullWidth }, { merge: true });
        } catch (error: any) {
            console.error('Error toggling fullWidth state:', error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Breite konnte nicht geändert werden: ${error.message}` });
        }
    };

    const openDeleteConfirmation = (cardId: string, cardName: string) => {
        setDeleteConfirmState({ isOpen: true, cardId, cardName });
    };

    const handleDelete = async () => {
        if (!firestore || !deleteConfirmState.cardId) return;
        setNotification(null);
        try {
            const docRef = doc(firestore, collectionName, deleteConfirmState.cardId);
            await deleteDoc(docRef);
            setNotification({ title: 'Erfolgreich', description: 'Karte wurde erfolgreich gelöscht.', variant: 'success' });
            setDeleteConfirmState({ isOpen: false });
        } catch (error) {
            console.error("Error deleting document: ", error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: 'Karte konnte nicht gelöscht werden.' });
        }
    };

    const handleSaveChanges = async () => {
        if (!firestore) {
            setNotification({ variant: 'destructive', title: 'Fehler', description: 'Datenbank-Dienst nicht verfügbar.' });
            return;
        }
        setNotification(null);

        let dataToSave: Partial<T> = { ...editorCardState };
        if (isPartnerManager) {
            (dataToSave as any).logoHtml = generateFinalLogoHtml(editorCardState);
        }
    
        try {
            if (isCreatingNew) {
                delete (dataToSave as any).id;
                const highestOrder = dbData ? dbData.filter(d=>d.name).reduce((max, item) => item.order > max ? item.order : max, 0) : 0;
                
                const newCardData = {
                    ...initialCardState,
                    ...dataToSave,
                    order: highestOrder + 1,
                    createdAt: serverTimestamp(),
                    hidden: false,
                };
    
                const newDocRef = await addDoc(collection(firestore, collectionName), newCardData);
                await setDoc(newDocRef, { id: newDocRef.id }, { merge: true });
    
                setNotification({ variant: 'success', title: 'Erfolgreich', description: `Neue ${entityName}-Karte erfolgreich erstellt.` });
            
            } else if (editingCardId) {
                delete dataToSave.createdAt;
                delete dataToSave.id;
    
                const docRef = doc(firestore, collectionName, editingCardId);
                await setDoc(docRef, dataToSave, { merge: true });
                setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Änderungen erfolgreich gespeichert.' });
            }
            handleCancelEdit();
        } catch (error: any) {
            console.error("Error saving changes: ", error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Die Änderungen konnten nicht gespeichert werden: ${error.message}` });
        }
    };
    
    const validDbData = useMemo(() => dbData?.filter(d => d.name).sort((a,b) => a.order - b.order) || [], [dbData]);

    const partnerEditorOverlay = isPartnerManager && isEditing ? (
        <div className="pointer-events-none absolute inset-0 z-10">
             <div className="flex h-full w-full justify-end">
                <div className="flex h-full w-[40%] flex-col justify-end">
                    <div className="relative">
                        <div className="pointer-events-auto absolute -top-16 left-0 right-0">
                             <div className="mx-auto mb-2 w-4/5 space-y-2">
                                <div className="text-center text-primary-foreground">
                                    <label htmlFor="logoScale" className="text-sm">Grösse: {editorCardState.logoScale || 100}%</label>
                                </div>
                            </div>
                        </div>
                        <DisplayCardComponent {...editorCardState} />
                    </div>
                     <div className="pointer-events-auto mt-4 flex w-full flex-col items-center justify-center">
                        <div className="w-full px-2">
                        </div>
                        <div className="mt-1 text-center text-xs text-white">
                            <div>Horizontale Position</div>
                            <div>{editorCardState.logoX || 0}px</div>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-auto flex h-full w-[10%] flex-col justify-end">
                    <div className="h-32">
                        <div className="flex h-full flex-row items-center justify-center gap-2">
                            <div className="flex h-full justify-center">
                            </div>
                             <div className="text-center text-xs text-white">
                                <div>Vertikale</div>
                                <div>Position</div>
                                <div>{editorCardState.logoY || 0}px</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-14 w-full" />
                </div>
            </div>
        </div>
    ) : null;

    const renderCardGroups = () => {
        const activeItems = validDbData.filter(i => !i.hidden);
        const hiddenItems = validDbData.filter(i => i.hidden);
    
        const renderGrid = (items: T[], title: string, description: string) => {
            if (items.length === 0) return null;
            return (
                <div className="space-y-4 mt-12">
                    <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <div className="relative grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-x-24 gap-y-16 mt-8">
                        {items.map((item) => (
                             <div key={item.id} className={cn("relative w-full max-w-sm", (item as any).fullWidth && "sm:col-span-2 justify-self-center")}>
                                <div
                                    id={`buttons-${item.id}`}
                                    className="absolute z-20 flex flex-col items-center gap-1.5 rounded-lg border bg-background/80 p-2 shadow-2xl backdrop-blur-sm top-1/2 -translate-y-1/2 left-full ml-4 w-[125px]"
                                >
                                    <p className="text-xs font-bold text-center text-foreground">Verschieben</p>
                                    <div className="grid grid-cols-2 gap-1 w-full">
                                        <Button size="sm" variant="outline" className="h-7 w-full" onClick={() => handleMove(item.id, 'left')}><ArrowLeft /></Button>
                                        <Button size="sm" variant="outline" className="h-7 w-full" onClick={() => handleMove(item.id, 'right')}><ArrowRight /></Button>
                                    </div>
                                    <div className="w-full border-t my-1.5" />

                                    {isStaffManager && (
                                        <Button
                                            variant={(item as any).fullWidth ? "default" : "outline"}
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleToggleFullWidth(item)}
                                        >
                                            <RectangleHorizontal className="mr-2" />
                                            Zeile
                                        </Button>
                                    )}

                                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEdit(item)}>
                                        <Pencil className="mr-2" /> Bearbeiten
                                    </Button>
                                    
                                    {item.hidden ? (
                                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleToggleHidden(item)}>
                                            <Eye className="mr-2" /> Einblenden
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleToggleHidden(item)}>
                                            <EyeOff className="mr-2" /> Ausblenden
                                        </Button>
                                    )}

                                    <Button variant="destructive" size="sm" className="w-full" onClick={() => openDeleteConfirmation(item.id, item.name)}>
                                        <Trash2 className="mr-2" /> Löschen
                                    </Button>
                                </div>
                                <DisplayCardComponent {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    
        return (
            <>
                {renderGrid(activeItems, 'Aktive Karten', 'Die Aktions-Buttons werden rechts neben den Karten angezeigt.')}
                {renderGrid(hiddenItems, 'Ausgeblendete Karten', 'Diese Karten sind auf der Webseite nicht sichtbar.')}
            </>
        );
    };

    return (
        <div id="card-manager-container" className="flex flex-1 flex-col items-start gap-8 p-4 sm:px-6 sm:py-8">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <CardTitle className="text-primary">{pageTitle}</CardTitle>
                            {!isEditing && <CardDescription>{pageDescription}</CardDescription>}
                        </div>
                        <div className="flex gap-2">
                             {isEditing ? (
                                <>
                                    <Button onClick={handleSaveChanges}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isCreatingNew ? `Neue Karte speichern` : 'Änderungen speichern'}
                                    </Button>
                                    <Button variant="destructive" onClick={handleCancelEdit}>
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
                        <div className="relative rounded-lg border-2 border-dashed border-primary bg-muted min-h-[420px]">
                            <EditorCardComponent cardData={editorCardState} onUpdate={setEditorCardState}>
                               {partnerEditorOverlay}
                            </EditorCardComponent>
                        </div>
                    )}

                    {notification && (
                       <TimedAlert
                           variant={notification.variant}
                           title={notification.title}
                           description={notification.description}
                           onClose={() => setNotification(null)}
                           className="my-6"
                        />
                    )}

                    <div className="relative">
                        {isLoadingData && (
                            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex justify-center">
                                        <Skeleton className="h-[550px] w-full max-w-sm" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {dbError && (
                            <Alert variant="destructive" className="mt-8">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Datenbankfehler</AlertTitle>
                                <AlertDescription>
                                    Die Daten konnten nicht geladen werden: {dbError.message}
                                </AlertDescription>
                            </Alert>
                        )}
                         {!isLoadingData && !isEditing && (
                           renderCardGroups()
                        )}
                    </div>
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
