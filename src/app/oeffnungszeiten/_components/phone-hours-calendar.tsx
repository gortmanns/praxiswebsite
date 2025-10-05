'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const timeSlots = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const commonLabel = "Telefon bedient";
const commonLabelClosed = "Telefon nicht bedient";

const renderBlock = (label: string, className: string, style: React.CSSProperties) => (
  <div
    className={cn("flex items-center justify-center p-1 border-border/50", className)}
    style={style}
  >
    <span className="text-center font-semibold text-base">
      {label}
    </span>
  </div>
);

export function PhoneHoursCalendar() {
  return (
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border border-border/50">
      {/* Header Row */}
      <div className="sticky top-0 z-10 border-b border-r border-border/50 bg-muted"></div>
      {days.map((day) => (
        <div key={day} className="flex h-12 items-center justify-center border-b border-l border-border/50 bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
          {day}
        </div>
      ))}

      {/* Time Axis */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-[21] grid grid-rows-19">
        {timeSlots.slice(0, -1).map((startTime, index) => (
          <div key={startTime} className="flex h-6 items-center justify-center border-t border-r border-border/50 bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
            {startTime} - {timeSlots[index + 1]}
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="col-start-2 col-end-7 row-start-2 row-end-[21] grid grid-cols-5 grid-rows-19">
        {/* Mo, Di, Do, Mi, Fr Vormittag */}
        {renderBlock(commonLabel, 'bg-background text-foreground border-b border-l', { gridColumn: '1 / 6', gridRow: '1 / 8' })}
        
        {/* Mo, Di, Do Nachmittag */}
        {renderBlock(commonLabel, 'bg-background text-foreground border-l', { gridColumn: '1 / 3', gridRow: '11 / 18' })}
        {renderBlock(commonLabel, 'bg-background text-foreground border-l', { gridColumn: '4 / 5', gridRow: '11 / 18' })}

        {/* Fr Nachmittag */}
        {renderBlock(commonLabel, 'bg-background text-foreground border-l', { gridColumn: '5 / 6', gridRow: '11 / 16' })}

        {/* Geschlossen-Zeiten */}
        {renderBlock(commonLabelClosed, 'bg-secondary text-secondary-foreground border-b border-l', { gridColumn: '1 / 6', gridRow: '8 / 11' })}
        {renderBlock(commonLabelClosed, 'bg-secondary text-secondary-foreground border-l', { gridColumn: '3 / 4', gridRow: '11 / 20' })}
        {renderBlock(commonLabelClosed, 'bg-secondary text-secondary-foreground border-l', { gridColumn: '1 / 3', gridRow: '18 / 20' })}
        {renderBlock(commonLabelClosed, 'bg-secondary text-secondary-foreground border-l', { gridColumn: '4 / 5', gridRow: '18 / 20' })}
        {renderBlock(commonLabelClosed, 'bg-secondary text-secondary-foreground border-l', { gridColumn: '5 / 6', gridRow: '16 / 20' })}
      </div>
    </div>
  );
}
