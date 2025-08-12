
"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth-context';
import { Skeleton } from '../ui/skeleton';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (auth === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated } = auth;

  useEffect(() => {
    // If auth state is determined and user is not authenticated, redirect to login.
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // While checking auth, you might want to show a loader.
  if (!isAuthenticated) {
    return (
        <div className="flex flex-col space-y-3 p-8">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
  }

  // If authenticated, render the children.
  return <>{children}</>;
}
