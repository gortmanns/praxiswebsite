
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, differenceInDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save, AlertCircle, Info, Diamond, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

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
    isBlueBannerActive: boolean;
    blueBannerText: string;
    blueBannerStart?: Date;
    blueBannerEnd?: Date;
    separatorStyle?: 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';
}

const initialSettings: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Unsere Praxis bleibt vom {start} bis und mit {end} geschlossen.',
    redBannerText: 'Unsere Praxis ist im Moment geschlossen.',
    isBlueBannerActive: false,
    blueBannerText: 'Wichtige Information: ',
    blueBannerStart: undefined,
    blueBannerEnd: undefined,
    separatorStyle: 'diamonds',
};

const SeparatorPreview = ({ style }: { style: BannerSettings['separatorStyle'] }) => {
    const separatorClasses = "mx-6 shrink-0";
    switch (style) {
        case 'spaces':
            return <div className="w-12 shrink-0" />;
        case 'equals':
            return <div className={cn(separatorClasses, "text-2xl font-mono")}>= = =</div>;
        case 'dashes':
            return <div className={cn(separatorClasses, "text-2xl font-mono")}>— — —</div>;
        case 'plus':
            return <div className={cn(separatorClasses, "text-2xl font-mono")}>+ + +</div>;
        case 'asterisks':
            return <div className={cn(separatorClasses, "text-2xl font-mono")}>* * *</div>;
        case 'diamonds':
        default:
            return (
                <div className={cn("flex items-center justify-center gap-2", separatorClasses)}>
                    <Diamond className="h-3 w-3" />
                    <Diamond className="h-3 w-3" />
                    <Diamond className="h-3 w-3" />
                </div>
            );
    }
};

