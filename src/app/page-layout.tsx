
import ClientLayout from './_components/ClientLayout';

// This is a server component that wraps the ClientLayout.
// It's used by all regular pages that need the full header, footer, and firebase context.
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
