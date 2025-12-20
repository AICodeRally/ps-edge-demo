/**
 * Client Success - Health Monitor
 * Track client health scores and engagement metrics
 */

'use client';

const clients = [
  { name: 'Hopewell Community', health: 98, activeUsers: 24, lastLogin: '2h ago', engagement: 'High', churnRisk: 'Low' },
  { name: 'Education Excellence', health: 96, activeUsers: 22, lastLogin: '1h ago', engagement: 'High', churnRisk: 'Low' },
  { name: 'Heritage Preservation', health: 92, activeUsers: 18, lastLogin: '3h ago', engagement: 'High', churnRisk: 'Low' },
  { name: 'Community Arts', health: 94, activeUsers: 15, lastLogin: '1d ago', engagement: 'Medium', churnRisk: 'Low' },
  { name: 'Youth Development', health: 87, activeUsers: 12, lastLogin: '5h ago', engagement: 'Medium', churnRisk: 'Medium' },
  { name: 'Wellness Initiative', health: 89, activeUsers: 14, lastLogin: '8h ago', engagement: 'Medium', churnRisk: 'Low' },
  { name: 'Animal Rescue', health: 78, activeUsers: 5, lastLogin: '2d ago', engagement: 'Low', churnRisk: 'Medium' },
  { name: 'Seniors Support', health: 68, activeUsers: 8, lastLogin: '6d ago', engagement: 'Low', churnRisk: 'High' },
  { name: 'Environmental Action', health: 62, activeUsers: 3, lastLogin: '5d ago', engagement: 'Low', churnRisk: 'High' },
];

export default function ClientHealthPage() {
  const avgHealth = Math.round(clients.reduce((sum, c) => sum + c.health, 0) / clients.length);
  const atRisk = clients.filter(c => c.health < 70).length;
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Health Monitor</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track client health scores and engagement</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Health Score</div>
              <div className="text-3xl font-bold text-green-600">{avgHealth}%</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">At Risk</div>
              <div className="text-3xl font-bold text-red-600">{atRisk}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Healthy</div>
              <div className="text-3xl font-bold text-green-600">{clients.length - atRisk}</div>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Client Health Status</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Health Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Active Users</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Last Login</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Churn Risk</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.name} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden w-20">
                          <div className={`h-full ${client.health >= 90 ? 'bg-green-500' : client.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${client.health}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{client.health}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{client.activeUsers}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{client.lastLogin}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.engagement === 'High' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        client.engagement === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>{client.engagement}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.churnRisk === 'Low' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        client.churnRisk === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>{client.churnRisk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
