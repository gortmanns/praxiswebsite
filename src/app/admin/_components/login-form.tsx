'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticate } from '@/app/admin/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Benutzername</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="admin"
            required
            defaultValue="admin"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            defaultValue="1234"
          />
        </div>
      </div>
      
      {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login fehlgeschlagen</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      Anmelden
    </Button>
  );
}
