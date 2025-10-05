'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const schedule: ('sprechstunde' | 'pause' | 'geschlossen')[][] = [
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

const Cell = ({ dayIndex, hourIndex }: { dayIndex: number; hourIndex: number; }) => {
  const type = schedule[dayIndex][hourIndex];
  
  let colorClass = '';
  switch (type) {
    case 'sprechstunde':
      colorClass = 'bg-background';
      break;
    case 'pause':
      colorClass = 'bg-secondary';
      break;
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
      {/* Base Calendar Grid */}
      <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))]">
        {/* Header Row */}
        <div className="sticky top-0 z-10 bg-muted"></div>
        {days.map((day) => (
          <div 
            key={day} 
            className="flex h-12 items-center justify-center border-l border-t border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base"
          >
            {day}
          </div>
        ))}

        {/* Time Axis and Content Grid */}
        {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
          <React.Fragment key={startTime}>
            <div className="flex h-12 items-center justify-center border-l border-t border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
              {startTime} - {timeSlots[hourIndex + 1]}
            </div>
            {days.map((_day, dayIndex) => (
              <div key={`${_day}-${startTime}`} className="h-12 border-l border-t border-border">
                 <Cell dayIndex={dayIndex} hourIndex={hourIndex} />
              </div>
            ))}
          </React.Fragment>
        ))}
        {/* Bottom border for the last row */}
        <div className="col-span-6 h-px border-b border-border"></div>
      </div>
      
      {/* Overlay Grid */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-[auto_repeat(5,minmax(0,1fr))]">
        {/* Header Row */}
        <div className="sticky top-0 z-10"></div>
        {days.map((day) => (
          <div
            key={day}
            className="h-12 border-l border-t border-orange-500 bg-orange-500/20"
          ></div>
        ))}

        {/* Time Axis and Content Grid */}
        {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
          <React.Fragment key={startTime}>
            <div className="h-12 border-l border-t border-orange-500 bg-orange-500/20"></div>
            {days.map((_day) => (
              <div
                key={`${_day}-${startTime}-overlay`}
                className="h-12 border-l border-t border-orange-500 bg-orange-500/20"
              ></div>
            ))}
          </React.Fragment>
        ))}
        {/* Bottom border for the last row */}
        <div className="col-span-6 h-px border-b border-orange-500"></div>
      </div>
    </div>
  );
}
