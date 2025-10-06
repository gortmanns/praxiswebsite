
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
                
                // Wenn der Benutzer nicht existiert UND es der erste Admin-Login ist, erstelle ihn.
                if (authError.code === 'auth/user-not-found' && credentials.username === 'admin' && String(credentials.password) === '1234') {
                    try {
                        // Erstelle den neuen Benutzer in Firebase Auth.
                        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = newUserCredential.user;
                        
                        // Lege ein Profil für den Benutzer in Firestore an.
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            email: user.email,
                            displayName: 'Admin User',
                            createdAt: serverTimestamp(),
                        });
                        
                        // Gib den neu erstellten Benutzer direkt zurück. NextAuth meldet ihn an.
                        return { id: user.uid, name: user.displayName, email: user.email };

                    } catch (creationError) {
                        console.error("Fehler beim Erstellen des Admin-Benutzers:", creationError);
                        // Wenn die Erstellung fehlschlägt, ist die Anmeldung fehlgeschlagen.
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
