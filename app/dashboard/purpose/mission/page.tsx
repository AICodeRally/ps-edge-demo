/**
 * PURPOSE - Mission Dashboard
 */

'use client';

export default function MissionDashboardPage() {
  const metrics = [
    { label: 'Mission Alignment', value: '92', unit: '%', trend: '+3%', trendUp: true, color: 'bg-yellow-500' },
    { label: 'Community Hours', value: '1,247', unit: 'hrs', trend: '+156', trendUp: true, color: 'bg-amber-500' },
    { label: 'Impact Score', value: '8.4', unit: '/10', trend: '+0.6', trendUp: true, color: 'bg-orange-500' },
    { label: 'Success Stories', value: '34', unit: '', trend: '+8', trendUp: true, color: 'bg-lime-500' },
    { label: 'Volunteer Hours', value: '892', unit: 'hrs', trend: '+124', trendUp: true, color: 'bg-yellow-600' },
  ];

  const missionInitiatives = [
    { 
      initiative: 'Community Tech Access', 
      alignmentScore: 95, 
      communityHours: 342,
      impact: 'High',
      volunteers: 28
    },
    { 
      initiative: 'Nonprofit Capacity Building', 
      alignmentScore: 92, 
      communityHours: 287,
      impact: 'High',
      volunteers: 22
    },
    { 
      initiative: 'Youth STEM Education', 
      alignmentScore: 88, 
      communityHours: 216,
      impact: 'Medium',
      volunteers: 19
    },
    { 
      initiative: 'Environmental Data Platform', 
      alignmentScore: 90, 
      communityHours: 189,
      impact: 'High',
      volunteers: 15
    },
    { 
      initiative: 'Healthcare Access Initiative', 
      alignmentScore: 94, 
      communityHours: 156,
      impact: 'High',
      volunteers: 12
    },
    { 
      initiative: 'Arts & Culture Support', 
      alignmentScore: 85, 
      communityHours: 124,
      impact: 'Medium',
      volunteers: 18
    },
    { 
      initiative: 'Food Security Network', 
      alignmentScore: 87, 
      communityHours: 98,
      impact: 'Medium',
      volunteers: 14
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mission Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mission alignment and impact metrics</p>
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

          {/* Mission Impact Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Mission Impact Initiatives</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Community initiatives and alignment metrics</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add Initiative
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Initiative</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Alignment Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Community Hours</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Impact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Volunteers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {missionInitiatives.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.initiative}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[120px]">
                            <div 
                              className={`h-2 rounded-full ${
                                item.alignmentScore >= 90 ? 'bg-green-500' : 
                                item.alignmentScore >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${item.alignmentScore}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-10">{item.alignmentScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.communityHours} hrs</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.impact === 'High' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {item.impact}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.volunteers}</td>
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
