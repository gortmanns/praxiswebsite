
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
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export type Holiday = {
  id: string;
  name: string;
  start: string;
  end: string;
};

export default function FerienterminePage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;
    
    const q = query(collection(firestore, 'holidays'), orderBy('start', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const holidaysData: Holiday[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        holidaysData.push({ 
          id: doc.id, 
          name: data.name,
          start: data.start,
          end: data.end
        });
      });
      setHolidays(holidaysData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching holidays: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

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
          <HolidayForm />
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
                    Lade Termine...
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
                      <HolidayDeleteButton id={holiday.id} />
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
