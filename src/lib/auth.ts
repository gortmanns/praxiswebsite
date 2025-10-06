
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (typeof credentials.username !== 'string' || typeof credentials.password !== 'string') {
          return null;
        }

        const { username, password } = credentials;

        // Hardcoded credentials check
        const isAdminUser = username === 'admin';
        const isValidPassword = password === '1234';

        if (isAdminUser && isValidPassword) {
          // For a hardcoded user, we can return a static user object.
          // The 'id' and 'email' can be dummy values as they are not used elsewhere in this setup.
          return { id: 'admin-user', name: 'admin', email: 'admin@example.com' };
        }
        
        // If credentials do not match, return null to indicate failure.
        return null;
      },
    }),
  ],
});
