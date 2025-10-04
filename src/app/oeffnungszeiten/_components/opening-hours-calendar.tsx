
'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
};

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const days = [
  {
    name: 'Montag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Dienstag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Mittwoch',
    open: [{ start: '08:00', end: '12:00', label: 'Sprechstunde' }],
  },
  {
    name: 'Donnerstag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '14:00', end: '18:00', label: 'Sprechstunde' },
    ],
  },
  {
    name: 'Freitag',
    open: [
      { start: '08:00', end: '12:00', label: 'Sprechstunde' },
      { start: '13:00', end: '17:00', label: 'Sprechstunde' },
    ],
  },
];

type TimeBlock = {
  start: string;
  end: string;
  isOpen: boolean;
  label?: string;
};

export function OpeningHoursCalendar() {
    const dailyBlocks = useMemo(() => {
        return days.map(day => {
            const blocks: TimeBlock[] = [];
            let currentTime = timeToMinutes('08:00');
            const endTime = timeToMinutes('18:00');
            const sortedOpen = [...day.open].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
            
            for (const period of sortedOpen) {
                const startMinutes = timeToMinutes(period.start);
                const endMinutes = timeToMinutes(period.end);

                if (currentTime < startMinutes) {
                    blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(startMinutes), isOpen: false, label: 'Praxis geschlossen' });
                }
                
                blocks.push({ start: period.start, end: period.end, isOpen: true, label: period.label });
                currentTime = endMinutes;
            }

            if (currentTime < endTime) {
                blocks.push({ start: minutesToTime(currentTime), end: minutesToTime(endTime), isOpen: false, label: 'Praxis geschlossen' });
            }
            return blocks;
        });
    }, []);

    return (
        <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] w-full border-t border-r border-border">
          {/* Header Row */}
          <div className="sticky top-0 z-10 border-b border-l border-border bg-muted"></div>
          {days.map((day) => (
            <div key={day.name} className="flex h-12 items-center justify-center border-b border-l border-border bg-muted text-center text-sm font-bold text-muted-foreground sm:text-base">
                {day.name}
            </div>
          ))}

          {/* Time Axis & Content */}
          {timeSlots.slice(0, -1).map((startTime, index) => (
              <React.Fragment key={startTime}>
                <div className="row-span-1 flex items-center justify-center text-center text-xs text-muted-foreground border-b border-l border-border px-2 font-bold">
                    {startTime} - {timeSlots[index + 1]}
                </div>
                {dailyBlocks.map((dayBlocks, dayIndex) => {
                    const startHour = parseInt(startTime.split(':')[0]);
                    const currentBlock = dayBlocks.find(block => {
                        const blockStartHour = parseInt(block.start.split(':')[0]);
                        const blockEndHour = parseInt(block.end.split(':')[0]);
                        return startHour >= blockStartHour && startHour < blockEndHour;
                    });
                    
                    const isFirstHourOfBlock = currentBlock && parseInt(currentBlock.start.split(':')[0]) === startHour;
                    if (!currentBlock || !isFirstHourOfBlock) {
                        return <div key={`${dayIndex}-${startTime}`} className="h-full border-b border-l border-border"></div>;
                    }

                    const startMinutes = timeToMinutes(currentBlock.start);
                    const endMinutes = timeToMinutes(currentBlock.end);
                    const durationHours = Math.ceil((endMinutes - startMinutes) / 60);

                    return (
                        <div
                            key={`${dayIndex}-${startTime}`}
                            className={cn(
                                "flex items-center justify-center p-2 border-b border-l border-border",
                                currentBlock.isOpen ? 'bg-primary/20' : 'bg-muted'
                            )}
                            style={{ gridRow: `span ${durationHours}` }}
                        >
                            <span className={cn(
                                "font-semibold text-lg",
                                currentBlock.isOpen ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {currentBlock.label}
                            </span>
                        </div>
                    );
                })}
              </React.Fragment>
          ))}
        </div>
      );
}
