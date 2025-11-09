
'use client';

// This component is no longer needed, as ClientLayout is now handled by the RootLayout.
// However, pages still use it, so we'll just pass children through.
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
