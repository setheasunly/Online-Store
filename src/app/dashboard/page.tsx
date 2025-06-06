'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile Information</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            {user.name && (
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {user.name}
              </p>
            )}
            <p className="text-gray-600">
              <span className="font-medium">Role:</span>{' '}
              <span className="capitalize">{user.role.toLowerCase()}</span>
            </p>
          </div>
        </div>

        {user.role === 'ADMIN' && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Controls</h2>
            <p className="text-gray-600 mb-4">
              You have administrative privileges. You can manage products and users.
            </p>
            {/* Add admin-specific features here */}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Recent Orders</h2>
          <p className="text-gray-600">
            No orders found. Start shopping to see your order history here.
          </p>
          {/* Add order history component here */}
        </div>
      </div>
    </div>
  );
} 