/**
 * Finance - Timesheets Page
 * Manage consultant time tracking and timesheet approval
 */

'use client';

export default function TimesheetsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Timesheets
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track and approve consultant timesheets
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Timesheet Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Log billable hours, track time by project and client, and manage timesheet approvals.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Time tracking and approval workflows
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
