import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admin/dashboard');
      
      if (isOnDashboard) {
        // If the user is trying to access the dashboard or its sub-pages
        if (isLoggedIn) return true; // Allow access if logged in
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If the user is logged in and tries to access the login page,
        // redirect them to the dashboard.
        if (nextUrl.pathname.startsWith('/admin')) {
           return Response.redirect(new URL('/admin/dashboard', nextUrl));
        }
      }
      
      // Allow all other requests (e.g. for the public site)
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
