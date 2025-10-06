import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admin/dashboard');
      const isAdminPage = nextUrl.pathname === '/admin';

      if (isOnDashboard) {
        // If on dashboard, must be logged in
        return isLoggedIn;
      } 
      
      if (isLoggedIn) {
        // If logged in and trying to access login page, redirect to dashboard
        if (isAdminPage) {
          return Response.redirect(new URL('/admin/dashboard', nextUrl));
        }
        // If logged in and on any other page, allow access
        return true;
      }
      
      // If not logged in and not on a protected route, allow access
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
