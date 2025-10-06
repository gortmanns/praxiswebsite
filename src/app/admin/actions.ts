
'use server';
 
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type FirebaseAuthError
} from 'firebase/auth';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';


function initializeServerSideFirebase(): FirebaseApp {
    if (getApps().length) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const firebaseApp = initializeServerSideFirebase();
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const email = `${username}@example.com`;

  try {
    // This will trigger the `authorize` callback in `src/lib/auth.ts`
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // If login fails because the user does not exist, AND it's the admin, create it.
          if (username === 'admin' && password === '1234') {
             try {
                await createUserWithEmailAndPassword(auth, email, password);
                // After creating, try to sign in again. This will succeed.
                await signIn('credentials', Object.fromEntries(formData));
                return; // Exit if successful
             } catch (creationError) {
                // If creation fails for some reason (e.g. weak password)
                return 'Admin-Benutzer konnte nicht erstellt werden.';
             }
          }
          // For any other credential error, return the classic message.
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // If it's not an AuthError, it's an unexpected error. Re-throw it.
    throw error;
  }
}
