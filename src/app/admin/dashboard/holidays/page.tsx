
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format, isWithinInterval, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<string | null>(null);

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
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Ferientermine konnten nicht geladen werden.",
      });
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

    if (checkForOverlap(data.start, data.end)) {
        form.setError("root", { 
            type: "manual", 
            message: "Der angegebene Zeitraum überschneidet sich mit einem bestehenden Termin."
        });
        toast({
            variant: "destructive",
            title: "Fehler: Überschneidung",
            description: "Der Termin überschneidet sich mit einem bestehenden Ferientermin.",
        });
        return;
    }

    try {
      await addDoc(collection(firestore, 'holidays'), {
        name: data.name,
        start: data.start,
        end: data.end,
      });

      toast({
        title: 'Gespeichert!',
        description: 'Der neue Ferientermin wurde erfolgreich hinzugefügt.',
      });

      form.reset({ name: '', start: undefined, end: undefined });
      await fetchHolidays();

    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Ferientermin konnte nicht gespeichert werden.",
      });
    }
  }

  const handleDelete = async () => {
    if (!firestore || !holidayToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, 'holidays', holidayToDelete));
      toast({
        title: 'Gelöscht!',
        description: 'Der Ferientermin wurde erfolgreich entfernt.',
      });
      await fetchHolidays();
    } catch (error) {
      console.error("Fehler beim Löschen: ", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Ferientermin konnte nicht gelöscht werden.",
      });
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
          <CardTitle>Ferientermine bearbeiten</CardTitle>
          <CardDescription>
            Hier können Sie die Daten für die Praxisferien verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 border-b pb-8">
            <h3 className="mb-4 text-lg font-medium">Neuen Termin erfassen</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_1fr_2fr_auto]">
                 <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Erster Ferientag</FormLabel>
                        <div className="relative">
                          <FormControl>
                              <Input
                                  placeholder="dd.mm.yyyy"
                                  value={field.value ? format(field.value, 'dd.MM.yyyy') : ''}
                                  onChange={(e) => {
                                      const parsedDate = parse(e.target.value, 'dd.MM.yyyy', new Date());
                                      if (!isNaN(parsedDate.getTime())) {
                                          field.onChange(parsedDate);
                                      } else if (e.target.value === '') {
                                          field.onChange(undefined);
                                      }
                                  }}
                                  onBlur={field.onBlur}
                                  disabled={isSubmitting}
                              />
                          </FormControl>
                          <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                                  disabled={isSubmitting}
                                >
                                  <CalendarIcon className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date('1900-01-01')}
                                      initialFocus
                                      locale={de}
                                  />
                              </PopoverContent>
                          </Popover>
                        </div>
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
                      <div className="relative">
                        <FormControl>
                          <Input
                              placeholder="dd.mm.yyyy"
                              value={field.value ? format(field.value, 'dd.MM.yyyy') : ''}
                              onChange={(e) => {
                                  const parsedDate = parse(e.target.value, 'dd.MM.yyyy', new Date());
                                  if (!isNaN(parsedDate.getTime())) {
                                      field.onChange(parsedDate);
                                  } else if (e.target.value === '') {
                                      field.onChange(undefined);
                                  }
                              }}
                              onBlur={field.onBlur}
                              disabled={isSubmitting}
                          />
                        </FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                                disabled={isSubmitting}
                              >
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
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
                      </div>
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
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-8">
             <h3 className="mb-4 text-lg font-medium">Bestehende Termine</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Erster Ferientag</TableHead>
                    <TableHead>Letzter Ferientag</TableHead>
                    <TableHead>Ferienname</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-48" /></TableCell>
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
                        <TableCell>{format(holiday.start, 'dd.MM.yyyy', { locale: de })}</TableCell>
                        <TableCell>{format(holiday.end, 'dd.MM.yyyy', { locale: de })}</TableCell>
                        <TableCell>{holiday.name}</TableCell>
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

    