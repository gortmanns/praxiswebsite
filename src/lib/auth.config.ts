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
        if (isLoggedIn) {
            // If the user is logged in and tries to access the login page, redirect to dashboard.
            if (nextUrl.pathname === '/admin') {
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            // Otherwise, allow access to other admin pages.
            return true;
        }
        // If not logged in, only allow access to the login page itself.
        // For all other admin pages, redirect to login.
        return nextUrl.pathname === '/admin';
      }
      
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
