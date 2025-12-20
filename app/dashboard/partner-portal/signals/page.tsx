/**
 * Partner Portal - Signals
 * Monitor telemetry signals from client deployments
 */

'use client';

export default function SignalsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Signals Inbox
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Monitor telemetry signals from client NP-Edge deployments
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Signal Monitoring
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track client health signals, compliance risks, feature adoption, and revenue opportunities from telemetry data.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Real-time telemetry signal inbox and alerts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
