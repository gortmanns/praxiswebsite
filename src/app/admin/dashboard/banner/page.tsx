/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save, AlertCircle, Info, RotateCcw, Plus, Trash2, Pencil, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useFirestore, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { doc, setDoc, collection, query, orderBy, addDoc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const bannerClasses = {
    yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
    red: 'bg-red-500 border-red-600 text-white',
    blue: 'bg-blue-500 border-blue-600 text-white',
};

const FilledDiamond = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
);

type SeparatorStyle = 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';

interface BannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    redBannerText: string;
    yellowBannerText_en?: string;
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


const initialBannerSettings: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Die {name} stehen bevor. In der Zeit vom {start} bis und mit {ende} bleibt das Praxiszentrum geschlossen. Bitte überprüfen Sie Ihren Medikamentenvorrat und beziehen Sie allenfalls nötigen Nachschub rechtzeitig.',
    redBannerText: 'Ferienhalber bleibt das Praxiszentrum in der Zeit vom {start} bis und mit {ende} geschlossen. Die Notfall-Notrufnummern finden sie rechts oben im Menü unter dem Punkt "NOTFALL". Ab dem {ende+1} stehen wieder wie gewohnt zur Verfügung.',
    yellowBannerText_en: 'The {name} are approaching. During the period from {start} until {ende}, the practice center will be closed. Please check your medication supply and obtain any necessary refills in a timely manner.',
    redBannerText_en: 'Due to holidays, the practice center will be closed from {start} until {ende}. The emergency numbers can be found in the menu at the top right under "EMERGENCY". We will be available for you as usual starting from {ende+1}.',
    yellowBannerSeparatorStyle: 'diamonds',
    redBannerSeparatorStyle: 'diamonds',
};

const initialInfoBannerState: Omit<InfoBanner, 'id'> = {
    text: '',
    text_en: '',
    start: new Date(),
    end: addDays(new Date(), 7),
    separatorStyle: 'diamonds',
};

const SeparatorPreview = ({ style }: { style?: SeparatorStyle }) => {
    const separatorClasses = "mx-3 sm:mx-6 shrink-0";
    switch (style) {
        case 'spaces': return <div className="w-6 sm:w-12 shrink-0" />;
        case 'equals': return <div className={cn(separatorClasses, "text-lg sm:text-2xl font-mono")}>= = =</div>;
        case 'dashes': return <div className={cn(separatorClasses, "text-lg sm:text-2xl font-mono")}>— — —</div>;
        case 'plus': return <div className={cn(separatorClasses, "text-lg sm:text-2xl font-mono")}>+ + +</div>;
        case 'asterisks': return <div className={cn(separatorClasses, "text-lg sm:text-2xl font-mono")}>* * *</div>;
        case 'diamonds': default: return <div className={cn("flex items-center justify-center gap-1 sm:gap-2", separatorClasses)}><FilledDiamond className="h-2 w-2 sm:h-3 sm:w-3" /><FilledDiamond className="h-2 w-2 sm:h-3 sm:w-3" /><FilledDiamond className="h-2 w-2 sm:h-3 sm:w-3" /></div>;
    }
};

