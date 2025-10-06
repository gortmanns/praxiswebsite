import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
  User
} from 'firebase/auth';
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

// Initialize Firebase Admin SDK
const { firebaseApp } = initializeFirebase();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

async function getUser(email: string): Promise<User | null> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, '1234');
        return userCredential.user;
    } catch (error) {
        const authError = error as AuthError;
        if (authError.code === 'auth/user-not-found') {
            return null;
        }
        if (authError.code === 'auth/wrong-password') {
            return null;
        }
        // Re-throw other errors
        throw error;
    }
}
 
export const { handlers, signIn, signOut, auth: authSession } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            if (credentials.username !== 'admin' || credentials.password !== '1234') {
                return null;
            }

            const email = 'admin@example.com';
            const password = '1234';

            try {
                // Try to sign in
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                return { id: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email };
            } catch (error) {
                const authError = error as AuthError;
                if (authError.code === 'auth/user-not-found') {
                    // If user does not exist, create them
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
                        
                        return { id: user.uid, name: user.displayName, email: user.email };

                    } catch (creationError) {
                        console.error("Error creating user:", creationError);
                        return null;
                    }
                } else if (authError.code === 'auth/wrong-password') {
                    console.log('Invalid credentials');
                    return null; // For wrong password
                }
                else {
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        }
    }),
  ],
});
