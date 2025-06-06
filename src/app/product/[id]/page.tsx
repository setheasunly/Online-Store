'use client';

import { useParams } from 'next/navigation';
import { mockProducts } from '@/data/mockProducts';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const { addItem } = useCartStore();

  if (!params?.id) {
    return <div>Invalid product ID</div>;
  }

  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Breadcrumb */}
      <div className="px-6 py-4 border-b border-gray-200">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Products
        </Link>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="space-y-6 mt-auto">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <span className="ml-4 text-sm text-gray-500">
                    {product.stock} units available
                  </span>
                ) : (
                  <span className="ml-4 text-sm text-red-600">
                    Out of stock
                  </span>
                )}
              </div>
              
              <div className="grid gap-4">
                <button
                  onClick={() => addItem(product)}
                  disabled={product.stock === 0}
                  className={`w-full px-6 py-3 rounded-lg text-base font-medium text-white 
                    ${product.stock > 0 
                      ? 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400' 
                      : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <Link
                  href="/"
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 