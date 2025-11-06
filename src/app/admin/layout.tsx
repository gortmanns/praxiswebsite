// This file is intentionally left blank to remove the shared admin layout.
// The layout logic (providers and sidebar) has been moved directly into each 
// individual admin page to prevent build conflicts with Next.js error pages.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <