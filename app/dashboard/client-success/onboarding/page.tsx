/**
 * Client Success - Onboarding Page
 * Track new client onboarding progress
 */

'use client';

export default function OnboardingPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Client Onboarding
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track onboarding progress for new clients
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <div className="text-indigo-400 dark:text-indigo-600 mb-4">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Onboarding Tracker
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor new client onboarding milestones, track completion rates, and ensure smooth transitions.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Client onboarding workflows
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
