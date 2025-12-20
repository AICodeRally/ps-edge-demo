/**
 * Partner Portal - Revenue
 * Channel partner revenue and commission tracking
 */

'use client';

export default function PartnerRevenuePage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Partner Revenue
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track channel fees and commission revenue
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-teal-400 dark:text-teal-600 mb-4">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Revenue Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor monthly recurring revenue, subscription fees, and commission income from NP-Edge platform sales.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Partner revenue tracking and commission reporting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
