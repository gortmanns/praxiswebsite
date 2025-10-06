'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    // Redirect is now handled by the middleware upon successful sign-in.
    // However, to be explicit, we can redirect here.
    redirect('/admin/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    throw error;
  }
}
