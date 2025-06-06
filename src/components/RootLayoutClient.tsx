'use client';

import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';
import { usePathname } from 'next/navigation';

function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="flex items-center space-x-4">
      {!isAuthPage && (
        <Link
          href="/cart"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          View Cart
        </Link>
      )}
      {user ? (
        <>
          <span className="text-gray-600">Hello, {user.name || user.email}</span>
          <button
            onClick={logout}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">
                Online Store
              </Link>
              <Navigation />
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          {isAuthPage ? (
            children
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">{children}</div>
              <div className="bg-white rounded-lg shadow-lg">
                <ShoppingCart />
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
} 