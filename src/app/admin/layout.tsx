
'use client';

import React from 'react';
import ClientLayout from '../_components/ClientLayout';

// This layout is for all admin routes.
// It ensures that Firebase context is available for authentication and data operations.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // We wrap the children in ClientLayout to provide the necessary Firebase context.
  // The actual layout with sidebar is handled within the dashboard pages themselves.
  return (
    <ClientLayout>
        {children}
    </ClientLayout>
  );
}
