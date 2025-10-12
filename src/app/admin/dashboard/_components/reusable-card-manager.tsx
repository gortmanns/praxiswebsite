
'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pencil, EyeOff, Eye, Info, Trash2, Plus, Save, XCircle, AlertCircle, RectangleHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';
import { Slider } from '@/components/ui/slider';
import { PartnerCard } from '../partners/_components/partner-card';


export interface BaseCardData {
    id: string;
    order: number;
    name: string; // Ensure name is part of the base data for filtering
    hidden?: boolean;
    createdAt?: any;
    [key: string]: any;
}

interface ReusableCardManagerProps<T extends BaseCardData> {
    collectionName: string;
    pageTitle: string;
    pageDescription: string;
    initialCardState: Omit<T, 'id' | 'order' | 'createdAt'>;
    DisplayCardComponent: React.ForwardRefExoticComponent<any & React.RefAttributes<any>>;
    EditorCardComponent: React.ComponentType<{ 
        cardData: T; 
        onUpdate: (updatedData: T) => void;
        children?: React.ReactNode;
    }>;
    entityName: string;
}

const generateFinalLogoHtml = (partner: BaseCardData): string => {
    if (partner.imageUrl) {
        const scale = partner.logoScale || 100;
        const x = partner.logoX || 0;
        const y = partner.logoY || 0;
        const transformStyle = `transform: scale(${scale / 100}) translate(${x}px, ${y}px);`;
        return `<img src="${partner.imageUrl}" alt="${partner.name || 'Partner Logo'}" style="object-fit: contain; width: 100%; height: 100%; transition: transform 0.2s ease-out; ${transformStyle}" />`;
    }
    return partner.logoHtml || `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; border-radius: 8px;"><span style="font-family: sans-serif; color: #999;">Logo</span></div>`;
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
        setEditorCardState({ ...initialCardState, id: '', name: 'Neue Karte' } as T);
    };
    

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setIsCreatingNew(false);
    };
    

    const handleMove = async (cardId: string, direction: 'up' | 'down') => {
        if (!dbData || !firestore) return;

        const visibleItems = dbData.filter(d => !d.hidden && d.name);
        const currentIndex = visibleItems.findIndex(item => item.id === cardId);
        
        let item1: T, item2: T;
        
        if (direction === 'up' && currentIndex > 0) {
            item1 = visibleItems[currentIndex];
            item2 = visibleItems[currentIndex - 1];
        } else if (direction === 'down' && currentIndex < visibleItems.length - 1) {
            item1 = visibleItems[currentIndex];
            item2 = visibleItems[currentIndex + 1];
        } else {
            return;
        }

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

        let dataToSave: Partial<T> = { ...editorCardState };
        if (isPartnerManager) {
            dataToSave.logoHtml = generateFinalLogoHtml(editorCardState);
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
    
    const validDbData = useMemo(() => dbData?.filter(d => d.name) || [], [dbData]);
    const visibleItems = useMemo(() => validDbData.filter(d => !d.hidden), [validDbData]);
    const hiddenItems = useMemo(() => validDbData.filter(d => d.hidden), [validDbData]);

    const fullWidthVisibleItems = isStaffManager ? visibleItems.filter(item => item.fullWidth) : [];
    const gridVisibleItems = isStaffManager ? visibleItems.filter(item => !item.fullWidth) : visibleItems;
    
    const fullWidthHiddenItems = isStaffManager ? hiddenItems.filter(item => item.fullWidth) : [];
    const gridHiddenItems = isStaffManager ? hiddenItems.filter(item => !item.fullWidth) : hiddenItems;
    
    const DisplayWrapper: React.FC<{ item: T, index: number, totalVisible: number, isFullWidth: boolean }> = ({ item, index, totalVisible, isFullWidth }) => {
        const MoveUpIcon = isFullWidth ? ArrowUp : ChevronLeft;
        const MoveDownIcon = isFullWidth ? ArrowDown : ChevronRight;

        const controlButtons = (
             <div className="grid grid-cols-1 w-full gap-2">
                <Button variant="outline" size="sm" onClick={() => handleMove(item.id, 'up')} disabled={index === 0 || isEditing}>
                    <MoveUpIcon className="mr-2 h-4 w-4" /> Verschieben
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMove(item.id, 'down')} disabled={index === totalVisible - 1 || isEditing}>
                    Verschieben <MoveDownIcon className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                    <EyeOff className="mr-2 h-4 w-4" /> Ausblenden
                </Button>
                {isStaffManager && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleFullWidth(item)} 
                        disabled={isEditing}
                        title="Volle Breite aktivieren/deaktivieren"
                        className={cn(item.fullWidth && "bg-primary/90 hover:bg-primary text-primary-foreground")}
                    >
                        <RectangleHorizontal className="mr-2 h-4 w-4" />
                        Volle Breite
                    </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} disabled={isEditing}>
                    <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                </Button>
            </div>
        );

        if (isPartnerManager || !isStaffManager) {
            return (
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                         <div className="w-full">
                            <DisplayCardComponent {...item} />
                         </div>
                        <div className="mt-2 flex w-full flex-col gap-2">
                           {controlButtons}
                        </div>
                    </div>
                </div>
            );
        }

        // For Staff and Doctors
        return (
            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex sm:flex-col w-full sm:w-48 order-2 sm:order-1 flex-shrink-0 items-center justify-center gap-2">
                   {controlButtons}
                </div>
                <div className={cn("relative flex-1 w-full max-w-sm order-1 sm:order-2")}>
                    <DisplayCardComponent {...item} />
                </div>
            </div>
        );
    };

    const PartnerRowGrid: React.FC<{ partners: T[], totalVisible: number, baseIndex: number }> = ({ partners, totalVisible, baseIndex }) => {
        const count = partners.length;
        if (count === 0) return null;

        if (count === 4) {
            return (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {partners.map((partner, index) => (
                        <DisplayWrapper key={partner.id} item={partner} index={baseIndex + index} totalVisible={totalVisible} isFullWidth={false} />
                    ))}
                </div>
            );
        }
        
        return (
            <div className="grid grid-cols-8 gap-8">
                {count === 1 && (
                    <>
                        <div className="col-span-3"></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[0]} index={baseIndex} totalVisible={totalVisible} isFullWidth={false} /></div>
                        <div className="col-span-3"></div>
                    </>
                )}
                {count === 2 && (
                    <>
                        <div className="col-span-2"></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[0]} index={baseIndex} totalVisible={totalVisible} isFullWidth={false}/></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[1]} index={baseIndex + 1} totalVisible={totalVisible} isFullWidth={false}/></div>
                        <div className="col-span-2"></div>
                    </>
                )}
                {count === 3 && (
                    <>
                        <div className="col-span-1"></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[0]} index={baseIndex} totalVisible={totalVisible} isFullWidth={false}/></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[1]} index={baseIndex + 1} totalVisible={totalVisible} isFullWidth={false}/></div>
                        <div className="col-span-2"><DisplayWrapper item={partners[2]} index={baseIndex + 2} totalVisible={totalVisible} isFullWidth={false}/></div>
                        <div className="col-span-1"></div>
                    </>
                )}
            </div>
        );
    };

    const PartnerGrid: React.FC<{ partners: T[] }> = ({ partners }) => {
        if (!partners || partners.length === 0) return null;
        const totalVisible = partners.length;

        const chunkedPartners = [];
        for (let i = 0; i < partners.length; i += 4) {
            chunkedPartners.push(partners.slice(i, i + 4));
        }

        return (
            <div className="space-y-8">
                {chunkedPartners.map((rowPartners, rowIndex) => (
                    <PartnerRowGrid 
                        key={rowIndex} 
                        partners={rowPartners}
                        totalVisible={totalVisible}
                        baseIndex={rowIndex * 4}
                    />
                ))}
            </div>
        );
    };


    const HiddenDisplayWrapper: React.FC<{ item: T, isFullWidth: boolean }> = ({ item, isFullWidth }) => {
        const itemControls = (
             <div className="grid grid-cols-1 w-full gap-2">
                <Button variant="outline" size="sm" onClick={() => handleToggleHidden(item)} disabled={isEditing}>
                    <Eye className="mr-2 h-4 w-4" /> Einblenden
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} disabled={isEditing}>
                    <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                </Button>
                {isStaffManager && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleFullWidth(item)} 
                        disabled={isEditing}
                        title="Volle Breite aktivieren/deaktivieren"
                        className={cn(item.fullWidth && "bg-primary/90 hover:bg-primary text-primary-foreground")}
                    >
                        <RectangleHorizontal className="mr-2 h-4 w-4" />
                        Volle Breite
                    </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => openDeleteConfirmation(item.id, (item as any).name || 'diese Karte')} disabled={isEditing}>
                    <Trash2 className="mr-2 h-4 w-4" /> Löschen
                </Button>
            </div>
        );
        
        if (isPartnerManager || !isStaffManager) {
            return (
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <div className="absolute inset-0 z-10 bg-black/50 rounded-lg"></div>
                            <DisplayCardComponent {...item} />
                        </div>
                        <div className="mt-2 flex w-full flex-col gap-2">
                            {itemControls}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex sm:flex-col w-full sm:w-48 order-2 sm:order-1 flex-shrink-0 items-center justify-center gap-2">
                   {itemControls}
                </div>
                <div className={cn("relative flex-1 w-full max-w-sm order-1 sm:order-2 grayscale")}>
                    <DisplayCardComponent {...item} />
                </div>
            </div>
         );
    };

    const partnerEditorOverlay = isPartnerManager ? (
        <div className="pointer-events-none absolute inset-0 z-10">
            <div className="grid grid-cols-8 gap-x-2 h-full">
                <div></div>
                <div className="col-span-2"></div>
                <div className="col-span-2 pointer-events-auto flex flex-col justify-end h-full">
                   
                </div>
                <div className="col-span-2 pointer-events-auto flex flex-col justify-end h-full">
                    <div className="space-y-2 w-full mx-auto mb-4">
                        <div className="text-center text-primary-foreground">
                            <label htmlFor="logoScale" className="text-sm">Grösse: {editorCardState.logoScale || 100}%</label>
                            <Slider
                                id="logoScale"
                                value={[editorCardState.logoScale || 100]}
                                onValueChange={(value) => setEditorCardState(prev => ({...prev, logoScale: value[0]}))}
                                max={200}
                                step={1}
                                className="[&_[role=slider]]:bg-accent [&>span:first-child]:bg-popover [&>span:first-child>span]:bg-muted"
                            />
                        </div>
                    </div>
                     <PartnerCard {...editorCardState} />
                    <div className="flex flex-col items-center justify-center w-full pointer-events-auto mt-4">
                        <div className="w-full px-2">
                            <Slider
                                value={[editorCardState.logoX || 0]}
                                onValueChange={(value) => setEditorCardState(prev => ({...prev, logoX: value[0]}))}
                                max={100}
                                min={-100}
                                step={1}
                                className="[&_[role=slider]]:bg-accent [&>span:first-child]:bg-popover [&>span:first-child>span]:bg-muted"
                            />
                        </div>
                        <div className="text-center text-xs mt-1 text-white">
                            <div>Horizontale Position</div>
                            <div>{editorCardState.logoX || 0}px</div>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-auto flex flex-col justify-end">
                    <div className="h-32">
                        <div className="flex flex-row items-center justify-center h-full gap-2">
                            <div className="h-4/5 flex justify-center">
                                <Slider
                                    orientation="vertical"
                                    value={[-(editorCardState.logoY || 0)]}
                                    onValueChange={(value) => setEditorCardState(prev => ({...prev, logoY: -value[0]}))}
                                    max={100}
                                    min={-100}
                                    step={1}
                                    className="[&_[role=slider]]:bg-accent [&>span:first-child]:bg-popover [&>span:first-child>span]:bg-muted"
                                />
                            </div>
                            <div className="text-center text-xs text-white">
                                <div>Vertikale</div>
                                <div>Position</div>
                                <div>{editorCardState.logoY || 0}px</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 h-14" />
                </div>
            </div>
        </div>
    ) : null;


    return (
        <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
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
                             <div className="p-10 pt-0">
                                {isEditing && (
                                     <Alert variant="info" className="mt-8">
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>Bearbeitungsmodus</AlertTitle>
                                        <AlertDescription>
                                            {isCreatingNew
                                                ? "Sie können jetzt die Einstellungen für die neue Karte festlegen. Das Logo sollte idealerweise in der Grösse 330x130 Pixel und als .jpg oder .png vorliegen. Die Feinjustierung der angezeigten Grösse und Positionierung innerhalb der Karte ist über die Schieberegler möglich."
                                                : 'Die Werte der zu bearbeitenden Karte wurden übernommen und können nun angepasst werden. Wenn das Logo ersetzt werden soll, dann sollte dieses idealerweise in der Grösse 330x130 Pixel und als .jpg oder .png vorliegen. Erst mit dem Klicken auf "Änderungen speichern" werden diese in die Datenbank übernommen. Mit Abbrechen wird alles zurückgenommen und die Karte behält ihr ursprüngliches Aussehen.'}
                                        </AlertDescription>
                                    </Alert>
                                )}
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

                    <div className="space-y-4 mt-12">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Aktive Karten</h3>
                         <p className="text-sm text-muted-foreground">
                            Klicken Sie auf &quot;Bearbeiten&quot;, um eine Karte in den Bearbeitungsmodus zu laden.
                        </p>
                    </div>
                     <div className={cn( "mt-8", isPartnerManager && "rounded-lg bg-primary p-4" )}>
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
                             <Alert variant="destructive" className={cn(isPartnerManager ? "w-full lg:col-span-4" : "lg:col-span-2")}>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Datenbankfehler</AlertTitle>
                                <AlertDescription>
                                    Die Daten konnten nicht geladen werden: {dbError.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        {!isLoadingData && isPartnerManager && (
                            <PartnerGrid partners={gridVisibleItems} />
                        )}
                        {!isLoadingData && !isPartnerManager && (
                            <div className='space-y-12'>
                                {fullWidthVisibleItems.map((item, index) => (
                                    <div key={item.id} className="flex justify-center">
                                         <DisplayWrapper item={item} index={index} totalVisible={fullWidthVisibleItems.length} isFullWidth={true} />
                                    </div>
                                ))}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {gridVisibleItems.map((item, index) => (
                                        <DisplayWrapper key={item.id} item={item} index={index} totalVisible={gridVisibleItems.length} isFullWidth={false} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {(gridHiddenItems.length > 0 || fullWidthHiddenItems.length > 0) && (
                        <>
                            <div className="mt-16 space-y-4">
                                <h3 className="font-headline text-xl font-bold tracking-tight text-primary">Ausgeblendete Karten</h3>
                            </div>
                            <div className="mt-8">
                                {!isLoadingData && isPartnerManager && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {gridHiddenItems.map((item) => (
                                            <HiddenDisplayWrapper key={item.id} item={item} isFullWidth={false} />
                                        ))}
                                    </div>
                                )}
                                {!isLoadingData && !isPartnerManager && (
                                     <div className='space-y-12'>
                                        {fullWidthHiddenItems.map((item) => (
                                            <div key={item.id} className="flex justify-center">
                                                <HiddenDisplayWrapper item={item} isFullWidth={true} />
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                            {gridHiddenItems.map((item) => (
                                                <HiddenDisplayWrapper key={item.id} item={item} isFullWidth={false} />
                                            ))}
                                        </div>
                                    </div>
                                )}
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
