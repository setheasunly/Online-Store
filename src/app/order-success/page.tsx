'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-2 px-4 rounded-lg text-white font-medium bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Continue Shopping
          </Link>
          
          <Link
            href="/orders"
            className="block w-full py-2 px-4 rounded-lg text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
} 