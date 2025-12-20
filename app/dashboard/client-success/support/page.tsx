/**
 * Client Success - Support Page
 * Manage client support tickets and requests
 */

'use client';

export default function SupportPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Client Support
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage support tickets and client requests
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-purple-400 dark:text-purple-600 mb-4">
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
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Support Tickets
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track and respond to client support requests, manage SLAs, and monitor resolution times.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Support ticket management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
