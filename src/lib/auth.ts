
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type AuthError,
} from 'firebase/auth';
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

// Server-side Firebase initialization
function initializeServerSideFirebase(): FirebaseApp {
    if (getApps().length) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}

const firebaseApp = initializeServerSideFirebase();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
 
export const { handlers, signIn, signOut, auth: authSession } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            if (!credentials.username || !credentials.password) {
                return null;
            }

            const email = `${credentials.username}@example.com`;
            const password = credentials.password as string;

            try {
                // Versuche, den Benutzer direkt anzumelden.
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                return { id: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email };
            } catch (error) {
                 const authError = error as AuthError;

                // Wenn der Benutzer nicht existiert UND es der Admin-Login ist,
                // erstellen wir ihn einmalig.
                if (authError.code === 'auth/user-not-found' && credentials.username === 'admin' && password === '1234') {
                    try {
                        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = newUserCredential.user;
                        
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            email: user.email,
                            displayName: 'Admin User',
                            createdAt: serverTimestamp(),
                        });
                        
                        // Gib den neu erstellten Benutzer zurück.
                        return { id: user.uid, name: user.displayName, email: user.email };
                    } catch (creationError) {
                        // Die Erstellung ist fehlgeschlagen.
                        return null;
                    }
                }
                
                // Bei allen anderen Fehlern (z.B. falsches Passwort) ist die Anmeldung fehlgeschlagen.
                return null;
            }
        }
    }),
  ],
});
