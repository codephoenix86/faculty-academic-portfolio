'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}