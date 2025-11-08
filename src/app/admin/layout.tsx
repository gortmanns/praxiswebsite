
'use client';

// This layout is for all admin routes.
// It ensures that Firebase context is available for authentication and data operations.
import { FirebaseClientProvider } from '@/firebase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // We can't use the standard PageLayout because admin pages have their own sidebar structure.
  // Instead, we just need the core Firebase provider.
  // The actual admin UI (sidebar etc.) is handled by the dashboard layout.
  return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
