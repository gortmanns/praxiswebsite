
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { format, differenceInDays, isWithinInterval, addDays, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

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
    start?: Date;
    end?: Date;
    separatorStyle?: SeparatorStyle;
}

interface BannerInfo {
  text: string;
  color: 'yellow' | 'red' | 'blue';
  separatorStyle: SeparatorStyle;
}

function processPlaceholders(text: string, holiday: Holiday): string {
    return text
        .replace(/{name}/g, holiday.name)
        .replace(/{start}/g, format(holiday.start, 'd. MMMM', { locale: de }))
        .replace(/{start-1}/g, format(subDays(holiday.start, 1), 'd. MMMM', { locale: de }))
        .replace(/{ende}/g, format(holiday.end, 'd. MMMM yyyy', { locale: de }))
        .replace(/{ende\+1}/g, format(addDays(holiday.end, 1), 'd. MMMM', { locale: de }))
        .replace(/{ende\+2}/g, format(addDays(holiday.end, 2), 'd. MMMM', { locale: de }))
        .replace(/{ende\+3}/g, format(addDays(holiday.end, 3), 'd. MMMM', { locale: de }));
};


function getActiveBanner(holidays: Holiday[], holidaySettings: BannerSettings | null, infoBanners: InfoBanner[] | null): BannerInfo | null {
    return null; // Temporarily disable all banners to fix crash
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

export function HolidayBanner() {
    const [isVisible, setIsVisible] = useState(true);
    
    // Static data to avoid Firebase dependency
    const holidays: Holiday[] = [];
    const holidaySettingsData: BannerSettings | null = null;
    const infoBannersData: InfoBanner[] | null = null;
    
    const bannerInfo = getActiveBanner(holidays, holidaySettingsData, infoBannersData);
    
    useEffect(() => { if(bannerInfo) { setIsVisible(true); } }, [bannerInfo]);

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

    if (!bannerInfo || !isVisible) return null;

    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-blue-500 border-blue-600 text-white',
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
            <button onClick={() => setIsVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-label="Banner schliessen"><X className="h-5 w-5" /></button>
        </div>
    );
}
