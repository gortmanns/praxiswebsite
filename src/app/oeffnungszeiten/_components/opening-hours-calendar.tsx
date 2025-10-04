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
  const showBlock = (dayIndex: number, timeIndex: number) => {
    // Vormittag Mo-Fr (08-12 Uhr)
    if (timeIndex >= 0 && timeIndex < 4) return false;
    // Nachmittag Mo/Di (14-18 Uhr)
    if ((dayIndex === 0 || dayIndex === 1) && timeIndex >= 6) return false;
    // Mittagspause Mo/Di/Do (12-14 Uhr)
    if ((dayIndex === 0 || dayIndex === 1 || dayIndex === 3) && timeIndex >= 4 && timeIndex < 6) return false;
    // Mittwoch Nachmittag (12-18 Uhr)
    if (dayIndex === 2 && timeIndex >= 4) return false;
    // Do Nachmittag (14-17 Uhr)
    if (dayIndex === 3 && timeIndex >= 6 && timeIndex < 9) return false;
     // Fr Nachmittag (14-17 Uhr)
     if (dayIndex === 4 && timeIndex >= 6 && timeIndex < 9) return false;

    return true;
  };

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
        <div className="col-start-3 col-end-4 row-start-1 row-end-5 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <div className="text-lg font-semibold text-foreground">Sprechstunde</div>
        </div>
        <div className="col-start-1 col-end-3 row-start-1 row-end-5 border-b border-l border-border bg-background"></div>
        <div className="col-start-4 col-end-6 row-start-1 row-end-5 border-b border-l border-border bg-background"></div>

        {/* Nachmittag Mo/Di 14-18 */}
        <div className="col-start-1 col-end-3 row-start-7 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>

        {/* Nachmittag Do/Fr 14-17 */}
        <div className="col-start-4 col-end-6 row-start-7 row-end-10 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">
                Sprechstunde
            </span>
        </div>
        
        {/* Mittagspause Mo/Di/Do 12-14 */}
        <div className="col-start-1 col-end-3 row-start-5 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
        <div className="col-start-4 col-end-5 row-start-5 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
        
        {/* Mittwoch Nachmittag geschlossen 12-18 */}
        <div className="col-start-3 col-end-4 row-start-5 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
            <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>
        
        {/* Nachmittag Do 17-18 */}
        {showBlock(3, 9) && <div className="col-start-4 col-end-5 row-start-10 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">Sprechstunde</span>
        </div>}

        {/* Freitag Mittag 12-13 */}
        {showBlock(4, 4) && <div className="col-start-5 col-end-6 row-start-5 row-end-6 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
             <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>}
        
        {/* Freitag Nachmittag 13-14 */}
        {showBlock(4, 5) && <div className="col-start-5 col-end-6 row-start-6 row-end-7 flex items-center justify-center p-2 border-b border-l border-border bg-background">
            <span className="text-lg font-semibold text-foreground">Sprechstunde</span>
        </div>}

        {/* Freitag Abend 17-18 geschlossen */}
        {showBlock(4, 9) && <div className="col-start-5 col-end-6 row-start-10 row-end-11 flex items-center justify-center p-2 border-b border-l border-border bg-secondary">
            <span className="text-base font-semibold text-secondary-foreground">Praxis geschlossen</span>
        </div>}

      </div>
    </div>
  );
}
