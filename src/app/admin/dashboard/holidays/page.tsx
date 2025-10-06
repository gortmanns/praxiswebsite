
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HolidaysPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Ferientermine bearbeiten</CardTitle>
                <CardDescription>Hier können Sie die Daten für die Praxisferien verwalten.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Der Inhalt für die Ferien-Verwaltung wird hier in Kürze verfügbar sein.</p>
            </CardContent>
        </Card>
    </div>
  );
}
