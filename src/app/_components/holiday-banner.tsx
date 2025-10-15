
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { format, differenceInDays, isWithinInterval, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { X, Info } from 'lucide-react';

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

interface HolidayBannerSettings {
    preHolidayDays: number;
    yellowBannerText: string;
    redBannerText: string;
    yellowBannerSeparatorStyle?: SeparatorStyle;
    redBannerSeparatorStyle?: SeparatorStyle;
}

interface InfoBanner {
    id: string;
    text: string;
    start?: Timestamp;
    end?: Timestamp;
    separatorStyle?: SeparatorStyle;
}

interface BannerInfo {
  text: string;
  color: 'yellow' | 'red' | 'blue';
  separatorStyle: SeparatorStyle;
}

function getActiveBanner(holidays: Holiday[], holidaySettings: HolidayBannerSettings | null, infoBanners: InfoBanner[] | null): BannerInfo | null {
  const now = new Date();
  
  // Check for active Blue Banner first
  if (infoBanners) {
      const activeInfoBanner = infoBanners.find(b => 
          b.start && 
          b.end && 
          isWithinInterval(now, { start: b.start.toDate(), end: b.end.toDate() })
      );
      if (activeInfoBanner) {
          return { text: activeInfoBanner.text, color: 'blue', separatorStyle: activeInfoBanner.separatorStyle || 'diamonds' };
      }
  }
  
  if (!holidays || holidays.length === 0 || !holidaySettings) return null;

  const upcomingHoliday = holidays.find(h => h.start > now);
  const currentHoliday = holidays.find(h => isWithinInterval(now, { start: h.start, end: h.end }));
  const nextDayAfterHoliday = currentHoliday ? addDays(currentHoliday.end, 1) : null;

  // Red Banner (during holidays)
  if (currentHoliday && nextDayAfterHoliday) {
    const text = holidaySettings.redBannerText
      .replace('{start}', format(currentHoliday.start, 'd. MMMM', { locale: de }))
      .replace('{end}', format(currentHoliday.end, 'd. MMMM yyyy', { locale: de }))
      .replace('{next_day}', format(nextDayAfterHoliday, 'd. MMMM', { locale: de }));
    return { text, color: 'red', separatorStyle: holidaySettings.redBannerSeparatorStyle || 'diamonds' };
  }

  // Yellow Banner (before holidays)
  if (upcomingHoliday) {
    const daysUntilStart = differenceInDays(upcomingHoliday.start, now);
    if (daysUntilStart >= 0 && daysUntilStart <= holidaySettings.preHolidayDays) {
      const text = holidaySettings.yellowBannerText
        .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
        .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de }))
        .replace('{name}', upcomingHoliday.name);
      return { text, color: 'yellow', separatorStyle: holidaySettings.yellowBannerSeparatorStyle || 'diamonds' };
    }
  }

  return null;
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
    const firestore = useFirestore();

    const holidaySettingsDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'settings', 'banners') : null, [firestore]);
    const { data: holidaySettingsData } = useDoc<HolidayBannerSettings>(holidaySettingsDocRef);
    
    const infoBannersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'infoBanners')) : null, [firestore]);
    const { data: infoBannersData } = useCollection<InfoBanner>(infoBannersQuery);

    const holidaysQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return query(collection(firestore, 'holidays'), where('end', '>=', Timestamp.fromDate(today)), orderBy('end', 'asc'));
    }, [firestore]);
    const { data: holidaysData } = useCollection<any>(holidaysQuery);

    const holidays: Holiday[] = useMemo(() => {
        if (!holidaysData) return [];
        return holidaysData.map(h => ({ ...h, start: h.start.toDate(), end: h.end.toDate() })).sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [holidaysData]);
    
    const bannerInfo = getActiveBanner(holidays, holidaySettingsData, infoBannersData);
    
    useEffect(() => { if(bannerInfo) { setIsVisible(true); } }, [bannerInfo]);

    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState('60s');

    useEffect(() => {
        if (marqueeRef.current) {
            const contentWidth = marqueeRef.current.scrollWidth / 2; // We have 2 copies of the content
            const speed = 50; // pixels per second
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
                    style={{ animationDuration }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <p className="whitespace-nowrap text-sm font-semibold">{bannerInfo.text}</p>
                            <Separator style={bannerInfo.separatorStyle} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <button onClick={() => setIsVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-label="Banner schliessen"><X className="h-5 w-5" /></button>
        </div>
    );
}
