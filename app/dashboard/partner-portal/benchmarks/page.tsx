/**
 * Partner Portal - Benchmarks
 * Portfolio benchmarking and analytics
 */

'use client';

export default function BenchmarksPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Benchmark Reports
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Portfolio-wide analytics and performance benchmarks
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Portfolio Benchmarks
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Compare client performance across fundraising, volunteer engagement, grant success, and platform adoption metrics.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Benchmark analytics and percentile rankings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
