'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

// Represents the state of each 1-hour slot from 8:00 to 17:00 for each day
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

const Cell = ({ type, dayIndex, hourIndex }: { type: string; dayIndex: number; hourIndex: number; }) => {
  const isFirstRow = hourIndex === 0;
  const isLastRow = hourIndex === timeSlots.length - 2;
  const isFirstCol = dayIndex === 0;
  const isLastCol = dayIndex === days.length - 1;

  const baseClasses = 'h-full w-full';

  let borderClasses = 'border-l border-t border-border/20';

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
    <div className={cn(baseClasses, colorClass, borderClasses)}></div>
  );
};


export function OpeningHoursCalendar() {
  const grid: string[][] = Array(5).fill(0).map(() => Array(10).fill('empty'));

  for (let day = 0; day < 5; day++) {
    for (let hour = 0; hour < 10; hour++) {
      grid[day][hour] = schedule[day][hour];
    }
  }

  return (
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-secondary">
      {/* Header Row */}
      <div className="sticky top-0 z-10 bg-muted"></div>
      {days.map((day, dayIndex) => (
        <div 
          key={day} 
          className={cn(
            "flex h-12 items-center justify-center bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base border-t-0",
            dayIndex === 0 ? "border-l-0" : "border-l border-border/20",
            "border-r border-b border-border/20",
            dayIndex === days.length - 1 && "border-r-0"
          )}
        >
          {day}
        </div>
      ))}

      {/* Time Axis and Content Grid */}
      {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
        <React.Fragment key={startTime}>
          <div className="flex h-12 items-center justify-center bg-muted px-2 text-center text-xs font-bold text-muted-foreground border-l-0 border-t border-b-0 border-r border-border/20">
            {startTime} - {timeSlots[hourIndex + 1]}
          </div>
          {days.map((_day, dayIndex) => (
            <div key={`${_day}-${startTime}`} className="h-12 border-b-0 border-r-0">
               <Cell type={grid[dayIndex][hourIndex]} dayIndex={dayIndex} hourIndex={hourIndex} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
