
'use client';

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

const slotHeightInRem = 4; // h-16
const totalStartMinutes = timeToMinutes('08:00');
const totalEndMinutes = timeToMinutes('18:00');

type TimeBlock = {
  start: string;
  end: string;
  isOpen: boolean;
  label?: string;
};

type GroupedBlock = {
    start: string;
    end: string;
    isOpen: boolean;
    label?: string;
    startDay: number;
    endDay: number;
};

export function OpeningHoursCalendar() {
    const timeLabels = useMemo(() => {
        return timeSlots.slice(0, -1).map((startTime, index) => {
          const endTime = timeSlots[index + 1];
          return { startTime, endTime };
        });
    }, []);

    const groupedBlocks = useMemo(() => {
        const dailyBlocks: TimeBlock[][] = days.map(day => {
            const blocks: TimeBlock[] = [];
            let currentTime = totalStartMinutes;
            const sortedOpen = [...day.open].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
            
            for (const period of sortedOpen) {
                const startMinutes = timeToMinutes(period.start);
                const endMinutes = timeToMinutes(period.end);

                if (currentTime < startMinutes) {
                    blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(startMinutes), isOpen: false, label: 'Praxis geschlossen' });
                }
                
                blocks.push({ start: period.start, end: period.end, isOpen: true, label: period.label });
                currentTime = endMinutes;
            }

            if (currentTime < totalEndMinutes) {
                blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(totalEndMinutes), isOpen: false, label: 'Praxis geschlossen' });
            }
            return blocks;
        });

        const allGroupedBlocks: GroupedBlock[] = [];
        dailyBlocks.forEach((dayBlocks, dayIndex) => {
            dayBlocks.forEach(block => {
                const mergeCandidate = allGroupedBlocks.find(grouped => 
                    grouped.start === block.start &&
                    grouped.end === block.end &&
                    grouped.isOpen === block.isOpen &&
                    grouped.label === block.label &&
                    grouped.endDay === dayIndex - 1
                );

                if (mergeCandidate) {
                    mergeCandidate.endDay = dayIndex;
                } else {
                    allGroupedBlocks.push({
                        ...block,
                        startDay: dayIndex,
                        endDay: dayIndex
                    });
                }
            });
        });
        
        return allGroupedBlocks;
    }, []);

    return (
        <div className="relative w-full border-t border-border">
          {/* Main Grid */}
          <div className="grid grid-cols-[auto_1fr]">
            {/* Header Row */}
            <div className="sticky top-0 z-10 border-b border-border bg-background"></div>
            <div className="sticky top-0 z-10 grid grid-cols-5 bg-background">
                {days.map((day) => (
                    <div key={day.name} className="flex h-12 items-center justify-center border-b border-l border-border font-bold text-sm sm:text-base text-center">
                        {day.name}
                    </div>
                ))}
            </div>

            {/* Time Axis Column */}
            <div className="row-span-2">
                {timeLabels.map((slot) => (
                <div
                    key={slot.startTime}
                    className={cn(
                        `flex h-16 items-center justify-center border-b border-border px-2 text-center text-xs text-muted-foreground`
                    )}
                >
                    {slot.startTime} - {slot.endTime}
                </div>
                ))}
            </div>

             {/* Days Content Area */}
            <div className="relative grid grid-cols-5">
                {/* Vertical lines for day separation */}
                {days.slice(0, 5).map((_, dayIndex) => (
                    <div key={`line-${dayIndex}`} className="h-full border-l border-border" style={{gridColumn: dayIndex + 1}}></div>
                ))}

                {/* Blocks overlay */}
                {groupedBlocks.map((block, index) => {
                    const startMinutes = timeToMinutes(block.start);
                    const endMinutes = timeToMinutes(block.end);
                    const durationMinutes = endMinutes - startMinutes;
                    
                    const top = ((startMinutes - totalStartMinutes) / 60) * slotHeightInRem;
                    const height = (durationMinutes / 60) * slotHeightInRem;

                    const left = `${block.startDay * 20}%`;
                    const width = `${(block.endDay - block.startDay + 1) * 20}%`;

                    return (
                        <div
                            key={index}
                            className={cn(
                                "absolute flex items-center justify-center p-2",
                                block.isOpen ? 'bg-background' : 'bg-secondary'
                            )}
                            style={{
                                top: `${top}rem`,
                                height: `${height}rem`,
                                left: left,
                                width: `calc(${width})`, 
                            }}
                        >
                            {block.label && (
                                <span className={cn(
                                    "font-semibold text-lg",
                                    block.isOpen ? "text-primary" : "text-secondary-foreground"
                                )}>
                                    {block.label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
          </div>
        </div>
      );
}
