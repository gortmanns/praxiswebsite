
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { format, differenceInDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { X, Info } from 'lucide-react';

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
}

interface BannerInfo {
  text: string;
  color: 'yellow' | 'red' | 'blue';
}

function getActiveBanner(holidays: Holiday[], settings: BannerSettings | null): BannerInfo | null {
  const now = new Date();
  
  if (!settings) return null;

  // Check for Blue Banner first
  if (settings.isBlueBannerActive && settings.blueBannerStart && settings.blueBannerEnd) {
    if (isWithinInterval(now, { start: settings.blueBannerStart, end: settings.blueBannerEnd })) {
      return { text: settings.blueBannerText, color: 'blue' };
    }
  }
  
  if (!holidays || holidays.length === 0) return null;

  const upcomingHoliday = holidays.find(h => h.start > now);
  const currentHoliday = holidays.find(h => isWithinInterval(now, { start: h.start, end: h.end }));

  // Red Banner (during holidays)
  if (currentHoliday) {
    const text = settings.redBannerText
      .replace('{start}', format(currentHoliday.start, 'd. MMMM', { locale: de }))
      .replace('{end}', format(currentHoliday.end, 'd. MMMM yyyy', { locale: de }));
    return { text, color: 'red' };
  }

  // Yellow Banner (before holidays)
  if (upcomingHoliday) {
    const daysUntilStart = differenceInDays(upcomingHoliday.start, now);
    if (daysUntilStart >= 0 && daysUntilStart <= settings.preHolidayDays) {
      const text = settings.yellowBannerText
        .replace('{start}', format(upcomingHoliday.start, 'd. MMMM', { locale: de }))
        .replace('{end}', format(upcomingHoliday.end, 'd. MMMM yyyy', { locale: de }));
      return { text, color: 'yellow' };
    }
  }

  return null;
}

export function HolidayBanner() {
    const [isVisible, setIsVisible] = useState(true);
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

    const { data: settingsData } = useDoc<any>(settingsDocRef);
    const { data: holidaysData } = useCollection<any>(holidaysQuery);

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

    const settings: BannerSettings | null = useMemo(() => {
        if (!settingsData) return null;
        return {
            ...settingsData,
            blueBannerStart: settingsData.blueBannerStart?.toDate(),
            blueBannerEnd: settingsData.blueBannerEnd?.toDate(),
        };
    }, [settingsData]);
    
    const bannerInfo = getActiveBanner(holidays, settings);
    
    useEffect(() => {
        // When bannerInfo changes, make it visible
        if(bannerInfo) {
            setIsVisible(true);
        }
    }, [bannerInfo]);

    if (!bannerInfo || !isVisible) {
        return null;
    }

    const bannerClasses = {
        yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
        red: 'bg-red-500 border-red-600 text-white',
        blue: 'bg-blue-500 border-blue-600 text-white',
    };

    return (
        <div className={cn("relative w-full border-b p-3", bannerClasses[bannerInfo.color])}>
            <div className="container mx-auto flex items-center justify-center text-center text-sm font-semibold">
                <Info className="mr-3 h-5 w-5 flex-shrink-0" />
                <p>{bannerInfo.text}</p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Banner schliessen"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}
