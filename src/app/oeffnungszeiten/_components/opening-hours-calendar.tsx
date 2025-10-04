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

const totalStartMinutes = timeToMinutes('08:00');
const totalEndMinutes = timeToMinutes('18:00');
const totalDurationMinutes = totalEndMinutes - totalStartMinutes;

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
        <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] w-full border-t border-r border-border">
          {/* Header Row */}
          <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
          {days.map((day) => (
            <div key={day.name} className={cn(
                "flex h-12 items-center justify-center border-b border-l border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base",
            )}>
                {day.name}
            </div>
          ))}


          {/* Time Axis Column */}
          {timeSlots.slice(0, -1).map((startTime, index) => (
              <div key={startTime} className="row-span-1 flex items-center justify-center text-center text-xs text-muted-foreground border-b border-l border-border px-2 font-bold">
                  {startTime} - {timeSlots[index + 1]}
              </div>
          ))}
          
          {/* Content Area */}
          <div className="col-start-2 col-span-5 row-start-2 row-span-10 grid grid-cols-5 grid-rows-10 relative">
              {/* Day cells for grid lines */}
              {Array.from({ length: 5 }).map((_, dayIndex) => (
                  <div key={`col-${dayIndex}`} className={cn(
                      "h-full border-l border-border"
                  )}>
                    {Array.from({ length: 10 }).map((_, timeIndex) => (
                      <div key={`row-line-${dayIndex}-${timeIndex}`} className="h-full border-b border-border"></div>
                    ))}
                  </div>
              ))}
              
              {/* Grouped Blocks */}
              {groupedBlocks.map((block, index) => {
                  const startMinutes = timeToMinutes(block.start);
                  const endMinutes = timeToMinutes(block.end);
                  const durationMinutes = endMinutes - startMinutes;
                  
                  const top = ((startMinutes - totalStartMinutes) / totalDurationMinutes) * 100;
                  const height = (durationMinutes / totalDurationMinutes) * 100;
                  const left = block.startDay * 20;
                  const width = (block.endDay - block.startDay + 1) * 20;

                  return (
                      <div
                          key={index}
                          className={cn(
                              "absolute flex items-center justify-center p-2",
                              block.isOpen ? 'bg-primary/20' : 'bg-muted'
                          )}
                          style={{
                              top: `${top}%`,
                              height: `${height}%`,
                              left: `${left}%`,
                              width: `${width}%`, 
                          }}
                      >
                          {block.label && (
                              <span className={cn(
                                  "font-semibold text-lg",
                                  block.isOpen ? "text-foreground" : "text-muted-foreground"
                              )}>
                                  {block.label}
                              </span>
                          )}
                      </div>
                  );
              })}
          </div>
        </div>
      );
}
