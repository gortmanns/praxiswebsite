
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getAuth, signInWithEmailAndPassword, type FirebaseAuthError } from 'firebase/auth';
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
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                if (userCredential.user) {
                    return { 
                        id: userCredential.user.uid, 
                        name: userCredential.user.displayName, 
                        email: userCredential.user.email 
                    };
                }
                return null;
            } catch (error) {
                const authError = error as FirebaseAuthError;
                // Log the specific error for server-side debugging if needed
                // console.log('Firebase Auth Error in authorize:', authError.code);
                
                // Return null for any auth error (user not found, wrong password, etc.)
                // NextAuth will then throw a CredentialsSignin error.
                return null;
            }
        }
    }),
  ],
});
