'use client';

import { useState, useEffect } from 'react';
import holidays from '@/lib/holidays.json';
import { format, addDays, differenceInDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Holiday {
    name: string;
    start: string;
    end: string;
}

interface BannerInfo {
    text: string;
    type: 'warning' | 'info';
}

function formatDate(date: Date): string {
    return format(date, 'd. MMMM yyyy', { locale: de });
}

export function HolidayBanner() {
    const [bannerInfo, setBannerInfo] = useState<BannerInfo | null>(null);

    useEffect(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); 

        let activeBanner: BannerInfo | null = null;

        for (const holiday of holidays) {
            const startDate = new Date(holiday.start);
            const endDate = new Date(holiday.end);
            // Adjust dates to be timezone-independent by considering them as UTC
            const zonedStartDate = new Date(startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000);
            const zonedEndDate = new Date(endDate.valueOf() + endDate.getTimezoneOffset() * 60 * 1000);

            zonedStartDate.setHours(0,0,0,0);
            zonedEndDate.setHours(23,59,59,999);

            if (isWithinInterval(now, { start: zonedStartDate, end: zonedEndDate })) {
                const dayAfterEnd = addDays(zonedEndDate, 1);
                activeBanner = {
                    text: `Ferienhalber bleibt das Praxiszentrum vom ${formatDate(zonedStartDate)} bis ${formatDate(zonedEndDate)} geschlossen. Nach den ${holiday.name} sind wir ab dem ${formatDate(dayAfterEnd)} wieder wie gewohnt für Sie erreichbar. Die Notfall-Telefonnummern finden Sie im Menü unter dem Punkt NOTFALL.`,
                    type: 'info',
                };
                break; 
            }

            const diff = differenceInDays(zonedStartDate, now);
            if (diff >= 0 && diff <= 14) {
                 activeBanner = {
                    text: `Liebe Patienten, vom ${formatDate(zonedStartDate)} bis ${formatDate(zonedEndDate)} bleibt das Praxiszentrum ferienhalber geschlossen. Bitte beziehen Sie allenfalls benötigte Medikamente noch rechtzeitig vorher.`,
                    type: 'warning',
                };
                break;
            }
        }
        
        setBannerInfo(activeBanner);

    }, []);

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
