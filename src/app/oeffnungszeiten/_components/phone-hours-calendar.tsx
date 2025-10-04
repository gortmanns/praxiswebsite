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
            const blocks: { [key: string]: TimeBlock } = {};
            const processedSlots: Set<string> = new Set();
    
            day.open.forEach(period => {
                for (let i = 0; i < timeSlots.length - 1; i++) {
                    const currentTime = timeSlots[i];
                    if (processedSlots.has(currentTime)) continue;
    
                    const currentMinutes = timeToMinutes(currentTime);
                    const periodStartMinutes = timeToMinutes(period.start);
                    const periodEndMinutes = timeToMinutes(period.end);
    
                    if (currentMinutes >= periodStartMinutes && currentMinutes < periodEndMinutes) {
                        blocks[currentTime] = { ...period, isOpen: true };
                        processedSlots.add(currentTime);
                    }
                }
            });
            
            for (let i = 0; i < timeSlots.length - 1; i++) {
                const currentTime = timeSlots[i];
                if (!processedSlots.has(currentTime)) {
                    blocks[currentTime] = { start: currentTime, end: timeSlots[i+1], isOpen: false, label: 'Telefon nicht bedient' };
                }
            }
    
            return blocks;
        });
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
          <div className="col-start-1 col-end-2 row-start-2 row-end-[22] grid grid-rows-20">
              {timeSlots.slice(0, -1).map((startTime) => (
                <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border px-2 text-center text-xs font-bold text-muted-foreground bg-muted">
                    {startTime}
                </div>
              ))}
          </div>

          <div className="col-start-2 col-end-7 row-start-2 row-end-[22] grid grid-cols-5 grid-rows-20">
            {dailyBlocks.map((dayBlocks, dayIndex) => {
                const processedBlocks = new Set<string>();
                return timeSlots.slice(0, -1).map((startTime, timeIndex) => {
                    const currentBlock = dayBlocks[startTime];
                    
                    if (processedBlocks.has(startTime)) {
                        return null;
                    }

                    const startMinutes = timeToMinutes(currentBlock.start);
                    const endMinutes = timeToMinutes(currentBlock.end);
                    const durationInIntervals = Math.round((endMinutes - startMinutes) / 30);

                    const startRow = timeIndex + 1;
                    const endRow = startRow + (currentBlock.isOpen ? durationInIntervals : 1);
                    
                    const blockKey = `${dayIndex}-${startTime}`;
                    
                    if (currentBlock.isOpen) {
                        for(let i=0; i<durationInIntervals; i++){
                            const slotIndex = timeIndex + i;
                            if (slotIndex < timeSlots.length - 1) {
                                processedBlocks.add(timeSlots[slotIndex]);
                            }
                        }
                    } else {
                        processedBlocks.add(startTime);
                    }

                    return (
                        <div
                            key={blockKey}
                            className={cn(
                                "flex items-center justify-center p-1 border-b border-l border-border",
                                currentBlock.isOpen ? 'bg-background' : 'bg-muted'
                            )}
                            style={{
                                gridColumn: `${dayIndex + 1} / span 1`,
                                gridRow: `${startRow} / ${endRow}`
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
                })
            })}
        </div>
    </div>
    );
}
