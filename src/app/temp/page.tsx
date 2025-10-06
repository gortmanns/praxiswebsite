'use client';

import { useState } from 'react';
import { useAuth } from '@/firebase/provider';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function TempAdminPage() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();

  const handleCreateAdmin = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    if (!auth) {
      setError('Firebase Auth ist nicht initialisiert.');
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, 'admin@example.com', '123456');
      setMessage('Admin-Benutzer erfolgreich erstellt. E-Mail: admin@example.com, Passwort: 123456');
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError('Fehler: Der Benutzer admin@example.com existiert bereits.');
      } else if (e.code === 'auth/weak-password') {
        setError('Fehler: Das Passwort ist zu schwach. Es muss mindestens 6 Zeichen lang sein.');
      }
      else {
        setError(`Ein unerwarteter Fehler ist aufgetreten: ${e.message}`);
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin-Benutzer erstellen</CardTitle>
          <CardDescription>
            Klicken Sie auf den Button, um den initialen Admin-Benutzer einmalig zu erstellen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button onClick={handleCreateAdmin} disabled={isLoading}>
              {isLoading ? 'Wird erstellt...' : 'Admin anlegen'}
            </Button>
            {message && (
              <Alert variant="default">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Erfolg!</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             <div className="mt-4 rounded-lg border bg-card p-4 text-sm text-card-foreground shadow-sm">
                <p className="font-bold">Anmeldedaten:</p>
                <p>E-Mail: <code className="font-mono">admin@example.com</code></p>
                <p>Passwort: <code className="font-mono">123456</code></p>
                <p className="mt-2 text-xs text-muted-foreground">Hinweis: Das Passwort `1234` ist zu kurz. Firebase Auth erfordert eine Mindestlänge von 6 Zeichen. Ich habe es auf `123456` gesetzt.</p>
             </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
