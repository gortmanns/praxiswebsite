
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon, Trash2, AlertCircle, CheckCircle, Pencil, TriangleAlert, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
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
  name: z.string().min(2, { message: 'Die Bezeichnung muss mindestens 2 Zeichen lang sein.' }),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [conflictingHolidayId, setConflictingHolidayId] = useState<string | null>(null);

  const firestore = useFirestore();

  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);


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


  const checkForOverlap = (newStart: Date, newEnd: Date, excludeId: string | null): string | null => {
    for (const existing of holidays) {
        if (existing.id === excludeId) continue;
        
        const existingStart = existing.start;
        const existingEnd = existing.end;
        const newStartIsWithin = newStart >= existingStart && newStart <= existingEnd;
        const newEndIsWithin = newEnd >= existingStart && newEnd <= existingEnd;
        const newEnvelopsExisting = newStart <= existingStart && newEnd >= existingEnd;
        
        if (newStartIsWithin || newEndIsWithin || newEnvelopsExisting) {
            return existing.id;
        }
    }
    return null;
  };

  const handleCancel = () => {
    setEditMode(null);
    form.reset({ name: '', start: undefined, end: undefined });
    setStatus(null);
    setConflictingHolidayId(null);
    form.clearErrors();
  };

  async function onSubmit(data: HolidayFormValues) {
    if (!firestore) return;
    setIsSubmitting(true);
    setStatus(null);
    setConflictingHolidayId(null);
    form.clearErrors('root');

    const conflictingId = checkForOverlap(data.start, data.end, editMode);
    if (conflictingId) {
        setStatus({ 
            type: "warning", 
            message: "Der angegebene Zeitraum darf sich nicht mit einem bereits bestehenden Ferienzeitraum überschneiden. Der den Konflikt erzeugende Eintrag wurde in der Tabelle hervorgehoben."
        });
        setConflictingHolidayId(conflictingId);
        setIsSubmitting(false);
        return;
    }

    try {
      if (editMode) {
        const holidayDoc = doc(firestore, 'holidays', editMode);
        await updateDoc(holidayDoc, {
            name: data.name,
            start: data.start,
            end: data.end,
        });
        setStatus({ type: 'success', message: 'Der Ferientermin wurde erfolgreich aktualisiert.' });
      } else {
        await addDoc(collection(firestore, 'holidays'), {
            name: data.name,
            start: data.start,
            end: data.end,
        });
        setStatus({ type: 'success', message: 'Der neue Ferientermin wurde erfolgreich hinzugefügt.' });
      }
      
      handleCancel();
      await fetchHolidays();

    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      setStatus({ type: 'error', message: 'Der Ferientermin konnte nicht gespeichert werden.' });
    } finally {
      setIsSubmitting(false);
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
      setDeleteDialogOpen(false);
      setHolidayToDelete(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setHolidayToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleEdit = (holiday: Holiday) => {
    setEditMode(holiday.id);
    form.setValue('name', holiday.name);
    form.setValue('start', holiday.start);
    form.setValue('end', holiday.end);
    setStatus({ type: 'info', message: 'Sie können nun den markierten Termin bearbeiten.' });
    setConflictingHolidayId(null);
    form.clearErrors();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const getStatusAlert = () => {
    if (!status) return null;

    const commonClasses = "border-2";
    let variant: 'default' | 'destructive' | 'warning' | 'info' = 'default';
    let icon = <CheckCircle className="h-4 w-4" />;
    let title = "Erfolg";
    let alertClasses = "border-green-500 text-green-800 bg-green-50";

    switch(status.type) {
        case 'error':
            variant = 'destructive';
            icon = <AlertCircle className="h-4 w-4" />;
            title = "Fehler";
            alertClasses = "border-red-500 text-red-800 bg-red-50";
            break;
        case 'warning':
            variant = 'warning';
            icon = <TriangleAlert className="h-4 w-4" />;
            title = "Warnung";
            alertClasses = "border-yellow-500 text-yellow-800 bg-yellow-50";
            break;
        case 'info':
            variant = 'info';
            icon = <Info className="h-4 w-4" />;
            title = "Information";
            alertClasses = "border-blue-500 text-blue-800 bg-blue-50";
            break;
    }
    
    return (
        <Alert variant={variant} className={cn(commonClasses, alertClasses)}>
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {status.message}
            </AlertDescription>
        </Alert>
    );
};
  
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
          <div className="mb-8 rounded-lg border bg-muted p-6 pb-8 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">{editMode ? 'Termin bearbeiten' : 'Neuen Termin erfassen'}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_1fr_2fr_auto]">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Erster Ferientag</FormLabel>
                        <div className="flex items-center gap-2">
                           <Input
                                type="text"
                                placeholder={format(new Date(), 'dd.MM.yyyy')}
                                value={field.value ? format(field.value, 'dd.MM.yyyy') : ''}
                                onChange={(e) => {
                                    // Basic parsing, can be improved with a date-fns parse
                                    const dateParts = e.target.value.split('.');
                                    if (dateParts.length === 3) {
                                        const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                                        if (!isNaN(date.getTime())) {
                                            field.onChange(date);
                                        }
                                    }
                                }}
                                disabled={isSubmitting}
                                className="w-full"
                            />
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn("h-10 w-10 p-0", !field.value && "text-muted-foreground")}
                                disabled={isSubmitting}
                                >
                                <CalendarIcon className="h-5 w-5" />
                                </Button>
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
                        <div className="flex items-center gap-2">
                           <Input
                                type="text"
                                placeholder={format(new Date(), 'dd.MM.yyyy')}
                                value={field.value ? format(field.value, 'dd.MM.yyyy') : ''}
                                onChange={(e) => {
                                    const dateParts = e.target.value.split('.');
                                    if (dateParts.length === 3) {
                                        const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                                        if (!isNaN(date.getTime())) {
                                            field.onChange(date);
                                        }
                                    }
                                }}
                                disabled={isSubmitting}
                                className="w-full"
                            />
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn("h-10 w-10 p-0", !field.value && "text-muted-foreground")}
                                disabled={isSubmitting}
                                >
                                <CalendarIcon className="h-5 w-5" />
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
                        <FormLabel>Bezeichnung</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. Weihnachtsferien" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex h-full items-end gap-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
                    </Button>
                    {editMode && (
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Abbrechen
                        </Button>
                    )}
                  </div>
                </div>
                 <div className="mt-6 min-h-[76px]">
                  {getStatusAlert()}
                 </div>
              </form>
            </Form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Bestehende Termine</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0 bg-primary hover:bg-primary/90">
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Erster Ferientag</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Letzter Ferientag</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Bezeichnung</TableHead>
                    <TableHead className="py-3 px-4 text-left text-sm font-semibold text-primary-foreground">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="py-4 px-4"><Skeleton className="h-5 w-40" /></TableCell>
                        <TableCell className="py-4 px-4 text-left space-x-2"><Skeleton className="h-9 w-24 inline-block" /><Skeleton className="h-9 w-24 inline-block" /></TableCell>
                      </TableRow>
                    ))
                  ) : holidays.length > 0 ? (
                    holidays.map((holiday) => (
                      <TableRow key={holiday.id} className={cn(
                          conflictingHolidayId === holiday.id && "bg-yellow-100/70",
                          editMode === holiday.id && "bg-blue-100/70"
                        )}>
                        <TableCell className="py-3 px-4 font-bold">{format(holiday.start, 'dd.MM.yyyy')}</TableCell>
                        <TableCell className="py-3 px-4 font-bold">{format(holiday.end, 'dd.MM.yyyy')}</TableCell>
                        <TableCell className="py-3 px-4 font-bold">{holiday.name}</TableCell>
                        <TableCell className="py-3 px-4 text-left space-x-2">
                           <Button variant="outline" size="sm" onClick={() => handleEdit(holiday)} disabled={isSubmitting || isDeleting}>
                                <Pencil className="mr-2 h-4 w-4" /> Bearbeiten
                           </Button>
                           <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(holiday.id)} disabled={isSubmitting || isDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" /> Löschen
                           </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 px-4 text-center text-muted-foreground">
                        Keine Ferientermine gefunden.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
                Möchten Sie diesen Ferientermin wirklich unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className={cn(buttonVariants({ variant: "destructive" }))}>
                {isDeleting ? 'Wird gelöscht...' : 'Löschen'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
