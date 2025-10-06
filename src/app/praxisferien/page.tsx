'use client';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface HolidayDocument {
  id: string;
  name: string;
  start: Timestamp;
  end: Timestamp;
}

interface Holiday {
  id: string;
  name: string;
  start: Date;
  end: Date;
}

function formatDate(date: Date) {
  return format(date, 'd. MMMM yyyy', { locale: de });
}

export default function PraxisferienPage() {
  const firestore = useFirestore();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const holidaysQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'holidays'),
      where('end', '>=', now), // Nur Ferien, deren Enddatum heute oder in der Zukunft liegt
      orderBy('end', 'asc'),   // Sortiere nach dem Enddatum
      orderBy('start', 'asc')  // Sekundäre Sortierung nach Startdatum
    );
  }, [firestore, now]);

  const { data: upcomingHolidayDocs, isLoading } = useCollection<HolidayDocument>(holidaysQuery);
  
  // Konvertiere Timestamps und sortiere clientseitig final nach 'start'
  const sortedHolidays: Holiday[] = useMemo(() => {
    if (!upcomingHolidayDocs) return [];
    return upcomingHolidayDocs
      .map(doc => ({
        ...doc,
        start: doc.start.toDate(),
        end: doc.end.toDate(),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [upcomingHolidayDocs]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl sm:whitespace-nowrap text-primary">
                    PRAXISFERIEN
                </h2>
                <p className="mt-6 text-lg text-foreground/80">
                    Auf dieser Seite finden Sie stets eine Übersicht aller Praxisferien, soweit diese bereits geplant sind.
                </p>
            </div>
            <div className="mx-auto mt-16 w-full max-w-2xl space-y-8">
              {isLoading ? (
                // Ladezustand mit Skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-5 w-3/4" />
                    {index < 2 && <hr className="mt-8 border-t border-border" />}
                  </div>
                ))
              ) : sortedHolidays.length > 0 ? (
                // Daten geladen und vorhanden
                sortedHolidays.map((holiday, index) => (
                  <div key={holiday.id}>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-primary">{holiday.name}</h3>
                      <p className="text-lg text-foreground/80">
                        {formatDate(holiday.start)} – {formatDate(holiday.end)}
                      </p>
                    </div>
                    {index < sortedHolidays.length - 1 && <hr className="mt-8 border-t border-border" />}
                  </div>
                ))
              ) : (
                // Daten geladen, aber keine Einträge
                <p className="text-center text-lg text-foreground/80">Aktuell sind keine Praxisferien geplant.</p>
              )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
