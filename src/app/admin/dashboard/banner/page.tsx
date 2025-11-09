'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase/provider';
import { doc, setDoc, collection, addDoc, deleteDoc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon, Save, Plus, Trash2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { setDocumentNonBlocking, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';


// --- Typen-Definitionen ---
type SeparatorStyle = 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';

interface BannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    yellowBannerText_en?: string;
    redBannerText: string;
    redBannerText_en?: string;
    yellowBannerSeparatorStyle?: SeparatorStyle;
    redBannerSeparatorStyle?: SeparatorStyle;
}

interface InfoBanner {
    id: string;
    text: string;
    text_en?: string;
    start: Date;
    end: Date;
    separatorStyle: SeparatorStyle;
}

interface InfoBannerFromDB {
    id: string;
    text: string;
    text_en?: string;
    start: Timestamp;
    end: Timestamp;
    separatorStyle: SeparatorStyle;
}

// --- Initialzustände ---
const initialSettingsState: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Praxisferien vom {start} bis {ende}. Vertretung: ...',
    redBannerText: 'Unsere Praxis ist vom {start} bis {ende} geschlossen.',
    yellowBannerSeparatorStyle: 'diamonds',
    redBannerSeparatorStyle: 'diamonds'
};

const initialInfoBannerState: Omit<InfoBanner, 'id'> = {
    text: 'Neuer Infotext',
    start: new Date(),
    end: new Date(),
    separatorStyle: 'diamonds'
};

// --- Hilfskomponenten ---
const SeparatorPreview: React.FC<{ style: SeparatorStyle }> = ({ style }) => {
    const separatorClasses = "mx-4 shrink-0";
    switch (style) {
        case 'spaces': return <div className="w-8 shrink-0" />;
        case 'equals': return <div className={cn(separatorClasses, "text-lg font-mono")}>= = =</div>;
        case 'dashes': return <div className={cn(separatorClasses, "text-lg font-mono")}>— — —</div>;
        case 'plus': return <div className={cn(separatorClasses, "text-lg font-mono")}>+ + +</div>;
        case 'asterisks': return <div className={cn(separatorClasses, "text-lg font-mono")}>* * *</div>;
        case 'diamonds': default: return <div className="flex items-center gap-1"><div className="h-2 w-2 rotate-45 bg-current" /><div className="h-2 w-2 rotate-45 bg-current" /><div className="h-2 w-2 rotate-45 bg-current" /></div>;
    }
};

