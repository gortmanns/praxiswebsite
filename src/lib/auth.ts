
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
                // Try to sign in
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                return { id: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email };
            } catch (error) {
                const authError = error as AuthError;
                
                if (authError.code === 'auth/user-not-found' && credentials.username === 'admin' && String(credentials.password) === '1234') {
                    // If user does not exist, and it's the initial admin setup, create them
                    try {
                        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = newUserCredential.user;
                        
                        // Create user profile in Firestore
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            email: user.email,
                            displayName: 'Admin User',
                            createdAt: serverTimestamp(),
                        });
                        
                        // Retry sign-in after creation
                        const finalUserCredential = await signInWithEmailAndPassword(auth, email, password);
                        return { id: finalUserCredential.user.uid, name: finalUserCredential.user.displayName, email: finalUserCredential.user.email };

                    } catch (creationError) {
                        console.error("Error creating user:", creationError);
                        return null;
                    }
                } else {
                    // For other errors (like wrong password), or if user-not-found but not the initial admin
                    console.log('Invalid credentials');
                    return null;
                }
            }
        }
    }),
  ],
});
