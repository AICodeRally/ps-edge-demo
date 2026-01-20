/**
 * PROFIT - Timesheets
 */

'use client';

export default function TimesheetsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Timesheets</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Time tracking and billable hours</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">🚧 Migrated to PROFIT</h2>
            <p className="text-gray-600 dark:text-gray-400">Timesheets now under PROFIT section</p>
          </div>
        </div>
      </div>
    </div>
  );
}
