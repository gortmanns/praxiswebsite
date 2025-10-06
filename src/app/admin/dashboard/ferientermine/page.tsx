'use client';

import { useState, useEffect, useReducer } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
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
import { useFirestore } from '@/firebase';

type OptimisticAction = {
  action: 'add' | 'delete' | 'set';
  holiday?: Holiday;
  holidays?: Holiday[];
};

function optimisticReducer(state: Holiday[], action: OptimisticAction) {
  switch (action.action) {
    case 'set':
      return action.holidays ? [...action.holidays] : state;
    case 'add':
      if (!action.holiday) return state;
      const newState = [...state, action.holiday];
      return newState.sort((a, b) => {
        const dateA = new Date(a.start.split('.').reverse().join('-'));
        const dateB = new Date(b.start.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
    case 'delete':
      if (!action.holiday) return state;
      return state.filter((h) => h.id !== action.holiday!.id);
    default:
      return state;
  }
}

export default function FerienterminePage() {
  const { db } = useFirestore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [optimisticHolidays, setOptimistic] = useReducer(optimisticReducer, []);

  useEffect(() => {
    async function fetchHolidays() {
      setLoading(true);
      setError(null);
      try {
        const fetchedHolidays = await getHolidays(db);
        const sortedHolidays = fetchedHolidays.sort((a, b) => {
          const dateA = new Date(a.start.split('.').reverse().join('-'));
          const dateB = new Date(b.start.split('.').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });
        setOptimistic({ action: 'set', holidays: sortedHolidays });
      } catch (error: any) {
        console.error("Failed to fetch holidays:", error);
        setError(error.message || 'Ein unbekannter Fehler ist aufgetreten.');
      } finally {
        setLoading(false);
      }
    }
    if(db) {
        fetchHolidays();
    }
  }, [db]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Ferientermine anpassen
        </h1>
      </div>

      {error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fehler beim Laden der Daten</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Neuen Ferientermin hinzufügen</CardTitle>
        </CardHeader>
        <CardContent>
          <HolidayForm setOptimistic={setOptimistic} holidays={optimisticHolidays} />
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
              ) : !error && optimisticHolidays.length === 0 ? (
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
                      <HolidayDeleteButton id={holiday.id} setOptimistic={setOptimistic} holidays={optimisticHolidays} />
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
