'use server';
 
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schief gelaufen.';
      }
    }
    throw error;
  }
}
