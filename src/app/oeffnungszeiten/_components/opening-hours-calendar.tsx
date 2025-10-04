'use client';

import React from 'react';
import { cn } from '@/lib/utils';

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
  const dailyBlocks = React.useMemo(() => {
    return days.map(day => {
      const blocks: { [key: string]: TimeBlock } = {};
      
      for (let i = 0; i < timeSlots.length - 1; i++) {
          const currentHour = timeSlots[i];
          const hourStartMinutes = timeToMinutes(currentHour);
          let isHourInAnyPeriod = false;

          for (const period of day.open) {
            const periodStartMinutes = timeToMinutes(period.start);
            const periodEndMinutes = timeToMinutes(period.end);

            if (hourStartMinutes >= periodStartMinutes && hourStartMinutes < periodEndMinutes) {
              blocks[currentHour] = { ...period, isOpen: true };
              isHourInAnyPeriod = true;
              break; 
            }
          }

          if (!isHourInAnyPeriod) {
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
          {timeSlots.slice(0, -1).map((startTime) => (
            <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
                {startTime}
            </div>
          ))}
      </div>
      
      <div className="col-start-2 col-end-7 row-start-2 row-end-[13] grid grid-cols-5 grid-rows-10">
        {/* Merged Morning Block */}
        <div
            className="flex items-center justify-center p-2 border-b border-l border-border bg-background"
            style={{
                gridColumn: '1 / span 5',
                gridRow: '1 / span 4'
            }}
        >
            <span className="font-semibold text-lg text-foreground">
                Sprechstunde
            </span>
        </div>

        {/* Merged Mo/Di Afternoon Block */}
        <div
            className="flex items-center justify-center p-2 border-b border-l border-border bg-background"
            style={{
                gridColumn: '1 / span 2',
                gridRow: '7 / span 4'
            }}
        >
            <span className="font-semibold text-lg text-foreground">
                Sprechstunde
            </span>
        </div>

        {dailyBlocks.map((dayBlocks, dayIndex) => {
            const processedBlocks = new Set<string>();
            return timeSlots.slice(0, -1).map((startTime, timeIndex) => {
              if (processedBlocks.has(startTime)) return null;

              const currentBlock = dayBlocks[startTime];

              // Skip rendering for merged blocks
              const isMorning = timeToMinutes(startTime) < timeToMinutes('12:00');
              if (isMorning) return null;
              
              if ((dayIndex === 0 || dayIndex === 1) && timeToMinutes(startTime) >= timeToMinutes('14:00')) {
                return null;
              }

              const startMinutes = timeToMinutes(currentBlock.start);
              const endMinutes = timeToMinutes(currentBlock.end);
              const durationInHours = Math.round((endMinutes - startMinutes) / 60);

              const startRow = timeIndex + 1;
              
              const blockKey = `${dayIndex}-${startTime}`;
              
              if (currentBlock.isOpen) {
                  for(let i=0; i<durationInHours; i++){
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
                        "flex items-center justify-center p-2 border-b border-l border-border",
                        currentBlock.isOpen ? 'bg-background' : 'bg-secondary'
                    )}
                    style={{
                      gridColumn: `${dayIndex + 1} / span 1`,
                      gridRow: `${startRow} / span ${currentBlock.isOpen ? durationInHours : 1}`
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