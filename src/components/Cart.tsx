import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface Cart {
  id: string;
  items: CartItem[];
}

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchCart();
  }, [user, router]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Your Cart</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to view and manage your cart.</p>
        <Link
          href="/login"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        {/* Cart Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="mt-1 text-sm text-gray-500">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center gap-6">
                {item.product.image && (
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} each
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-medium text-gray-900">Subtotal</span>
            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Shipping and taxes will be calculated at checkout.
          </p>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 