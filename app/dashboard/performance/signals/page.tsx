/**
 * PERFORMANCE - Signals
 */

'use client';

const signals = [
  { id: 1, client: 'Hopewell Community', type: 'critical', message: 'System downtime detected', timestamp: '2 min ago', category: 'System' },
  { id: 2, client: 'Education Excellence', type: 'critical', message: 'Database connection failed', timestamp: '5 min ago', category: 'Database' },
  { id: 3, client: 'Heritage Preservation', type: 'warning', message: 'High memory usage (85%)', timestamp: '12 min ago', category: 'Performance' },
  { id: 4, client: 'Community Arts', type: 'warning', message: 'API rate limit approaching', timestamp: '18 min ago', category: 'API' },
  { id: 5, client: 'Youth Development', type: 'warning', message: 'Login failures increased', timestamp: '25 min ago', category: 'Security' },
  { id: 6, client: 'Wellness Initiative', type: 'info', message: 'Scheduled maintenance complete', timestamp: '32 min ago', category: 'Maintenance' },
  { id: 7, client: 'Animal Rescue', type: 'warning', message: 'Response time elevated', timestamp: '45 min ago', category: 'Performance' },
  { id: 8, client: 'Seniors Support', type: 'info', message: 'Backup completed successfully', timestamp: '1 hr ago', category: 'Backup' },
  { id: 9, client: 'Environmental Action', type: 'info', message: 'New user registered', timestamp: '1 hr ago', category: 'User' },
  { id: 10, client: 'Hopewell Community', type: 'info', message: 'Report generated', timestamp: '2 hr ago', category: 'Reporting' },
  { id: 11, client: 'Education Excellence', type: 'warning', message: 'Disk space at 75%', timestamp: '2 hr ago', category: 'Storage' },
  { id: 12, client: 'Heritage Preservation', type: 'info', message: 'Integration sync complete', timestamp: '3 hr ago', category: 'Integration' },
];

export default function SignalsPage() {
  const activeSignals = signals.length;
  const critical = signals.filter(s => s.type === 'critical').length;
  const warnings = signals.filter(s => s.type === 'warning').length;
  const info = signals.filter(s => s.type === 'info').length;
  const last24h = signals.filter(s => {
    // Simple filter for demo - all signals are < 24h
    return true;
  }).length;

  const metrics = [
    { label: 'Active Signals', value: activeSignals, unit: 'total', trend: '+8', trendUp: false, color: 'bg-pink-500' },
    { label: 'Critical', value: critical, unit: 'alerts', trend: '+2', trendUp: false, color: 'bg-red-500' },
    { label: 'Warnings', value: warnings, unit: 'alerts', trend: '+3', trendUp: false, color: 'bg-orange-500' },
    { label: 'Info', value: info, unit: 'alerts', trend: '+3', trendUp: true, color: 'bg-gray-500' },
    { label: 'Last 24h', value: last24h, unit: 'signals', trend: '+8', trendUp: false, color: 'bg-rose-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Signals</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Real-time client signals and alerts</p>
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

          {/* Signals List */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Signals</h2>
            <div className="space-y-3">
              {signals.map((signal) => (
                <div key={signal.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors">
                  {/* Type Indicator */}
                  <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
                    signal.type === 'critical' ? 'bg-red-500' :
                    signal.type === 'warning' ? 'bg-orange-500' :
                    'bg-gray-400'
                  }`} />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{signal.client}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            signal.type === 'critical' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                            signal.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' :
                            'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                          }`}>{signal.type}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                            {signal.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{signal.message}</p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {signal.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
