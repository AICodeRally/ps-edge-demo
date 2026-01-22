/**
 * PURPOSE - Clients
 */

'use client';

export default function ClientsPage() {
  const metrics = [
    { label: 'Total Clients', value: '127', unit: '', trend: '+14', trendUp: true, color: 'bg-yellow-500' },
    { label: 'Active', value: '98', unit: '', trend: '+8', trendUp: true, color: 'bg-amber-500' },
    { label: 'At Risk', value: '6', unit: '', trend: '-3', trendUp: true, color: 'bg-orange-500' },
    { label: 'Satisfaction', value: '92', unit: '%', trend: '+4%', trendUp: true, color: 'bg-lime-500' },
    { label: 'Retention Rate', value: '94', unit: '%', trend: '+2%', trendUp: true, color: 'bg-yellow-600' },
  ];

  const clients = [
    { name: 'Hope Foundation', type: 'Nonprofit', status: 'Active', engagements: 8, satisfaction: 95, owner: 'Sarah Chen' },
    { name: 'Community Health Network', type: 'Enterprise', status: 'Active', engagements: 12, satisfaction: 92, owner: 'Marcus Webb' },
    { name: 'Education First Alliance', type: 'Nonprofit', status: 'Active', engagements: 6, satisfaction: 88, owner: 'Emily Rodriguez' },
    { name: 'Urban Development Corp', type: 'Enterprise', status: 'At Risk', engagements: 4, satisfaction: 72, owner: 'David Kim' },
    { name: 'Green Earth Initiative', type: 'Nonprofit', status: 'Active', engagements: 9, satisfaction: 94, owner: 'Jennifer Walsh' },
    { name: 'Tech for Good', type: 'Startup', status: 'Active', engagements: 3, satisfaction: 90, owner: 'Robert Taylor' },
    { name: 'Youth Services Bureau', type: 'Nonprofit', status: 'Inactive', engagements: 2, satisfaction: 85, owner: 'Lisa Anderson' },
    { name: 'Regional Arts Council', type: 'Nonprofit', status: 'Active', engagements: 7, satisfaction: 91, owner: 'Michael Brooks' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client directory and relationships</p>
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

          {/* Client Directory Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Client Directory</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All clients and their engagement metrics</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add Client
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Engagements</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Satisfaction</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Account Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {clients.map((client, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{client.type}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          client.status === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : client.status === 'At Risk'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{client.engagements}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                client.satisfaction >= 90 ? 'bg-green-500' : 
                                client.satisfaction >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${client.satisfaction}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{client.satisfaction}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{client.owner}</td>
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
