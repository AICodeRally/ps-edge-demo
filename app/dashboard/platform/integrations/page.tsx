/**
 * PLATFORM - Integration Hub
 */

'use client';

export default function IntegrationsPage() {
  const integrations = [
    { name: 'Salesforce', category: 'CRM', status: 'Connected', apiCalls: '87.2K', lastSync: '5m ago', health: 99.8 },
    { name: 'QuickBooks', category: 'Accounting', status: 'Connected', apiCalls: '124.5K', lastSync: '12m ago', health: 99.9 },
    { name: 'Slack', category: 'Communication', status: 'Connected', apiCalls: '45.8K', lastSync: '2m ago', health: 100.0 },
    { name: 'Microsoft Teams', category: 'Communication', status: 'Connected', apiCalls: '32.1K', lastSync: '8m ago', health: 98.4 },
    { name: 'Google Workspace', category: 'Productivity', status: 'Connected', apiCalls: '156.3K', lastSync: '3m ago', health: 99.7 },
    { name: 'Stripe', category: 'Payments', status: 'Connected', apiCalls: '12.4K', lastSync: '15m ago', health: 99.2 },
    { name: 'HubSpot', category: 'Marketing', status: 'Connected', apiCalls: '21.7K', lastSync: '10m ago', health: 98.9 },
    { name: 'Jira', category: 'Project Management', status: 'Connected', apiCalls: '9.3K', lastSync: '7m ago', health: 99.5 },
    { name: 'Asana', category: 'Project Management', status: 'Pending', apiCalls: '0', lastSync: 'Never', health: 0 },
    { name: 'Zendesk', category: 'Support', status: 'Error', apiCalls: '18.2K', lastSync: '2h ago', health: 72.1 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Integration Hub</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Third-party integrations and APIs</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Active Integrations</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">12</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">API Calls (30d)</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">487K</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Success Rate</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">99.2%</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Avg Latency</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">234ms</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Failed Webhooks</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">3</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Connected Integrations</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Third-party service connections and health status</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">API Calls (30d)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Last Sync</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {integrations.map((integration, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{integration.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{integration.category}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          integration.status === 'Connected' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : integration.status === 'Pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {integration.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{integration.apiCalls}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{integration.lastSync}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${
                                integration.health >= 98 ? 'bg-green-500' : integration.health >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${integration.health}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[45px]">
                            {integration.health > 0 ? `${integration.health}%` : '-'}
                          </span>
                        </div>
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
