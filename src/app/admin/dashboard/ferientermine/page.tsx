'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HolidayForm, HolidayDeleteButton } from './holiday-form';
import { getHolidays } from './actions';

type Holiday = {
  id: string;
  name: string;
  start: string;
  end: string;
};

export default function FerienterminePage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHolidays() {
      setLoading(true);
      const fetchedHolidays = await getHolidays();
      setHolidays(fetchedHolidays);
      setLoading(false);
    }
    fetchHolidays();
  }, []);

  const handleHolidayAdded = (newHoliday: Holiday) => {
    // Optimistically update UI and re-sort
    setHolidays(currentHolidays => 
      [...currentHolidays, newHoliday].sort((a, b) => {
        const dateA = new Date(a.start.split('.').reverse().join('-'));
        const dateB = new Date(b.start.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      })
    );
  };

  const handleHolidayDeleted = (deletedId: string) => {
    setHolidays(currentHolidays =>
      currentHolidays.filter(holiday => holiday.id !== deletedId)
    );
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Ferientermine anpassen
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Neuen Ferientermin hinzufügen</CardTitle>
        </CardHeader>
        <CardContent>
          <HolidayForm onHolidayAdded={handleHolidayAdded} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geplante Ferientermine</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Erster Ferientag</TableHead>
                <TableHead>Letzter Ferientag</TableHead>
                <TableHead>Ferienname</TableHead>
                <TableHead className="w-[50px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center">
                        Lade Daten...
                    </TableCell>
                </TableRow>
              ) : holidays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Ferientermine gefunden.
                  </TableCell>
                </TableRow>
              ) : (
                holidays.map(holiday => (
                  <TableRow key={holiday.id}>
                    <TableCell>{holiday.start}</TableCell>
                    <TableCell>{holiday.end}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
                    <TableCell className="text-right">
                      <HolidayDeleteButton id={holiday.id} onHolidayDeleted={handleHolidayDeleted} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
