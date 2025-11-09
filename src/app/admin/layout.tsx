'use client';

import React from 'react';

// This layout is for all admin routes.
// It is now wrapped by the global ClientLayout in the root layout.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
