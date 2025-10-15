import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';

  // If the user is not logged in (no valid token/session flag) and is not on the login page,
  // and is trying to access an admin route, redirect to login.
  if (!session.isLoggedIn && !isLoginPage && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the user is logged in and tries to access the login page,
  // redirect them to the dashboard.
  if (session.isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes under /admin/, except for API routes, static files, and image optimization.
  matcher: ['/admin/:path*'],
};
