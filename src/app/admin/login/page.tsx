'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/firebase/provider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth({ redirectOn: 'login', redirectTo: '/admin/dashboard' });

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!auth) {
            setError("Authentifizierungs-Dienst nicht verfügbar. Bitte versuchen Sie es später erneut.");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect is handled by the useAuth hook
        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Ungültiges E-Mail-Format.');
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('E-Mail oder Passwort ist falsch.');
                    break;
                default:
                    setError('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
                    console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                     <Image
                        src="/images/praxiszentrum-logo.png"
                        alt="Praxiszentrum im Ring Logo"
                        data-ai-hint="practice logo"
                        width={200}
                        height={40}
                        className="mx-auto"
                    />
                    <CardTitle className="text-2xl pt-4">Admin-Bereich</CardTitle>
                    <CardDescription>Bitte melden Sie sich an, um fortzufahren</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Anmeldung fehlgeschlagen</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">E-Mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Passwort</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Anmelden...' : 'Anmelden'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
