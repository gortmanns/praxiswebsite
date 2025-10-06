import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // This is where you would normally validate against a database
        // For this example, we use environment variables.
        const { username, password } = credentials;

        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        // Ensure env variables are set
        if (!adminUser || !adminPass) {
          console.error("ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set.");
          return null;
        }

        const isUserValid = username === adminUser;
        const isPasswordValid = password === adminPass;
 
        if (isUserValid && isPasswordValid) {
          // next-auth expects a user object. We can just return a static one for the admin.
          return { id: '1', name: 'Admin', email: 'admin' };
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
