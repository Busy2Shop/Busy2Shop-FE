'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('agent' | 'customer')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const router = useRouter();
    const { data: user, isLoading, isError } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/auth/login');
        } else if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.status.userType)) {
            router.push('/dashboard');
        }
    }, [user, isLoading, router, allowedRoles]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-500">Error loading user data</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.status.userType)) {
        return null;
    }

    return <>{children}</>;
} 