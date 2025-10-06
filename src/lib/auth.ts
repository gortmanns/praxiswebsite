import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        // Hardcode credentials for reliable access
        const adminUser = 'admin';
        const adminPass = '1234';
 
        const isUserValid = username === adminUser;
        const isPasswordValid = password === adminPass;
 
        if (isUserValid && isPasswordValid) {
          return { id: '1', name: 'Admin', email: 'admin' };
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
