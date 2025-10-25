
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { auth } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('g.ortmanns@praxiszentrum-im-ring.ch');
  const [password, setPassword] = useState('PraZeiR2023.');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) {
        setError("Authentifizierungsdienst nicht bereit. Bitte versuchen Sie es in einem Moment erneut.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/admin/dashboard');
    } catch (err: any) {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            setError('Falsche Anmeldedaten. Bitte versuchen Sie es erneut.');
        } else if (err.code === 'auth/too-many-requests') {
            setError('Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es später erneut.');
        }
        else {
            setError(err.message);
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="items-center text-center">
            <Image
                src="/images/praxiszentrum-logo.png"
                alt="Praxiszentrum im Ring Logo"
                data-ai-hint="practice logo"
                width={234}
                height={48}
                className="h-auto mb-4"
                priority
              />
          <CardTitle>Admin-Bereich</CardTitle>
          <CardDescription>Bitte melden Sie sich an, um fortzufahren.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Benutzername</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@praxis-im-ring.ch" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Anmeldung wird verarbeitet...' : 'Anmelden'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
