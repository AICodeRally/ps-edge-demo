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

  const kpis = [
    { 
      kpiName: 'Revenue Growth Rate', 
      currentValue: '+18.4%', 
      target: '+15%',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-20'
    },
    { 
      kpiName: 'Client Satisfaction Score', 
      currentValue: '94%', 
      target: '90%',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-20'
    },
    { 
      kpiName: 'Team Utilization Rate', 
      currentValue: '78%', 
      target: '80%',
      status: 'At Risk',
      trend: '→',
      lastUpdated: '2026-01-19'
    },
    { 
      kpiName: 'Proposal Win Rate', 
      currentValue: '73%', 
      target: '70%',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-19'
    },
    { 
      kpiName: 'Project Delivery On-Time', 
      currentValue: '91%', 
      target: '95%',
      status: 'At Risk',
      trend: '↘',
      lastUpdated: '2026-01-18'
    },
    { 
      kpiName: 'Net Promoter Score', 
      currentValue: '72', 
      target: '70',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-18'
    },
    { 
      kpiName: 'Employee Engagement', 
      currentValue: '87%', 
      target: '85%',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-17'
    },
    { 
      kpiName: 'Client Retention Rate', 
      currentValue: '94%', 
      target: '92%',
      status: 'On Track',
      trend: '↗',
      lastUpdated: '2026-01-17'
    },
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

          {/* KPI Summary Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Key Performance Indicators</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aggregated performance metrics across all 6 P's</p>
              </div>
              <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add KPI
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">KPI Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Current Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Target</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Trend</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {kpis.map((kpi, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{kpi.kpiName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-semibold">{kpi.currentValue}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{kpi.target}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          kpi.status === 'On Track' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : kpi.status === 'At Risk'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {kpi.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-lg ${
                          kpi.trend === '↗' ? 'text-green-600 dark:text-green-400' :
                          kpi.trend === '↘' ? 'text-red-600 dark:text-red-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {kpi.trend}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(kpi.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
