'use server';
 
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type AuthError as FirebaseAuthError
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
    // Versuche, den Benutzer anzumelden
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const authError = error as FirebaseAuthError;
    // Wenn der Benutzer nicht existiert UND es der Admin ist, erstelle ihn
    if (authError.code === 'auth/user-not-found' && username === 'admin' && password === '1234') {
      try {
        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = newUserCredential.user;
        
        // Füge Benutzerprofil in Firestore hinzu
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: 'Admin User',
            createdAt: serverTimestamp(),
        });

        // WICHTIG: Melde den neu erstellten Benutzer explizit an, um Race Conditions zu vermeiden
        await signInWithEmailAndPassword(auth, email, password);

      } catch (creationError) {
        return 'Benutzererstellung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
    } else if (authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
        // Bei falschem Passwort direkt den NextAuth-Fehler auslösen
        // um die Standard-Fehlermeldung anzuzeigen
    } else if (authError.code !== 'auth/user-not-found') {
      // Für andere unerwartete Firebase-Fehler
      console.error('Unerwarteter Firebase-Fehler:', authError);
      return 'Ein unerwarteter Server-Fehler ist aufgetreten.';
    }
  }

  // An diesem Punkt sollte der Benutzer entweder existieren oder gerade erstellt worden sein.
  // Fahre mit dem NextAuth-Anmeldeprozess fort, der die Sitzung verwaltet.
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Ungültiger Benutzername oder falsches Passwort.';
        default:
          return 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.';
      }
    }
    // Wenn es kein AuthError ist, werfen wir ihn weiter.
    throw error;
  }
}
