'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Willkommen im geschützten Bereich.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Sie sind erfolgreich angemeldet.</p>
                <Button onClick={handleLogout} variant="outline" className="mt-4 w-full">
                    Abmelden
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
