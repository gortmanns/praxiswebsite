
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ColorPaletteDemo } from '@/app/_components/color-palette-demo';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VisualDesignPage() {
  return (
    <div className="flex flex-1 flex-col items-start gap-8 p-4 sm:p-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Überblick über die Design Elemente</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Alert variant="info">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-bold">Info-Meldung</AlertTitle>
                        <AlertDescription>
                            Dies ist eine informative Benachrichtigung.
                        </AlertDescription>
                    </Alert>
                    <Alert variant="success">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Erfolgsmeldung</AlertTitle>
                        <AlertDescription>
                            Die Aktion wurde erfolgreich abgeschlossen.
                        </AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Warnung</AlertTitle>
                        <AlertDescription>
                            Unerwartetes Ergebnis, aber die Aktion wurde nicht abgebrochen (z.B. suboptimales Bildformat).
                        </AlertDescription>
                    </Alert>
                    <Alert variant="error">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Fehlermeldung</AlertTitle>
                        <AlertDescription>
                            Ein technischer Fehler ist aufgetreten, die Anwendung kann aber weiterlaufen.
                        </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Kritischer Fehler</AlertTitle>
                        <AlertDescription>
                            Ein kritischer Fehler ist aufgetreten. Die Aktion wurde abgebrochen.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>

        <ColorPaletteDemo />
    </div>
  );
}
