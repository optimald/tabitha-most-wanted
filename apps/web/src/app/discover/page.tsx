'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard, SwipeCard } from '@tabitha/ui';
import { Product } from '@tabitha/shared';

// Mock product data - this will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'LEGO Classic Creative Brick Box',
    description: 'A classic collection of LEGO bricks in 33 different colors.',
    price: 30.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/lego',
    retailer: 'amazon',
    category: 'toys',
    ageRange: { min: 4, max: 99 },
    rating: 4.8,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Kinetic Sand Sandbox Set',
    description: 'Moldable sand that never dries out, perfect for indoor play.',
    price: 20.00,
    originalPrice: 25.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop',
    productUrl: 'https://walmart.com/kineticsand',
    retailer: 'walmart',
    category: 'toys',
    ageRange: { min: 3, max: 8 },
    rating: 4.5,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Kids Tablet 7-inch',
    description: 'Android tablet designed for kids with parental controls.',
    price: 80.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/kidstablet',
    retailer: 'amazon',
    category: 'electronics',
    ageRange: { min: 3, max: 12 },
    rating: 4.2,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Nerf N-Strike Elite Disruptor',
    description: 'Quick-draw blaster with a 6-dart rotating drum.',
    price: 15.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/nerf',
    retailer: 'amazon',
    category: 'toys',
    ageRange: { min: 8, max: 16 },
    rating: 4.6,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Barbie Dreamhouse',
    description: 'Three-story dollhouse with 8 rooms and working elevator.',
    price: 199.00,
    originalPrice: 249.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1558877385-8c2b41d7e5e2?w=400&h=400&fit=crop',
    productUrl: 'https://walmart.com/barbie',
    retailer: 'walmart',
    category: 'toys',
    ageRange: { min: 3, max: 10 },
    rating: 4.7,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Nintendo Switch Lite',
    description: 'Compact, lightweight Nintendo Switch system for handheld play.',
    price: 199.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/switchlite',
    retailer: 'amazon',
    category: 'electronics',
    ageRange: { min: 6, max: 99 },
    rating: 4.7,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
];

type ViewMode = 'swipe' | 'grid';

export default function DiscoverPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('swipe');
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToWishlist = (productId: string) => {
    console.log('Added to wishlist:', productId);
    // TODO: Implement wishlist functionality
    alert('Added to wishlist! (Feature coming soon)');
  };

  const handlePass = (productId: string) => {
    console.log('Passed on product:', productId);
    if (viewMode === 'swipe') {
      setCurrentSwipeIndex(prev => prev + 1);
    }
  };

  const handleSwipeLeft = (productId: string) => {
    handlePass(productId);
  };

  const handleSwipeRight = (productId: string) => {
    handleAddToWishlist(productId);
    if (viewMode === 'swipe') {
      setCurrentSwipeIndex(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Products</h1>
              <p className="text-gray-600 mt-1">Find amazing products perfect for you!</p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('swipe')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'swipe'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Swipe Mode
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'swipe' ? (
          // Swipe Mode
          <div className="flex flex-col items-center">
            {currentSwipeIndex >= products.length ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All done!</h2>
                <p className="text-gray-600">You've seen all available products. Check back later for more!</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 text-center">
                    {currentSwipeIndex + 1} of {products.length}
                  </p>
                </div>
                
                <div className="relative">
                  {/* Next card (behind) */}
                  {products[currentSwipeIndex + 1] && (
                    <div className="absolute inset-0 transform scale-95 opacity-50 z-0">
                      <SwipeCard
                        product={products[currentSwipeIndex + 1]}
                        disabled={true}
                      />
                    </div>
                  )}
                  
                  {/* Current card */}
                  <div className="relative z-10">
                    <SwipeCard
                      product={products[currentSwipeIndex]}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    👈 Click Pass or Like buttons, or use keyboard: ← (pass) → (like)
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          // Grid Mode
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={handleAddToWishlist}
                onPass={handlePass}
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}