const BannerPreview = ({ text, color, separatorStyle, small }: { text: string; color: 'yellow' | 'red' | 'blue'; separatorStyle?: SeparatorStyle; small?: boolean }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState('60s');

    useEffect(() => {
        if (marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2;
            const speed = 50; 
            const duration = contentWidth / speed;
            setAnimationDuration(`${duration}s`);
        }
    }, [text, separatorStyle, small]);


    return (
        <div className={cn("relative w-full border", small ? "rounded-md" : "rounded-lg mt-8", bannerClasses[color])}>
            <div className={cn("flex w-full items-center overflow-hidden h-12")}>
                <div 
                    className="flex min-w-full shrink-0 items-center justify-around marquee-preview"
                    ref={marqueeRef}
                    style={{ animationDuration }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <p className={cn("whitespace-nowrap font-semibold", small ? "text-sm" : "text-xl")}>{text}</p>
                            <SeparatorPreview style={separatorStyle} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SeparatorSelect = ({ value, onValueChange }: { value?: SeparatorStyle, onValueChange: (value: SeparatorStyle) => void }) => {
    const options: { value: SeparatorStyle, label: React.ReactNode }[] = [
        { value: 'diamonds', label: <div className="flex items-center justify-center h-full w-full gap-2"><FilledDiamond className="h-3 w-3" /><FilledDiamond className="h-3 w-3" /><FilledDiamond className="h-3 w-3" /></div> },
        { value: 'spaces', label: <div className="font-mono text-sm tracking-widest h-full w-full flex items-center justify-center">· · ·</div> },
        { value: 'equals', label: <div className="font-mono text-xl h-full w-full flex items-center justify-center">= = =</div> },
        { value: 'dashes', label: <div className="font-mono text-xl h-full w-full flex items-center justify-center">— — —</div> },
        { value: 'plus', label: <div className="font-mono text-xl h-full w-full flex items-center justify-center">+ + +</div> },
        { value: 'asterisks', label: <div className="font-mono text-xl h-full w-full flex items-center justify-center">* * *</div> },
    ];
    return (
        <Select value={value || 'diamonds'} onValueChange={onValueChange}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="Stil wählen..." /></SelectTrigger>
            <SelectContent><SelectGroup>{options.map(opt => <SelectItem key={opt.value} value={opt.value} className="h-8">{opt.label}</SelectItem>)}</SelectGroup></SelectContent>
        </Select>
    );
};

const PlaceholderAlert = () => (
    <Alert variant="info" className="mt-0">
        <AlertTitle className="font-bold">Verfügbare Platzhalter</AlertTitle>
        <AlertDescription className="text-xs">
            <code className="font-mono">{'{name}'}</code>, 
            <code className="font-mono">{'{start}'}</code>, 
            <code className="font-mono">{'{start-1}'}</code>, 
            <code className="font-mono">{'{ende}'}</code>, 
            <code className="font-mono">{'{ende+1}'}</code>, 
            <code className="font-mono">{'{ende+2}'}</code>, 
            <code className="font-mono">{'{ende+3}'}</code>
        </AlertDescription>
    </Alert>
);

function BannerManager() {
    const firestore = useFirestore();
    const [bannerSettings, setBannerSettings] = useState<BannerSettings>(initialBannerSettings);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditorBanner, setCurrentEditorBanner] = useState<Partial<InfoBanner>>(initialInfoBannerState);

    const [notification, setNotification] = useState<TimedAlertProps | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; bannerId?: string; bannerText?: string }>({ isOpen: false });

    const settingsDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'settings', 'banners');
    }, [firestore]);
    const { data: dbSettings, isLoading: isLoadingSettings, error: dbSettingsError } = useDoc<BannerSettings>(settingsDocRef);
    
    const infoBannersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'infoBanners'), orderBy('start', 'desc'));
    }, [firestore]);
    const { data: infoBannersData, isLoading: isLoadingInfoBanners, error: dbInfoBannerError } = useCollection<InfoBannerFromDB>(infoBannersQuery as any);

    const infoBanners: InfoBanner[] = useMemo(() => {
        if (!infoBannersData) return [];
        return infoBannersData.map(b => ({
            ...b,
            start: b.start.toDate(),
            end: b.end.toDate(),
        }));
    }, [infoBannersData]);


    useEffect(() => {
        if (dbSettings) {
            setBannerSettings(prev => ({...prev, ...dbSettings}));
        }
    }, [dbSettings]);


    const handleBannerSettingsChange = (field: keyof BannerSettings, value: any) => {
        setBannerSettings(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSaveBannerSettings = async () => {
        if (!settingsDocRef) return;
        
        const settingsToSave: BannerSettings = {
            ...bannerSettings,
            yellowBannerText_en: bannerSettings.yellowBannerText_en || bannerSettings.yellowBannerText,
            redBannerText_en: bannerSettings.redBannerText_en || bannerSettings.redBannerText,
        };

        try {
            await setDoc(settingsDocRef, settingsToSave, { merge: true });
            setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Banner-Einstellungen gespeichert.' });
        } catch (e: any) {
            console.error("Error saving banner settings: ", e);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Einstellungen konnten nicht gespeichert werden: ${e.message}` });
        }
    };

    const handleInfoBannerInputChange = (field: keyof Omit<InfoBanner, 'id'>, value: any) => setCurrentEditorBanner(prev => ({ ...prev, [field]: value }));
    
    const handleNewInfoBanner = () => {
        setCurrentEditorBanner({ ...initialInfoBannerState });
        setIsEditing(true);
    };
    
    const handleEditInfoBanner = (banner: InfoBanner) => {
        setCurrentEditorBanner(banner);
        setIsEditing(true);
    }
    
    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentEditorBanner(initialInfoBannerState);
    };

    const handleSaveInfoBanner = async () => {
        if (!firestore) return;

        const bannerToSave: Partial<InfoBanner> = { 
            ...currentEditorBanner,
            text_en: currentEditorBanner.text_en || currentEditorBanner.text,
        };

        if (!bannerToSave.text || !bannerToSave.start || !bannerToSave.end) {
            setNotification({ variant: 'destructive', title: 'Fehler', description: 'Bitte füllen Sie alle Felder aus.' });
            return;
        }

        try {
            if (bannerToSave.id) {
                // Update
                const docRef = doc(firestore, 'infoBanners', bannerToSave.id);
                await setDoc(docRef, bannerToSave, { merge: true });
                setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Info-Banner aktualisiert.' });
            } else {
                // Create
                const newId = uuidv4();
                const docRef = doc(firestore, 'infoBanners', newId);
                await setDoc(docRef, { ...bannerToSave, id: newId, createdAt: serverTimestamp() });
                setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Neues Info-Banner erstellt.' });
            }
            handleCancelEdit();
        } catch (e: any) {
             console.error("Error saving info banner: ", e);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Info-Banner konnte nicht gespeichert werden: ${e.message}` });
        }
    };
    
    const openDeleteConfirmation = (banner: InfoBanner) => {
        setDeleteConfirm({ isOpen: true, bannerId: banner.id, bannerText: banner.text });
    };

    const handleDeleteInfoBanner = async () => {
        if (!firestore || !deleteConfirm.bannerId) return;
        try {
            await deleteDoc(doc(firestore, 'infoBanners', deleteConfirm.bannerId));
            setNotification({ variant: 'success', title: 'Gelöscht', description: 'Das Info-Banner wurde entfernt.' });
            setDeleteConfirm({ isOpen: false });
        } catch (e: any) {
            console.error("Error deleting info banner: ", e);
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Info-Banner konnte nicht gelöscht werden: ${e.message}` });
        }
    };


    const previewYellowText = useMemo(() => {
        return bannerSettings.yellowBannerText
            .replace('{name}', 'Beispielferien')
            .replace('{start}', format(new Date(), 'd. MMM yyyy', { locale: de }))
            .replace('{ende}', format(addDays(new Date(), 7), 'd. MMM yyyy', { locale: de }));
    }, [bannerSettings.yellowBannerText]);

    const previewRedText = useMemo(() => {
        return bannerSettings.redBannerText
            .replace('{name}', 'Beispielferien')
            .replace('{start}', format(new Date(), 'd. MMM yyyy', { locale: de }))
            .replace('{ende}', format(addDays(new Date(), 7), 'd. MMM yyyy', { locale: de }))
            .replace('{ende+1}', format(addDays(new Date(), 8), 'd. MMM yyyy', { locale: de }));
    }, [bannerSettings.redBannerText]);


    return (
        <>
            <div className="flex flex-1 flex-col items-center gap-6 p-4 sm:p-6">
                <div className="w-full max-w-5xl">
                    <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">Banner anpassen</h1>
                    <p className="text-muted-foreground">Hier können Sie den Text und die Anzeige der Banner steuern.</p>
                </div>

                {notification && (<div className="w-full max-w-5xl"><TimedAlert variant={notification.variant} title={notification.title} description={notification.description} onClose={() => setNotification(null)} className="w-full"/></div>)}

                <div className="w-full max-w-5xl space-y-6">
                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-blue-500 font-bold text-lg">Info-Banner (Blau)</h3>
                                    <p className="text-muted-foreground text-sm">Für benutzerdefinierte Ankündigungen. Banner werden im angegebenen Zeitraum angezeigt.</p>
                                </div>
                                {!isEditing && <Button onClick={handleNewInfoBanner}><Plus className="mr-2 h-4 w-4" />Neues Info-Banner</Button>}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="space-y-4 bg-background p-6 rounded-b-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="blueBannerText">Bannertext (Deutsch)</Label>
                                        <Textarea id="blueBannerText" value={currentEditorBanner.text} onChange={(e) => handleInfoBannerInputChange('text', e.target.value)} rows={4} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="blueBannerTextEn">Bannertext (Englisch)</Label>
                                        <Textarea id="blueBannerTextEn" value={currentEditorBanner.text_en} onChange={(e) => handleInfoBannerInputChange('text_en', e.target.value)} rows={4} placeholder="Wenn leer, wird der deutsche Text verwendet." />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Startdatum</Label>
                                        <Popover><PopoverTrigger asChild><Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !currentEditorBanner.start && 'text-muted-foreground')}><CalendarIcon className="mr-2 h-4 w-4" />{currentEditorBanner.start ? format(currentEditorBanner.start, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEditorBanner.start instanceof Date ? currentEditorBanner.start : undefined} onSelect={(date) => handleInfoBannerInputChange('start', date)} initialFocus locale={de} /></PopoverContent></Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Enddatum</Label>
                                        <Popover><PopoverTrigger asChild><Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !currentEditorBanner.end && 'text-muted-foreground')}><CalendarIcon className="mr-2 h-4 w-4" />{currentEditorBanner.end ? format(currentEditorBanner.end, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEditorBanner.end instanceof Date ? currentEditorBanner.end : undefined} onSelect={(date) => handleInfoBannerInputChange('end', date)} initialFocus locale={de} /></PopoverContent></Popover>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                     <div className="flex items-end gap-4">
                                        <div className="space-y-2"><Label>Trennzeichen-Stil</Label><SeparatorSelect value={currentEditorBanner.separatorStyle} onValueChange={(value) => handleInfoBannerInputChange('separatorStyle', value)} /></div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" onClick={handleCancelEdit}><XCircle className="mr-2 h-4 w-4" />Abbrechen</Button>
                                            <Button onClick={handleSaveInfoBanner}><Save className="mr-2 h-4 w-4" />Speichern</Button>
                                        </div>
                                    </div>
                                </div>
                                <BannerPreview text={currentEditorBanner.text || "Vorschau"} color="blue" separatorStyle={currentEditorBanner.separatorStyle} />
                            </div>
                        )}

                        <div className="bg-background p-6 rounded-b-lg">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-full max-w-sm">Vorschau</TableHead>
                                        <TableHead className="whitespace-nowrap">Zeitraum</TableHead>
                                        <TableHead className="text-right whitespace-nowrap">Aktionen</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoadingInfoBanners ? (
                                        <TableRow><TableCell colSpan={3} className="text-center"><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                                    ) : infoBanners.length > 0 ? (
                                        infoBanners.map(banner => (
                                            <TableRow key={banner.id}>
                                                <TableCell className="max-w-sm overflow-hidden">
                                                    <BannerPreview text={banner.text} color="blue" separatorStyle={banner.separatorStyle} small />
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap">
                                                    {format(banner.start, 'dd.MM.yy', { locale: de })} - {format(banner.end, 'dd.MM.yy', { locale: de })}
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditInfoBanner(banner)}><Pencil className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" onClick={() => openDeleteConfirmation(banner)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                                Keine Info-Banner gefunden.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <h3 className="text-yellow-500 font-bold text-lg">Vorankündigungs-Banner (Gelb)</h3>
                            <p className="text-muted-foreground text-sm">Wird eine bestimmte Anzahl Tage vor den Praxisferien angezeigt.</p>
                        </div>
                        <div className="space-y-4 bg-background p-6 rounded-b-lg">
                           {isLoadingSettings ? <Skeleton className="h-48 w-full" /> : (
                           <>
                           <div className="flex flex-col md:flex-row items-start gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="preHolidayDays">Wie viele Tage vorher anzeigen?</Label>
                                    <Input id="preHolidayDays" type="number" className="w-24" value={bannerSettings.preHolidayDays} onChange={(e) => handleBannerSettingsChange('preHolidayDays', parseInt(e.target.value, 10))} />
                                </div>
                                <div className="flex-1 pt-1.5 w-full">
                                    <Alert variant="info" className="mt-5">
                                        <AlertTitle className="font-bold">Anzeigedauer</AlertTitle>
                                        <AlertDescription>
                                            Sie können die Anzahl der Tage einstellen, die das Banner vor dem ersten Ferientag eingeblendet werden soll. Ein Enddatum ist nicht nötig, da es bei Erreichen des ersten Ferientags automatisch durch das rote Ferienbanner abgelöst wird.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="yellowBannerText">Bannertext (Deutsch)</Label>
                                    <Textarea id="yellowBannerText" value={bannerSettings.yellowBannerText} onChange={(e) => handleBannerSettingsChange('yellowBannerText', e.target.value)} rows={4} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="yellowBannerTextEn">Bannertext (Englisch)</Label>
                                    <Textarea id="yellowBannerTextEn" value={bannerSettings.yellowBannerText_en} onChange={(e) => handleBannerSettingsChange('yellowBannerText_en', e.target.value)} rows={4} placeholder="Wenn leer, wird der deutsche Text verwendet." />
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                <div className="flex items-center gap-4">
                                    <div className="space-y-2">
                                        <Label>Trennzeichen-Stil</Label>
                                        <SeparatorSelect value={bannerSettings.yellowBannerSeparatorStyle} onValueChange={(value) => handleBannerSettingsChange('yellowBannerSeparatorStyle', value)} />
                                    </div>
                                    <Button variant="secondary" onClick={() => handleBannerSettingsChange('yellowBannerText', initialBannerSettings.yellowBannerText)}>
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Standardtext
                                    </Button>
                                </div>
                                <div className="flex-1 min-w-[300px]">
                                    <PlaceholderAlert />
                                </div>
                                <Button onClick={handleSaveBannerSettings}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Speichern
                                </Button>
                            </div>
                            <BannerPreview text={previewYellowText} color="yellow" separatorStyle={bannerSettings.yellowBannerSeparatorStyle} />
                            </>
                           )}
                        </div>
                    </div>

                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <h3 className="text-red-500 font-bold text-lg">Ferien-Banner (Rot)</h3>
                            <p className="text-muted-foreground text-sm">Wird während der Praxisferien angezeigt.</p>
                        </div>
                        <div className="space-y-4 bg-background p-6 rounded-b-lg">
                            {isLoadingSettings ? <Skeleton className="h-48 w-full" /> : (
                            <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="redBannerText">Bannertext (Deutsch)</Label>
                                    <Textarea id="redBannerText" value={bannerSettings.redBannerText} onChange={(e) => handleBannerSettingsChange('redBannerText', e.target.value)} rows={4} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="redBannerTextEn">Bannertext (Englisch)</Label>
                                    <Textarea id="redBannerTextEn" value={bannerSettings.redBannerText_en} onChange={(e) => handleBannerSettingsChange('redBannerText_en', e.target.value)} rows={4} placeholder="Wenn leer, wird der deutsche Text verwendet." />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                <div className="flex items-center gap-4">
                                    <div className="space-y-2">
                                        <Label>Trennzeichen-Stil</Label>
                                        <SeparatorSelect value={bannerSettings.redBannerSeparatorStyle} onValueChange={(value) => handleBannerSettingsChange('redBannerSeparatorStyle', value)} />
                                    </div>
                                    <Button variant="secondary" onClick={() => handleBannerSettingsChange('redBannerText', initialBannerSettings.redBannerText)}>
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Standardtext
                                    </Button>
                                </div>
                                <div className="flex-1 min-w-[300px]">
                                    <PlaceholderAlert />
                                </div>
                                <Button onClick={handleSaveBannerSettings}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Speichern
                                </Button>
                            </div>
                            <BannerPreview text={previewRedText} color="red" separatorStyle={bannerSettings.redBannerSeparatorStyle} />
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <AlertDialog open={deleteConfirm.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirm({ isOpen: false })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                        <AlertDialogDescription>Möchten Sie das Info-Banner "<strong>{deleteConfirm.bannerText}</strong>" wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteInfoBanner} className={cn(buttonVariants({ variant: "destructive" }))}>Löschen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <style jsx global>{`
                @keyframes marquee-preview {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .marquee-preview {
                    animation: marquee-preview linear infinite;
                    animation-duration: var(--animation-duration, 60s);
                }
            `}</style>
        </>
    );
}

export default function BannerPage() {
    return <BannerManager />;
}
