'use client';

import { useCartStore } from '../store/cartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShoppingCart() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {/* Cart Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Cart Items */}
      <div className="px-6">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="py-6">
              <div className="flex gap-4">
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-gray-700 truncate">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="mt-1 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-500">
                        Qty:
                      </label>
                      <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="text-sm border border-gray-300 rounded-md py-1 pl-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-2 text-gray-700"
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
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Footer */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Shipping and taxes will be calculated at checkout.
          </p>
        </div>

        <div className="grid gap-3">
          <Link
            href="/cart"
            className="w-full px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
} 