'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    // Return value is not used on success, as signIn throws a redirect error.
    return;
  } catch (error) {
    if (error instanceof AuthError) {
      // The 'CredentialsSignin' and 'CallbackRouteError' are expected error codes
      // when the user provides invalid credentials. We can map them to a
      // user-friendly error message.
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          // For other errors, we can return a generic message.
          return 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // If the error is not an AuthError, it should be re-thrown so Next.js
    // can handle it. This is crucial for catching unexpected server errors.
    throw error;
  }
}
