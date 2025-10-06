
'use client';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

// Helper to initialize Firebase App on the server side of auth actions
const getFirebaseAuth = () => {
    if (!getApps().length) {
        const app = initializeApp(firebaseConfig);
        return getAuth(app);
    }
    return getAuth(getApp());
};


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        if (typeof username !== 'string' || typeof password !== 'string') {
          return null;
        }
        
        const auth = getFirebaseAuth();

        // Use a fixed email for the admin user
        const email = `${username}@praxis-admin.local`;

        try {
          // Set persistence to avoid "auth/web-storage-unsupported" errors in this environment
          await setPersistence(auth, browserLocalPersistence);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          if (userCredential.user) {
            // Return a user object that NextAuth understands
            return { id: userCredential.user.uid, name: username, email: userCredential.user.email };
          }
          return null;
        } catch (error: any) {
          if (error.code === 'auth/user-not-found') {
            try {
              // If user doesn't exist, create it. This is for the first-time setup.
              const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
              if (newUserCredential.user) {
                return { id: newUserCredential.user.uid, name: username, email: newUserCredential.user.email };
              }
              return null;
            } catch (createError: any) {
              console.error('Error creating admin user:', createError);
              return null;
            }
          } else if (error.code === 'auth/wrong-password') {
             console.log('Invalid credentials');
             return null;
          } else if (error.code === 'auth/invalid-credential') {
             console.log('Invalid credentials, potentially wrong password or user does not exist.');
             return null;
          }

          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
});
