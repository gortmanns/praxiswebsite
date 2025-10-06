'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Explicitly redirect to the dashboard on successful sign-in.
    // This is a more robust way to handle the redirect than relying solely on middleware.
    await signIn('credentials', {
      ...Object.fromEntries(formData.entries()),
      redirectTo: '/admin/dashboard',
    });
    return; // This line will not be reached on success due to the redirect.
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // For any other errors, re-throw them so Next.js can handle them.
    throw error;
  }
}
