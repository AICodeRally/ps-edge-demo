'use client';
export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

/**
 * Sign In Form Component
 * Matches SGM-SPARCC gold standard signin flow
 */
function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load last used email from localStorage on mount
  useEffect(() => {
    const lastEmail = localStorage.getItem('ps-edge-last-email');
    if (lastEmail) {
      setEmail(lastEmail);
    }
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save email for next time
    localStorage.setItem('ps-edge-last-email', email);

    await signIn('passkey', {
      passkey: email,
      callbackUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full mx-4">
        {/* Card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg"
              style={{
                backgroundImage: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
              }}
            >
              <span className="text-white font-bold text-2xl">PS</span>
            </div>
            <h1
              className="text-3xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            >
              PS-Edge
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Professional Services Platform</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error === 'CredentialsSignin'
                  ? 'Invalid credentials. Please try again.'
                  : error === 'AccessDenied'
                  ? 'Access denied. Your account may not be active.'
                  : 'An error occurred during sign in'}
              </p>
            </div>
          )}

          {/* Email Sign In */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={isLoading}
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none disabled:opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full px-4 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              style={{
                backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Powered by AICR Platform</p>
            <p className="mt-2">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              <strong className="text-purple-700 dark:text-purple-300">Demo Mode:</strong> Enter any email to sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Sign In Page for PS-Edge
 * Matches SGM-SPARCC signin pattern
 */
export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
