'use server';
 
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Die 'signIn' Funktion von NextAuth wird mit den Formulardaten aufgerufen.
    // Die eigentliche Logik (Benutzer prüfen, erstellen, anmelden) findet in 'auth.ts' statt.
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    // Hier werden Fehler abgefangen, die von NextAuth geworfen werden.
    if (error instanceof AuthError) {
      switch (error.type) {
        // 'CredentialsSignin' ist der spezifische Fehler für ungültige Anmeldedaten.
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          // Ein Fallback für andere, unerwartete Authentifizierungsfehler.
          return 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // Wenn es kein AuthError ist, wird der Fehler weitergeworfen, um von Next.js behandelt zu werden.
    throw error;
  }
}
