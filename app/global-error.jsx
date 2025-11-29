// app/global-error.jsx
'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log error to console in development
    console.error('Global Error:', error)
    
    // In production, send to error tracking service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error)
    }
  }, [error])

  // Determine error type and customize message for normal users
  const getErrorInfo = () => {
    const message = error?.message?.toLowerCase() || ''

    // Network/Connection errors
    if (message.includes('fetch') || message.includes('network') || message.includes('failed to fetch') || message.includes('connection')) {
      return {
        title: 'Can\'t Connect Right Now',
        description: 'We\'re having trouble reaching our servers.',
        icon: '🌐',
        suggestion: 'Please check your internet connection and try again in a moment.'
      }
    }

    // Database/Data loading errors
    if (message.includes('sanity') || message.includes('database') || message.includes('query') || message.includes('data')) {
      return {
        title: 'Having Trouble Loading',
        description: 'We couldn\'t load some information right now.',
        icon: '📭',
        suggestion: 'Don\'t worry, your data is safe. Please try refreshing the page.'
      }
    }

    // Authentication errors
    if (message.includes('auth') || message.includes('unauthorized') || message.includes('token') || message.includes('login')) {
      return {
        title: 'Session Expired',
        description: 'Your session may have expired.',
        icon: '🔐',
        suggestion: 'Please try logging in again to continue.'
      }
    }

    // Timeout errors
    if (message.includes('timeout') || message.includes('timed out') || message.includes('too long')) {
      return {
        title: 'Taking Longer Than Expected',
        description: 'The page is loading slower than usual.',
        icon: '⏱️',
        suggestion: 'Our servers might be busy. Give it another try in a few seconds.'
      }
    }

    // Server/Service errors
    if (message.includes('500') || message.includes('503') || message.includes('server')) {
      return {
        title: 'Service Temporarily Down',
        description: 'Our service is temporarily unavailable.',
        icon: '🔧',
        suggestion: 'We\'re working to fix this. Please try again in a few minutes.'
      }
    }

    // Default/Unknown error - Keep it simple and friendly
    return {
      title: 'Oops! Something Went Wrong',
      description: 'We encountered an unexpected problem.',
      icon: '😕',
      suggestion: 'This doesn\'t happen often. Try refreshing the page or come back in a few minutes.'
    }
  }

  const errorInfo = getErrorInfo()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something Went Wrong - Portfolio</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(to bottom right, rgb(248 250 252), rgb(241 245 249));
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .error-container {
            background: white;
            border-radius: 24px;
            padding: 48px 40px;
            max-width: 520px;
            width: 100%;
            box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border: 1px solid rgb(226 232 240);
            text-align: center;
            animation: slideIn 0.6s ease-out;
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .error-icon {
            font-size: 80px;
            margin-bottom: 24px;
            display: inline-block;
            animation: bounce 2s ease infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .error-title {
            font-size: 32px;
            font-weight: 700;
            color: rgb(15 23 42);
            margin-bottom: 16px;
            line-height: 1.2;
          }
          .error-description {
            font-size: 18px;
            color: rgb(71 85 105);
            margin-bottom: 12px;
            line-height: 1.6;
          }
          .error-suggestion {
            font-size: 15px;
            color: rgb(100 116 139);
            margin-bottom: 36px;
            line-height: 1.6;
            padding: 0 10px;
          }
          .button-group {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .button {
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          .button:active {
            transform: scale(0.95);
          }
          .button-primary {
            background: rgb(249 115 22);
            color: white;
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
          }
          .button-primary:hover {
            background: rgb(234 88 12);
            box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
            transform: translateY(-2px);
          }
          .button-secondary {
            background: rgb(248 250 252);
            color: rgb(51 65 85);
            border: 2px solid rgb(226 232 240);
          }
          .button-secondary:hover {
            background: rgb(241 245 249);
            border-color: rgb(203 213 225);
            transform: translateY(-2px);
          }
          .help-text {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid rgb(226 232 240);
            font-size: 13px;
            color: rgb(148 163 184);
          }
          .help-text a {
            color: rgb(249 115 22);
            text-decoration: none;
            font-weight: 600;
          }
          .help-text a:hover {
            text-decoration: underline;
          }
          @media (max-width: 640px) {
            .error-container {
              padding: 36px 28px;
            }
            .error-icon {
              font-size: 64px;
            }
            .error-title {
              font-size: 26px;
            }
            .error-description {
              font-size: 16px;
            }
            .button-group {
              flex-direction: column;
            }
            .button {
              width: 100%;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          <div className="error-icon">{errorInfo.icon}</div>
          
          <h1 className="error-title">{errorInfo.title}</h1>
          
          <p className="error-description">{errorInfo.description}</p>
          
          <p className="error-suggestion">{errorInfo.suggestion}</p>

          <div className="button-group">
            <button 
              onClick={reset}
              className="button button-primary"
            >
              Try Again
            </button>
            
            <a 
              href="/"
              className="button button-secondary"
            >
              Go to Homepage
            </a>
          </div>


        </div>
      </body>
    </html>
  )
}