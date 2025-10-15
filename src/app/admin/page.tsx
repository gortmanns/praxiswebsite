'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * This component handles the root "/admin" path.
 * Its sole purpose is to redirect the user to the main admin dashboard.
 * This prevents a 404 error when a user navigates to just "/admin".
 */
export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    // We use `replace` instead of `push` so the user can't click "back" to get to this empty redirecting page.
    router.replace('/admin/dashboard');
  }, [router]);

  // Return null or a loading indicator while the redirect happens.
  // Returning null is sufficient as the redirect is almost instantaneous.
  return null;
}
