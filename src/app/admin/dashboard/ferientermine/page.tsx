
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
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { useFirebase } from '@/firebase';
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
import { X, AlertTriangle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { parse } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

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
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [rawDbContent, setRawDbContent] = useState<any[] | null>(null);

  const form = useForm<HolidayForm>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
      start: '',
      end: '',
    },
  });
  
  const fetchHolidays = async () => {
    if (!firestore) return;
    setLoading(true);
    try {
      const holidaysCollection = collection(firestore, 'holidays');
      const holidaysQuery = query(holidaysCollection, orderBy('startDate', 'asc'));
      const snapshot = await getDocs(holidaysQuery);
      
      const holidaysData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Holiday[];
      setHolidays(holidaysData);

    } catch (error) {
      console.error("Error fetching holidays: ", error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Daten konnten nicht geladen werden.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore]);


  const onSubmit = async (data: HolidayForm) => {
    if (!firestore) return;
    try {
      const startDate = parse(data.start, 'dd.MM.yyyy', new Date());
      
      const newHolidayData = { 
        name: data.name,
        start: data.start,
        end: data.end,
        startDate: Timestamp.fromDate(startDate),
      };

      const holidaysCollection = collection(firestore, 'holidays');
      await addDoc(holidaysCollection, newHolidayData);
      
      form.reset();
      toast({ title: 'Erfolg', description: 'Ferientermin wurde hinzugefügt.' });
      fetchHolidays(); // Refresh the list
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
      fetchHolidays(); // Refresh the list
    } catch (error) {
      console.error('Error deleting holiday: ', error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Termin konnte nicht gelöscht werden.' });
    }
  };

  const deleteAllHolidays = async () => {
    if (!firestore) return;
    if (!confirm('Sind Sie sicher, dass Sie alle Ferientermine unwiderruflich löschen möchten?')) {
      return;
    }
    try {
      const holidaysCollection = collection(firestore, 'holidays');
      const snapshot = await getDocs(holidaysCollection);
      const batch = writeBatch(firestore);
      snapshot.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
      toast({ title: 'Erfolg', description: 'Alle Ferientermine wurden gelöscht.' });
      fetchHolidays(); // Refresh the list
      setRawDbContent(null); // Clear raw view if open
    } catch (error) {
      console.error('Error deleting all holidays:', error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Termine konnten nicht gelöscht werden.' });
    }
  };

  const showRawDatabaseContent = async () => {
    if (!firestore) return;
    try {
      const snapshot = await getDocs(collection(firestore, 'holidays'));
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setRawDbContent(data);
    } catch (error) {
      console.error('Error fetching raw db content', error);
      toast({ variant: 'destructive', title: 'Fehler', description: 'Roh-Daten konnten nicht geladen werden.' });
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
              {!loading && holidays.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Ferientermine gefunden.
                  </TableCell>
                </TableRow>
              )}
              {!loading && holidays.map((holiday) => (
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
      
      <Card>
          <CardHeader>
            <CardTitle>Diagnose-Werkzeuge</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={showRawDatabaseContent}>Datenbankinhalt anzeigen</Button>
                <Button variant="destructive" onClick={deleteAllHolidays}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Alle Termine löschen
                </Button>
            </div>
            {rawDbContent && (
              <pre className="mt-4 rounded-md bg-muted p-4 text-sm text-muted-foreground">{JSON.stringify(rawDbContent, null, 2)}</pre>
            )}
          </CardContent>
      </Card>
    </main>
  );
}
