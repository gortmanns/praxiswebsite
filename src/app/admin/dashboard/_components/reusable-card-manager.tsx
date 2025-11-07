/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pencil, EyeOff, Eye, Trash2, Plus, Save, XCircle, AlertCircle, ArrowLeft, ArrowRight, MoveHorizontal, MoveVertical } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

import { PartnerCard as DisplayCard } from '../partners/_components/partner-card';
import { PartnerEditor as EditorComponent } from '../partners/_components/partner-editor';
import type { Partner as CardData } from '../partners/_components/partner-editor';


interface ReusableCardManagerProps<T extends CardData> {
    collectionName: string;
    pageTitle: string;
    pageDescription: string;
    initialCardState: Omit<T, 'id' | 'order' | 'createdAt'>;
    DisplayCardComponent: React.ComponentType<any>;
    EditorCardComponent: React.ComponentType<{ 
        cardData: Partial<T>; // Allow partial data for creation form
        onUpdate: (updatedData: Partial<T>) => void;
        children?: React.ReactNode;
    }>;
    entityName: string;
}

function ReusableCardManager<T extends CardData>({
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
    const [editorCardState, setEditorCardState] = useState<Partial<T>>(initialCardState);
    const [deleteConfirmState, setDeleteConfirmState] = useState<{ isOpen: boolean; cardId?: string; cardName?: string }>({ isOpen: false });

    const isEditing = editingCardId !== null || isCreatingNew;

    const handleEdit = (card: T) => {
        setEditingCardId(card.id);
        setIsCreatingNew(false);
        setEditorCardState(card);
    };

    const handleCreateNew = () => {
        setEditingCardId(null);
        setIsCreatingNew(true);
        setEditorCardState(initialCardState);
    };

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
    };

    const generateFinalLogoHtml = (partner: Partial<T>): string => {
        const scale = 'logoScale' in partner && typeof partner.logoScale === 'number' ? partner.logoScale / 100 : 1;
        const x = 'logoX' in partner && typeof partner.logoX === 'number' ? partner.logoX : 0;
        const y = 'logoY' in partner && typeof partner.logoY === 'number' ? partner.logoY : 0;
        const transformStyle = `transform: scale(${scale}) translate(${x}px, ${y}px); transition: transform 0.2s ease-out; width: 100%; height: 100%;`;
    
        const innerContent = partner.imageUrl
            ? `<img src="${partner.imageUrl}" alt="${partner.name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%;" />`
            : partner.logoHtml || `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`;
    
        return `<div style="${transformStyle}">${innerContent}</div>`;
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

        let dataToSave: Partial<T> = { ...editorCardState, logoHtml: generateFinalLogoHtml(editorCardState) as any };
    
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
                delete (dataToSave as any).createdAt;
                delete (dataToSave as any).id;
    
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

    const partnerEditorOverlay = isEditing ? (
        <div className="pointer-events-none absolute inset-0 z-20">
             <div className="grid h-full w-full grid-cols-8 gap-4 p-4">
                 <div className="col-span-4"></div>
                 <div className="col-span-1"></div>
                 <div className="relative flex h-full w-full items-center justify-center col-span-2">
                     <div className="w-full">
                        <DisplayCardComponent {...editorCardState} logoHtml={generateFinalLogoHtml(editorCardState)} />
                    </div>
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    ) : null;


    const AdminPartnerCard: React.FC<{ partner: T; isFirst: boolean; isLast: boolean; isBeingEdited: boolean; isHiddenCard?: boolean }> = ({ partner, isFirst, isLast, isBeingEdited, isHiddenCard = false }) => (
        <div className="flex w-full flex-col items-center space-y-4">
            <div className="relative w-full">
                <DisplayCardComponent {...partner} />
                {isBeingEdited && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-primary/80">
                        <span className="text-xl font-bold text-primary-foreground">In Bearbeitung</span>
                    </div>
                )}
            </div>
            <div id={`buttons-${partner.id}`} className="flex w-full items-center justify-center gap-2 rounded-lg border bg-background/80 p-2 shadow-inner">
                <Button size="icon" variant="outline" onClick={() => handleMove(partner.id, 'left')} disabled={isFirst}><ArrowLeft /></Button>
                <Button size="icon" variant="outline" onClick={() => handleMove(partner.id, 'right')} disabled={isLast}><ArrowRight /></Button>
                <div className="w-px self-stretch bg-border mx-2" />
                <Button variant="outline" size="icon" onClick={() => handleEdit(partner)}><Pencil /></Button>
                <Button variant="outline" size="icon" onClick={() => handleToggleHidden(partner)}>
                    {partner.hidden ? <Eye /> : <EyeOff />}
                </Button>
                {isHiddenCard && (
                    <Button variant="destructive" size="icon" onClick={() => openDeleteConfirmation(partner.id, partner.name)}>
                        <Trash2 />
                    </Button>
                )}
            </div>
        </div>
    );
    
    const RowGrid: React.FC<{ partners: T[], isHidden?: boolean }> = ({ partners, isHidden }) => {
        if (!partners || partners.length === 0) return null;
        
        const count = partners.length;

        const getGridStyle = (index: number, total: number) => {
            let colStart = 0;
            if (total === 4) { // 2-2-2-2
                colStart = index * 2 + 1;
            } else if (total === 3) { // 1-2-2-2-1
                colStart = index * 2 + 2;
            } else if (total === 2) { // 2-2-2-2 centered
                colStart = index * 2 + 3;
            } else if (total === 1) { // 1-2-2-2-1 centered
                colStart = 4;
            }
    
            return { gridColumnStart: colStart };
        };

        return (
            <div className="grid grid-cols-8 gap-8">
                {partners.map((partner, index) => (
                    <div key={partner.id} style={getGridStyle(index, partners.length)} className="col-span-2 flex w-full items-center justify-center">
                        <AdminPartnerCard 
                            partner={partner} 
                            isFirst={index === 0} 
                            isLast={index === partners.length - 1} 
                            isHiddenCard={isHidden} 
                            isBeingEdited={partner.id === editingCardId}
                        />
                    </div>
                ))}
            </div>
        );
    };

    const PartnerGrid: React.FC<{ partners: T[], isHidden?: boolean }> = ({ partners, isHidden }) => {
        if (!partners || partners.length === 0) return null;

        const chunkedPartners = [];
        for (let i = 0; i < partners.length; i += 4) {
            chunkedPartners.push(partners.slice(i, i + 4));
        }

        return (
            <div className="space-y-8">
                {chunkedPartners.map((rowPartners, index) => (
                    <RowGrid key={index} partners={rowPartners} isHidden={isHidden} />
                ))}
            </div>
        );
    };

    const renderCardGroups = () => {
        const activeItems = validDbData.filter(i => !i.hidden);
        const hiddenItems = validDbData.filter(i => i.hidden);
    
        const renderGrid = (items: T[], title: string, description: string, isHiddenGrid: boolean) => {
            return (
                <div className="space-y-4 mt-12">
                    <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                     {items.length > 0 ? (
                        <PartnerGrid partners={items} isHidden={isHiddenGrid} />
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
                        <div className="relative rounded-lg border-2 border-dashed border-primary bg-muted h-[400px] mb-8">
                            {partnerEditorOverlay}
                            <EditorCardComponent cardData={editorCardState} onUpdate={(update) => setEditorCardState(prev => ({ ...prev, ...update }))} />
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
                            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-4">
                                        <Skeleton className="h-32 w-full" />
                                        <Skeleton className="h-10 w-full" />
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

export default ReusableCardManager;
