'use client';

import ClientLayout from './_components/ClientLayout';

// This Layout is used by all public-facing pages.
// It's a client component that wraps the page content with the full client-side layout (Header, Footer, Banners, etc.).
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
