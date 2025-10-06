
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DoctorsPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Ärzte verwalten</CardTitle>
                <CardDescription>Hier können Sie die Ärzte des Praxiszentrums verwalten.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Der Inhalt für die Ärzte-Verwaltung wird hier in Kürze verfügbar sein.</p>
            </CardContent>
        </Card>
    </div>
  );
}
