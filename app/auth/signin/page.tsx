'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

/**
 * Sign In Form Component
 * Separated to use useSearchParams inside Suspense
 */
function SignInForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('passkey', {
        passkey: email,
        callbackUrl,
        redirect: true,
      });

      if (result?.error) {
        setError('Sign in failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          disabled={isLoading}
          autoFocus
        />
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}

/**
 * Sign In Page for PS-Edge
 *
 * Simple email-based authentication for demo mode.
 * Accepts any valid email address.
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
            }}
          >
            PS
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            PS-Edge
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional Services Platform
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Sign in to continue
          </h2>

          <Suspense fallback={
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          }>
            <SignInForm />
          </Suspense>

          {/* Demo hint */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Demo mode: Enter any valid email to sign in.
              <br />
              Try <span className="font-mono">admin@ppg.com</span> for admin access.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Phoenix Philanthropy Group &copy; 2026
        </p>
      </div>
    </div>
  );
}
