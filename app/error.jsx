// app/error.jsx
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console
    console.error('Page Error:', error)
  }, [error])

  // Determine error type and customize message
  const getErrorInfo = () => {
    const message = error?.message?.toLowerCase() || ''

    // Network/API errors
    if (message.includes('fetch') || message.includes('network') || message.includes('failed to fetch')) {
      return {
        title: 'Connection Problem',
        description: 'We couldn\'t load this page due to a connection issue.',
        icon: '🌐',
        suggestion: 'Check your internet and try again.'
      }
    }

    // Data loading errors
    if (message.includes('sanity') || message.includes('data') || message.includes('not found')) {
      return {
        title: 'Content Not Available',
        description: 'We couldn\'t load the content for this page.',
        icon: '📄',
        suggestion: 'The content might be temporarily unavailable. Try again in a moment.'
      }
    }

    // Timeout errors
    if (message.includes('timeout') || message.includes('timed out')) {
      return {
        title: 'Loading Too Slow',
        description: 'This page is taking longer than expected to load.',
        icon: '⏱️',
        suggestion: 'Please try again.'
      }
    }

    // Default error
    return {
      title: 'Something Went Wrong',
      description: 'We ran into a problem loading this page.',
      icon: '😕',
      suggestion: 'Don\'t worry, try refreshing and it should work.'
    }
  }

  const errorInfo = getErrorInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-10 shadow-lg border border-slate-200 text-center">
        {/* Animated Icon */}
        <div className="text-7xl mb-6 animate-bounce">
          {errorInfo.icon}
        </div>

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {errorInfo.title}
        </h1>

        {/* Error Description */}
        <p className="text-lg text-slate-600 mb-3">
          {errorInfo.description}
        </p>

        {/* Suggestion */}
        <p className="text-sm text-slate-500 mb-8">
          {errorInfo.suggestion}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="px-6 py-3 bg-slate-50 text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5"
          >
            Go Home
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}