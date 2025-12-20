/**
 * Delivery - Deliverables Page
 * Track project deliverables across all engagements
 */

'use client';

export default function DeliverablesPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Deliverables
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track project deliverables and milestones
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Deliverables Tracker
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View and manage all project deliverables, track completion status, and monitor deadlines.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Deliverable tracking and management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
