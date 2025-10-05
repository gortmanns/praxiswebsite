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

      <div className="pointer-events-none absolute inset-0 grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))]">
          {/* Header Row - transparent for correct sizing */}
          <div className="h-12 border-b border-orange-500"></div>
          {days.map((day) => (
              <div key={`${day}-overlay-header`} className="flex h-12 items-center justify-center border-b border-l border-orange-500 text-center text-sm font-bold text-transparent sm:text-base">{day}</div>
          ))}

          {/* Time Axis + Cell Grid - transparent for correct sizing */}
          {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
              <React.Fragment key={`${startTime}-overlay-row`}>
                  <div className="flex h-12 items-center justify-center border-b border-l border-orange-500 px-2 text-center text-xs font-bold text-transparent">
                      {startTime} - {timeSlots[hourIndex + 1]}
                  </div>
                  {days.map((_day, dayIndex) => (
                      <div key={`${_day}-${startTime}-overlay-cell`} className="h-12 border-b border-l border-orange-500 bg-transparent">
                      </div>
                  ))}
              </React.Fragment>
          ))}
          
          {/* Right border for the last column */}
          <div className="absolute top-0 right-0 h-full w-px bg-orange-500"></div>

          {/* Block for Sprechstunde Vormittag */}
          <div
            className="pointer-events-auto bg-orange-500/20 flex items-center justify-center text-lg font-bold text-foreground/80"
            style={{
              gridRow: '2 / 6', // From 08:00 to 12:00
              gridColumn: '2 / 7', // From Montag to Freitag
            }}
          >
            Sprechstunde
          </div>
      </div>
    </div>
  );
}
