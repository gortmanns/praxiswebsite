'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const schedule = [
    // Mo
    { day: 0, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 0, start: '12:00', end: '13:30', type: 'unbedient' },
    { day: 0, start: '13:30', end: '17:00', type: 'bedient' },
    { day: 0, start: '17:00', end: '18:00', type: 'unbedient' },
    // Di
    { day: 1, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 1, start: '12:00', end: '13:30', type: 'unbedient' },
    { day: 1, start: '13:30', end: '17:00', type: 'bedient' },
    { day: 1, start: '17:00', end: '18:00', type: 'unbedient' },
    // Mi
    { day: 2, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 2, start: '12:00', end: '18:00', type: 'unbedient' },
    // Do
    { day: 3, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 3, start: '12:00', end: '13:30', type: 'unbedient' },
    { day: 3, start: '13:30', end: '17:00', type: 'bedient' },
    { day: 3, start: '17:00', end: '18:00', type: 'unbedient' },
    // Fr
    { day: 4, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 4, start: '12:00', end: '13:30', type: 'unbedient' },
    { day: 4, start: '13:30', end: '16:00', type: 'bedient' },
    { day: 4, start: '16:00', end: '18:00', type: 'unbedient' },
];

const Cell = ({ type }: { type: string }) => {
    const baseClass = 'border-t border-l border-[#EEEEEE]';
    switch (type) {
        case 'bedient':
            return <div className={cn(baseClass, 'bg-background')}></div>;
        case 'unbedient':
            return <div className={cn(baseClass, 'bg-secondary')}></div>;
        default:
            return <div className={cn(baseClass, 'bg-background')}></div>;
    }
};


export function PhoneHoursCalendar() {
  const grid: string[][] = Array(19).fill(0).map(() => Array(5).fill('empty'));
  
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
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border-b border-r border-[#EEEEEE]">
      {/* Header Row */}
      <div className="sticky top-0 z-10 border-b border-r border-[#EEEEEE] bg-muted"></div>
      {days.map((day) => (
        <div key={day} className="flex h-12 items-center justify-center border-b border-l border-[#EEEEEE] bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
          {day}
        </div>
      ))}

      {/* Time Axis */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-[21] grid grid-rows-19">
        {timeSlots.slice(0, -1).map((startTime, index) => (
          <div key={startTime} className="flex h-6 items-center justify-center border-t border-r border-[#EEEEEE] bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
             {startTime} - {timeSlots[index + 1]}
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="col-start-2 col-end-7 row-start-2 row-end-[21] grid grid-cols-5 grid-rows-19">
        {grid.flat().map((type, index) => (
          <Cell key={index} type={type} />
        ))}

        {/* Text Overlays */}
        <div className="col-start-1 col-end-6 row-start-1 row-end-8 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-foreground">Telefon bedient</span>
        </div>
        <div className="col-start-1 col-end-3 row-start-11 row-end-18 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-foreground">Telefon bedient</span>
        </div>
        <div className="col-start-4 col-end-5 row-start-11 row-end-18 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-foreground">Telefon bedient</span>
        </div>
        <div className="col-start-5 col-end-6 row-start-11 row-end-16 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-foreground">Telefon bedient</span>
        </div>

        <div className="col-start-1 col-end-6 row-start-8 row-end-11 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-secondary-foreground">Telefon nicht bedient</span>
        </div>
        <div className="col-start-3 col-end-4 row-start-11 row-end-20 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-secondary-foreground">Telefon nicht bedient</span>
        </div>
        <div className="col-start-1 col-end-3 row-start-18 row-end-20 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-secondary-foreground">Telefon nicht bedient</span>
        </div>
        <div className="col-start-4 col-end-5 row-start-18 row-end-20 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-secondary-foreground">Telefon nicht bedient</span>
        </div>
         <div className="col-start-5 col-end-6 row-start-16 row-end-20 pointer-events-none flex items-center justify-center p-1">
            <span className="text-center font-semibold text-base text-secondary-foreground">Telefon nicht bedient</span>
        </div>
      </div>
    </div>
  );
}