const BannerPreview = ({ text, color, separatorStyle }: { text: string; color: 'yellow' | 'red' | 'blue'; separatorStyle?: BannerSettings['separatorStyle'] }) => {
    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-blue-500 border-blue-600 text-white',
    };

    return (
         <div className={cn("relative w-full border rounded-lg mt-4", bannerClasses[color])}>
            <div className="flex h-12 w-full items-center overflow-hidden">
                <div className="marquee flex min-w-full shrink-0 items-center justify-around">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="flex shrink-0 items-center">
                                <Info className="mr-3 h-5 w-5 shrink-0" />
                                <p className="whitespace-nowrap text-sm font-semibold">{text}</p>
                            </div>
                            <SeparatorPreview style={separatorStyle} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default function BannerPage() {
    const firestore = useFirestore();
    
    const settingsDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'settings', 'banners');
    }, [firestore]);

    const holidaysQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return query(
            collection(firestore, 'holidays'),
            where('end', '>=', Timestamp.fromDate(today)),
            orderBy('end', 'asc')
        );
    }, [firestore]);

    const { data: dbData, isLoading, error: dbError } = useDoc<any>(settingsDocRef);
    const { data: holidaysData, isLoading: isLoadingHolidays } = useCollection<any>(holidaysQuery);

    const [settings, setSettings] = useState<BannerSettings>(initialSettings);
    const [notification, setNotification] = useState<TimedAlertProps | null>(null);

    const holidays: Holiday[] = useMemo(() => {
        if (!holidaysData) return [];
        return holidaysData
            .map(h => ({
                ...h,
                start: h.start.toDate(),
                end: h.end.toDate(),
            }))
            .sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [holidaysData]);

    const upcomingHoliday = useMemo(() => {
        if (!holidays) return null;
        return holidays.find(h => h.start > new Date());
    }, [holidays]);

    const previewTexts = useMemo(() => {
        const defaultText = "Dies ist eine Demonstration der Banner-Komponente";
        if (upcomingHoliday) {
            return {
                yellow: settings.yellowBannerText
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de })),
                red: settings.redBannerText
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de })),
            };
        }
        return { yellow: defaultText, red: defaultText };
    }, [upcomingHoliday, settings.yellowBannerText, settings.redBannerText]);


    useEffect(() => {
        if (dbData) {
            setSettings({
                ...initialSettings,
                ...dbData,
                blueBannerStart: dbData.blueBannerStart?.toDate(),
                blueBannerEnd: dbData.blueBannerEnd?.toDate(),
            });
        }
    }, [dbData]);

    const handleInputChange = (field: keyof BannerSettings, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!settingsDocRef) return;
        setNotification(null);
        try {
            await setDoc(settingsDocRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
            setNotification({ variant: 'success', title: 'Erfolgreich', description: 'Die Banner-Einstellungen wurden gespeichert.' });
        } catch (e: any) {
            setNotification({ variant: 'destructive', title: 'Fehler', description: `Speichern fehlgeschlagen: ${e.message}` });
        }
    };
    
    if (isLoading || isLoadingHolidays) {
        return (
            <div className="flex flex-1 items-start p-4 sm:p-6">
                <Card className="w-full">
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-5 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (dbError) {
        return (
             <div className="flex flex-1 items-start p-4 sm:p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Datenbankfehler</AlertTitle>
                    <AlertDescription>{dbError.message}</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col items-start gap-6 p-4 sm:p-6">
            <div className="flex items-center justify-between w-full">
                <div>
                    <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">Banner anpassen</h1>
                    <p className="text-muted-foreground">Hier können Sie den Text und die Anzeige der Banner steuern.</p>
                </div>
                <Button onClick={handleSave}>
                    <Save className="mr-2" />
                    Einstellungen speichern
                </Button>
            </div>

            {notification && (
                <TimedAlert
                    variant={notification.variant}
                    title={notification.title}
                    description={notification.description}
                    onClose={() => setNotification(null)}
                    className="w-full"
                />
            )}

            <div className="w-full space-y-6">
                 {/* Blue Banner */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-500">Info-Banner (Blau)</CardTitle>
                        <CardDescription>Für benutzerdefinierte Ankündigungen. Wird nur im angegebenen Zeitraum angezeigt.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center space-x-2">
                            <Switch
                                id="isBlueBannerActive"
                                checked={settings.isBlueBannerActive}
                                onCheckedChange={(checked) => handleInputChange('isBlueBannerActive', checked)}
                            />
                            <Label htmlFor="isBlueBannerActive">Blaues Banner aktiv</Label>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="blueBannerText">Bannertext</Label>
                            <Textarea
                                id="blueBannerText"
                                value={settings.blueBannerText}
                                onChange={(e) => handleInputChange('blueBannerText', e.target.value)}
                                rows={4}
                            />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="blueBannerStart">Startdatum</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !settings.blueBannerStart && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {settings.blueBannerStart ? format(settings.blueBannerStart, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={settings.blueBannerStart}
                                        onSelect={(date) => handleInputChange('blueBannerStart', date)}
                                        initialFocus
                                        locale={de}
                                    />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="blueBannerEnd">Enddatum</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('w-full justify-start text-left font-normal', !settings.blueBannerEnd && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {settings.blueBannerEnd ? format(settings.blueBannerEnd, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={settings.blueBannerEnd}
                                        onSelect={(date) => handleInputChange('blueBannerEnd', date)}
                                        initialFocus
                                        locale={de}
                                    />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <BannerPreview text={settings.blueBannerText} color="blue" separatorStyle={settings.separatorStyle} />
                    </CardContent>
                </Card>

                {/* Yellow Banner */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-yellow-500">Vorankündigungs-Banner (Gelb)</CardTitle>
                        <CardDescription>Wird eine bestimmte Anzahl Tage vor den Praxisferien angezeigt.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="preHolidayDays">Wie viele Tage vorher anzeigen?</Label>
                            <Input
                                id="preHolidayDays"
                                type="number"
                                value={settings.preHolidayDays}
                                onChange={(e) => handleInputChange('preHolidayDays', parseInt(e.target.value, 10))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="yellowBannerText">Bannertext</Label>
                            <Textarea
                                id="yellowBannerText"
                                value={settings.yellowBannerText}
                                onChange={(e) => handleInputChange('yellowBannerText', e.target.value)}
                                rows={4}
                            />
                             <p className="text-xs text-muted-foreground">Platzhalter: `{'`{start}`'}` und `{'`{end}`'}` werden automatisch ersetzt.</p>
                        </div>
                        <BannerPreview text={previewTexts.yellow} color="yellow" separatorStyle={settings.separatorStyle} />
                    </CardContent>
                </Card>

                {/* Red Banner */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-500">Ferien-Banner (Rot)</CardTitle>
                        <CardDescription>Wird während der Praxisferien angezeigt.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                            <Label htmlFor="redBannerText">Bannertext</Label>
                            <Textarea
                                id="redBannerText"
                                value={settings.redBannerText}
                                onChange={(e) => handleInputChange('redBannerText', e.target.value)}
                                rows={4}
                            />
                             <p className="text-xs text-muted-foreground">Platzhalter: `{'`{start}`'}` und `{'`{end}`'}` werden automatisch ersetzt.</p>
                        </div>
                        <BannerPreview text={previewTexts.red} color="red" separatorStyle={settings.separatorStyle} />
                    </CardContent>
                </Card>
                
                {/* Separator Style */}
                <Card>
                    <CardHeader>
                        <CardTitle>Laufband-Trennzeichen</CardTitle>
                        <CardDescription>Wählen Sie das Trennzeichen, das im Laufband zwischen den Texten angezeigt wird.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="max-w-xs">
                             <Select
                                value={settings.separatorStyle || 'diamonds'}
                                onValueChange={(value: BannerSettings['separatorStyle']) => handleInputChange('separatorStyle', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Stil wählen..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="diamonds">Drei Rauten</SelectItem>
                                    <SelectItem value="spaces">Nur Leerzeichen</SelectItem>
                                    <SelectItem value="equals">Gleichheitszeichen</SelectItem>
                                    <SelectItem value="dashes">Lange Spiegelstriche</SelectItem>
                                    <SelectItem value="plus">Pluszeichen</SelectItem>
                                    <SelectItem value="asterisks">Sternchen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
