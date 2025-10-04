'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ObfuscatedLinkProps = {
  user: string;
  domain: string;
  className?: string;
  children?: React.ReactNode;
};

export function ObfuscatedLink({ user, domain, className, children }: ObfuscatedLinkProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial render
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a non-interactive placeholder on the server and during hydration.
    // The children are rendered directly to show the icon and text structure.
    return <div className={className}>{children}</div>;
  }
  
  const href = `mailto:${user}@${domain}`;

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
