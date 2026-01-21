/**
 * PERFORMANCE - KPI Dashboard
 * Aggregated 6 P's KPIs and metrics
 */

'use client';

export default function KPIDashboardPage() {
  const metrics = [
    { label: 'Overall Score', value: '87', unit: '%', trend: '+5%', trendUp: true, color: 'bg-pink-500' },
    { label: 'Goals Met', value: '24', unit: '/28', trend: '86%', trendUp: true, color: 'bg-rose-500' },
    { label: 'At Risk', value: '3', unit: 'KPIs', trend: '-2', trendUp: true, color: 'bg-orange-500' },
    { label: 'Trend', value: 'Up', unit: '', trend: '↗', trendUp: true, color: 'bg-pink-600' },
    { label: 'YTD Growth', value: '+12.4', unit: '%', trend: '+3.2%', trendUp: true, color: 'bg-rose-600' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">KPI Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aggregated 6 P's performance metrics</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</div>
                  <div className={`w-2 h-2 rounded-full ${metric.color}`} />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
                  {metric.unit && <div className="text-sm text-gray-500 dark:text-gray-400">{metric.unit}</div>}
                </div>
                <div className={`text-xs font-medium ${metric.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder Content */}
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">📊 KPI Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Detailed aggregated 6 P's KPI view - Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
