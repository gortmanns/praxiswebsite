'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const schedule: ('pause' | 'geschlossen' | 'sprechstunde')[][] = [
  // Montag
  ['sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'pause', 'pause', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde'],
  // Dienstag
  ['sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'pause', 'pause', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde'],
  // Mittwoch
  ['sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'geschlossen', 'geschlossen', 'geschlossen', 'geschlossen', 'geschlossen', 'geschlossen'],
  // Donnerstag
  ['sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'pause', 'pause', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde'],
  // Freitag
  ['sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'pause', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'sprechstunde', 'geschlossen'],
];

const BaseCell = ({ dayIndex, hourIndex }: { dayIndex: number; hourIndex: number; }) => {
  const type = schedule[dayIndex][hourIndex];
  
  let colorClass = '';
  switch (type) {
    case 'sprechstunde':
      colorClass = 'bg-background';
      break;
    case 'pause':
    case 'geschlossen':
      colorClass = 'bg-secondary';
      break;
    default:
      colorClass = 'bg-background';
  }

  // Handle Thursday 17-18 special case
  if (dayIndex === 3 && hourIndex === 9) { // 17:00-18:00
    colorClass = 'bg-background';
  }

  return (
    <div className={cn('h-full w-full', colorClass)}></div>
  );
};


export function OpeningHoursCalendar() {
  return (
    <div className="relative">
      <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-secondary">
        <div className="sticky top-0 z-10 bg-muted"></div>
        {days.map((day) => (
          <div 
            key={day} 
            className="flex h-12 items-center justify-center border-l border-t border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base"
          >
            {day}
          </div>
        ))}
        {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
          <React.Fragment key={startTime}>
            <div className="flex h-12 items-center justify-center border-l border-t border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
              {startTime} - {timeSlots[hourIndex + 1]}
            </div>
            {days.map((_day, dayIndex) => (
              <div key={`${_day}-${startTime}`} className="h-12 border-l border-t border-border">
                 <BaseCell dayIndex={dayIndex} hourIndex={hourIndex} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[auto_repeat(10,minmax(0,1fr))]">
          {Array.from({ length: 10 * 5 }).map((_, i) => (
            <div key={i} className="border-r border-b border-orange-500"></div>
          ))}

          <div
            className="pointer-events-auto flex items-center justify-center font-bold text-primary"
            style={{
              gridRow: '1 / 5', 
              gridColumn: '2 / 7', 
            }}
          >
            Sprechstunde
          </div>
          
          <div
            className="pointer-events-auto flex items-center justify-center font-bold text-white"
            style={{
              gridRow: '5 / 7', 
              gridColumn: '2 / 7',
            }}
          >
            Mittagspause
          </div>

          <div
            className="pointer-events-auto bg-orange-500/20"
            style={{
              gridRow: '7 / 11',
              gridColumn: '2 / 4',
            }}
          >
          </div>
      </div>
    </div>
  );
}
