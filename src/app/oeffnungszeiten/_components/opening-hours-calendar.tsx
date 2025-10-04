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
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border-t border-r border-border">
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
            <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
                {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
      </div>
      
      <div className="col-start-2 col-end-7 row-start-2 row-end-[13] grid grid-cols-5 grid-rows-10">
        {/* Merged Morning Block */}
        <div
            className="col-start-1 col-end-6 row-start-1 row-end-5 flex items-center justify-center p-2 border-b border-l border-border bg-background"
        >
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>

        {/* Merged Mo/Di Afternoon Block */}
        <div
            className="col-start-1 col-end-3 row-start-7 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background"
        >
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>
        
        {/* Merged Do/Fr Afternoon Block 14-17 */}
        <div
            className="col-start-4 col-end-6 row-start-7 row-end-10 flex items-center justify-center p-2 border-b border-l border-border bg-background"
        >
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>


        {dailyBlocks.map((dayBlocks, dayIndex) => {
            return timeSlots.slice(0, -1).map((startTime, timeIndex) => {

              const currentBlock = dayBlocks[startTime];

              // Skip rendering for manually merged blocks
              const isMorning = timeToMinutes(startTime) < timeToMinutes('12:00');
              if (isMorning) return null;
              
              const isMoDiAfternoon = (dayIndex === 0 || dayIndex === 1) && timeToMinutes(startTime) >= timeToMinutes('14:00');
              if(isMoDiAfternoon) return null;

              const isDoFrAfternoon14to17 = (dayIndex === 3 || dayIndex === 4) && timeToMinutes(startTime) >= timeToMinutes('14:00') && timeToMinutes(startTime) < timeToMinutes('17:00');
               if(isDoFrAfternoon14to17) return null;


              const blockKey = `${dayIndex}-${startTime}`;
              
              return (
                <div
                    key={blockKey}
                    className={cn(
                        "flex items-center justify-center p-1 border-b border-l border-border",
                        currentBlock.isOpen ? 'bg-background' : 'bg-secondary'
                    )}
                    style={{
                      gridColumn: `${dayIndex + 1} / span 1`,
                      gridRow: `${timeIndex + 1} / span 1`
                    }}
                >
                    <span className={cn(
                        "text-base font-semibold",
                        currentBlock.isOpen ? "text-foreground" : "text-secondary-foreground"
                    )}>
                        {currentBlock.isOpen ? (dayIndex === 4 && timeIndex === 5 ? 'Sprechstunde' : '') : 'Praxis geschlossen'}
                    </span>
                </div>
              );
            })
        })}
      </div>
    </div>
  );
}
