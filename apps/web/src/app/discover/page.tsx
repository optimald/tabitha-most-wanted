import React from 'react';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse through products curated just for you
          </p>
        </div>

        <div className="flex items-center justify-center h-96">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Product Discovery Coming Soon
            </h3>
            <p className="text-gray-500">
              We're working on bringing you an amazing product discovery experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
