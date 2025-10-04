
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
};

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const days = [
  {
    name: 'Montag',
    open: [
      { start: '08:30', end: '13:00', label: 'Telefon wird bedient' },
      { start: '14:00', end: '17:30', label: 'Telefon wird bedient' },
    ],
  },
  {
    name: 'Dienstag',
    open: [
        { start: '08:30', end: '13:00', label: 'Telefon wird bedient' },
        { start: '14:00', end: '17:30', label: 'Telefon wird bedient' },
    ],
  },
  {
    name: 'Mittwoch',
    open: [{ start: '08:30', end: '13:00', label: 'Telefon wird bedient' }],
  },
  {
    name: 'Donnerstag',
    open: [
        { start: '08:30', end: '13:00', label: 'Telefon wird bedient' },
        { start: '14:00', end: '17:30', label: 'Telefon wird bedient' },
    ],
  },
  {
    name: 'Freitag',
    open: [
      { start: '08:30', end: '13:00', label: 'Telefon wird bedient' },
      { start: '14:00', end: '16:30', label: 'Telefon wird bedient' },
    ],
  },
];

type TimeBlock = {
  start: string;
  end: string;
  isOpen: boolean;
  label?: string;
};

export function PhoneHoursCalendar() {
    const dailyBlocks = useMemo(() => {
        return days.map(day => {
            const blocks: TimeBlock[] = [];
            let currentTime = timeToMinutes('08:00');
            const endTime = timeToMinutes('18:00');
            const sortedOpen = [...day.open].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
            
            for (const period of sortedOpen) {
                const startMinutes = timeToMinutes(period.start);
                const endMinutes = timeToMinutes(period.end);

                if (currentTime < startMinutes) {
                    blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(startMinutes), isOpen: false, label: 'Telefon nicht bedient' });
                }
                
                blocks.push({ start: period.start, end: period.end, isOpen: true, label: period.label });
                currentTime = endMinutes;
            }

            if (currentTime < endTime) {
                blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(endTime), isOpen: false, label: 'Telefon nicht bedient' });
            }
            return blocks;
        });
    }, []);

    const timeAxisSlots = useMemo(() => {
        const slots = [];
        for (let i = 0; i < timeSlots.length - 1; i += 2) {
             if (timeSlots[i+2]) {
                slots.push({
                    startTime: timeSlots[i],
                    endTime: timeSlots[i+2],
                });
             } else if (timeSlots[i+1]) {
                slots.push({
                    startTime: timeSlots[i],
                    endTime: timeSlots[i+1]
                })
             }
        }
        return slots;
    }, []);

    const fullHourSlots = timeSlots.filter(t => t.endsWith(':00')).slice(0, -1);


    return (
        <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] w-full border-t border-r border-border">
          {/* Header Row */}
          <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
            {days.map((day) => (
                <div key={day.name} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
                    {day.name}
                </div>
            ))}

          {/* Time Axis & Content */}
          {fullHourSlots.map((startTime, hourIndex) => (
              <React.Fragment key={startTime}>
                <div className="row-span-2 flex items-center justify-center text-center text-xs text-muted-foreground border-b border-l border-border px-2 font-bold">
                   {startTime} - {fullHourSlots[hourIndex+1] || '18:00'}
                </div>
                {[':00', ':30'].map((minute, minuteIndex) => {
                    const currentTime = `${startTime.split(':')[0]}${minute}`;
                    return dailyBlocks.map((dayBlocks, dayIndex) => {
                        const currentMinutes = timeToMinutes(currentTime);

                        const currentBlock = dayBlocks.find(block => {
                            const blockStartMinutes = timeToMinutes(block.start);
                            const blockEndMinutes = timeToMinutes(block.end);
                            return currentMinutes >= blockStartMinutes && currentMinutes < blockEndMinutes;
                        });
                        
                        if (!currentBlock) {
                             return <div key={`${dayIndex}-${currentTime}`} className="h-full border-b border-l border-border"></div>;
                        }

                        const isFirstIntervalOfBlock = timeToMinutes(currentBlock.start) === currentMinutes;
                        
                        if (!isFirstIntervalOfBlock) {
                            return null;
                        }
                        
                        const startMinutes = timeToMinutes(currentBlock.start);
                        const endMinutes = timeToMinutes(currentBlock.end);
                        const durationMinutes = endMinutes - startMinutes;
                        const rowSpan = durationMinutes / 30;

                        return (
                             <div
                                key={`${dayIndex}-${currentTime}`}
                                className={cn(
                                    "flex items-center justify-center p-1 border-b border-l border-border",
                                    currentBlock.isOpen ? 'bg-primary/20' : 'bg-muted'
                                )}
                                style={{ 
                                    gridRow: `${minuteIndex + 1 + (hourIndex * 2)} / span ${rowSpan}`,
                                    gridColumn: `${dayIndex + 2}`
                                 }}
                            >
                                <span className={cn(
                                    "font-semibold text-base",
                                    currentBlock.isOpen ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {currentBlock.label}
                                </span>
                            </div>
                        );
                    });
                })}
              </React.Fragment>
          ))}
        </div>
      );
}