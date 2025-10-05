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
            className="flex h-12 items-center justify-center border-l border-t border-secondary bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base"
          >
            {day}
          </div>
        ))}

        {/* Time Axis and Content Grid */}
        {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
          <React.Fragment key={startTime}>
            <div className="flex h-12 items-center justify-center border-l border-t border-secondary bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
              {startTime} - {timeSlots[hourIndex + 1]}
            </div>
            {days.map((_day, dayIndex) => (
              <div key={`${_day}-${startTime}`} className="h-12 border-l border-t border-secondary">
                 <Cell dayIndex={dayIndex} hourIndex={hourIndex} />
              </div>
            ))}
          </React.Fragment>
        ))}
        {/* Bottom border for the last row */}
        <div className="col-span-6 h-px border-b border-secondary"></div>
      </div>

      {/* Overlay Grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative grid h-full w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[repeat(11,minmax(0,1fr))]">
            {/* Header Row Placeholder */}
            <div className="row-start-1" style={{gridColumn: '1 / -1'}}></div>
            
            {/* Time Axis Placeholder */}
            <div className="col-start-1" style={{gridRow: '1 / -1'}}></div>

            {/* Sprechstunde Vormittag */}
            <div
                className="pointer-events-auto flex items-center justify-center"
                style={{ 
                    gridColumn: '2 / 7', 
                    gridRow: '2 / 6',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>

            {/* Sprechstunde Nachmittag Mo-Di */}
            <div
                className="pointer-events-auto flex items-center justify-center"
                style={{ 
                    gridColumn: '2 / 4',
                    gridRow: '8 / 12',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
             {/* Sprechstunde Nachmittag Do */}
             <div
                className="pointer-events-auto flex items-center justify-center"
                style={{ 
                    gridColumn: '5 / 6',
                    gridRow: '8 / 12',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
             {/* Sprechstunde Nachmittag Fr */}
             <div
                className="pointer-events-auto flex items-center justify-center"
                style={{ 
                    gridColumn: '6 / 7',
                    gridRow: '7 / 11',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
        </div>
      </div>
    </div>
  );
}
