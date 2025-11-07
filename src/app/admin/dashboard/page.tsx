'use client';

import React, { useState } from 'react';
import { useAuth, FirebaseClientProvider } from '@/firebase';
import { updatePassword } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { AppSidebar } from './_components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

function DashboardPageContent() {
  const auth = useAuth();
  const user = auth.currentUser;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentPassword = 'password';

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError('Bitte füllen Sie beide Passwortfelder aus.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Das neue Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }

    if (!user) {
      setError('Benutzer nicht authentifiziert. Bitte neu anmelden.');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(user, newPassword);
      setSuccess('Ihr Passwort wurde erfolgreich geändert.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Password change error:', err);
       if (err.code === 'auth/requires-recent-login') {
            setError('Diese Aktion erfordert eine kürzliche Anmeldung. Bitte melden Sie sich ab und wieder an, um fortzufahren.');
       } else {
            setError(`Ein Fehler ist aufgetreten: ${err.message}`);
       }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-start p-4 sm:p-6">
      <div className="w-full space-y-8">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Willkommen im Admin-Bereich</CardTitle>
                <CardDescription>Hier können Sie Ihre Anmeldedaten verwalten und Inhalte der Webseite bearbeiten.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Bitte wählen Sie einen Menüpunkt auf der linken Seite, um Inhalte zu bearbeiten.</p>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ihre Anmeldedaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Benutzername (E-Mail)</Label>
              <Input id="email" type="text" value={user?.email || ''} readOnly disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-password">Ihr aktuelles Passwort</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={currentPassword}
                  readOnly
                  disabled
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleChangePassword} className="space-y-4 rounded-lg border bg-muted/50 p-4">
              <h4 className="font-medium">Passwort ändern</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Neues Passwort</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mindestens 6 Zeichen"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Neues Passwort bestätigen</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Passwort wiederholen"
                  />
                </div>
              </div>

               {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Erfolgreich</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Wird gespeichert...' : 'Neues Passwort speichern'}
              </Button>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <FirebaseClientProvider>
            <SidebarProvider>
                <div className="flex">
                    <AppSidebar />
                    <main className="flex-1">
                        <DashboardPageContent />
                    </main>
                </div>
            </SidebarProvider>
        </FirebaseClientProvider>
    );
}
