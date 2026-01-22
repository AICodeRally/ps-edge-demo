/**
 * PLATFORM - Data Management
 */

'use client';

export default function DataPage() {
  const dataSources = [
    { source: 'PostgreSQL Production', type: 'Database', status: 'Healthy', records: '847.2K', quality: 98.4, lastSync: '3m ago' },
    { source: 'Salesforce API', type: 'External', status: 'Healthy', records: '234.8K', quality: 96.7, lastSync: '5m ago' },
    { source: 'QuickBooks API', type: 'External', status: 'Healthy', records: '128.4K', quality: 99.1, lastSync: '8m ago' },
    { source: 'Client Telemetry', type: 'Stream', status: 'Healthy', records: '1.2M', quality: 94.2, lastSync: '1m ago' },
    { source: 'File Storage (S3)', type: 'Object Storage', status: 'Healthy', records: '24.7GB', quality: 100.0, lastSync: '2h ago' },
    { source: 'Legacy Database', type: 'Database', status: 'Warning', records: '412.9K', quality: 87.3, lastSync: '45m ago' },
  ];

  const recentSyncLogs = [
    { timestamp: '3m ago', source: 'PostgreSQL', operation: 'Incremental Sync', records: 1247, duration: '2.4s', status: 'Success' },
    { timestamp: '5m ago', source: 'Salesforce', operation: 'Full Sync', records: 8932, duration: '12.8s', status: 'Success' },
    { timestamp: '8m ago', source: 'QuickBooks', operation: 'Incremental Sync', records: 342, duration: '1.7s', status: 'Success' },
    { timestamp: '10m ago', source: 'Client Telemetry', operation: 'Stream Ingestion', records: 24891, duration: '0.8s', status: 'Success' },
    { timestamp: '15m ago', source: 'File Storage', operation: 'Backup', records: 0, duration: '34.2s', status: 'Success' },
    { timestamp: '45m ago', source: 'Legacy Database', operation: 'Full Sync', records: 412, duration: '8.9s', status: 'Warning' },
  ];

  const storageBreakdown = [
    { category: 'Client Data', size: '8.4 GB', percentage: 34, color: 'bg-fuchsia-500' },
    { category: 'Engagement Records', size: '6.2 GB', percentage: 25, color: 'bg-purple-500' },
    { category: 'Telemetry Logs', size: '4.8 GB', percentage: 19, color: 'bg-pink-500' },
    { category: 'Documents', size: '3.5 GB', percentage: 14, color: 'bg-violet-500' },
    { category: 'Backups', size: '1.8 GB', percentage: 8, color: 'bg-gray-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Data Management</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Data sources and pipelines</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Total Records</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">1.2M</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Data Quality %</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">96.4%</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Storage Used</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">24.7 GB</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Sync Status</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">Active</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Last Backup</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">2h ago</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Data Sources */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Sources</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Connected data sources and quality metrics</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Records</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Quality</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {dataSources.map((source, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{source.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{source.type}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          source.status === 'Healthy' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {source.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{source.records}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{source.quality}%</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{source.lastSync}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Recent Sync Logs */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Sync Logs</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest data synchronization activities</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Source</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Records</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                    {recentSyncLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{log.source}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{log.records.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            log.status === 'Success' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Storage Breakdown */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Storage Breakdown</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Data storage by category</p>
              </div>
              <div className="p-4 space-y-4">
                {storageBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-900 dark:text-gray-100">{item.category}</span>
                      <span className="text-gray-600 dark:text-gray-400">{item.size}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
