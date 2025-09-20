import React from 'react';
import Link from 'next/link';

export default function WishlistsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlists</h1>
            <p className="text-gray-600 mt-2">
              Organize your favorite products into different lists
            </p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Create New List
          </button>
        </div>

        <div className="flex items-center justify-center h-96">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Wishlists Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first wishlist to start organizing your favorite products
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Create Your First List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
