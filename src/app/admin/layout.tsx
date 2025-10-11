'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthKnown, setIsAuthKnown] = useState(false);

  useEffect(() => {
    // In a real app, you'd check auth state here.
    // For now, we'll just simulate it to prevent redirects.
    setIsAuthKnown(true);
  }, []);

  if (!isAuthKnown) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Wird geladen...</p>
      </div>
    );
  }

  return <>{children}</>;
}
