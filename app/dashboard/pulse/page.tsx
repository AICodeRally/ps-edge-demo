/**
 * Pulse - Channel Insights Page
 * Displays AI-generated insights from Chiefs across the platform
 */

import { PulseFeed } from '@/src/components/pulse/PulseFeed';

export default function PulsePage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          {/* Purple AI accent indicator */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Pulse - Channel Insights
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              AI-generated insights from your Chiefs across governance, operations, and knowledge
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <PulseFeed />
        </div>
      </div>
    </div>
  );
}
