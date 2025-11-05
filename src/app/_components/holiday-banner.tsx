
/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, Timestamp } from 'firebase/firestore';
import { format, addDays, differenceInDays, isWithinInterval } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// --- Helper Components & Types ---

const FilledDiamond = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
);

type SeparatorStyle = 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';

const SeparatorPreview: React.FC<{ style?: SeparatorStyle }> = ({ style }) => {
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

const BannerMarquee: React.FC<{ text: string; separatorStyle?: SeparatorStyle; }> = ({ text, separatorStyle }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState('60s');

     useEffect(() => {
        if (marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2;
            const speed = 50; 
            const duration = contentWidth / speed;
            setAnimationDuration(`${duration}s`);
        }
    }, [text, separatorStyle]);

    return (
        <div 
            className="flex min-w-full shrink-0 items-center justify-around marquee"
            ref={marqueeRef}
            style={{ ['--animation-duration' as any]: animationDuration }}
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <React.Fragment key={i}>
                    <p className="whitespace-nowrap font-semibold text-xl">{text}</p>
                    <SeparatorPreview style={separatorStyle} />
                </React.Fragment>
            ))}
        </div>
    );
}


// --- Firestore Data Types ---

interface Holiday {
  id: string;
  name: string;
  start: Date;
  end: Date;
}
interface HolidayFromDB {
  id: string;
  name: string;
  start: Timestamp;
  end: Timestamp;
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
interface BannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    redBannerText: string;
    yellowBannerText_en?: string;
    redBannerText_en?: string;
    yellowBannerSeparatorStyle?: SeparatorStyle;
    redBannerSeparatorStyle?: SeparatorStyle;
}

// --- Main Banner Logic ---

export function HolidayBanner({ isEnglish }: { isEnglish: boolean }) {
    const firestore = useFirestore();
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const settingsDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'settings', 'banners') : null, [firestore]);
    const { data: settings, isLoading: isLoadingSettings, error: settingsError } = useDoc<BannerSettings>(settingsDocRef);
    
    const holidaysQuery = useMemoFirebase(() => {
        if (!firestore || !now) return null;
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        return query(collection(firestore, 'holidays'), where('end', '>=', today));
    }, [firestore, now]);
    const { data: holidaysData, isLoading: isLoadingHolidays, error: holidaysError } = useCollection<HolidayFromDB>(holidaysQuery);

    const infoBannersQuery = useMemoFirebase(() => {
        if (!firestore || !now) return null;
        return query(collection(firestore, 'infoBanners'), where('start', '<=', now));
    }, [firestore, now]);
    const { data: infoBannersData, isLoading: isLoadingInfoBanners, error: infoBannersError } = useCollection<InfoBannerFromDB>(infoBannersQuery);

    const activeInfoBanner = useMemo(() => {
        if (!infoBannersData || !now) return null;
        const active = infoBannersData
            .map(b => ({ ...b, start: b.start.toDate(), end: b.end.toDate() }))
            .find(b => isWithinInterval(now, { start: b.start, end: b.end }));
        return active || null;
    }, [infoBannersData, now]);
    
    const nextHoliday = useMemo((): Holiday | null => {
        if (!holidaysData) return null;
        const sortedHolidays = holidaysData
            .map(h => ({ ...h, start: h.start.toDate(), end: h.end.toDate() }))
            .sort((a, b) => a.start.getTime() - b.start.getTime());
        return sortedHolidays[0] || null;
    }, [holidaysData]);


    const bannerToDisplay = useMemo(() => {
        if (!now) return null;
        
        const locale = isEnglish ? enUS : de;
        const dateFormat = isEnglish ? 'MMMM d, yyyy' : 'd. MMMM yyyy';

        if (activeInfoBanner) {
            return {
                text: isEnglish ? activeInfoBanner.text_en || activeInfoBanner.text : activeInfoBanner.text,
                color: 'gray',
                separatorStyle: activeInfoBanner.separatorStyle,
            };
        }

        if (!nextHoliday || !settings) return null;

        const isInHoliday = isWithinInterval(now, { start: nextHoliday.start, end: nextHoliday.end });
        const daysUntilHoliday = differenceInDays(nextHoliday.start, now);

        const formatFullDate = (date: Date) => format(date, dateFormat, { locale });
        
        const placeholders = {
            '{name}': nextHoliday.name,
            '{start}': formatFullDate(nextHoliday.start),
            '{start-1}': formatFullDate(addDays(nextHoliday.start, -1)),
            '{ende}': formatFullDate(nextHoliday.end),
            '{ende+1}': formatFullDate(addDays(nextHoliday.end, 1)),
            '{ende+2}': formatFullDate(addDays(nextHoliday.end, 2)),
            '{ende+3}': formatFullDate(addDays(nextHoliday.end, 3)),
        };
        
        const yellowText = isEnglish ? settings.yellowBannerText_en || settings.yellowBannerText : settings.yellowBannerText;
        const redText = isEnglish ? settings.redBannerText_en || settings.redBannerText : settings.redBannerText;


        const replacePlaceholders = (text: string) => {
            return Object.entries(placeholders).reduce((acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value), text);
        };

        if (isInHoliday) {
            return {
                text: replacePlaceholders(redText),
                color: 'red',
                separatorStyle: settings.redBannerSeparatorStyle,
            };
        }

        if (daysUntilHoliday >= 0 && daysUntilHoliday <= settings.preHolidayDays) {
            return {
                text: replacePlaceholders(yellowText),
                color: 'yellow',
                separatorStyle: settings.yellowBannerSeparatorStyle,
            };
        }

        return null;

    }, [activeInfoBanner, nextHoliday, settings, now, isEnglish]);

    const isLoading = isLoadingSettings || isLoadingHolidays || isLoadingInfoBanners || !now;
    const hasError = settingsError || holidaysError || infoBannersError;

    if (isLoading && !hasError) {
        return <Skeleton className="h-12 w-full" />;
    }
    
    if (hasError || !bannerToDisplay) {
        return null;
    }

    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        gray: 'bg-gradient-to-b from-secondary to-accent text-primary-foreground',
    };

    return (
        <div className={cn("relative w-full border-y", bannerClasses[bannerToDisplay.color as keyof typeof bannerClasses])}>
             <div className="flex h-12 w-full items-center overflow-hidden">
                <BannerMarquee text={bannerToDisplay.text} separatorStyle={bannerToDisplay.separatorStyle} />
            </div>
        </div>
    );
}
