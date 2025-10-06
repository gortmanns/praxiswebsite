import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        const isUserValid = username === adminUser;
        const isPasswordValid = password === adminPass;
 
        if (isUserValid && isPasswordValid) {
          // next-auth expects a user object. We can just return a static one.
          return { id: '1', name: 'Admin' };
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
