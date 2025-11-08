'use client';
import { PhoneHoursCalendar } from '../oeffnungszeiten/_components/phone-hours-calendar';
import ClientLayout from '../_components/ClientLayout';

export default function TelefonzeitenPage() {
  return (
    <ClientLayout>
      <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:whitespace-nowrap">
                  TELEFONZEITEN
              </h2>
              <p className="mt-6 text-lg text-foreground/80">
                  Bitte beachten Sie, dass die Telefon- und Öffnungszeiten voneinander abweichen.
              </p>
          </div>

          <div className="mx-auto mt-16">
              <PhoneHoursCalendar />
          </div>
      </div>
    </ClientLayout>
  );
}
