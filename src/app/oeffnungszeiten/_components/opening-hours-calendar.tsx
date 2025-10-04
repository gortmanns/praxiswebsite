
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
        // 1. Create a matrix of blocks for each day
        const dailyBlocks: TimeBlock[][] = days.map(day => {
            const blocks: TimeBlock[] = [];
            let currentTime = totalStartMinutes;
            const sortedOpen = [...day.open].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
            
            for (const period of sortedOpen) {
                const startMinutes = timeToMinutes(period.start);
                const endMinutes = timeToMinutes(period.end);

                if (currentTime < startMinutes) {
                    blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(startMinutes), isOpen: false });
                }
                
                blocks.push({ start: period.start, end: period.end, isOpen: true, label: period.label });
                currentTime = endMinutes;
            }

            if (currentTime < totalEndMinutes) {
                blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(totalEndMinutes), isOpen: false });
            }
            return blocks;
        });

        // 2. Group blocks horizontally
        const allGroupedBlocks: GroupedBlock[] = [];
        dailyBlocks.forEach((dayBlocks, dayIndex) => {
            dayBlocks.forEach(block => {
                // Check if this block can be merged with an existing one
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
        <div className="flex w-full border-t border-border">
          {/* Time Column */}
          <div className="flex flex-col">
            {/* Empty cell for header */}
            <div className="h-12 border-b border-border"></div>
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

          {/* Days Columns */}
          <div className="relative grid flex-1 grid-cols-5">
            {/* Column structure for borders */}
            {days.map((day, dayIndex) => (
                <div key={day.name} className="flex flex-col text-center">
                    <div className="flex h-12 items-center justify-center border-b border-border font-bold text-sm sm:text-base">{day.name}</div>
                    <div className="relative h-full border-l border-border"></div>
                </div>
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
                            width: width,
                        }}
                    >
                        {block.label && <span className="font-semibold text-lg text-primary">{block.label}</span>}
                    </div>
                );
            })}
          </div>
        </div>
      );
}
