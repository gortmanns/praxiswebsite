
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Da die Login-Logik entfernt wurde, ist hier keine Prüfung mehr notwendig.
  // Die Admin-Seiten sind nun direkt zugänglich.
  return <>{children}</>;
}
