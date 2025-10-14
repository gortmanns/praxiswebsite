
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, addDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save, AlertCircle, Info, RotateCcw, Plus, Trash2, Pencil, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, query, where, orderBy, Timestamp, addDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const FilledDiamond = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
);

type SeparatorStyle = 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';

interface Holiday {
  id: string;
  name: string;
  start: Date;
  end: Date;
}

interface BannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    redBannerText: string;
    yellowBannerSeparatorStyle?: SeparatorStyle;
    redBannerSeparatorStyle?: SeparatorStyle;
}

interface InfoBanner {
    id: string;
    text: string;
    start?: Timestamp | Date;
    end?: Timestamp | Date;
    separatorStyle?: SeparatorStyle;
}

const initialBannerSettings: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Die {name} stehen bevor. In der Zeit vom {start} bis und mit {end} bleibt das Praxiszentrum geschlossen. Bitte überprüfen Sie Ihren Medikamentenvorrat und beziehen Sie allenfalls nötigen Nachschub rechtzeitig.',
    redBannerText: 'Ferienhalber bleibt das Praxiszentrum in der Zeit vom {start} bis und mit {end} geschlossen. Die Notfall-Notrufnummern finden sie rechts oben im Menü unter dem Punkt "NOTFALL". Ab dem {next_day} stehen wieder wie gewohnt zur Verfügung.',
    yellowBannerSeparatorStyle: 'diamonds',
    redBannerSeparatorStyle: 'diamonds',
};

const initialInfoBannerState: Omit<InfoBanner, 'id'> = {
    text: '',
    start: new Date(),
    end: addDays(new Date(), 7),
    separatorStyle: 'diamonds',
};

const SeparatorPreview = ({ style }: { style?: SeparatorStyle }) => {
    const separatorClasses = "mx-6 shrink-0";
    switch (style) {
        case 'spaces': return <div className="w-12 shrink-0" />;
        case 'equals': return <div className={cn(separatorClasses, "text-2xl font-mono")}>= = =</div>;
        case 'dashes': return <div className={cn(separatorClasses, "text-2xl font-mono")}>— — —</div>;
        case 'plus': return <div className={cn(separatorClasses, "text-2xl font-mono")}>+ + +</div>;
        case 'asterisks': return <div className={cn(separatorClasses, "text-2xl font-mono")}>* * *</div>;
        case 'diamonds': default: return <div className={cn("flex items-center justify-center gap-2", separatorClasses)}><FilledDiamond className="h-3 w-3" /><FilledDiamond className="h-3 w-3" /><FilledDiamond className="h-3 w-3" /></div>;
    }
};

const BannerPreview = ({ text, color, separatorStyle, small }: { text: string; color: 'yellow' | 'red' | 'blue'; separatorStyle?: SeparatorStyle; small?: boolean }) => {
    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-blue-500 border-blue-600 text-white',
    };

    return (
         <div className={cn("relative w-full border", small ? "rounded-md" : "rounded-lg mt-8", bannerClasses[color])}>
            <div className={cn("flex w-full items-center overflow-hidden", small ? "h-8" : "h-12")}>
                <div className="marquee-preview flex min-w-full shrink-0 items-center justify-around">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="flex shrink-0 items-center">
                                <Info className={cn("shrink-0", small ? "mr-2 h-4 w-4" : "mr-3 h-5 w-5")} />
                                <p className={cn("whitespace-nowrap font-semibold", small ? "text-xs" : "text-sm")}>{text}</p>
                            </div>
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


export default function BannerPage() {
    const firestore = useFirestore();
    
    const settingsDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'settings', 'banners') : null, [firestore]);
    const { data: dbSettings, isLoading: isLoadingSettings, error: dbSettingsError } = useDoc<BannerSettings>(settingsDocRef);
    const [bannerSettings, setBannerSettings] = useState<BannerSettings>(initialBannerSettings);

    const infoBannersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'infoBanners'), orderBy('start', 'desc')) : null, [firestore]);
    const { data: infoBannersData, isLoading: isLoadingInfoBanners, error: dbInfoBannerError } = useCollection<InfoBanner>(infoBannersQuery);

    const [isEditing, setIsEditing] = useState(false);
    const [currentEditorBanner, setCurrentEditorBanner] = useState<Partial<InfoBanner>>(initialInfoBannerState);

    const holidaysQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return query(collection(firestore, 'holidays'), where('end', '>=', Timestamp.fromDate(today)), orderBy('end', 'asc'));
    }, [firestore]);
    const { data: holidaysData, isLoading: isLoadingHolidays } = useCollection<any>(holidaysQuery);

    const [notification, setNotification] = useState<TimedAlertProps | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; bannerId?: string; bannerText?: string }>({ isOpen: false });

    useEffect(() => {
        if (dbSettings) {
            setBannerSettings({ ...initialBannerSettings, ...dbSettings });
        }
    }, [dbSettings]);

    const holidays: Holiday[] = useMemo(() => {
        if (!holidaysData) return [];
        return holidaysData.map(h => ({ ...h, id: h.id, start: h.start.toDate(), end: h.end.toDate() })).sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [holidaysData]);
    
    const infoBanners: InfoBanner[] = useMemo(() => {
        if (!infoBannersData) return [];
        return infoBannersData.map(banner => ({
            ...banner,
            start: banner.start instanceof Timestamp ? banner.start.toDate() : banner.start,
            end: banner.end instanceof Timestamp ? banner.end.toDate() : banner.end,
        }));
    }, [infoBannersData]);

    const upcomingHoliday = useMemo(() => holidays.find(h => h.start > new Date()), [holidays]);

    const previewTexts = useMemo(() => {
        const defaultText = "Dies ist eine Demonstration der Banner-Komponente";
        if (upcomingHoliday) {
            const nextDay = addDays(upcomingHoliday.end, 1);
            return {
                yellow: bannerSettings.yellowBannerText
                    .replace('{name}', upcomingHoliday.name)
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de })),
                red: bannerSettings.redBannerText
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de }))
                    .replace('{next_day}', format(nextDay, 'd. MMMM', { locale: de })),
            };
        }
        return { yellow: defaultText, red: defaultText };
    }, [upcomingHoliday, bannerSettings.yellowBannerText, bannerSettings.redBannerText]);


    const handleBannerSettingsChange = (field: keyof BannerSettings, value: any) => setBannerSettings(prev => ({ ...prev, [field]: value }));
    const handleInfoBannerInputChange = (field: keyof InfoBanner, value: any) => setCurrentEditorBanner(prev => ({ ...prev, [field]: value }));

    const handleSaveBannerSettings = async () => {
        if (!settingsDocRef) return;
        setNotification(null);
        try {
            await setDoc(settingsDocRef, { ...bannerSettings, updatedAt: serverTimestamp() }, { merge: true });
            setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Die Banner Einstellungen wurden gespeichert.' });
        } catch (e: any) { setNotification({ variant: 'destructive', title: 'Fehler', description: `Speichern fehlgeschlagen: ${e.message}` }); }
    };
    
    const handleNewInfoBanner = () => {
        setCurrentEditorBanner({ ...initialInfoBannerState });
        setIsEditing(true);
    };

    const handleEditInfoBanner = (banner: InfoBanner) => {
        setCurrentEditorBanner({
            ...banner,
            start: banner.start,
            end: banner.end
        });
        setIsEditing(true);
    };
    
    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentEditorBanner(initialInfoBannerState);
    };

    const handleSaveInfoBanner = async () => {
        if (!firestore) return;
        setNotification(null);
        const dataToSave = { ...currentEditorBanner, updatedAt: serverTimestamp() };
        
        try {
            if (currentEditorBanner.id) {
                const docRef = doc(firestore, 'infoBanners', currentEditorBanner.id);
                await setDoc(docRef, dataToSave, { merge: true });
                setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Info-Banner wurde aktualisiert.' });
            } else {
                const docRef = await addDoc(collection(firestore, 'infoBanners'), dataToSave);
                await setDoc(docRef, { id: docRef.id }, { merge: true });
                setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Neues Info-Banner wurde erstellt.' });
            }
            handleCancelEdit();
        } catch (e: any) {
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Speichern fehlgeschlagen: ${e.message}` });
        }
    };
    
    const openDeleteConfirmation = (bannerId: string, bannerText: string) => {
        setDeleteConfirm({ isOpen: true, bannerId, bannerText });
    };

    const handleDeleteInfoBanner = async () => {
        if (!firestore || !deleteConfirm.bannerId) return;
        try {
            await deleteDoc(doc(firestore, 'infoBanners', deleteConfirm.bannerId));
            setNotification({ title: 'Erfolgreich', description: 'Info-Banner wurde gelöscht.', variant: 'success' });
        } catch (e: any) {
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Löschen fehlgeschlagen: ${e.message}` });
        } finally {
            setDeleteConfirm({ isOpen: false });
        }
    };

    if (isLoadingSettings || isLoadingHolidays || isLoadingInfoBanners) {
        return ( <div className="flex flex-1 items-start p-4 sm:p-6"><Card className="w-full"><CardHeader><Skeleton className="h-8 w-1/2" /><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent className="space-y-8"><Skeleton className="h-64 w-full" /><Skeleton className="h-48 w-full" /><Skeleton className="h-48 w-full" /></CardContent></Card></div>)
    }

    const dbError = dbSettingsError || dbInfoBannerError;
    if (dbError) {
        return (<div className="flex flex-1 items-start p-4 sm:p-6"><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Datenbankfehler</AlertTitle><AlertDescription>{dbError.message}</AlertDescription></Alert></div>)
    }

    return (
        <TooltipProvider>
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
                                <div className="space-y-2">
                                    <Label htmlFor="blueBannerText">Bannertext</Label>
                                    <Textarea id="blueBannerText" value={currentEditorBanner.text} onChange={(e) => handleInfoBannerInputChange('text', e.target.value)} rows={4} />
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
                                <TableHeader><TableRow><TableHead className="w-[50%]">Vorschau</TableHead><TableHead>Zeitraum</TableHead><TableHead className="text-right">Aktionen</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {infoBanners.map(banner => (
                                        <TableRow key={banner.id} className={cn(isEditing && currentEditorBanner.id === banner.id && "bg-muted/50")}>
                                            <TableCell className="w-full">
                                                <BannerPreview text={banner.text} color="blue" separatorStyle={banner.separatorStyle} small />
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">{banner.start ? format(banner.start, 'dd.MM.yy', { locale: de }) : ''} - {banner.end ? format(banner.end, 'dd.MM.yy', { locale: de }) : ''}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="relative">
                                                     {isEditing && currentEditorBanner.id === banner.id && (
                                                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-md z-10">
                                                            <span className="text-sm font-bold text-foreground">In Bearbeitung</span>
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2 justify-end">
                                                        <Button variant="outline" size="sm" onClick={() => handleEditInfoBanner(banner)}><Pencil className="h-4 w-4" /></Button>
                                                        <Button variant="destructive" size="sm" onClick={() => openDeleteConfirmation(banner.id, banner.text)}><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {(!infoBanners || infoBanners.length === 0) && <p className="text-center text-muted-foreground py-4">Keine Info-Banner vorhanden.</p>}
                        </div>
                    </div>

                    <div className="border-2 border-accent rounded-lg"><div className="p-6"><h3 className="text-yellow-500 font-bold text-lg">Vorankündigungs-Banner (Gelb)</h3><p className="text-muted-foreground text-sm">Wird eine bestimmte Anzahl Tage vor den Praxisferien angezeigt.</p></div><div className="space-y-4 bg-background p-6 rounded-b-lg"><div className="space-y-2"><Label htmlFor="preHolidayDays">Wie viele Tage vorher anzeigen?</Label><Input id="preHolidayDays" type="number" className="w-24" value={bannerSettings.preHolidayDays} onChange={(e) => handleBannerSettingsChange('preHolidayDays', parseInt(e.target.value, 10))} /></div><div className="space-y-2"><Label htmlFor="yellowBannerText">Bannertext</Label><Textarea id="yellowBannerText" value={bannerSettings.yellowBannerText} onChange={(e) => handleBannerSettingsChange('yellowBannerText', e.target.value)} rows={4} /></div><div className="flex items-end gap-4 pt-2"><div className="space-y-2"><Label>Trennzeichen-Stil</Label><SeparatorSelect value={bannerSettings.yellowBannerSeparatorStyle} onValueChange={(value) => handleBannerSettingsChange('yellowBannerSeparatorStyle', value)} /></div><div className="flex items-end gap-2"><Button variant="secondary" onClick={() => handleBannerSettingsChange('yellowBannerText', initialBannerSettings.yellowBannerText)}><RotateCcw className="mr-2 h-4 w-4" />Standardtext</Button><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="cursor-help"><Info className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent><p>{initialBannerSettings.yellowBannerText.replace('{name}', 'Name nächste Ferien').replace('{start}', 'erster Ferientag').replace('{end}', 'letzer Ferientag')}</p></TooltipContent></Tooltip></div><Button onClick={handleSaveBannerSettings}><Save className="mr-2 h-4 w-4" />Speichern</Button></div><BannerPreview text={previewTexts.yellow} color="yellow" separatorStyle={bannerSettings.yellowBannerSeparatorStyle} /></div></div>

                    <div className="border-2 border-accent rounded-lg"><div className="p-6"><h3 className="text-red-500 font-bold text-lg">Ferien-Banner (Rot)</h3><p className="text-muted-foreground text-sm">Wird während der Praxisferien angezeigt.</p></div><div className="space-y-4 bg-background p-6 rounded-b-lg"><div className="space-y-2"><Label htmlFor="redBannerText">Bannertext</Label><Textarea id="redBannerText" value={bannerSettings.redBannerText} onChange={(e) => handleBannerSettingsChange('redBannerText', e.target.value)} rows={4} /></div><div className="flex items-end gap-4 pt-2"><div className="space-y-2"><Label>Trennzeichen-Stil</Label><SeparatorSelect value={bannerSettings.redBannerSeparatorStyle} onValueChange={(value) => handleBannerSettingsChange('redBannerSeparatorStyle', value)} /></div><div className="flex items-end gap-2"><Button variant="secondary" onClick={() => handleBannerSettingsChange('redBannerText', initialBannerSettings.redBannerText)}><RotateCcw className="mr-2 h-4 w-4" />Standardtext</Button><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="cursor-help"><Info className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent><p>{initialBannerSettings.redBannerText.replace('{start}', 'erster Ferientag').replace('{end}', 'letzter Ferientag').replace('{next_day}', 'letzter Ferientag +1')}</p></TooltipContent></Tooltip></div><Button onClick={handleSaveBannerSettings}><Save className="mr-2 h-4 w-4" />Speichern</Button></div><BannerPreview text={previewTexts.red} color="red" separatorStyle={bannerSettings.redBannerSeparatorStyle} /></div></div>
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
                    animation: marquee-preview 60s linear infinite;
                }
            `}</style>
        </TooltipProvider>
    );
}

    