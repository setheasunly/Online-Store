'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { paymentService } from '@/services/payment';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user || items.length === 0) {
      setShouldRedirect(true);
    }
  }, [user, items.length]);

  useEffect(() => {
    if (shouldRedirect) {
      if (!user) {
        router.push('/login');
      } else if (items.length === 0) {
        router.push('/cart');
      }
    }
  }, [shouldRedirect, user, items.length, router]);

  if (shouldRedirect) {
    return <div className="text-center py-16">Redirecting...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const paymentDetails = {
      cardNumber: formData.get('cardNumber') as string,
      expiryDate: formData.get('expiryDate') as string,
      cvv: formData.get('cvv') as string,
      amount: total,
    };

    try {
      // Process payment
      const paymentResponse = await paymentService.processPayment(paymentDetails);
      await paymentService.verifyPayment(paymentResponse.transactionId);

      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      // Clear cart and redirect
      clearCart();
      router.push('/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="py-4 flex justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              maxLength={16}
              pattern="[0-9]{16}"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                required
                maxLength={5}
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                required
                maxLength={3}
                pattern="[0-9]{3}"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400'
            }`}
          >
            {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
} 