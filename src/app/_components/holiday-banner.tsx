
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { format, differenceInDays, isWithinInterval, addDays, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, Timestamp } from 'firebase/firestore';
import type { Holiday as HolidayData, BannerSettings, InfoBanner as InfoBannerData } from '@/docs/backend-types';


const FilledDiamond = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
);

type SeparatorStyle = 'diamonds' | 'spaces' | 'equals' | 'dashes' | 'plus' | 'asterisks';

interface BannerInfo {
  text: string;
  color: 'yellow' | 'red' | 'blue';
  separatorStyle: SeparatorStyle;
}


const Separator = ({ style }: { style: SeparatorStyle }) => {
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

interface Holiday extends HolidayData {
    start: Date;
    end: Date;
}

interface InfoBanner extends InfoBannerData {
    start: Date;
    end: Date;
}

interface InfoBannerFromDB extends Omit<InfoBanner, 'start' | 'end'> {
    start: Timestamp;
    end: Timestamp;
}

const formatDate = (date: Date, pattern: string = 'd. MMM yyyy') => format(date, pattern, { locale: de });


export function HolidayBanner() {
    const [bannerInfo, setBannerInfo] = useState<BannerInfo | null>(null);
    const firestore = useFirestore();

    const bannerSettingsDoc = useMemoFirebase(() => firestore ? doc(firestore, 'settings', 'banners') : null, [firestore]);
    const holidaysQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'holidays')) : null, [firestore]);
    const infoBannersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'infoBanners'), where('end', '>=', new Date())) : null, [firestore]);

    const { data: bannerSettings, error: bannerSettingsError } = useDoc<BannerSettings>(bannerSettingsDoc);
    const { data: holidaysData, error: holidaysError } = useCollection<HolidayData & { start: Timestamp, end: Timestamp }>(holidaysQuery);
    const { data: infoBannersData, error: infoBannersError } = useCollection<InfoBannerFromDB>(infoBannersQuery);

    const holidays = useMemo<Holiday[]>(() => {
        if (!holidaysData) return [];
        return holidaysData.map(h => ({ ...h, start: h.start.toDate(), end: h.end.toDate() }));
    }, [holidaysData]);

    const infoBanners = useMemo<InfoBanner[]>(() => {
        if (!infoBannersData) return [];
        return infoBannersData.map(b => ({ ...b, start: b.start.toDate(), end: b.end.toDate() }));
    }, [infoBannersData]);

    useEffect(() => {
        if (bannerSettingsError || holidaysError || infoBannersError) {
          console.error("Fehler beim Laden der Banner-Daten:", { bannerSettingsError, holidaysError, infoBannersError });
          setBannerInfo(null);
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check for custom info banners first
        const activeInfoBanner = infoBanners.find(banner => isWithinInterval(today, { start: banner.start, end: banner.end }));
        if (activeInfoBanner) {
            setBannerInfo({
                text: activeInfoBanner.text,
                color: 'blue',
                separatorStyle: activeInfoBanner.separatorStyle || 'diamonds',
            });
            return;
        }

        if (!holidays.length || !bannerSettings) {
            setBannerInfo(null);
            return;
        };

        for (const holiday of holidays) {
            const preHolidayStart = subDays(holiday.start, bannerSettings.preHolidayDays);

            // Check if today is during a holiday
            if (isWithinInterval(today, { start: holiday.start, end: holiday.end })) {
                const redText = bannerSettings.redBannerText
                    .replace('{name}', holiday.name)
                    .replace('{start}', formatDate(holiday.start))
                    .replace('{ende}', formatDate(holiday.end))
                    .replace('{ende+1}', formatDate(addDays(holiday.end, 1)))
                    .replace('{ende+2}', formatDate(addDays(holiday.end, 2)))
                    .replace('{ende+3}', formatDate(addDays(holiday.end, 3)));
                
                setBannerInfo({ text: redText, color: 'red', separatorStyle: bannerSettings.redBannerSeparatorStyle || 'diamonds' });
                return;
            }

            // Check if today is in the pre-holiday period
            if (isWithinInterval(today, { start: preHolidayStart, end: subDays(holiday.start, 1) })) {
                 const yellowText = bannerSettings.yellowBannerText
                    .replace('{name}', holiday.name)
                    .replace('{start}', formatDate(holiday.start))
                    .replace('{start-1}', formatDate(subDays(holiday.start, 1)))
                    .replace('{ende}', formatDate(holiday.end));

                setBannerInfo({ text: yellowText, color: 'yellow', separatorStyle: bannerSettings.yellowBannerSeparatorStyle || 'diamonds' });
                return;
            }
        }
        
        // If no active banners, set to null
        setBannerInfo(null);

    }, [holidays, bannerSettings, infoBanners, bannerSettingsError, holidaysError, infoBannersError]);


    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState('60s');

    useEffect(() => {
        if (marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2;
            const speed = 50; 
            const duration = contentWidth / speed;
            setAnimationDuration(`${duration}s`);
        }
    }, [bannerInfo?.text, bannerInfo?.separatorStyle]);

    if (!bannerInfo) return null;

    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-gradient-to-b from-secondary to-accent border-accent-foreground/20 text-primary-foreground',
    };

    return (
        <div className={cn("relative w-full border-b", bannerClasses[bannerInfo.color])}>
            <div className="flex h-12 w-full items-center overflow-hidden">
                <div 
                    className="marquee flex min-w-full shrink-0 items-center justify-around"
                    ref={marqueeRef}
                    style={{ '--animation-duration': animationDuration } as React.CSSProperties}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <p className="whitespace-nowrap text-lg font-semibold">{bannerInfo.text}</p>
                            <Separator style={bannerInfo.separatorStyle} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
