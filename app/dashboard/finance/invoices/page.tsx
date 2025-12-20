/**
 * Finance - Invoices Page
 * Manage client invoicing and payment tracking
 */

'use client';

export default function InvoicesPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Invoices
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage client invoices and payment tracking
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
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Invoice Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create, send, and track client invoices. Monitor payment status and aging reports.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coming soon - Invoice generation and payment tracking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
