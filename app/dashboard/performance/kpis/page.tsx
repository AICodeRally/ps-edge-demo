/**
 * PERFORMANCE - KPI Dashboard
 * Aggregated 6 P's KPIs and metrics
 */

'use client';

export default function KPIDashboardPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">KPI Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aggregated 6 P's performance metrics</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">📊 KPI Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">New aggregated 6 P's KPI view - Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
