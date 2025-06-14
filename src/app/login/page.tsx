'use client';

import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginForm />
      <div className="text-center mt-4 pb-8">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
} 