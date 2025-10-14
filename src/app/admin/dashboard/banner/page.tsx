
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save, AlertCircle, Info, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


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
    isBlueBannerActive: boolean;
    blueBannerText: string;
    blueBannerStart?: Date;
    blueBannerEnd?: Date;
    blueBannerSeparatorStyle?: SeparatorStyle;
    yellowBannerSeparatorStyle?: SeparatorStyle;
    redBannerSeparatorStyle?: SeparatorStyle;
}

const initialSettings: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Die <Name nächste Ferien> stehen bevor. In der Zeit vom <erster Ferientag> bis und mit <letzer Ferientag> bleibt das Praxiszentrum geschlossen. Bitte überprüfen Sie Ihren Medikamentenvorrat und beziehen Sie allenfalls nötigen Nachschub rechtzeitig.',
    redBannerText: 'Ferienhalber bleibt das Praxiszentrum in der Zeit vom <erster Ferientag> bis und mit <letzter Ferientag> geschlossen. Die Notfall-Notrufnummern finden sie rechts oben im Menü unter dem Punkt "NOTFALL". Ab dem <letzter Ferientag +1> stehen wieder wie gewohnt zur Verfügung.',
    isBlueBannerActive: false,
    blueBannerText: 'Wichtige Information: ',
    blueBannerStart: undefined,
    blueBannerEnd: undefined,
    blueBannerSeparatorStyle: 'diamonds',
    yellowBannerSeparatorStyle: 'diamonds',
    redBannerSeparatorStyle: 'diamonds',
};

const SeparatorPreview = ({ style }: { style?: SeparatorStyle }) => {
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
                    <FilledDiamond className="h-3 w-3" />
                    <FilledDiamond className="h-3 w-3" />
                    <FilledDiamond className="h-3 w-3" />
                </div>
            );
    }
};

const BannerPreview = ({ text, color, separatorStyle }: { text: string; color: 'yellow' | 'red' | 'blue'; separatorStyle?: SeparatorStyle }) => {
    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-blue-500 border-blue-600 text-white',
    };

    return (
         <div className={cn("relative w-full border rounded-lg mt-8", bannerClasses[color])}>
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
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Stil wählen..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value} className="h-8">{opt.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
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
                id: h.id,
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
            const nextDay = addDays(upcomingHoliday.end, 1);
            return {
                yellow: settings.yellowBannerText
                    .replace('{name}', upcomingHoliday.name)
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de })),
                red: settings.redBannerText
                    .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
                    .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de }))
                    .replace('{next_day}', format(nextDay, 'd. MMMM', { locale: de })),
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
        <TooltipProvider>
            <div className="flex flex-1 flex-col items-center gap-6 p-4 sm:p-6">
                <div className="w-full max-w-5xl">
                    <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">Banner anpassen</h1>
                    <p className="text-muted-foreground">Hier können Sie den Text und die Anzeige der Banner steuern.</p>
                </div>

                {notification && (
                    <div className="w-full max-w-5xl">
                        <TimedAlert
                            variant={notification.variant}
                            title={notification.title}
                            description={notification.description}
                            onClose={() => setNotification(null)}
                            className="w-full"
                        />
                    </div>
                )}

                <div className="w-full max-w-5xl space-y-6">
                    {/* Blue Banner */}
                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <h3 className="text-blue-500 font-bold text-lg">Info-Banner (Blau)</h3>
                            <p className="text-muted-foreground text-sm">Für benutzerdefinierte Ankündigungen. Wird nur im angegebenen Zeitraum angezeigt.</p>
                        </div>
                        <div className="space-y-4 bg-background p-6 rounded-b-lg">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="flex items-end gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label>Trennzeichen-Stil</Label>
                                    <SeparatorSelect 
                                        value={settings.blueBannerSeparatorStyle} 
                                        onValueChange={(value) => handleInputChange('blueBannerSeparatorStyle', value)} 
                                    />
                                </div>
                                <Button onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Speichern
                                </Button>
                            </div>
                            <BannerPreview text={settings.blueBannerText} color="blue" separatorStyle={settings.blueBannerSeparatorStyle} />
                        </div>
                    </div>

                    {/* Yellow Banner */}
                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <h3 className="text-yellow-500 font-bold text-lg">Vorankündigungs-Banner (Gelb)</h3>
                            <p className="text-muted-foreground text-sm">Wird eine bestimmte Anzahl Tage vor den Praxisferien angezeigt.</p>
                        </div>
                        <div className="space-y-4 bg-background p-6 rounded-b-lg">
                            <div className="space-y-2">
                                <Label htmlFor="preHolidayDays">Wie viele Tage vorher anzeigen?</Label>
                                <Input
                                    id="preHolidayDays"
                                    type="number"
                                    className="w-24"
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
                            </div>
                            <div className="flex items-end gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label>Trennzeichen-Stil</Label>
                                    <SeparatorSelect 
                                        value={settings.yellowBannerSeparatorStyle} 
                                        onValueChange={(value) => handleInputChange('yellowBannerSeparatorStyle', value)} 
                                    />
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button variant="secondary" onClick={() => handleInputChange('yellowBannerText', initialSettings.yellowBannerText)}>
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Standardtext
                                    </Button>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="cursor-help">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{initialSettings.yellowBannerText.replace('{name}', 'Name nächste Ferien').replace('{start}', 'erster Ferientag').replace('{end}', 'letzer Ferientag')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <Button onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Speichern
                                </Button>
                            </div>
                            <BannerPreview text={previewTexts.yellow} color="yellow" separatorStyle={settings.yellowBannerSeparatorStyle} />
                        </div>
                    </div>

                    {/* Red Banner */}
                    <div className="border-2 border-accent rounded-lg">
                        <div className="p-6">
                            <h3 className="text-red-500 font-bold text-lg">Ferien-Banner (Rot)</h3>
                            <p className="text-muted-foreground text-sm">Wird während der Praxisferien angezeigt.</p>
                        </div>
                        <div className="space-y-4 bg-background p-6 rounded-b-lg">
                        <div className="space-y-2">
                                <Label htmlFor="redBannerText">Bannertext</Label>
                                <Textarea
                                    id="redBannerText"
                                    value={settings.redBannerText}
                                    onChange={(e) => handleInputChange('redBannerText', e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <div className="flex items-end gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label>Trennzeichen-Stil</Label>
                                    <SeparatorSelect 
                                        value={settings.redBannerSeparatorStyle} 
                                        onValueChange={(value) => handleInputChange('redBannerSeparatorStyle', value)} 
                                    />
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button variant="secondary" onClick={() => handleInputChange('redBannerText', initialSettings.redBannerText)}>
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Standardtext
                                    </Button>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="cursor-help">
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{initialSettings.redBannerText.replace('{start}', 'erster Ferientag').replace('{end}', 'letzter Ferientag').replace('{next_day}', 'letzter Ferientag +1')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <Button onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Speichern
                                </Button>
                            </div>
                            <BannerPreview text={previewTexts.red} color="red" separatorStyle={settings.redBannerSeparatorStyle} />
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}

    