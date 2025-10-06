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
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
         if (nextUrl.pathname.startsWith('/admin')) {
            return true;
         }
         // This can be adjusted if you want to redirect logged-in users from other pages
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
