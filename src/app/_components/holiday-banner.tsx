'use client';

import { useState, useEffect } from 'react';
import { format, addDays, differenceInDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';

interface Holiday {
    name: string;
    start: Date;
    end: Date;
}

interface BannerInfo {
    text: string;
    type: 'warning' | 'info';
}

function formatDate(date: Date): string {
    // Da die Daten von Firestore bereits als Date-Objekte kommen, ist keine manuelle Zeitzonenkorrektur mehr nötig.
    return format(date, 'd. MMMM yyyy', { locale: de });
}

export function HolidayBanner() {
    const firestore = useFirestore();
    const [bannerInfo, setBannerInfo] = useState<BannerInfo | null>(null);

    const twoWeeksFromNow = addDays(new Date(), 14);

    const holidaysQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        // Query für Ferien, die entweder jetzt aktiv sind oder in den nächsten 14 Tagen beginnen.
        return query(
            collection(firestore, 'holidays'),
            where('end', '>=', new Date()), // Nur zukünftige oder aktuelle Ferien
            orderBy('end', 'asc')
        );
    }, [firestore]);

    const { data: holidays, isLoading } = useCollection<Holiday>(holidaysQuery);

    useEffect(() => {
        if (isLoading || !holidays) {
            return;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0); 

        let activeBanner: BannerInfo | null = null;
        
        // Da die Query bereits vorsortiert ist (nach Enddatum), nehmen wir den relevantesten Eintrag.
        // Wir sortieren hier nochmals nach Startdatum, um den *nächsten* Beginn zu finden.
        const sortedHolidays = [...holidays].sort((a, b) => a.start.getTime() - b.start.getTime());

        for (const holiday of sortedHolidays) {
            const startDate = holiday.start;
            const endDate = holiday.end;
            
            // Setze Stunden auf definierte Werte, um reine Datumsvergleiche zu gewährleisten.
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            // Prüfung 1: Sind wir aktuell in den Ferien?
            if (isWithinInterval(now, { start: startDate, end: endDate })) {
                const dayAfterEnd = addDays(endDate, 1);
                dayAfterEnd.setHours(0, 0, 0, 0);
                activeBanner = {
                    text: `Ferienhalber bleibt das Praxiszentrum vom ${formatDate(startDate)} bis ${formatDate(endDate)} geschlossen. Nach den ${holiday.name} sind wir ab dem ${formatDate(dayAfterEnd)} wieder wie gewohnt für Sie erreichbar. Die Notfall-Telefonnummern finden Sie im Menü unter dem Punkt NOTFALL.`,
                    type: 'info',
                };
                break; // Wichtigste Meldung, keine weitere Prüfung nötig
            }

            // Prüfung 2: Stehen die Ferien kurz bevor (innerhalb der nächsten 14 Tage)?
            const diff = differenceInDays(startDate, now);
            if (diff >= 0 && diff <= 14) {
                 activeBanner = {
                    text: `Liebe Patienten, vom ${formatDate(startDate)} bis ${formatDate(endDate)} bleibt das Praxiszentrum ferienhalber geschlossen. Bitte beziehen Sie allenfalls benötigte Medikamente noch rechtzeitig vorher.`,
                    type: 'warning',
                };
                break; // Nächstwichtigste Meldung, keine weitere Prüfung nötig
            }
        }
        
        setBannerInfo(activeBanner);

    }, [holidays, isLoading]);

    if (!bannerInfo) {
        return null;
    }

    const separator = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♦&nbsp;&nbsp;♦&nbsp;&nbsp;♦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return (
        <div className={cn(
            "relative flex h-auto min-h-[4.5rem] items-center gap-4 overflow-hidden py-1",
            bannerInfo.type === 'warning' ? 'bg-yellow-400/80' : 'bg-destructive/80'
        )}>
            <div className="flex-1 overflow-hidden">
                <div className={cn(
                    "marquee flex w-max items-center whitespace-nowrap text-3xl font-bold py-2",
                     bannerInfo.type === 'warning' ? 'text-black' : 'text-destructive-foreground'
                )}>
                    <span>
                        {bannerInfo.text} {separator}
                    </span>
                    <span className="pl-4">
                        {bannerInfo.text} {separator}
                    </span>
                </div>
            </div>
        </div>
    );
}
