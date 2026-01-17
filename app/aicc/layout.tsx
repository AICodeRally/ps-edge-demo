/**
 * AICC Layout
 * Provides consistent navigation and structure for the AI Command Center
 */

import Link from 'next/link';

export default function AICCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      {/* Navigation */}
      <nav className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/aicc/acc"
                className="text-xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-500 bg-clip-text text-transparent"
              >
                AICC
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/aicc/acc"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/aicc/acc/apps"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Apps
                </Link>
                <Link
                  href="/aicc/acc/agents"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Agents
                </Link>
                <Link
                  href="/aicc/acc/sync"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Sync
                </Link>
                <Link
                  href="/aicc/acc/contracts"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Contracts
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
