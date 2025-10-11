
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HolidaysPage() {
  
  return (
    <>
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Ferientermine bearbeiten</CardTitle>
          <CardDescription>
            Hier können Sie die Daten für die Praxisferien verwalten. Die Datenbankverbindung wird neu aufgebaut.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Die Verwaltung der Ferientermine wird in Kürze wieder verfügbar sein.</p>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
