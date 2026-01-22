/**
 * PURPOSE - Proposals
 */

'use client';

export default function ProposalsPage() {
  const metrics = [
    { label: 'Total Proposals', value: '47', unit: '', trend: '+8', trendUp: true, color: 'bg-yellow-500' },
    { label: 'Pending', value: '12', unit: '', trend: '+3', trendUp: false, color: 'bg-amber-500' },
    { label: 'Accepted', value: '28', unit: '', trend: '+6', trendUp: true, color: 'bg-orange-500' },
    { label: 'Win Rate', value: '73', unit: '%', trend: '+5%', trendUp: true, color: 'bg-lime-500' },
    { label: 'Avg Value', value: '$124K', unit: '', trend: '+$18K', trendUp: true, color: 'bg-yellow-600' },
  ];

  const proposals = [
    { 
      client: 'Hope Foundation', 
      title: 'CRM System Implementation', 
      value: '$165K',
      status: 'Submitted',
      winProbability: 85,
      submittedDate: '2026-01-18'
    },
    { 
      client: 'Community Health Network', 
      title: 'Patient Portal Enhancement', 
      value: '$248K',
      status: 'Draft',
      winProbability: 72,
      submittedDate: '2026-01-15'
    },
    { 
      client: 'Education First Alliance', 
      title: 'Learning Management System', 
      value: '$134K',
      status: 'Submitted',
      winProbability: 78,
      submittedDate: '2026-01-12'
    },
    { 
      client: 'Urban Development Corp', 
      title: 'Project Management Platform', 
      value: '$198K',
      status: 'Pending',
      winProbability: 65,
      submittedDate: '2026-01-10'
    },
    { 
      client: 'Green Earth Initiative', 
      title: 'Environmental Data Dashboard', 
      value: '$112K',
      status: 'Accepted',
      winProbability: 100,
      submittedDate: '2026-01-05'
    },
    { 
      client: 'Regional Arts Council', 
      title: 'Grant Management Upgrade', 
      value: '$87K',
      status: 'Submitted',
      winProbability: 81,
      submittedDate: '2025-12-28'
    },
    { 
      client: 'Tech for Good', 
      title: 'Volunteer Platform v2', 
      value: '$94K',
      status: 'Accepted',
      winProbability: 100,
      submittedDate: '2025-12-20'
    },
    { 
      client: 'Youth Services Bureau', 
      title: 'Case Management System', 
      value: '$156K',
      status: 'Draft',
      winProbability: 68,
      submittedDate: '2025-12-15'
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Proposals</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Proposal creation and tracking</p>
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

          {/* Proposals Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Proposals</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Proposal tracking and win probability</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add Proposal
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Win Probability</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Submitted Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {proposals.map((proposal, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{proposal.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{proposal.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-semibold">{proposal.value}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          proposal.status === 'Accepted' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : proposal.status === 'Submitted'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : proposal.status === 'Pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div 
                              className={`h-2 rounded-full ${
                                proposal.winProbability === 100 ? 'bg-green-500' :
                                proposal.winProbability >= 80 ? 'bg-blue-500' :
                                proposal.winProbability >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${proposal.winProbability}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{proposal.winProbability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(proposal.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
