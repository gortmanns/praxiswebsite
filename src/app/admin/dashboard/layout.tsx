'use client';

// NOTE: We no longer need FirebaseClientProvider here because it's handled
// by the parent admin/layout.tsx, which wraps everything in ClientLayout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
