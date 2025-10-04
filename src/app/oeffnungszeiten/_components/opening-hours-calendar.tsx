
'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = [
  {
    name: 'Montag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Dienstag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Mittwoch',
    open: [{ start: '08:00', end: '12:00' }],
  },
  {
    name: 'Donnerstag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Freitag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '13:00', end: '17:00' },
    ],
  },
];

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const slotHeightInRem = 4; // h-16
const totalStartMinutes = timeToMinutes('08:00');
const totalEndMinutes = timeToMinutes('18:00');

type TimeBlock = {
  start: string;
  end: string;
  isOpen: boolean;
};

export function OpeningHoursCalendar() {
  const timeLabels = useMemo(() => {
    return timeSlots.slice(0, -1).map((startTime, index) => {
      const endTime = timeSlots[index + 1];
      return { startTime, endTime };
    });
  }, []);

  const dailyBlocks = useMemo(() => {
    return days.map(day => {
      const blocks: TimeBlock[] = [];
      let currentTime = totalStartMinutes;

      // Add open periods
      const sortedOpen = [...day.open].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
      
      for (const period of sortedOpen) {
        const startMinutes = timeToMinutes(period.start);
        const endMinutes = timeToMinutes(period.end);

        // Add closed block before open period if there is a gap
        if (currentTime < startMinutes) {
            blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(startMinutes), isOpen: false });
        }
        
        // Add the open block
        blocks.push({ start: period.start, end: period.end, isOpen: true });
        currentTime = endMinutes;
      }

      // Add final closed block if needed
      if (currentTime < totalEndMinutes) {
          blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(totalEndMinutes), isOpen: false });
      }

      return { name: day.name, blocks };
    });
  }, []);

  const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

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
      <div className="grid flex-1 grid-cols-5">
        {dailyBlocks.map((day) => (
          <div key={day.name} className="flex flex-col text-center">
            <div className="flex h-12 items-center justify-center border-b border-border font-bold text-sm sm:text-base">{day.name}</div>
            <div className="relative border-l border-border h-full">
              {day.blocks.map((block, index) => {
                 const startMinutes = timeToMinutes(block.start);
                 const endMinutes = timeToMinutes(block.end);
                 const durationMinutes = endMinutes - startMinutes;
                 const top = ((startMinutes - totalStartMinutes) / 60) * slotHeightInRem;
                 const height = (durationMinutes / 60) * slotHeightInRem;
 
                 return (
                   <div
                     key={index}
                     className={cn(
                       "absolute w-full",
                       block.isOpen ? 'bg-background' : 'bg-secondary'
                     )}
                     style={{
                       top: `${top}rem`,
                       height: `${height}rem`,
                     }}
                   ></div>
                 );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
