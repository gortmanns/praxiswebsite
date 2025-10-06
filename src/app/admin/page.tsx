
import Image from 'next/image';
import { LoginForm } from './_components/login-form';
import { authSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLoginPage() {
  const session = await authSession();
  if (session?.user) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-lg">
        <div className="flex justify-center">
          <Image
            src="/images/praxiszentrum-logo.png"
            alt="Praxiszentrum im Ring Logo"
            width={250}
            height={51}
            priority
          />
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
          Admin-Bereich
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
