'use client';

import { useState, useEffect, useOptimistic, useTransition, useReducer } from 'react';
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
import { getHolidays, Holiday } from './actions';

type OptimisticAction = {
  action: 'add' | 'delete';
  holiday: Holiday | { id: string };
};

function optimisticReducer(state: Holiday[], { action, holiday }: OptimisticAction) {
  switch (action) {
    case 'add':
      const newState = [...state, holiday as Holiday];
      return newState.sort((a, b) => {
        const dateA = new Date(a.start.split('.').reverse().join('-'));
        const dateB = new Date(b.start.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
    case 'delete':
      return state.filter((h) => h.id !== holiday.id);
    default:
      return state;
  }
}

export default function FerienterminePage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  // Optimistic state for instant UI feedback
  const [optimisticHolidays, setOptimistic] = useReducer(optimisticReducer, []);

  useEffect(() => {
    async function fetchHolidays() {
      setLoading(true);
      try {
        const fetchedHolidays = await getHolidays();
        const sortedHolidays = fetchedHolidays.sort((a, b) => {
          const dateA = new Date(a.start.split('.').reverse().join('-'));
          const dateB = new Date(b.start.split('.').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });
        setHolidays(sortedHolidays);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHolidays();
  }, []);

  // When real holidays load, update the optimistic state
  useEffect(() => {
    setOptimistic({ action: 'add', holiday: { id: '', name: '', start: '', end: '' } }); // dummy action to trigger reducer
    setOptimistic({ action: 'delete', holiday: { id: '' } }); // dummy action to trigger reducer
    holidays.forEach(h => setOptimistic({action: 'add', holiday: h}));
  }, [holidays]);


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
          <HolidayForm setOptimistic={setOptimistic} />
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
              ) : optimisticHolidays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Ferientermine gefunden.
                  </TableCell>
                </TableRow>
              ) : (
                optimisticHolidays.map(holiday => (
                  <TableRow key={holiday.id} className={holiday.id.startsWith('optimistic-') ? 'opacity-50' : ''}>
                    <TableCell>{holiday.start}</TableCell>
                    <TableCell>{holiday.end}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
                    <TableCell className="text-right">
                      <HolidayDeleteButton id={holiday.id} setOptimistic={setOptimistic} />
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
