
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

interface BannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    redBannerText: string;
    isBlueBannerActive: boolean;
    blueBannerText: string;
    blueBannerStart?: Date;
    blueBannerEnd?: Date;
}

const initialSettings: BannerSettings = {
    preHolidayDays: 14,
    yellowBannerText: 'Unsere Praxis bleibt vom {start} bis und mit {end} geschlossen.',
    redBannerText: 'Unsere Praxis ist im Moment geschlossen.',
    isBlueBannerActive: false,
    blueBannerText: 'Wichtige Information: ',
    blueBannerStart: undefined,
    blueBannerEnd: undefined,
};

export default function BannerPage() {
    const firestore = useFirestore();
    const settingsDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'settings', 'banners');
    }, [firestore]);

    const { data: dbData, isLoading, error: dbError } = useDoc(settingsDocRef);
    
    const [settings, setSettings] = useState<BannerSettings>(initialSettings);
    const [notification, setNotification] = useState<TimedAlertProps | null>(null);

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
    
    if (isLoading) {
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

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Yellow Banner */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-yellow-500">Vorankündigungs-Banner (Gelb)</CardTitle>
                        <CardDescription>Wird vor den Praxisferien angezeigt.</CardDescription>
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
                             <p className="text-xs text-muted-foreground">Platzhalter: `{start}` und `{end}` werden automatisch ersetzt.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Red Banner */}
                <Card className="lg:col-span-1">
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
                             <p className="text-xs text-muted-foreground">Platzhalter: `{start}` und `{end}` werden automatisch ersetzt.</p>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Blue Banner */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-blue-500">Info-Banner (Blau)</CardTitle>
                        <CardDescription>Für benutzerdefinierte Ankündigungen.</CardDescription>
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
                                disabled={!settings.isBlueBannerActive}
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
                                        disabled={!settings.isBlueBannerActive}
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
                                        disabled={!settings.isBlueBannerActive}
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
