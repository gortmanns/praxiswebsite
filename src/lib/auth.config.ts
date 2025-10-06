
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // VORÜBERGEHEND DEAKTIVIERT FÜR ENTWICKLUNG
      // Wenn dies aktiv ist, wird jeder Zugriff auf den Admin-Bereich erlaubt.
      return true;

      /*
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admin/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If logged in, redirect from /admin to /admin/dashboard
        if (nextUrl.pathname === '/admin') {
            return Response.redirect(new URL('/admin/dashboard', nextUrl));
        }
      }
      // Allow unauthenticated access to /admin (login page) and all other pages
      return true;
      */
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
