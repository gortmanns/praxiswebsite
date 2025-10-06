import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminArea = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdminArea) {
        // Allow access to the login page itself
        if (nextUrl.pathname === '/admin') {
            // Redirect logged in users from login page to dashboard
            if (isLoggedIn) {
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            return true;
        }

        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
