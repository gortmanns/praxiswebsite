
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BannerPage() {
  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Banner anpassen</CardTitle>
                <CardDescription>Hier können Sie den Text und die Anzeige des Banners für Praxisferien steuern.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Der Inhalt für die Banner-Verwaltung wird hier in Kürze verfügbar sein.</p>
            </CardContent>
        </Card>
    </div>
  );
}
