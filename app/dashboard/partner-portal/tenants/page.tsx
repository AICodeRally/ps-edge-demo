/**
 * Partner Portal - Client Tenants
 * Manage NP-Edge client tenant deployments
 */

'use client';

export default function TenantsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Client Tenants
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage nonprofit clients using NP-Edge platform
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Tenant Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View all nonprofit organizations using NP-Edge, monitor health scores, and track subscription tiers.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Client tenant directory and management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
