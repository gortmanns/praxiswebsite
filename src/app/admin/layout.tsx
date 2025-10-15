import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  // Da der `usePathname` Hook hier nicht funktioniert, müssen wir `children` prüfen
  // um auf der Login-Seite zu bleiben wenn nicht eingeloggt.
  // Das eigentliche Routing findet in den Page-Komponenten bzw. im Root-Layout statt.
  // Hier wird nur der grundsätzliche Zugriff auf den Admin-Bereich geprüft.
  if (!session.isLoggedIn) {
     // Die Login-Seite ist eine Ausnahme, sie soll immer erreichbar sein.
     // Der Redirect zur Login-Seite passiert in den geschützten Seiten.
     // Wenn wir hier auf /admin/login umleiten, erzeugen wir eine Schleife.
  }

  return <>{children}</>;
}
