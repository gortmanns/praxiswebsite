
'use client';

import React from 'react';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'
];


export function OpeningHoursCalendar() {
  return (
    <div className="grid w-full grid-cols-[auto_repeat(5,minmax(0,1fr))] border-t border-r border-border">
      {/* Header Row */}
      <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
      {days.map((day) => (
        <div key={day} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
            {day}
        </div>
      ))}

      {/* Time Axis */}
      <div className="col-start-1 col-end-2 row-start-2 row-end-[12] grid grid-rows-10">
          {timeSlots.slice(0, -1).map((startTime, index) => (
            <div key={startTime} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted px-2 text-center text-xs font-bold text-muted-foreground">
                {startTime} - {timeSlots[index + 1]}
            </div>
          ))}
      </div>
      
      {/* Content Grid */}
      <div className="col-start-2 col-end-7 row-start-2 row-end-[12] grid grid-cols-5 grid-rows-10">
        
        {/* Vormittag Mo-Fr 08-12 */}
        <div className="col-start-1 col-end-6 row-start-1 row-end-5 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <div className="text-lg font-semibold text-foreground">Sprechstunde</div>
        </div>

        {/* Nachmittag Mo/Di 14-18 */}
        <div className="col-start-1 col-end-3 row-start-7 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>

        {/* Nachmittag Do/Fr 14-17 */}
        <div className="col-start-4 col-end-6 row-start-7 row-end-10 flex items-center justify-center p-2 border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>

        {/* Nachmittag Do 17-18 */}
        <div className="col-start-4 col-end-5 row-start-10 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background border-t-0">
            
        </div>
        
        {/* Freitag Nachmittag 13-14 */}
        <div className="col-start-5 col-end-6 row-start-6 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            
        </div>
        
        {/* Mittagspause Block */}
        <div className="col-start-1 col-end-6 row-start-5 row-end-6 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">Mittagspause</span>
        </div>
         <div className="col-start-1 col-end-5 row-start-6 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             
        </div>

        {/* Mittwoch Nachmittag geschlossen 14-18 */}
        <div className="col-start-3 col-end-4 row-start-7 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
            <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
        
        {/* Freitag Abend 17-18 geschlossen */}
        <div className="col-start-5 col-end-6 row-start-10 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>

      </div>
    </div>
  );
}
