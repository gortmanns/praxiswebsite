'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pencil, EyeOff, Eye, Trash2, Plus, Save, XCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

import { PartnerCard as DisplayCard } from '../_components/partner-card';
import { PartnerEditor as EditorComponent } from '../_components/partner-editor';
import type { Partner as CardData } from '../_components/partner-editor';
import { Slider } from '@/components/ui/slider';

const initialMedicalPartnerState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Neuer Partner",
    websiteUrl: "https://",
    logoHtml: `<div style="width: 100%; height: 100%; display: flex; align-items-center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`,
    imageUrl: "",
    openInNewTab: true,
    hidden: false,
    logoScale: 100,
    logoX: 0,
    logoY: 0,
};

const RowGrid: React.FC<{ 
    partners: CardData[]; 
    onMove: (id: string, dir: 'left' | 'right') => void; 
    onEdit: (card: CardData) => void; 
    onToggleHidden: (card: CardData) => void; 
    onDelete: (id: string, name: string) => void;
    isHiddenRow: boolean;
}> = ({ partners, onMove, onEdit, onToggleHidden, onDelete, isHiddenRow }) => {
    const count = partners.length;
    if (count === 0) return null;

    const renderCardWithControls = (partner: CardData, index: number) => {
        const isFirst = index === 0;
        const isLast = index === partners.length - 1;

        return (
            <div key={partner.id} className="flex w-full flex-col items-center space-y-4">
                <DisplayCard {...partner} />
                <div id={`buttons-${partner.id}`} className="flex w-full items-center justify-center gap-1 rounded-lg border bg-background/80 p-2 shadow-inner">
                    <Button size="sm" variant="ghost" onClick={() => onMove(partner.id, 'left')} disabled={isFirst}><ArrowLeft /></Button>
                    <Button size="sm" variant="ghost" onClick={() => onMove(partner.id, 'right')} disabled={isLast}><ArrowRight /></Button>
                    
                    <div className="w-px bg-border self-stretch mx-2" />
                    
                    <Button variant="ghost" size="icon" onClick={() => onEdit(partner)}><Pencil /></Button>

                    {isHiddenRow ? (
                        <Button variant="ghost" size="icon" onClick={() => onToggleHidden(partner)}><Eye /></Button>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={() => onToggleHidden(partner)}><EyeOff /></Button>
                    )}
                    
                    {isHiddenRow && (
                         <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(partner.id, partner.name)}><Trash2 /></Button>
                    )}
                </div>
            </div>
        );
    };
    
    if (count === 4) {
        return (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner, index) => renderCardWithControls(partner, index))}
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-8 gap-8">
            {count === 1 && (
                <div className="col-start-1 sm:col-start-3 col-span-8 sm:col-span-4">
                    {renderCardWithControls(partners[0], 0)}
                </div>
            )}
            {count === 2 && (
                <>
                    <div className="col-start-1 sm:col-start-2 col-span-8 sm:col-span-3">{renderCardWithControls(partners[0], 0)}</div>
                    <div className="col-start-1 sm:col-start-5 col-span-8 sm:col-span-3">{renderCardWithControls(partners[1], 1)}</div>
                </>
            )}
            {count === 3 && (
                <>
                    <div className="col-start-1 sm:col-start-1 col-span-8 sm:col-span-2">{renderCardWithControls(partners[0], 0)}</div>
                    <div className="col-start-1 sm:col-start-4 col-span-8 sm:col-span-2">{renderCardWithControls(partners[1], 1)}</div>
                    <div className="col-start-1 sm:col-start-7 col-span-8 sm:col-span-2">{renderCardWithControls(partners[2], 2)}</div>
                </>
            )}
        </div>
    );
};


const PartnerGrid: React.FC<{ 
    partners: CardData[]; 
    onMove: (id: string, dir: 'left' | 'right') => void; 
    onEdit: (card: CardData) => void; 
    onToggleHidden: (card: CardData) => void; 
    onDelete: (id: string, name: string) => void;
    isHiddenRow: boolean;
}> = ({ partners, isHiddenRow, ...rest }) => {
    if (!partners || partners.length === 0) return null;

    const chunkedPartners = [];
    for (let i = 0; i < partners.length; i += 4) {
        chunkedPartners.push(partners.slice(i, i + 4));
    }

    return (
        <div className="space-y-8">
            {chunkedPartners.map((rowPartners, index) => (
                <RowGrid key={index} partners={rowPartners} isHiddenRow={isHiddenRow} {...rest} />
            ))}
        </div>
    );
};


