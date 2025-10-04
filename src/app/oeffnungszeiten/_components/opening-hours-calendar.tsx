
'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
];

const days = [
  {
    name: 'Montag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Dienstag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Mittwoch',
    open: [{ start: '08:00', end: '12:00' }],
  },
  {
    name: 'Donnerstag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
  },
  {
    name: 'Freitag',
    open: [
      { start: '08:00', end: '12:00' },
      { start: '13:00', end: '17:00' },
    ],
  },
];

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export function OpeningHoursCalendar() {
  const calendarGrid = useMemo(() => {
    return timeSlots.slice(0, -1).map((startTime, index) => {
      const endTime = timeSlots[index + 1];
      return {
        startTime,
        endTime,
        days: days.map((day) => {
          const slotStartMinutes = timeToMinutes(startTime);
          const isOpen = day.open.some(
            (period) =>
              slotStartMinutes >= timeToMinutes(period.start) &&
              slotStartMinutes < timeToMinutes(period.end)
          );
          return { name: day.name, isOpen };
        }),
      };
    });
  }, []);

  return (
    <div className="flex w-full">
      {/* Time Column */}
      <div className="flex flex-col">
        <div className="h-12 border-b"></div> {/* Empty cell for header */}
        {calendarGrid.map((slot) => (
          <div
            key={slot.startTime}
            className="flex h-8 w-24 items-center justify-center border-b px-2 text-center text-xs text-muted-foreground"
          >
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
      </div>

      {/* Days Columns */}
      <div className="grid flex-1 grid-cols-5">
        {days.map((day) => (
          <div key={day.name} className="flex flex-col text-center">
            <div className="h-12 border-b flex items-center justify-center font-bold text-sm sm:text-base">{day.name}</div>
            <div className="relative border-l">
              {calendarGrid.map((slot) => (
                <div
                  key={`${day.name}-${slot.startTime}`}
                  className={cn(
                    'h-8 border-b',
                    slot.days.find((d) => d.name === day.name)?.isOpen
                      ? 'bg-primary/20'
                      : 'bg-muted/50'
                  )}
                ></div>
              ))}
              {day.open.map((period, index) => {
                 const startMinutes = timeToMinutes(period.start);
                 const endMinutes = timeToMinutes(period.end);
                 const durationMinutes = endMinutes - startMinutes;
                 const top = ((startMinutes - timeToMinutes('08:00')) / 30) * 2; // 2rem per 30-min slot
                 const height = (durationMinutes / 30) * 2;
 
                 return (
                   <div
                     key={index}
                     className="absolute w-full bg-primary/80 rounded-md"
                     style={{
                       top: `${top}rem`,
                       height: `${height}rem`,
                     }}
                   ></div>
                 );
              })}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
