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
  const [email, setEmail] = useState('');
  const [href, setHref] = useState('');

  useEffect(() => {
    // This code runs only on the client, after hydration
    const fullEmail = `${user}@${domain}`;
    setEmail(fullEmail);
    setHref(`mailto:${fullEmail}`);
  }, [user, domain]);

  if (!email) {
    // Render a placeholder or nothing while waiting for client-side hydration
    // to avoid layout shifts. The text is constructed in a way that bots
    // have a harder time parsing it.
    return <span className={cn('break-all', className)}>{user}<span className='hidden'>-</span>@<span className='hidden'>-</span>{domain}</span>;
  }

  return (
    <a href={href} className={cn('break-all', className)}>
      {children || email}
    </a>
  );
}
