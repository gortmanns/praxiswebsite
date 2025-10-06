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
        if (isLoggedIn) {
            // Check if the session has expired
            if (auth.expires && new Date(auth.expires) < new Date()) {
                // Session expired, redirect to login
                return false;
            }
            return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If logged in and trying to access the login page, redirect to dashboard
        if (nextUrl.pathname === '/admin') {
            return Response.redirect(new URL('/admin/dashboard', nextUrl));
        }
      }
      
      // Allow access to all other pages (e.g., login page for unauthenticated users)
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
