'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = [
  {
    name: 'Montag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Dienstag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Mittwoch',
    open: [{ start: '08:00', end: '12:00', label: 'Sprechstunde' }],
  },
  {
    name: 'Donnerstag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Freitag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '13:00', end: '17:00', label: 'Sprechstunde' },
    ],
  },
];

type TimeBlock = {
  start: string;
  end: string;
  isOpen: boolean;
  label?: string;
};

export function OpeningHoursCalendar() {
    const dailyBlocks = useMemo(() => {
        return days.map(day => {
            const blocks: TimeBlock[] = [];
            timeSlots.slice(0, -1).forEach((startTime, i) => {
                const slotStartMinutes = timeToMinutes(startTime);
                let inOpeningPeriod = false;
                for (const period of day.open) {
                    const periodStartMinutes = timeToMinutes(period.start);
                    const periodEndMinutes = timeToMinutes(period.end);
                    if (slotStartMinutes >= periodStartMinutes && slotStartMinutes < periodEndMinutes) {
                        blocks.push({ ...period, isOpen: true, start: startTime, end: timeSlots[i+1] });
                        inOpeningPeriod = true;
                        break;
                    }
                }
                if (!inOpeningPeriod) {
                    blocks.push({ start: startTime, end: timeSlots[i+1], isOpen: false, label: 'Praxis geschlossen' });
                }
            });
            return blocks;
        });
    }, []);

    const renderBlock = (dayIndex: number, timeIndex: number) => {
        const block = dailyBlocks[dayIndex][timeIndex];
        const startTimeMinutes = timeToMinutes(block.start);
        const day = days[dayIndex];
    
        // Hide blocks that are part of a merged block
        // Vormittag Mo-Fr
        if (startTimeMinutes < timeToMinutes('12:00')) return null;
        // Nachmittag Mo/Di
        if ((dayIndex === 0 || dayIndex === 1) && startTimeMinutes >= timeToMinutes('14:00')) return null;
    
        // Find if the current block is the start of an open period
        const openPeriod = day.open.find(p => timeToMinutes(p.start) === startTimeMinutes);
    
        if (openPeriod) {
            const startMinutes = timeToMinutes(openPeriod.start);
            const endMinutes = timeToMinutes(openPeriod.end);
            const durationInIntervals = (endMinutes - startMinutes) / 60;
    
            return (
                <div
                    key={`${dayIndex}-${timeIndex}`}
                    className="flex items-center justify-center p-1 border-b border-l border-border bg-background"
                    style={{ gridRow: `span ${durationInIntervals}` }}
                >
                    <span className="text-base font-semibold text-foreground">
                        {openPeriod.label}
                    </span>
                </div>
            );
        }
    
        // For closed periods, check if we are already covered by a merged block
        if (dayIndex === 2 && startTimeMinutes >= timeToMinutes('12:00')) {
            // Already handled by the merged "Praxis geschlossen" block
            return null;
        }

        const isCoveredByMergedClosedBlock = (dayIndex < 3 && startTimeMinutes >= timeToMinutes('12:00') && startTimeMinutes < timeToMinutes('14:00')) || // Mo-Mi
                                           (dayIndex === 3 && startTimeMinutes >= timeToMinutes('12:00') && startTimeMinutes < timeToMinutes('14:00')) || // Do
                                           (dayIndex === 4 && startTimeMinutes >= timeToMinutes('12:00') && startTimeMinutes < timeToMinutes('13:00')) || // Fr Mittag
                                           (dayIndex === 4 && startTimeMinutes >= timeToMinutes('17:00') && startTimeMinutes < timeToMinutes('18:00')); // Fr Abend

        if(isCoveredByMergedClosedBlock) return null;

        return (
            <div
                key={`${dayIndex}-${timeIndex}`}
                className={cn(
                    "flex items-center justify-center p-1 border-b border-l border-border",
                    'bg-secondary'
                )}
            >
                <span className={cn(
                    "text-base font-semibold",
                    "text-secondary-foreground"
                )}>
                   {'Praxis geschlossen'}
                </span>
            </div>
        );
    };

  return (
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border-t border-r border-border">
      {/* Header Row */}
      <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
      {days.map((day) => (
        <div key={day.name} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
            {day.name}
        </div>
      ))}

      {/* Time Axis & Content */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-[13] grid grid-rows-10">
          {timeSlots.slice(0, -1).map((startTime, index) => (
            <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
                {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
      </div>
      
      <div className="col-start-2 col-end-7 row-start-2 row-end-[13] grid grid-cols-5 grid-rows-10">
        {/* Merged Morning Block Mo-Fr 08-12 */}
        <div className="col-start-1 col-end-6 row-start-1 row-end-5 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <div className="col-start-3 text-lg font-semibold text-foreground">
                Sprechstunde
            </div>
        </div>

        {/* Merged Lunch Block Mo-Do 12-14 */}
        <div className="col-start-1 col-end-5 row-start-5 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">
                Praxis geschlossen
            </span>
        </div>
        {/* Fr 12-13 */}
        <div className="col-start-5 col-end-6 row-start-5 row-end-6 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">
                Praxis geschlossen
            </span>
        </div>

        {/* Merged Afternoon Block Mo/Di 14-18 */}
        <div className="col-start-1 col-end-3 row-start-7 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>
        
        {/* Mittwoch Nachmittag geschlossen */}
        <div className="col-start-3 col-end-4 row-start-5 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
            <span className="text-base font-semibold text-secondary-foreground">
                Praxis geschlossen
            </span>
        </div>

        {/* Fr Abend geschlossen */}
        <div className="col-start-5 col-end-6 row-start-10 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
            <span className="text-base font-semibold text-secondary-foreground">
                Praxis geschlossen
            </span>
        </div>

        {dailyBlocks.map((dayBlocks, dayIndex) => 
            dayBlocks.map((block, timeIndex) => renderBlock(dayIndex, timeIndex))
        )}
      </div>
    </div>
  );
}
