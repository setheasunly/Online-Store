'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cart Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {Array.from(new Set(items.map(item => item.category))).length} {Array.from(new Set(items.map(item => item.category))).length === 1 ? 'category' : 'categories'}
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          ← Continue Shopping
        </Link>
      </div>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-start gap-6">
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </Link>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h2 className="text-lg font-medium text-gray-900 hover:text-gray-700">
                          {item.name}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          Product ID: {item.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-gray-700">
                          Quantity:
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className="text-sm border border-gray-300 rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-2 text-gray-700"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Summary */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-base">
                <span className="font-medium text-gray-900">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Categories in cart:</span>
                {Array.from(new Set(items.map(item => item.category))).map((category) => (
                  <span key={category} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>
          
          <div className="grid gap-4">
            <button
              onClick={() => alert('Checkout functionality coming soon!')}
              className="w-full px-6 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Proceed to Checkout
            </button>
            <Link
              href="/"
              className="w-full px-6 py-3 text-base font-medium text-center border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 