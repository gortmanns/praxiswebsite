
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import holidays from '@/lib/holidays.json';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  // Add time to avoid off-by-one errors with timezones
  const zonedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  return format(zonedDate, 'd. MMMM yyyy', { locale: de });
}

export default function PraxisferienPage() {
  const now = new Date();
  now.setHours(0,0,0,0);
  const upcomingHolidays = holidays.filter(holiday => new Date(holiday.end) >= now);

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
              {upcomingHolidays.length > 0 ? (
                upcomingHolidays.map((holiday, index) => (
                  <div key={holiday.name}>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-primary">{holiday.name}</h3>
                      <p className="text-lg text-foreground/80">
                        {formatDate(holiday.start)} – {formatDate(holiday.end)}
                      </p>
                    </div>
                    {index < upcomingHolidays.length - 1 && <hr className="mt-8 border-t border-border" />}
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-foreground/80">Aktuell sind keine Praxisferien geplant.</p>
              )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
