
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

  if (username === 'admin' && password === '1234') {
    const email = `${username}@example.com`;
    try {
        // First, try to sign in. This will fail if the user does not exist.
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        const authError = error as FirebaseAuthError;
        // If the user does not exist, create them.
        if (authError.code === 'auth/user-not-found') {
            try {
                const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = newUserCredential.user;
                
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: 'Admin User',
                    createdAt: serverTimestamp(),
                });
            } catch (creationError) {
                // If creation fails (e.g., weak password), it's a server error.
                return 'Benutzererstellung fehlgeschlagen. Bitte versuchen Sie es erneut.';
            }
        } else if (authError.code !== 'auth/wrong-password') {
            // For other unexpected Firebase errors
            return 'Ein unerwarteter Firebase-Fehler ist aufgetreten.';
        }
    }
  }

  // Now, proceed with NextAuth signIn, which will use the authorize function.
  // The user (admin or otherwise) should exist at this point or have correct credentials.
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
    throw error;
  }
}
