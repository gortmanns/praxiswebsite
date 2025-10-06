
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StaffPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Praxispersonal verwalten</CardTitle>
                <CardDescription>Hier können Sie das Praxispersonal verwalten.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Der Inhalt für die Personal-Verwaltung wird hier in Kürze verfügbar sein.</p>
            </CardContent>
        </Card>
    </div>
  );
}
