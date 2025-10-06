
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

// Server-side Firebase initialization
function initializeServerSideFirebase(): FirebaseApp {
    if (getApps().length) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}
 
export const { handlers, signIn, signOut, auth: authSession } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            const firebaseApp = initializeServerSideFirebase();
            const auth = getAuth(firebaseApp);

            if (!credentials?.username || !credentials?.password) {
                return null;
            }

            const email = `${credentials.username}@example.com`;
            const password = credentials.password as string;

            try {
                // Diese Funktion prüft nur, ob der Benutzer in Firebase existiert und das Passwort stimmt.
                // Die Erstellung des Admin-Benutzers findet in der `authenticate` Server Action statt.
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                if (userCredential.user) {
                    // Wenn erfolgreich, gebe das Benutzerobjekt für die NextAuth-Sitzung zurück.
                    return { 
                        id: userCredential.user.uid, 
                        name: userCredential.user.displayName, 
                        email: userCredential.user.email 
                    };
                }
                return null;
            } catch (error) {
                // Wenn ein Fehler auftritt (z.B. user-not-found, wrong-password),
                // gib null zurück. NextAuth wird dies als fehlgeschlagene Anmeldung interpretieren.
                console.log('Authorize error:', error);
                return null;
            }
        }
    }),
  ],
});
