
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase/provider';
import { doc, collection, addDoc, deleteDoc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon, Plus, Trash2, AlertCircle } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

// --- Typen-Definitionen ---
interface Holiday {
  id: string;
  name: string;
  start: Date;
  end: Date;
}

interface HolidayFromDB {
  id: string;
  name: string;
  start: Timestamp;
  end: Timestamp;
}

const initialHolidayState: Omit<Holiday, 'id'> = {
  name: 'Sommerferien',
  start: new Date(),
  end: new Date(),
};

export default function HolidaysPage() {
  const firestore = useFirestore();
  const holidaysQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'holidays'), orderBy('start', 'desc')) : null, [firestore]);
  const { data, isLoading, error } = useCollection<HolidayFromDB>(holidaysQuery);
  const { toast } = useToast();

  const [newHoliday, setNewHoliday] = useState<Omit<Holiday, 'id'>>(initialHolidayState);
  const [deleteConfirm, setDeleteConfirm] = useState<Holiday | null>(null);

  const activeHolidays = useMemo(() => {
    if (!data) return [];
    return data
        .map(h => ({ ...h, start: h.start.toDate(), end: h.end.toDate() }))
        .filter(h => isBefore(new Date(), h.end)) // Nur zukünftige und aktuelle Ferien
        .sort((a,b) => a.start.getTime() - b.start.getTime()); // Aufsteigend sortieren
  }, [data]);
  
  const handleInputChange = (field: keyof Omit<Holiday, 'id'>, value: string | Date | null) => {
    setNewHoliday(prev => ({...prev, [field]: value }));
  };

  const handleCreate = async () => {
      if (!firestore) return;
      if (isBefore(newHoliday.end, newHoliday.start)) {
          toast({ variant: 'destructive', title: "Ungültiges Datum", description: "Das Enddatum darf nicht vor dem Startdatum liegen." });
          return;
      }

      try {
          const dataToSave = {
              name: newHoliday.name,
              start: Timestamp.fromDate(newHoliday.start),
              end: Timestamp.fromDate(newHoliday.end),
              createdAt: serverTimestamp(),
          };
          const newDocRef = await addDocumentNonBlocking(collection(firestore, 'holidays'), dataToSave);
          toast({ title: "Erstellt", description: "Der neue Ferientermin wurde erfolgreich gespeichert." });
          setNewHoliday(initialHolidayState); // Reset form
      } catch (e: any) {
           toast({ variant: 'destructive', title: "Fehler", description: `Speichern fehlgeschlagen: ${e.message}` });
      }
  };

  const handleDelete = async (holidayId: string) => {
      if (!firestore) return;
      try {
          await deleteDocumentNonBlocking(doc(firestore, 'holidays', holidayId));
          toast({ title: "Gelöscht", description: "Der Ferientermin wurde entfernt." });
          setDeleteConfirm(null);
      } catch (e: any) {
           toast({ variant: 'destructive', title: "Fehler", description: `Löschen fehlgeschlagen: ${e.message}` });
      }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Neue Praxisferien eintragen</CardTitle>
          <CardDescription>Fügen Sie hier neue Ferienzeiten hinzu. Diese werden automatisch auf der Webseite und in den Bannern berücksichtigt.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="holiday-name">Bezeichnung</Label>
            <Input id="holiday-name" value={newHoliday.name} onChange={(e) => handleInputChange('name', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Startdatum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !newHoliday.start && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newHoliday.start ? format(newHoliday.start, 'PPP', { locale: de }) : <span>Datum wählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={newHoliday.start} onSelect={(date) => handleInputChange('start', date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Enddatum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !newHoliday.end && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newHoliday.end ? format(newHoliday.end, 'PPP', { locale: de }) : <span>Datum wählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={newHoliday.end} onSelect={(date) => handleInputChange('end', date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Ferien hinzufügen
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Geplante Ferientermine</CardTitle>
          <CardDescription>Übersicht der bevorstehenden und aktuellen Praxisferien.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Fehler</AlertTitle><AlertDescription>Daten konnten nicht geladen werden.</AlertDescription></Alert>}
            {!isLoading && activeHolidays.length === 0 && <p className="text-sm text-center text-muted-foreground py-4">Keine geplanten Ferien vorhanden.</p>}
            {activeHolidays.map(holiday => (
              <div key={holiday.id} className="flex items-center justify-between rounded-md border p-4">
                <div>
                  <p className="font-semibold">{holiday.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(holiday.start, 'd. MMMM yyyy', {locale: de})} - {format(holiday.end, 'd. MMMM yyyy', {locale: de})}
                  </p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => setDeleteConfirm(holiday)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie den Ferientermin "{deleteConfirm?.name}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
