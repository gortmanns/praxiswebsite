'use client';

import React from 'react';
import ClientLayout from '../_components/ClientLayout';

// This layout is for all admin routes.
// It ensures that Firebase context is available for authentication and data operations.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // We wrap the children in ClientLayout to provide the necessary Firebase context
  // and consistent page structure.
  return (
    <ClientLayout>
        {children}
    </ClientLayout>
  );
}
