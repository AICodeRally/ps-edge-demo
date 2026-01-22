/**
 * PURPOSE - Renewals
 */

'use client';

export default function RenewalsPage() {
  const metrics = [
    { label: 'Renewal Rate', value: '91', unit: '%', trend: '+4%', trendUp: true, color: 'bg-yellow-500' },
    { label: 'Up for Renewal', value: '18', unit: '', trend: '+3', trendUp: false, color: 'bg-amber-500' },
    { label: 'Renewed This Month', value: '12', unit: '', trend: '+5', trendUp: true, color: 'bg-orange-500' },
    { label: 'At Risk', value: '4', unit: '', trend: '-2', trendUp: true, color: 'bg-lime-500' },
    { label: 'Avg Contract Value', value: '$87K', unit: '', trend: '+$12K', trendUp: true, color: 'bg-yellow-600' },
  ];

  const renewals = [
    { 
      client: 'Hope Foundation', 
      contractValue: '$145K', 
      renewalDate: '2026-02-15',
      health: 'Excellent',
      probability: 95,
      owner: 'Sarah Chen'
    },
    { 
      client: 'Community Health Network', 
      contractValue: '$234K', 
      renewalDate: '2026-02-28',
      health: 'Good',
      probability: 88,
      owner: 'Marcus Webb'
    },
    { 
      client: 'Education First Alliance', 
      contractValue: '$98K', 
      renewalDate: '2026-03-10',
      health: 'Good',
      probability: 85,
      owner: 'Emily Rodriguez'
    },
    { 
      client: 'Urban Development Corp', 
      contractValue: '$187K', 
      renewalDate: '2026-03-22',
      health: 'At Risk',
      probability: 62,
      owner: 'David Kim'
    },
    { 
      client: 'Green Earth Initiative', 
      contractValue: '$156K', 
      renewalDate: '2026-04-05',
      health: 'Excellent',
      probability: 92,
      owner: 'Jennifer Walsh'
    },
    { 
      client: 'Regional Arts Council', 
      contractValue: '$76K', 
      renewalDate: '2026-04-18',
      health: 'Good',
      probability: 87,
      owner: 'Michael Brooks'
    },
    { 
      client: 'Tech for Good', 
      contractValue: '$89K', 
      renewalDate: '2026-05-02',
      health: 'Fair',
      probability: 74,
      owner: 'Robert Taylor'
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Renewals</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client renewal tracking and health</p>
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

          {/* Renewals Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Renewals</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client renewal tracking and probability</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add Renewal
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Contract Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Renewal Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Health</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Account Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {renewals.map((renewal, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{renewal.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-semibold">{renewal.contractValue}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(renewal.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          renewal.health === 'Excellent' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : renewal.health === 'Good'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : renewal.health === 'Fair'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                        }`}>
                          {renewal.health}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${
                                renewal.probability >= 90 ? 'bg-green-500' : 
                                renewal.probability >= 80 ? 'bg-blue-500' :
                                renewal.probability >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${renewal.probability}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{renewal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{renewal.owner}</td>
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
