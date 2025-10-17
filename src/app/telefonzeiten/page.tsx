
import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import { PhoneHoursCalendar } from '../oeffnungszeiten/_components/phone-hours-calendar';

export default function TelefonzeitenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                    TELEFONZEITEN
                </h2>
            </div>

            <div className="mx-auto mt-16">
                <PhoneHoursCalendar />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
