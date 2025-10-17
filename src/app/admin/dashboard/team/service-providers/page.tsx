
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
import { Pencil, EyeOff, Eye, Trash2, Plus, Save, XCircle, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

import { EditableServiceProviderCard } from './_components/editable-service-provider-card';
import { ServiceProviderEditor as EditorComponent } from './_components/service-provider-editor';

export interface ServiceProvider {
    id: string;
    order: number;
    name: string;
    frontSideCode: string;
    backSideCode: string;
    languages: string[];
    hidden: boolean;
    createdAt?: any;
}


const initialServiceProviderState: Omit<ServiceProvider, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Dienstleister",
    languages: ['de'],
    hidden: false,
    frontSideCode: `
        <style>
            .template-card button, .template-card div[id^="edit-"] { all: unset; box-sizing: border-box; cursor: pointer; transition: all 0.2s ease; display: block; }
            .template-card .image-button:hover { background-color: rgba(0,0,0,0.1); }
            .template-card .image-button-background { background-color: white; }
            .template-card p, .template-card h3, .template-card span { margin:0; }
            .template-card .font-headline { font-family: var(--font-headline); }
            .template-card .text-card-foreground { color: hsl(var(--card-foreground)); }
            .template-card .bg-background { background-color: hsl(var(--background)); }
            .template-card .p-6 { padding: 1.5rem; }
            .template-card .flex { display: flex; }
            .template-card .h-full { height: 100%; }
            .template-card .w-full { width: 100%; }
            .template-card .items-start { align-items: flex-start; }
            .template-card .relative { position: relative; }
            .template-card .aspect-\\[2\\/3\\] { aspect-ratio: 2 / 3; }
            .template-card .overflow-hidden { overflow: hidden; }
            .template-card .rounded-md { border-radius: 0.375rem; }
            .template-card .flex-grow { flex-grow: 1; }
            .template-card .flex-col { flex-direction: column; }
            .template-card .justify-center { justify-content: center; }
            .template-card .ml-6 { margin-left: 1.5rem; }
            .template-card .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .template-card .font-bold { font-weight: 700; }
            .template-card .text-primary { color: hsl(var(--primary)); }
            .template-card .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .template-card .text-5xl { font-size: 3rem; line-height: 1; }
            .template-card .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .template-card .mt-6 { margin-top: 1.5rem; }
            .template-card .text-base { font-size: 1rem; line-height: 1.5rem; }
            .template-card .text-left { text-align: left; }
            .template-card .absolute { position: absolute; }
            .template-card .bottom-0 { bottom: 0; }
            .template-card .right-0 { right: 0; }
            .template-card .items-center { align-items: center; }
            .template-card .gap-2 { gap: 0.5rem; }
            .template-card .object-contain { object-fit: contain; }
            .template-card .object-cover { object-fit: cover; }
            .template-card .text-muted-foreground { color: hsl(var(--muted-foreground)); }
            .template-card .bg-muted { background-color: hsl(var(--muted)); }
            .template-card .text-center { text-align: center; }
            .template-card .mt-2 { margin-top: 0.5rem; }
            .template-card .font-extrabold { font-weight: 800; }
            .template-card .bg-white { background-color: white; }
            .template-card .shrink-0 { flex-shrink: 0; }
        </style>
         <div id="card-root" class="template-card w-full h-full bg-background text-card-foreground p-6 font-headline">
            <div class="flex h-full w-full items-start">
                <div id="image-container" class="relative h-full aspect-[2/3] overflow-hidden rounded-md shrink-0 bg-muted">
                    <div id="edit-image" class="image-button w-full h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="font-extrabold"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="mt-2 text-sm font-bold">Zum Ändern klicken</span>
                    </div>
                </div>
                <div class="flex-grow flex flex-col justify-center ml-6 h-full relative">
                    <div>
                        <div id="edit-title" class="w-full text-left">
                            <p class="text-2xl font-bold text-primary">Titel</p>
                        </div>
                        <div id="edit-name" class="w-full text-left">
                            <h3 class="text-5xl font-bold text-primary my-2">Name</h3>
                        </div>
                        <div id="edit-specialty" class="w-full text-left">
                            <p class="text-xl font-bold">Spezialisierung</p>
                        </div>
                        <div id="position-container" class="mt-6">
                            <div id="edit-position"><div class="w-full text-left"><p class="text-base">Position oder Logo</p></div></div>
                        </div>
                    </div>
                    <div id="language-container" class="absolute bottom-0 right-0 flex items-center gap-2">
                    </div>
                </div>
            </div>
        </div>
    `,
    backSideCode: `
        <style>
            .vita-content { color: hsl(var(--background)); }
            .vita-content p { margin: 0; }
            .vita-content ul { list-style-type: disc; padding-left: 2rem; margin-top: 1em; margin-bottom: 1em; }
            .vita-content li { margin-bottom: 0.5em; }
            .vita-content h4 { font-size: 1.25rem; font-weight: bold; margin-bottom: 1em; }
            .vita-content .is-small { font-size: 0.8em; font-weight: normal; }
            .vita-content span[style*="color: var(--color-tiptap-blue)"] { color: hsl(var(--primary)); }
            .vita-content span[style*="color: var(--color-tiptap-gray)"] { color: hsl(var(--secondary-foreground)); }
        </style>
        <div class="w-full h-full text-left">
            <div id="edit-vita" class="w-full h-full text-left p-8">
                <div class="vita-content w-full h-full">
                    <h4>Curriculum Vitae</h4>
                    <p>Zum Bearbeiten klicken</p>
                </div>
            </div>
        </div>
    `,
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
    
    const handleMove = async (cardId: string, direction: 'up' | 'down') => {
        if (!dbData || !firestore) return;
    
        const items = dbData.filter(d => d.name).sort((a, b) => a.order - b.order);
        const currentIndex = items.findIndex(item => item.id === cardId);
    
        if (currentIndex === -1) return;
    
        let otherIndex = -1;
        if (direction === 'up' && currentIndex > 0) {
            otherIndex = currentIndex - 1;
        } else if (direction === 'down' && currentIndex < items.length - 1) {
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
    
    const validDbData = useMemo(() => dbData?.filter(d => d.name).sort((a,b) => a.order - b.order) || [], [dbData]);

    const renderCardGroups = () => {
        const activeItems = validDbData.filter(i => !i.hidden);
        const hiddenItems = validDbData.filter(i => i.hidden);
    
        const renderGrid = (items: CardData[], title: string, description: string, isHiddenGrid: boolean) => {
            return (
                <div className="space-y-4 mt-12">
                    <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                     {items.length > 0 ? (
                        <div className="space-y-8 mt-8">
                             {items.map((item, index) => (
                                <div key={item.id} className="flex flex-col items-center gap-4">
                                     <div className={cn(
                                         "w-full max-w-[1000px] relative", 
                                         isEditing && editingCardId !== item.id && "opacity-50 pointer-events-none",
                                         isHiddenGrid && "grayscale"
                                     )}>
                                        <EditableServiceProviderCard serviceProvider={item} isBeingEdited={isEditing && editingCardId === item.id} />
                                    </div>
                                    <div id={`buttons-${item.id}`} className="flex w-full max-w-lg items-center justify-center gap-2 rounded-lg border bg-background/80 p-2 shadow-inner">
                                        {!isHiddenGrid && (
                                            <>
                                                <Button variant="outline" onClick={() => handleMove(item.id, 'up')} disabled={index === 0}>
                                                    <ArrowUp className="mr-2 h-4 w-4" /> Nach oben
                                                </Button>
                                                <Button variant="outline" onClick={() => handleMove(item.id, 'down')} disabled={index === items.length - 1}>
                                                    <ArrowDown className="mr-2 h-4 w-4" /> Nach unten
                                                </Button>
                                                <div className="w-px self-stretch bg-border mx-2" />
                                            </>
                                        )}
                                        <Button variant="outline" onClick={() => handleEdit(item)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                                        </Button>
                                        <Button variant="outline" onClick={() => handleToggleHidden(item)}>
                                            {item.hidden ? <><Eye className="mr-2 h-4 w-4" /> Einblenden</> : <><EyeOff className="mr-2 h-4 w-4" /> Ausblenden</>}
                                        </Button>
                                        {isHiddenGrid && (
                                            <Button variant="destructive" onClick={() => openDeleteConfirmation(item.id, item.name)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Löschen
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground pt-4">Keine Karten in dieser Kategorie.</p>
                    )}
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
                        <div className="relative rounded-lg border-2 border-dashed border-primary bg-muted p-4 mb-8">
                            <EditorComponent cardData={editorCardState} onUpdate={setEditorCardState} isCreatingNew={isCreatingNew} />
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
                            <div className="mt-8 space-y-8">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-4">
                                        <Skeleton className="w-full max-w-[1000px] aspect-[1000/495]" />
                                        <Skeleton className="h-10 w-full max-w-sm" />
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
                         {!isLoadingData && (
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
