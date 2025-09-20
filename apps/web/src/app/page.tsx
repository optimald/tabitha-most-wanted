import Link from 'next/link';
import { APP_CONFIG } from '@tabitha/shared';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              {APP_CONFIG.NAME}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              {APP_CONFIG.DESCRIPTION}
            </p>
            <p className="text-lg text-gray-500 mb-12">
              Discover amazing products, create wishlists, and share them with family and friends!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🎁</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Discover Products
              </h3>
              <p className="text-gray-600">
                Swipe through age-appropriate products from top retailers
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Create Wishlists
              </h3>
              <p className="text-gray-600">
                Organize products into birthday, holiday, and special occasion lists
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share with Family
              </h3>
              <p className="text-gray-600">
                Send your wishlists to parents and family via email or text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}