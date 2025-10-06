'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // Redirect to dashboard on success, required for Next.js 15
    // see: https://nextjs.org/docs/app/building-your-application/routing/redirecting#in-server-actions
    redirect('/admin/dashboard');
  }
}
