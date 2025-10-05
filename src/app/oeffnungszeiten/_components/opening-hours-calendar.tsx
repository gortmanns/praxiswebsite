

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'
];


const schedule = [
    // Mo
    { day: 0, start: '08:00', end: '12:00', type: 'sprechstunde' },
    { day: 0, start: '12:00', end: '14:00', type: 'pause' },
    { day: 0, start: '14:00', end: '18:00', type: 'sprechstunde' },
    // Di
    { day: 1, start: '08:00', end: '12:00', type: 'sprechstunde' },
    { day: 1, start: '12:00', end: '14:00', type: 'pause' },
    { day: 1, start: '14:00', end: '18:00', type: 'sprechstunde' },
    // Mi
    { day: 2, start: '08:00', end: '12:00', type: 'sprechstunde' },
    { day: 2, start: '12:00', end: '14:00', type: 'pause' },
    { day: 2, start: '14:00', end: '18:00', type: 'geschlossen' },
    // Do
    { day: 3, start: '08:00', end: '12:00', type: 'sprechstunde' },
    { day: 3, start: '12:00', end: '14:00', type: 'pause' },
    { day: 3, start: '14:00', end: '17:00', type: 'sprechstunde' },
    { day: 3, start: '17:00', end: '18:00', type: 'empty' },
    // Fr
    { day: 4, start: '08:00', end: '12:00', type: 'sprechstunde' },
    { day: 4, start: '12:00', end: '13:00', type: 'pause' },
    { day: 4, start: '13:00', end: '17:00', type: 'sprechstunde' },
    { day: 4, start: '17:00', end: '18:00', type: 'geschlossen' },
];

const Cell = ({ type }: { type: string }) => {
    switch (type) {
        case 'sprechstunde':
            return <div className='bg-background h-full w-full'></div>;
        case 'pause':
            return <div className='bg-secondary h-full w-full'></div>;
        case 'geschlossen':
            return <div className='bg-secondary h-full w-full'></div>;
        default:
             return <div className='bg-background h-full w-full'></div>;
    }
};

export function OpeningHoursCalendar() {
  const grid: string[][] = Array(10).fill(0).map(() => Array(5).fill('empty'));

  schedule.forEach(entry => {
      const startRow = timeSlots.indexOf(entry.start);
      const endRow = timeSlots.indexOf(entry.end);
      for (let row = startRow; row < endRow; row++) {
          if (grid[row]) {
              grid[row][entry.day] = entry.type;
          }
      }
  });

  return (
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-[#EEEEEE]">
      {/* Header Row */}
      <div className="sticky top-0 z-10 bg-muted"></div>
      {days.map((day) => (
        <div key={day} className="flex h-12 items-center justify-center border-l border-[#EEEEEE] bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
            {day}
        </div>
      ))}

      {/* Time Axis */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-[12] grid grid-rows-10">
          {timeSlots.slice(0, -1).map((startTime, index) => (
            <div key={startTime} className="flex h-12 items-center justify-center border-t border-r border-[#EEEEEE] bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
                {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
      </div>
      
      {/* Content Grid */}
      <div className="col-start-2 col-end-7 row-start-2 row-end-[12] grid grid-cols-5 grid-rows-10">
        {grid.flat().map((type, index) => (
          <Cell key={index} type={type} />
        ))}

        {/* Text Overlays */}
        <div className="col-start-1 col-end-6 row-start-1 row-end-5 pointer-events-none flex items-center justify-center p-2">
            <div className="text-lg font-semibold text-foreground">Sprechstunde</div>
        </div>
        <div className="col-start-1 col-end-3 row-start-7 row-end-11 pointer-events-none flex items-center justify-center p-2">
            <span className="text-lg font-semibold text-foreground">Sprechstunde</span>
        </div>
         <div className="col-start-4 col-end-5 row-start-7 row-end-10 pointer-events-none flex items-center justify-center p-2">
            <span className="text-lg font-semibold text-foreground">Sprechstunde</span>
        </div>
        <div className="col-start-5 col-end-6 row-start-7 row-end-10 pointer-events-none flex items-center justify-center p-2">
            <span className="text-lg font-semibold text-foreground">Sprechstunde</span>
        </div>
        <div className="col-start-1 col-end-6 row-start-5 row-end-7 pointer-events-none flex items-center justify-center p-2">
             <span className="text-base font-semibold text-secondary-foreground">Mittagspause</span>
        </div>
        <div className="col-start-3 col-end-4 row-start-7 row-end-11 pointer-events-none flex items-center justify-center p-2">
            <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
         <div className="col-start-5 col-end-6 row-start-10 row-end-11 pointer-events-none flex items-center justify-center p-2">
             <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
      </div>
    </div>
  );
}
