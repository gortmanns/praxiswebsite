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

const BaseCell = ({ dayIndex, hourIndex }: { dayIndex: number; hourIndex: number; }) => {
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
                 <BaseCell dayIndex={dayIndex} hourIndex={hourIndex} />
              </div>
            ))}
          </React.Fragment>
        ))}
        {/* Bottom border for the last row */}
        <div className="col-span-6 h-px border-b border-border"></div>
        
        <div className="pointer-events-none absolute inset-0 grid grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[auto_repeat(10,minmax(0,1fr))]">
          <div className="col-start-2 col-end-7 row-start-2 row-end-6 flex items-center justify-center">
            <span className="text-center font-semibold text-2xl text-foreground">Sprechstunde</span>
          </div>
          <div className="col-start-2 col-end-5 row-start-8 row-end-12 flex items-center justify-center">
            <span className="text-center font-semibold text-2xl text-foreground">Sprechstunde</span>
          </div>
           <div className="col-start-5 col-end-7 row-start-8 row-end-10 flex items-center justify-center">
            <span className="text-center font-semibold text-2xl text-foreground">Sprechstunde</span>
          </div>
        </div>
      </div>

      {/* Orange Overlay Grid for Borders and Blocks */}
      <div className="pointer-events-none absolute inset-0">
          <div className="grid h-full w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[auto_repeat(11,minmax(0,1fr))]">
              {/* Invisible Headers for correct spacing */}
              <div className="row-start-1 text-transparent"></div>
              {days.map((day) => (
                  <div key={`${day}-overlay-header`} className="flex h-12 items-center justify-center border-l border-t border-orange-500 text-center text-sm font-bold text-transparent sm:text-base">{day}</div>
              ))}

              {/* Invisible Time Axis and grid lines */}
              {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
                  <React.Fragment key={`${startTime}-overlay-row`}>
                      <div className="flex h-12 items-center justify-center border-l border-t border-orange-500 px-2 text-center text-xs font-bold text-transparent">
                          {startTime} - {timeSlots[hourIndex + 1]}
                      </div>
                      {days.map((_day) => (
                          <div key={`${_day}-${startTime}-overlay-cell`} className="h-12 border-l border-t border-orange-500"></div>
                      ))}
                  </React.Fragment>
              ))}
              <div className="col-span-6 h-px border-b border-orange-500"></div>

              {/* === ORANGE BLOCKS START === */}
              {/* 1. Mo 8-9 Uhr bis Fr 11-12 Uhr */}
              <div className="col-start-2 col-end-7 row-start-2 row-end-6 bg-orange-500/20"></div>
              {/* 2. Mo 12-13 Uhr bis Fr 13-14 Uhr */}
              <div className="col-start-2 col-end-7 row-start-6 row-end-8 bg-orange-500/20"></div>
              {/* 3. Mo 13-14 Uhr bis Di 17-18 Uhr */}
              <div className="col-start-2 col-end-4 row-start-8 row-end-12 bg-orange-500/20"></div>
              {/* 4. Mi 14-18 Uhr */}
              <div className="col-start-4 col-end-5 row-start-8 row-end-12 bg-orange-500/20"></div>
              {/* 5. Do-Fr 15-16 Uhr */}
              <div className="col-start-5 col-end-7 row-start-9 row-end-10 bg-orange-500/20"></div>
              {/* === ORANGE BLOCKS END === */}
          </div>
      </div>
    </div>
  );
}
