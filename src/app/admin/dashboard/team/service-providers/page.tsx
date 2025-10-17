
/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Save, XCircle, AlertCircle, Plus, User, Pencil } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

import { StaffCard as DisplayCard } from '../staff/_components/staff-card';
import { StaffEditor } from '../staff/_components/staff-editor';
import type { StaffMember as CardData } from '../staff/_components/staff-editor';
import { LanguageFlags } from '@/app/admin/dashboard/team/doctors/_components/language-flags';


const initialServiceProviderState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Name",
    role: "Funktion",
    role2: "",
    imageUrl: "",
    backsideContent: "",
    languages: ['de'],
    hidden: false,
    fullWidth: false,
};


export default function ServiceProvidersPage() {
    const collectionName = "serviceProviders";
    const pageTitle = "Externe Dienstleister verwalten";
    const pageDescription = "Verwalten Sie die auf der Team-Seite angezeigten externen Dienstleister.";
    const entityName = "Dienstleister";

    const firestore = useFirestore();
    
    const [notification, setNotification] = useState<TimedAlertProps | null>(null);

    const dataQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, collectionName) as CollectionReference<DocumentData>, orderBy('order', 'asc'));
    }, [firestore, collectionName]);

    const { data: dbData, isLoading: isLoadingData, error: dbError } = useCollection<CardData>(dataQuery as any);

    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [editorCardState, setEditorCardState] = useState<CardData>({ ...initialServiceProviderState, id: '', order: 0 } as CardData);
    const [deleteConfirmState, setDeleteConfirmState] = useState<{ isOpen: boolean; cardId?: string; cardName?: string }>({ isOpen: false });

    const isEditing = editingCardId !== null || isCreatingNew;
    
    const handleEdit = (card: CardData) => {
        setEditingCardId(card.id);
        setIsCreatingNew(false);
        setEditorCardState(card);
    };

    const handleCreateNew = () => {
        setEditingCardId(null);
        setIsCreatingNew(true);
        setEditorCardState({ ...initialServiceProviderState, id: '', order: 0 } as CardData);
    };

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
    };
    
    const handleMove = async (cardId: string, direction: 'left' | 'right') => {
        if (!dbData || !firestore) return;
    
        const items = dbData.filter(d => !d.hidden).sort((a, b) => a.order - b.order);
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

    const handleToggleHidden = async (card: CardData) => {
        if (!firestore) return;
        const docRef = doc(firestore, collectionName, card.id);
        try {
            await setDoc(docRef, { hidden: !card.hidden }, { merge: true });
        } catch (error: any) {
            console.error('Error toggling hidden state:', error);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Sichtbarkeit konnte nicht geändert werden: ${error.message}` });
        }
    };

    const handleToggleFullWidth = async (card: CardData) => {
        if (!firestore) return;
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

        let dataToSave: Partial<CardData> = { ...editorCardState };
    
        try {
            if (isCreatingNew) {
                delete (dataToSave as any).id;
                const highestOrder = dbData ? dbData.filter(d=>d.name).reduce((max, item) => item.order > max ? item.order : max, 0) : 0;
                
                const newCardData = {
                    ...initialServiceProviderState,
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

    const handleEditorUpdate = (update: Partial<CardData>) => {
        setEditorCardState(prev => ({...prev, ...update} as CardData));
    };
    
    const validDbData = useMemo(() => dbData?.filter(d => d.name).sort((a,b) => a.order - b.order) || [], [dbData]);

    const renderCardGroups = () => {
        const activeItems = validDbData.filter(i => !i.hidden);
        const hiddenItems = validDbData.filter(i => i.hidden);
    
        const renderGrid = (items: CardData[], title: string, description: string, isHiddenGrid: boolean) => {
             if (!isLoadingData && items.length === 0 && !isEditing) {
                if (isHiddenGrid) return null;
                return (
                   <div className="space-y-4 mt-12">
                       <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                       <p className="text-sm text-muted-foreground pt-4">Keine Karten in dieser Kategorie.</p>
                   </div>
               );
           }
           
           return (
            <div className={cn("space-y-4 mt-12", isEditing && !isHiddenGrid ? "opacity-50 pointer-events-none" : "")}>
                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-16 mt-8">
                   {items.map((item, index) => (
                       <div key={item.id} className={cn("flex justify-center", item.fullWidth && "sm:col-span-2")}>
                            <DisplayCard 
                                {...item}
                                isFirst={index === 0}
                                isLast={index === items.length - 1}
                                isHiddenCard={isHiddenGrid}
                                isBeingEdited={item.id === editingCardId && isEditing}
                                onMove={handleMove}
                                onEdit={handleEdit}
                                onToggleHidden={handleToggleHidden}
                                onToggleFullWidth={handleToggleFullWidth}
                                onDelete={openDeleteConfirmation}
                            />
                        </div>
                   ))}
                </div>
            </div>
           );
        };
    
        return (
            <>
                {renderGrid(activeItems, 'Aktive Karten', 'Die hier angezeigten Karten sind auf der Webseite sichtbar.', false)}
                {renderGrid(hiddenItems, 'Ausgeblendete Karten', 'Diese Karten sind auf der Webseite nicht sichtbar.', true)}
            </>
        );
    };

    const backsideElement = editorCardState.backsideContent ? (
        <div dangerouslySetInnerHTML={{ __html: editorCardState.backsideContent }} />
    ) : null;

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
                        <div className="mb-8 rounded-lg border-2 border-dashed border-primary bg-muted p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <StaffEditor cardData={editorCardState} onUpdate={handleEditorUpdate} />
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-background text-card-foreground shadow-xl">
                                            <div className="flex h-full flex-col p-6">
                                                <button className="relative w-full overflow-hidden rounded-md aspect-[2/3] cursor-pointer" onClick={() => handleEditorUpdate({_dialog: { type: 'imageSource', data: {} }})}>
                                                    {editorCardState.imageUrl ? (
                                                        <img
                                                            src={editorCardState.imageUrl}
                                                            alt={`Portrait von ${editorCardState.name}`}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-secondary aspect-[2/3]">
                                                            <User className="h-24 w-24 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </button>
                                                <div className="flex-grow pt-6 text-center min-h-[110px]">
                                                    <h4 className="text-xl font-bold text-primary">{editorCardState.name}</h4>
                                                    <p className="mt-2 text-base font-bold text-muted-foreground">{editorCardState.role}</p>
                                                    {editorCardState.role2 && <p className="mt-1 text-base text-muted-foreground">{editorCardState.role2}</p>}
                                                </div>
                                                <div className="flex h-8 items-end justify-end pt-4">
                                                    {editorCardState.languages && <LanguageFlags languages={editorCardState.languages} />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-full max-w-sm overflow-hidden rounded-lg border bg-accent/95 text-background shadow-xl aspect-[2/3]">
                                            <button className="absolute top-2 right-2 z-10 p-2 text-white/80 hover:text-white" onClick={() => handleEditorUpdate({_dialog: { type: 'vita', data: { initialValue: editorCardState.backsideContent || '' } }})}>
                                                <Pencil className="h-8 w-8 font-bold" />
                                            </button>
                                            <div className="p-6 text-center text-lg">{backsideElement}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    <div key={index} className="flex flex-col items-center space-y-4">
                                        <Skeleton className="h-[550px] w-full max-w-sm" />
                                        <Skeleton className="h-24 w-full max-w-sm" />
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
                         
                        {renderCardGroups()}
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

    