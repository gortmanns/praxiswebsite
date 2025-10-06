'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format, isWithinInterval, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
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
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date({ required_error: 'Ein Datum ist erforderlich.' }));

const holidaySchema = z.object({
  start: dateSchema,
  end: dateSchema,
  name: z.string().min(2, { message: 'Der Name muss mindestens 2 Zeichen lang sein.' }),
}).refine((data) => {
    if (data.start && data.end) {
        return data.end >= data.start;
    }
    return true;
}, {
  message: 'Das Enddatum darf nicht vor dem Startdatum liegen.',
  path: ['end'],
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

interface Holiday extends HolidayFormValues {
  id: string;
}

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const firestore = useFirestore();

  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
    },
  });

  const fetchHolidays = async () => {
    if (!firestore) return;
    setIsLoading(true);
    try {
      const holidaysCollection = collection(firestore, 'holidays');
      const q = query(holidaysCollection, orderBy('start', 'asc'));
      const querySnapshot = await getDocs(q);
      const holidaysData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }));
      setHolidays(holidaysData);
    } catch (error) {
      console.error("Fehler beim Laden der Ferientermine: ", error);
      setStatus({ type: 'error', message: 'Die Ferientermine konnten nicht geladen werden.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firestore) {
      fetchHolidays();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore]);


  const checkForOverlap = (newStart: Date, newEnd: Date): boolean => {
    return holidays.some(existing => {
      const existingStart = existing.start;
      const existingEnd = existing.end;
      const newStartIsWithin = newStart >= existingStart && newStart <= existingEnd;
      const newEndIsWithin = newEnd >= existingStart && newEnd <= existingEnd;
      const newEnvelopsExisting = newStart <= existingStart && newEnd >= existingEnd;
      
      return newStartIsWithin || newEndIsWithin || newEnvelopsExisting;
    });
  };


  async function onSubmit(data: HolidayFormValues) {
    if (!firestore) return;
    setStatus(null);

    if (checkForOverlap(data.start, data.end)) {
        form.setError("root", { 
            type: "manual", 
            message: "Der angegebene Zeitraum überschneidet sich mit einem bestehenden Termin."
        });
        setStatus({ type: 'error', message: "Der Termin überschneidet sich mit einem bestehenden Ferientermin." });
        return;
    }

    try {
      await addDoc(collection(firestore, 'holidays'), {
        name: data.name,
        start: data.start,
        end: data.end,
      });

      setStatus({ type: 'success', message: 'Der neue Ferientermin wurde erfolgreich hinzugefügt.' });
      
      form.reset({ name: '', start: undefined, end: undefined });
      await fetchHolidays();

    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      setStatus({ type: 'error', message: 'Der Ferientermin konnte nicht gespeichert werden.' });
    }
  }

  const handleDelete = async () => {
    if (!firestore || !holidayToDelete) return;
    setIsDeleting(true);
    setStatus(null);
    try {
      await deleteDoc(doc(firestore, 'holidays', holidayToDelete));
      setStatus({ type: 'success', message: 'Der Ferientermin wurde erfolgreich entfernt.' });
      await fetchHolidays();
    } catch (error) {
      console.error("Fehler beim Löschen: ", error);
      setStatus({ type: 'error', message: 'Der Ferientermin konnte nicht gelöscht werden.' });
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      setHolidayToDelete(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setHolidayToDelete(id);
    setDialogOpen(true);
  };
  
  const { isSubmitting } = form.formState;

  return (
    <>
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Ferientermine bearbeiten</CardTitle>
          <CardDescription>
            Hier können Sie die Daten für die Praxisferien verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 border-b pb-8">
            <h3 className="mb-4 text-lg font-bold">Neuen Termin erfassen</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_1fr_2fr_auto]">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Erster Ferientag</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                disabled={isSubmitting}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, 'dd.MM.yyyy')
                                ) : (
                                  <span>Datum wählen</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                              locale={de}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Letzter Ferientag</FormLabel>
                         <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                disabled={isSubmitting}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, 'dd.MM.yyyy')
                                ) : (
                                  <span>Datum wählen</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < (form.getValues('start') || new Date('1900-01-01'))}
                              initialFocus
                              locale={de}
                            />
                          </PopoverContent>
                        </Popover>
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
                          <Input placeholder="z.B. Weihnachtsferien" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end h-full">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
                    </Button>
                  </div>
                </div>
                 {status && (
                  <Alert variant={status.type === 'error' ? 'destructive' : 'default'} className={cn(status.type === 'success' && 'border-green-500 text-green-700 dark:border-green-700')}>
                    {status.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{status.type === 'success' ? 'Erfolg' : 'Fehler'}</AlertTitle>
                    <AlertDescription>
                      {status.message}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </Form>
          </div>

          <div className="mt-8">
             <h3 className="mb-4 text-lg font-bold">Bestehende Termine</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ferienname</TableHead>
                    <TableHead>Erster Ferientag</TableHead>
                    <TableHead>Letzter Ferientag</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : holidays.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Keine Termine vorhanden.
                      </TableCell>
                    </TableRow>
                  ) : (
                    holidays.map((holiday) => (
                      <TableRow key={holiday.id}>
                        <TableCell>{holiday.name}</TableCell>
                        <TableCell>{format(holiday.start, 'dd.MM.yyyy', { locale: de })}</TableCell>
                        <TableCell>{format(holiday.end, 'dd.MM.yyyy', { locale: de })}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(holiday.id)}>
                              <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
                Dieser Ferientermin wird endgültig gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setHolidayToDelete(null)}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
