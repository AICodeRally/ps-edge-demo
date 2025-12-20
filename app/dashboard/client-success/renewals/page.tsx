/**
 * Client Success - Renewals Page
 * Track contract renewals and expansion opportunities
 */

'use client';

export default function RenewalsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Contract Renewals
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage upcoming renewals and expansion opportunities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-blue-400 dark:text-blue-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Renewal Pipeline
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track upcoming contract renewals, identify at-risk accounts, and manage expansion revenue.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Renewal tracking and management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
