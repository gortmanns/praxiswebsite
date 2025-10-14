
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon, Trash2, PlusCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface Holiday {
  id: string;
  name: string;
  start: Date;
  end: Date;
}

export default function HolidaysPage() {
  const firestore = useFirestore();

  const [newName, setNewName] = useState('');
  const [newStart, setNewStart] = useState<Date | undefined>();
  const [newEnd, setNewEnd] = useState<Date | undefined>();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; holidayId?: string; holidayName?: string }>({ isOpen: false });

  const holidaysQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'holidays'), orderBy('start', 'asc'));
  }, [firestore]);

  const { data: holidaysData, isLoading, error: dbError } = useCollection<{ name: string; start: any; end: any }>(holidaysQuery);

  const holidays: Holiday[] = useMemo(() => {
    return holidaysData?.map(h => ({
      ...h,
      start: h.start.toDate(),
      end: h.end.toDate(),
    })) || [];
  }, [holidaysData]);
  
  const handleAddHoliday = async () => {
    if (!newName || !newStart || !newEnd) {
      setError('Bitte füllen Sie alle Felder aus.');
      return;
    }
    if (newEnd < newStart) {
      setError('Das Enddatum muss nach dem Startdatum liegen.');
      return;
    }
    if (!firestore) {
      setError('Datenbankverbindung nicht verfügbar.');
      return;
    }
    setError(null);

    try {
      await addDoc(collection(firestore, 'holidays'), {
        name: newName,
        start: newStart,
        end: newEnd,
        createdAt: serverTimestamp(),
      });
      // Reset form
      setNewName('');
      setNewStart(undefined);
      setNewEnd(undefined);
      setIsAdding(false);
    } catch (e: any) {
      setError(`Fehler beim Speichern: ${e.message}`);
    }
  };

  const handleDeleteHoliday = async () => {
    if (!firestore || !deleteConfirm.holidayId) return;
    try {
      await deleteDoc(doc(firestore, 'holidays', deleteConfirm.holidayId));
      setDeleteConfirm({ isOpen: false });
    } catch (e: any) {
      setError(`Fehler beim Löschen: ${e.message}`);
    }
  };

  const formatDateRange = (start: Date, end: Date) => {
    const startFormatted = format(start, 'd. MMMM yyyy', { locale: de });
    const endFormatted = format(end, 'd. MMMM yyyy', { locale: de });
    return `${startFormatted} – ${endFormatted}`;
  }

  return (
    <>
      <div className="flex flex-1 items-start p-4 sm:p-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <CardTitle className="text-primary">Ferientermine bearbeiten</CardTitle>
                    <CardDescription>
                    Hier können Sie die Daten für die Praxisferien verwalten.
                    </CardDescription>
                </div>
                {!isAdding && (
                     <Button onClick={() => setIsAdding(true)}>
                        <PlusCircle className="mr-2" />
                        Neuen Termin hinzufügen
                    </Button>
                )}
            </div>
          </CardHeader>
          <CardContent>
            {dbError && (
              <Alert variant="destructive" className="mb-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Datenbankfehler</AlertTitle>
                <AlertDescription>{dbError.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
                {isAdding && (
                    <div className="rounded-lg border bg-muted p-4">
                        <h3 className="text-lg font-semibold mb-4">Neuen Ferientermin erstellen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bezeichnung</label>
                                <Input
                                placeholder="z.B. Sommerferien"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                     <label className="text-sm font-medium">Von</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !newStart && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {newStart ? format(newStart, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={newStart}
                                            onSelect={setNewStart}
                                            initialFocus
                                            locale={de}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Bis</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !newEnd && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {newEnd ? format(newEnd, 'd. MMM yyyy', { locale: de }) : <span>Datum wählen</span>}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={newEnd}
                                            onSelect={setNewEnd}
                                            initialFocus
                                            locale={de}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleAddHoliday} className="w-full">Speichern</Button>
                                <Button variant="destructive" onClick={() => setIsAdding(false)} className="w-full">Abbrechen</Button>
                            </div>
                        </div>
                        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                    </div>
                )}


                <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Geplante Termine</h3>
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : holidays.length > 0 ? (
                        <div className="space-y-2">
                        {holidays.map((holiday) => (
                            <div key={holiday.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <p className="font-semibold">{holiday.name}</p>
                                <p className="text-sm text-muted-foreground">{formatDateRange(holiday.start, holiday.end)}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteConfirm({ isOpen: true, holidayId: holiday.id, holidayName: holiday.name })}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Keine Ferientermine gefunden.</p>
                    )}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={deleteConfirm.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirm({ isOpen: false })}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                <AlertDialogDescription>
                    Möchten Sie den Ferientermin <strong>{deleteConfirm.holidayName}</strong> wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteHoliday} className={cn(buttonVariants({ variant: "destructive" }))}>Löschen</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
