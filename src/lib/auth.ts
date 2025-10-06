import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { AuthError } from 'next-auth';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
    // Set session max age to 30 minutes
    maxAge: 30 * 60,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (
          typeof credentials.username !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }

        const { username, password } = credentials;

        const isAdminUser = username === 'admin';
        const isValidPassword = password === '1234';

        if (isAdminUser && isValidPassword) {
          return { id: 'admin-user', name: 'admin', email: 'admin@example.com' };
        }
        
        return null;
      },
    }),
  ],
});
