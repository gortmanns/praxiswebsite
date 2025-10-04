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
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
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

export function PhoneHoursCalendar() {
    const groupedBlocks = useMemo(() => {
        const dailyBlocks: TimeBlock[][] = days.map(day => {
            const blocks: TimeBlock[] = [];
            let currentTime = totalStartMinutes;
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

            if (currentTime < totalEndMinutes) {
                blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(totalEndMinutes), isOpen: false, label: 'Telefon nicht bedient' });
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

    const timeAxisSlots = useMemo(() => {
      const slots = [];
      for (let i = 0; i < timeSlots.length - 1; i++) {
        if (i % 2 === 0) { // Show label for every full hour
            slots.push({
                startTime: timeSlots[i],
                endTime: timeSlots[i+2] || timeSlots[i+1],
                isHour: true,
            });
        }
      }
      return slots;
    }, []);

    return (
        <div className="grid grid-cols-[auto_1fr] w-full border-t border-r border-border">
          {/* Header Row */}
          <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
          <div className="sticky top-0 z-10 grid grid-cols-5 border-b border-l border-border bg-muted">
            {days.map((day) => (
                <div key={day.name} className={cn(
                    "flex h-12 items-center justify-center border-r border-border text-center text-sm font-bold text-muted-foreground sm:text-base",
                    "last:border-r-0"
                )}>
                    {day.name}
                </div>
            ))}
          </div>


          {/* Time Axis Column */}
          <div className="col-start-1 row-start-2 border-l border-border bg-muted">
              {timeAxisSlots.map(({startTime, endTime, isHour}) => (
                   <div key={startTime} className="flex h-16 items-center justify-center text-center text-xs text-muted-foreground border-b border-border px-2 font-bold">
                       {startTime} - {endTime}
                   </div>
              ))}
          </div>
          
          {/* Content Area */}
          <div className="col-start-2 row-start-2 grid grid-cols-5 relative">
              {/* Day cells for grid lines */}
              {Array.from({ length: 5 }).map((_, dayIndex) => (
                  <div key={`col-${dayIndex}`} className={cn(
                      "h-full",
                      dayIndex < 4 ? "border-r border-border" : ""
                  )}>
                    {Array.from({ length: (timeSlots.length -1) / 2 }).map((_, timeIndex) => (
                      <div key={`row-line-${dayIndex}-${timeIndex}`} className="h-16 border-b border-border"></div>
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
                                  "font-semibold text-base",
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
