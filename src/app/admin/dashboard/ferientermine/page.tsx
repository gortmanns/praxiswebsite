
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import { useFirebase, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { parse } from 'date-fns';
import initialHolidays from '@/lib/holidays.json';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useRef } from 'react';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

const holidaySchema = z.object({
  name: z.string().min(1, { message: 'Name ist erforderlich.' }),
  start: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
  end: z.string().regex(dateRegex, { message: 'Ungültiges Datum (TT.MM.JJJJ)' }),
});

type HolidayForm = z.infer<typeof holidaySchema>;
interface Holiday extends HolidayForm {
  id: string;
  startDate: Timestamp;
}

export default function FerienterminePage() {
  const { db: firestore } = useFirebase();
  const { toast } = useToast();
  const importDone = useRef(false);

  const holidaysCollection = firestore
    ? collection(firestore, 'holidays')
    : null;
  const holidaysQuery = holidaysCollection
    ? query(holidaysCollection, orderBy('startDate', 'asc'))
    : null;

  const { data: holidays, loading } = useCollection<Holiday>(holidaysQuery);

  const form = useForm<HolidayForm>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
      start: '',
      end: '',
    },
  });
  
  useEffect(() => {
    if (!firestore || !holidaysCollection || importDone.current) return;

    const importInitialHolidays = async () => {
      const snapshot = await getDocs(holidaysQuery!);
      if (snapshot.empty) {
        console.log('Ferien-Datenbank ist leer. Importiere Altdaten...');
        try {
          const batch = writeBatch(firestore);
          initialHolidays.forEach(holiday => {
            const docRef = doc(holidaysCollection); 
            const startDate = new Date(holiday.start);
            const endDate = new Date(holiday.end);
            // Korrigieren der Datumsformatierung für die Anzeige
            const startFormatted = `${startDate.getUTCDate().toString().padStart(2, '0')}.${(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}.${startDate.getUTCFullYear()}`;
            const endFormatted = `${endDate.getUTCDate().toString().padStart(2, '0')}.${(endDate.getUTCMonth() + 1).toString().padStart(2, '0')}.${endDate.getUTCFullYear()}`;

            batch.set(docRef, {
              name: holiday.name,
              start: startFormatted,
              end: endFormatted,
              startDate: Timestamp.fromDate(startDate),
            });
          });
          await batch.commit();
          toast({ title: 'Erfolg', description: 'Altdaten wurden automatisch importiert.' });
        } catch (error) {
          console.error("Error importing holidays automatically: ", error);
          toast({ variant: 'destructive', title: 'Fehler', description: 'Altdaten konnten nicht automatisch importiert werden.' });
        }
      }
      importDone.current = true;
    };

    importInitialHolidays();
  }, [firestore, holidaysCollection, holidaysQuery, toast]);


  const onSubmit = async (data: HolidayForm) => {
    if (!firestore || !holidaysCollection) return;
    try {
      const startDate = parse(data.start, 'dd.MM.yyyy', new Date());
      
      await addDoc(holidaysCollection, { 
        name: data.name,
        start: data.start,
        end: data.end,
        startDate: Timestamp.fromDate(startDate),
      });
      form.reset();
      toast({ title: 'Erfolg', description: 'Ferientermin wurde hinzugefügt.' });
    } catch (error) {
      console.error('Error adding holiday: ', error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Termin konnte nicht hinzugefügt werden.' });
    }
  };

  const deleteHoliday = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'holidays', id));
      toast({ title: 'Erfolg', description: 'Ferientermin wurde gelöscht.' });
    } catch (error) {
      console.error('Error deleting holiday: ', error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Termin konnte nicht gelöscht werden.' });
    }
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end"
            >
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Erster Ferientag</FormLabel>
                    <FormControl>
                      <Input placeholder="dd.mm.yyyy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letzter Ferientag</FormLabel>
                    <FormControl>
                      <Input placeholder="dd.mm.yyyy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ferienname</FormLabel>
                    <FormControl>
                      <Input placeholder="z.B. Sommerferien" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Hinzufügen</Button>
            </form>
          </Form>
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
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Lade Daten...
                  </TableCell>
                </TableRow>
              )}
              {!loading && holidays?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Ferientermine gefunden.
                  </TableCell>
                </TableRow>
              )}
              {holidays?.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell>{holiday.start}</TableCell>
                  <TableCell>{holiday.end}</TableCell>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHoliday(holiday.id)}
                      aria-label="Termin löschen"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
