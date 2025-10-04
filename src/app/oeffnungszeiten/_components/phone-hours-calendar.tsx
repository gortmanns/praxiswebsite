'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
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
            const processedPeriods: { start: number, end: number, label?: string }[] = [];
    
            day.open.forEach(period => {
                const startMinutes = timeToMinutes(period.start);
                const endMinutes = timeToMinutes(period.end);
                processedPeriods.push({ start: startMinutes, end: endMinutes, label: period.label });
            });
    
            return processedPeriods;
        });
    }, []);

    const renderBlock = (dayIndex: number, timeIndex: number) => {
        const startTime = timeSlots[timeIndex];
        const startMinutes = timeToMinutes(startTime);
        const dayPeriods = dailyBlocks[dayIndex];
    
        for (const period of dayPeriods) {
            if (startMinutes >= period.start && startMinutes < period.end) {
                // This slot is part of an open period
                if (startMinutes === period.start) {
                    // This is the beginning of the block, so render it
                    const durationInIntervals = (period.end - period.start) / 30;
                    return (
                        <div
                            key={`${dayIndex}-${timeIndex}`}
                            className="flex items-center justify-center p-1 border-b border-l border-border bg-background"
                            style={{
                                gridRow: `span ${durationInIntervals}`,
                            }}
                        >
                            <span className="font-semibold text-base text-foreground">
                                {period.label}
                            </span>
                        </div>
                    );
                } else {
                    // This slot is covered by a multi-slot block, so render nothing
                    return null;
                }
            }
        }
    
        // If we get here, the slot is closed
        return (
            <div
                key={`${dayIndex}-${timeIndex}`}
                className="flex items-center justify-center p-1 border-b border-l border-border bg-secondary"
            >
                <span className="font-semibold text-base text-secondary-foreground">
                    Telefon nicht bedient
                </span>
            </div>
        );
    };

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
          <div className="col-start-1 col-end-2 row-start-2 row-end-[22] grid grid-rows-20">
              {timeSlots.slice(0, -1).map((startTime) => (
                <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border px-2 text-center text-xs font-bold text-muted-foreground bg-muted">
                    {startTime}
                </div>
              ))}
          </div>

          <div className="col-start-2 col-end-7 row-start-2 row-end-[22] grid grid-cols-5 grid-rows-20">
            {dailyBlocks.map((_, dayIndex) => 
                timeSlots.slice(0,-1).map((__, timeIndex) => 
                    renderBlock(dayIndex, timeIndex)
                )
            )}
        </div>
    </div>
    );
}
