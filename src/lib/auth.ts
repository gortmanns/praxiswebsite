import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { redirect } from 'next/navigation';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
          return null;
        }

        const isAdminUser = credentials.username === 'admin';
        const isValidPassword = credentials.password === '1234';

        if (isAdminUser && isValidPassword) {
          // Return a user object for the session
          return { id: 'admin-user', name: 'Admin' };
        }
        
        // Return null if credentials do not match
        return null;
      },
    }),
  ],
});
