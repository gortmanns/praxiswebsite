
'use server';

import { z } from 'zod';
import { getSession } from '@/lib/session';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { initializeFirebaseServer } from '@/firebase/server-init';

// Initialize Firebase on the server and get the auth instance
const { auth } = initializeFirebaseServer();

const loginSchema = z.object({
  username: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  password: z.string().min(1, "Passwort ist erforderlich."),
});

type LoginResult = {
  success: boolean;
  error?: string;
};

export async function login(credentials: unknown): Promise<LoginResult> {
  const result = loginSchema.safeParse(credentials);

  if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message).join(' ');
      return { success: false, error: errorMessages };
  }

  const { username, password } = result.data;

  try {
    // Use the server-side auth instance
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;

    if (user) {
        const idToken = await user.getIdToken();
        const session = await getSession();
        
        session.isLoggedIn = true;
        session.username = user.email || 'Admin';
        session.idToken = idToken;
        
        await session.save();
        
        return { success: true };
    }
    
    // This case should not be reached if signInWithEmailAndPassword succeeds
    return { success: false, error: 'Benutzer nach erfolgreichem Login nicht gefunden.' };

  } catch (error: any) {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten.';
    switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
        case AuthErrorCodes.USER_DELETED:
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            errorMessage = 'Ungültiger Benutzername oder falsches Passwort.';
            break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            errorMessage = 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es später erneut.';
            break;
        default:
             errorMessage = `Login fehlgeschlagen: ${error.message} (Code: ${error.code})`;
            break;
    }
     return { success: false, error: errorMessage };
  }
}
