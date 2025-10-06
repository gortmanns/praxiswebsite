'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        case 'CallbackRouteError':
            return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    throw error;
  }
}
