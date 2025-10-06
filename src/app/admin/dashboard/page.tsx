import { signOut } from '@/lib/auth';

export default function DashboardPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin area.</p>

      <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/admin'});
          }}
        >
          <button type="submit">
            Sign Out
          </button>
        </form>
    </div>
  );
}
