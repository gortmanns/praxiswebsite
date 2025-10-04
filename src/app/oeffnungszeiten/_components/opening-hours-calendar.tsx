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
      const blocks: { [key: string]: TimeBlock } = {};
      const processedHours: Set<string> = new Set();

      day.open.forEach(period => {
        for (let i = 0; i < timeSlots.length - 1; i++) {
          const currentHour = timeSlots[i];
          if (processedHours.has(currentHour)) continue;

          const hourStartMinutes = timeToMinutes(currentHour);
          const periodStartMinutes = timeToMinutes(period.start);
          const periodEndMinutes = timeToMinutes(period.end);

          if (hourStartMinutes >= periodStartMinutes && hourStartMinutes < periodEndMinutes) {
            blocks[currentHour] = { ...period, isOpen: true };
            processedHours.add(currentHour);
          }
        }
      });
      
      for (let i = 0; i < timeSlots.length - 1; i++) {
          const currentHour = timeSlots[i];
          if (!processedHours.has(currentHour)) {
              blocks[currentHour] = { start: currentHour, end: timeSlots[i+1], isOpen: false, label: 'Praxis geschlossen' };
          }
      }

      return blocks;
    });
  }, []);

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
      <div className="col-start-1 col-end-2 row-start-2 row-end-[13] grid grid-rows-10">
          {timeSlots.slice(0, -1).map((startTime, index) => (
            <div key={startTime} className="flex items-center justify-center border-b border-l border-border px-2 text-center text-xs font-bold text-muted-foreground bg-muted">
                {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
      </div>
      
      <div className="col-start-2 col-end-7 row-start-2 row-end-[13] grid grid-cols-5 grid-rows-10">
        {dailyBlocks.map((dayBlocks, dayIndex) => {
            const processedBlocks = new Set<string>();
            return timeSlots.slice(0, -1).map((startTime, timeIndex) => {
              const currentBlock = dayBlocks[startTime];
              
              if (processedBlocks.has(startTime)) {
                return null;
              }

              const startMinutes = timeToMinutes(currentBlock.start);
              const endMinutes = timeToMinutes(currentBlock.end);
              const durationInHours = Math.round((endMinutes - startMinutes) / 60);

              const startRow = timeIndex + 1;
              const endRow = startRow + (currentBlock.isOpen ? durationInHours : 1);
              
              const blockKey = `${dayIndex}-${startTime}`;
              
              if (currentBlock.isOpen) {
                  for(let i=0; i<durationInHours; i++){
                      processedBlocks.add(timeSlots[timeIndex + i]);
                  }
              } else {
                  processedBlocks.add(startTime);
              }

              return (
                <div
                    key={blockKey}
                    className={cn(
                        "flex items-center justify-center p-2 border-b border-l border-border",
                        currentBlock.isOpen ? 'bg-background' : 'bg-secondary'
                    )}
                    style={{
                      gridColumn: `${dayIndex + 1} / span 1`,
                      gridRow: `${startRow} / ${endRow}`
                    }}
                >
                    <span className={cn(
                        "font-semibold text-lg",
                        currentBlock.isOpen ? "text-foreground" : "text-secondary-foreground"
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
