'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const days = [
  { full: 'Montag', short: 'Mo' },
  { full: 'Dienstag', short: 'Di' },
  { full: 'Mittwoch', short: 'Mi' },
  { full: 'Donnerstag', short: 'Do' },
  { full: 'Freitag', short: 'Fr' },
];

const schedule = [
    // Mo
    { day: 0, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 0, start: '12:00', end: '14:00', type: 'unbedient' },
    { day: 0, start: '14:00', end: '17:00', type: 'bedient' },
    { day: 0, start: '17:00', end: '17:30', type: 'bedient' },
    { day: 0, start: '17:30', end: '18:00', type: 'unbedient' },
    // Di
    { day: 1, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 1, start: '12:00', end: '14:00', type: 'unbedient' },
    { day: 1, start: '14:00', end: '17:00', type: 'bedient' },
    { day: 1, start: '17:00', end: '17:30', type: 'bedient' },
    { day: 1, start: '17:30', end: '18:00', type: 'unbedient' },
    // Mi
    { day: 2, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 2, start: '12:00', end: '18:00', type: 'unbedient' },
    // Do
    { day: 3, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 3, start: '12:00', end: '14:00', type: 'unbedient' },
    { day: 3, start: '14:00', end: '17:00', type: 'bedient' },
    { day: 3, start: '17:00', end: '17:30', type: 'bedient' },
    { day: 3, start: '17:30', end: '18:00', type: 'unbedient' },
    // Fr
    { day: 4, start: '08:30', end: '12:00', type: 'bedient' },
    { day: 4, start: '12:00', end: '13:00', type: 'unbedient' },
    { day: 4, start: '13:00', end: '13:30', type: 'bedient' },
    { day: 4, start: '13:30', end: '16:00', type: 'bedient' },
    { day: 4, start: '16:00', end: '16:30', type: 'bedient' },
    { day: 4, start: '16:30', end: '18:00', type: 'unbedient' },
];

const Cell = ({ type }: { type: string }) => {
    switch (type) {
        case 'bedient':
            return <div className="bg-background h-full w-full"></div>;
        case 'unbedient':
            return <div className="bg-secondary h-full w-full"></div>;
        default:
            return <div className="bg-background h-full w-full"></div>;
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
    <div className="relative overflow-x-auto">
      <div className="grid w-full min-w-[500px] grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-secondary">
        {/* Header Row */}
        <div className="sticky top-0 z-10 bg-muted"></div>
        {days.map((day) => (
          <div key={day.full} className="flex h-12 items-center justify-center border-l border-b border-border bg-muted px-2 text-center text-sm font-bold text-muted-foreground sm:text-base">
            {day.full}
          </div>
        ))}

        {/* Time Axis */}
        <div className="col-start-1 col-end-2 row-start-2 row-end-[21] grid grid-rows-19">
          {timeSlots.slice(0, -1).map((startTime, index) => (
            <div key={startTime} className="flex h-6 items-center justify-center border-l border-b border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
              {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="col-start-2 col-end-7 row-start-2 row-end-[21] grid grid-cols-5 grid-rows-19">
          {grid.map((row, rowIndex) =>
            row.map((type, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="h-6 w-full border-l border-b border-border">
                <Cell type={type} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-2 text-sm text-foreground/80">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-secondary"></div>
          <span>Telefon nicht bedient</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 border border-muted-foreground bg-background"></div>
          <span>Telefon wird bedient</span>
        </div>
      </div>
    </div>
  );
}