function MedicalPartnersPageManager() {
    const collectionName = "medicalPartners";
    const pageTitle = "Kooperationspartner-Karten Ärzte verwalten";
    const pageDescription = "";
    const entityName = "Ärztlicher Partner";

    const firestore = useFirestore();
    
    const [notification, setNotification] = useState<TimedAlertProps | null>(null);

    const dataQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, collectionName) as CollectionReference<DocumentData>, orderBy('order', 'asc'));
    }, [firestore, collectionName]);

    const { data: dbData, isLoading: isLoadingData, error: dbError } = useCollection<CardData>(dataQuery as any);

    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [editorCardState, setEditorCardState] = useState<CardData>({ ...initialMedicalPartnerState, id: '', order: 0 } as CardData);
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
        setEditorCardState({ ...initialMedicalPartnerState, id: '' } as CardData);
    };

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
    };

    const generateFinalLogoHtml = (partner: CardData): string => {
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

    const handleSliderChange = (field: 'logoScale' | 'logoX' | 'logoY', value: number[]) => {
        const singleValue = value[0];
        setEditorCardState(prev => ({...prev, [field]: singleValue }));
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

        let dataToSave: Partial<CardData> = { ...editorCardState, logoHtml: generateFinalLogoHtml(editorCardState) };
    
        try {
            if (isCreatingNew) {
                delete (dataToSave as any).id;
                const highestOrder = dbData ? dbData.filter(d=>d.name).reduce((max, item) => item.order > max ? item.order : max, 0) : 0;
                
                const newCardData = {
                    ...initialMedicalPartnerState,
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

    const partnerEditorOverlay = isEditing ? (
        <div className="pointer-events-none absolute inset-0 z-20 bg-green-500/50">
           <div className="grid h-full w-full grid-cols-8 items-end gap-x-4 pb-4">
                <div className="col-start-5 col-span-2 flex flex-col items-center justify-end gap-y-2">
                    <div className="pointer-events-auto w-full max-w-xs space-y-2">
                        <div className="text-center text-primary-foreground">
                            <label htmlFor="logoScale" className="text-sm">Grösse: {editorCardState.logoScale || 100}%</label>
                            <Slider
                                id="logoScale"
                                value={[editorCardState.logoScale || 100]}
                                onValueChange={(value) => handleSliderChange('logoScale', value)}
                                max={200} step={1}
                                className="[&_[role=slider]]:bg-primary-foreground [&>span:first-child]:bg-black/20"
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-xs">
                        <DisplayCard {...editorCardState} />
                    </div>
                    <div className="pointer-events-auto mt-2 w-full max-w-xs space-y-2">
                         <div className="text-center text-primary-foreground">
                            <label htmlFor="logoX" className="text-sm">Horizontale Position: {editorCardState.logoX || 0}px</label>
                            <Slider
                                id="logoX"
                                value={[editorCardState.logoX || 0]}
                                onValueChange={(value) => handleSliderChange('logoX', value)}
                                min={-100} max={100} step={1}
                                className="[&_[role=slider]]:bg-primary-foreground [&>span:first-child]:bg-black/20"
                            />
                        </div>
                    </div>
                </div>
                 <div className="col-start-7 col-span-1 flex h-full items-center">
                    <div className="pointer-events-auto h-32 w-full space-y-2">
                        <div className="text-center text-primary-foreground">
                            <label htmlFor="logoY" className="text-sm">Vertikale Position: {editorCardState.logoY || 0}px</label>
                            <Slider
                                id="logoY"
                                value={[editorCardState.logoY || 0]}
                                onValueChange={(value) => handleSliderChange('logoY', value)}
                                min={-100} max={100} step={1}
                                orientation="vertical"
                                className="mx-auto h-24 [&_[role=slider]]:bg-primary-foreground [&>span:first-child]:bg-black/20"
                            />
                        </div>
                    </div>
                </div>
           </div>
        </div>
    ) : null;

    const renderCardGroups = () => {
        const activeItems = validDbData.filter(i => !i.hidden);
        const hiddenItems = validDbData.filter(i => i.hidden);
    
        const renderGroup = (items: CardData[], title: string, description: string, isHiddenGroup: boolean) => {
            if (items.length === 0) return null;
            return (
                <div className="space-y-4 mt-12">
                    <h3 className="font-headline text-xl font-bold tracking-tight text-primary">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <div className="mt-8">
                       <PartnerGrid 
                            partners={items}
                            onMove={handleMove}
                            onEdit={handleEdit}
                            onToggleHidden={handleToggleHidden}
                            onDelete={openDeleteConfirmation}
                            isHiddenRow={isHiddenGroup}
                        />
                    </div>
                </div>
            );
        };
    
        return (
            <>
                {renderGroup(activeItems, 'Aktive Karten', 'Die hier angezeigten Karten sind auf der Webseite sichtbar.', false)}
                {renderGroup(hiddenItems, 'Ausgeblendete Karten', 'Diese Karten sind auf der Webseite nicht sichtbar.', true)}
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
                            <EditorComponent cardData={editorCardState} onUpdate={setEditorCardState}>
                               {partnerEditorOverlay}
                            </EditorComponent>
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
                                        <Skeleton className="h-12 w-full" />
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

export default function MedicalPartnersPage() {
    return <MedicalPartnersPageManager />;
}
