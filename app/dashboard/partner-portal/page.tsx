/**
 * Partner Portal - Dashboard
 * Overview of channel partner operations and tenant health
 */

'use client';

export default function PartnerPortalPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Partner Portal
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Channel partner operations and tenant management
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Partner Portal Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor all client tenants, health scores, signals, and revenue from NP-Edge deployments.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Multi-tenant channel partner management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