const SeparatorSelect: React.FC<{ value: SeparatorStyle; onValueChange: (value: SeparatorStyle) => void; }> = ({ value, onValueChange }) => (
    <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Trenn-Stil auswählen" />
        </SelectTrigger>
        <SelectContent>
            {(['diamonds', 'spaces', 'equals', 'dashes', 'plus', 'asterisks'] as SeparatorStyle[]).map(style => (
                <SelectItem key={style} value={style}>
                    <div className="flex items-center gap-4">
                        <SeparatorPreview style={style} />
                        <span>{style.charAt(0).toUpperCase() + style.slice(1)}</span>
                    </div>
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);


// --- Hauptkomponenten ---

function BannerSettingsForm() {
    const firestore = useFirestore();
    const settingsDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'settings', 'banners') : null, [firestore]);
    const { data, isLoading, error } = useDoc<BannerSettings>(settingsDocRef);
    const { toast } = useToast();
    
    const [settings, setSettings] = useState<BannerSettings>(initialSettingsState);
    
    useEffect(() => {
        if (data) {
            setSettings(data);
        }
    }, [data]);
    
    const handleSave = async () => {
        if (!settingsDocRef) return;
        try {
            await setDocumentNonBlocking(settingsDocRef, settings);
            toast({ title: "Gespeichert", description: "Die Banner-Einstellungen wurden aktualisiert." });
        } catch (e: any) {
            toast({ variant: 'destructive', title: "Fehler", description: `Speichern fehlgeschlagen: ${e.message}` });
        }
    };
    
    const handleInputChange = (field: keyof BannerSettings, value: string | number) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return <Skeleton className="h-[400px] w-full" />;
    }
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>Einstellungen konnten nicht geladen werden: {error.message}</AlertDescription>
            </Alert>
        );
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Einstellungen für Ferien-Banner</CardTitle>
                <CardDescription>Konfigurieren Sie hier die Texte und das Verhalten der gelben und roten Ferien-Banner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="preHolidayDays">Ankündigungszeitraum (Tage)</Label>
                    <Input id="preHolidayDays" type="number" value={settings.preHolidayDays} onChange={e => handleInputChange('preHolidayDays', parseInt(e.target.value) || 0)} />
                    <p className="text-sm text-muted-foreground">Wie viele Tage vor Ferienbeginn soll der gelbe Banner angezeigt werden?</p>
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <h4 className="font-semibold text-primary">Gelber Banner (Ankündigung)</h4>
                     <div className="space-y-2">
                        <Label htmlFor="yellowBannerText">Text (Deutsch)</Label>
                        <Textarea id="yellowBannerText" value={settings.yellowBannerText} onChange={e => handleInputChange('yellowBannerText', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="yellowBannerText_en">Text (Englisch)</Label>
                        <Textarea id="yellowBannerText_en" value={settings.yellowBannerText_en || ''} onChange={e => handleInputChange('yellowBannerText_en', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Trenn-Stil</Label>
                        <SeparatorSelect value={settings.yellowBannerSeparatorStyle || 'diamonds'} onValueChange={style => handleInputChange('yellowBannerSeparatorStyle', style)} />
                    </div>
                </div>

                <Separator />
                
                 <div className="space-y-4">
                    <h4 className="font-semibold text-destructive">Roter Banner (während der Ferien)</h4>
                     <div className="space-y-2">
                        <Label htmlFor="redBannerText">Text (Deutsch)</Label>
                        <Textarea id="redBannerText" value={settings.redBannerText} onChange={e => handleInputChange('redBannerText', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="redBannerText_en">Text (Englisch)</Label>
                        <Textarea id="redBannerText_en" value={settings.redBannerText_en || ''} onChange={e => handleInputChange('redBannerText_en', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Trenn-Stil</Label>
                        <SeparatorSelect value={settings.redBannerSeparatorStyle || 'diamonds'} onValueChange={style => handleInputChange('redBannerSeparatorStyle', style)} />
                    </div>
                </div>
                
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Platzhalter</AlertTitle>
                    <AlertDescription>
                        Sie können die folgenden Platzhalter verwenden: <code>{'{start}'}</code>, <code>{'{ende}'}</code>, <code>{'{name}'}</code>. Diese werden automatisch durch die Daten der jeweiligen Ferien ersetzt.
                    </AlertDescription>
                </Alert>

                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Einstellungen speichern
                </Button>
            </CardContent>
        </Card>
    );
}


function InfoBannersManager() {
    const firestore = useFirestore();
    const infoBannersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'infoBanners'), orderBy('start', 'desc')) : null, [firestore]);
    const { data, isLoading, error } = useCollection<InfoBannerFromDB>(infoBannersQuery);
    const { toast } = useToast();
    
    const [editingBanner, setEditingBanner] = useState<Partial<InfoBanner> | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<InfoBanner | null>(null);

    const activeBanners = useMemo(() => data?.map(b => ({ ...b, start: b.start.toDate(), end: b.end.toDate() })) || [], [data]);

    const handleEdit = (banner: InfoBanner) => {
        setEditingBanner({ ...banner });
    };

    const handleCreateNew = () => {
        setEditingBanner({ ...initialInfoBannerState });
    };

    const handleCancelEdit = () => {
        setEditingBanner(null);
    };

    const handleUpdateEditingBanner = (update: Partial<InfoBanner>) => {
        setEditingBanner(prev => prev ? { ...prev, ...update } : null);
    };

    const handleSave = async () => {
        if (!editingBanner || !firestore) return;
        
        // Validation
        if (isBefore(editingBanner.end!, editingBanner.start!)) {
            toast({ variant: 'destructive', title: "Ungültiges Datum", description: "Das Enddatum darf nicht vor dem Startdatum liegen." });
            return;
        }

        const dataToSave = {
            ...editingBanner,
            start: Timestamp.fromDate(editingBanner.start!),
            end: Timestamp.fromDate(editingBanner.end!),
        };

        try {
            if (editingBanner.id) {
                // Update
                const docRef = doc(firestore, 'infoBanners', editingBanner.id);
                await setDocumentNonBlocking(docRef, dataToSave);
                toast({ title: "Gespeichert", description: "Der Info-Banner wurde aktualisiert." });
            } else {
                // Create
                const colRef = collection(firestore, 'infoBanners');
                const newDocRef = await addDocumentNonBlocking(colRef, { ...dataToSave, createdAt: serverTimestamp() });
                await setDocumentNonBlocking(newDocRef, {id: newDocRef.id}, {merge: true}); // Add ID to document
                toast({ title: "Erstellt", description: "Der neue Info-Banner wurde gespeichert." });
            }
            setEditingBanner(null);
        } catch (e: any) {
             toast({ variant: 'destructive', title: "Fehler", description: `Speichern fehlgeschlagen: ${e.message}` });
        }
    };
    
    const handleDelete = async (bannerId: string) => {
        if (!firestore) return;
        try {
            const docRef = doc(firestore, 'infoBanners', bannerId);
            await deleteDocumentNonBlocking(docRef);
            toast({ title: "Gelöscht", description: "Der Info-Banner wurde entfernt." });
            setDeleteConfirm(null);
        } catch (e: any) {
             toast({ variant: 'destructive', title: "Fehler", description: `Löschen fehlgeschlagen: ${e.message}` });
        }
    };


    const renderEditor = () => {
        if (!editingBanner) return null;

        return (
            <Card className="mb-8 border-primary border-2">
                <CardHeader>
                    <CardTitle>{editingBanner.id ? 'Info-Banner bearbeiten' : 'Neuen Info-Banner erstellen'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Startdatum</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !editingBanner.start && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {editingBanner.start ? format(editingBanner.start, 'PPP', { locale: de }) : <span>Datum wählen</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={editingBanner.start} onSelect={date => handleUpdateEditingBanner({ start: date })} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Enddatum</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !editingBanner.end && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {editingBanner.end ? format(editingBanner.end, 'PPP', { locale: de }) : <span>Datum wählen</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={editingBanner.end} onSelect={date => handleUpdateEditingBanner({ end: date })} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Text (Deutsch)</Label>
                        <Textarea value={editingBanner.text} onChange={e => handleUpdateEditingBanner({ text: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Text (Englisch)</Label>
                        <Textarea value={editingBanner.text_en || ''} onChange={e => handleUpdateEditingBanner({ text_en: e.target.value })} />
                    </div>
                     <div className="space-y-2">
                        <Label>Trenn-Stil</Label>
                        <SeparatorSelect value={editingBanner.separatorStyle} onValueChange={style => handleUpdateEditingBanner({ separatorStyle: style })} />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Speichern</Button>
                        <Button variant="outline" onClick={handleCancelEdit}>Abbrechen</Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Benutzerdefinierte Info-Banner (Blau)</CardTitle>
                    <CardDescription>Erstellen und verwalten Sie hier blaue Info-Banner, die für einen bestimmten Zeitraum angezeigt werden.</CardDescription>
                </div>
                 <Button onClick={handleCreateNew} disabled={!!editingBanner}><Plus className="mr-2 h-4 w-4" /> Neu erstellen</Button>
            </CardHeader>
            <CardContent>
                {renderEditor()}

                <div className="space-y-4">
                     {isLoading && <Skeleton className="h-20 w-full" />}
                     {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Fehler</AlertTitle>
                            <AlertDescription>Info-Banner konnten nicht geladen werden: {error.message}</AlertDescription>
                        </Alert>
                     )}
                     {activeBanners.length === 0 && !isLoading && (
                         <p className="text-sm text-muted-foreground text-center py-4">Keine Info-Banner vorhanden.</p>
                     )}
                    {activeBanners.map(banner => {
                        const now = new Date();
                        const isActive = isBefore(banner.start, now) && isBefore(now, banner.end);
                        const isUpcoming = isBefore(now, banner.start);
                        
                        return (
                        <Card key={banner.id} className="p-4">
                           <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("px-2 py-1 text-xs font-semibold rounded-full",
                                          isActive ? 'bg-blue-100 text-blue-800' : isUpcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        )}>
                                            {isActive ? 'Aktiv' : isUpcoming ? 'Anstehend' : 'Abgelaufen'}
                                        </span>
                                        <p className="text-sm font-semibold">{format(banner.start, 'dd.MM.yy')} - {format(banner.end, 'dd.MM.yy')}</p>
                                    </div>
                                    <p className="font-mono text-sm bg-muted p-2 rounded-md">{banner.text}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(banner)}>Bearbeiten</Button>
                                    <Button variant="destructive" size="sm" onClick={() => setDeleteConfirm(banner)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Löschen
                                    </Button>
                                </div>
                           </div>
                        </Card>
                    )})}
                </div>

                 <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Möchten Sie den Banner "{deleteConfirm?.text}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}>Löschen</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardContent>
        </Card>
    );
}

export default function BannerPage() {
    return (
        <div className="p-4 sm:p-8 space-y-8">
            <BannerSettingsForm />
            <InfoBannersManager />
        </div>
    );
}
