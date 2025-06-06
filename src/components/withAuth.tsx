import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { ComponentType, useEffect } from 'react';

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requireAdmin: boolean = false
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace('/login');
      } else if (!isLoading && requireAdmin && user?.role !== 'ADMIN') {
        router.replace('/unauthorized');
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }

    if (requireAdmin && user.role !== 'ADMIN') {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 