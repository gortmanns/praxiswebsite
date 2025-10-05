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
      <div className="relative grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-secondary">
        {/* Header Row */}
        <div className="sticky top-0 z-10 bg-muted"></div>
        {days.map((day, dayIndex) => (
          <div 
            key={day} 
            className={cn(
              "flex h-12 items-center justify-center bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base",
              "border-b border-l border-secondary"
            )}
          >
            {day}
          </div>
        ))}

        {/* Time Axis and Content Grid */}
        {timeSlots.slice(0, -1).map((startTime, hourIndex) => (
          <React.Fragment key={startTime}>
            <div className="flex h-12 items-center justify-center bg-muted px-2 text-center text-xs font-bold text-muted-foreground border-t border-l border-secondary">
              {startTime} - {timeSlots[hourIndex + 1]}
            </div>
            {days.map((_day, dayIndex) => (
              <div key={`${_day}-${startTime}`} className="h-12 border-l border-t border-secondary">
                 <Cell dayIndex={dayIndex} hourIndex={hourIndex} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Overlay Grid */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
        <div className="relative grid h-full w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] grid-rows-[repeat(11,minmax(0,1fr))]">
            {/* Header Row Placeholder */}
            <div className="row-start-1" style={{gridColumn: '1 / -1'}}></div>
            
            {/* Time Axis Placeholder */}
            <div className="col-start-1" style={{gridRow: '1 / -1'}}></div>

            {/* Sprechstunde Vormittag */}
            <div
                className="flex items-center justify-center pointer-events-auto"
                style={{ 
                    gridColumn: '2 / span 5', 
                    gridRow: '2 / span 4',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>

            {/* Sprechstunde Nachmittag Mo-Di */}
            <div
                className="flex items-center justify-center pointer-events-auto"
                style={{ 
                    gridColumn: '2 / span 2',
                    gridRow: '8 / span 4',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
             {/* Sprechstunde Nachmittag Do */}
             <div
                className="flex items-center justify-center pointer-events-auto"
                style={{ 
                    gridColumn: '5 / span 1',
                    gridRow: '8 / span 4',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
             {/* Sprechstunde Nachmittag Fr */}
             <div
                className="flex items-center justify-center pointer-events-auto"
                style={{ 
                    gridColumn: '6 / span 1',
                    gridRow: '7 / span 4',
                }}
            >
                <span className="text-2xl font-bold text-foreground/80">Sprechstunde</span>
            </div>
        </div>
      </div>
    </div>
  );
}