'use client';

import { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import holidays from '@/lib/holidays.json';
import { format, addDays, differenceInDays } from 'date-fns';
import { de } from 'date-fns/locale';

interface Holiday {
    name: string;
    start: string;
    end: string;
}

function formatDate(date: Date): string {
    return format(date, 'd. MMMM yyyy', { locale: de });
}

export function HolidayBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);

    useEffect(() => {
        const now = new Date();
        const upcomingHoliday = holidays
            .map(h => ({ ...h, startDate: new Date(h.start) }))
            .filter(h => h.startDate >= now && differenceInDays(h.startDate, now) <= 30)
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())[0];

        if (upcomingHoliday) {
            setActiveHoliday(upcomingHoliday);
            
            const storedState = localStorage.getItem(`holidayBanner-${upcomingHoliday.name}`);
            if (storedState !== 'closed') {
                setIsVisible(true);
            }
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        if (activeHoliday) {
            localStorage.setItem(`holidayBanner-${activeHoliday.name}`, 'closed');
        }
    };

    if (!isVisible || !activeHoliday) {
        return null;
    }

    const startDate = new Date(activeHoliday.start);
    const endDate = new Date(activeHoliday.end);
    const dayAfterEnd = addDays(endDate, 1);

    const text = `Ferienhalber bleibt das Praxiszentrum vom ${formatDate(startDate)} bis ${formatDate(endDate)} geschlossen. Nach den ${activeHoliday.name} sind wir ab dem ${formatDate(dayAfterEnd)} wieder wie gewohnt für Sie erreichbar. Die Notfall-Telefonnummern finden sie im Menü unter dem Punkt NOTFALL.`;

    return (
        <div className="relative flex items-center justify-between overflow-hidden bg-destructive/30 px-4 py-2 text-destructive-foreground">
            <Megaphone className="h-6 w-6 flex-shrink-0 text-destructive" />
            <div className="relative flex-1 overflow-hidden whitespace-nowrap">
                <p className="marquee absolute text-sm font-bold text-destructive">
                    {text}
                </p>
            </div>
            <button onClick={handleClose} className="ml-4 p-1 text-destructive hover:opacity-80">
                <X className="h-5 w-5" />
                <span className="sr-only">Schliessen</span>
            </button>
        </div>
    );
}
