'use client';

import { useAuth } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRootPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/admin/login');
            }
        }
    }, [user, loading, router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
}
