/**
 * PURPOSE - Client Success
 */

'use client';

export default function ClientSuccessPage() {
  const metrics = [
    { label: 'Client Satisfaction', value: '94', unit: '%', trend: '+2%', trendUp: true, color: 'bg-yellow-500' },
    { label: 'NPS Score', value: '72', unit: '', trend: '+8', trendUp: true, color: 'bg-amber-500' },
    { label: 'Success Rate', value: '89', unit: '%', trend: '+5%', trendUp: true, color: 'bg-orange-500' },
    { label: 'Renewals', value: '47', unit: '/52', trend: '90%', trendUp: true, color: 'bg-lime-500' },
    { label: 'Referrals', value: '23', unit: '', trend: '+7', trendUp: true, color: 'bg-yellow-600' },
  ];

  const successStories = [
    { 
      client: 'Hope Foundation', 
      title: 'Digital Transformation Success', 
      impactMetrics: '+45% donor engagement, $2.1M raised',
      testimonial: 'PPG transformed our operations completely. We\'ve never been more effective.',
      date: '2026-01-15'
    },
    { 
      client: 'Community Health Network', 
      title: 'Healthcare System Integration', 
      impactMetrics: '18 clinics connected, -35% admin overhead',
      testimonial: 'The integration project exceeded all expectations. Patients are thriving.',
      date: '2026-01-08'
    },
    { 
      client: 'Education First Alliance', 
      title: 'Student Outcomes Platform', 
      impactMetrics: '12,000 students tracked, +22% graduation rate',
      testimonial: 'Data-driven insights are changing lives. This platform is a game changer.',
      date: '2025-12-20'
    },
    { 
      client: 'Green Earth Initiative', 
      title: 'Carbon Tracking Dashboard', 
      impactMetrics: '500K tons CO2 monitored, 89% accuracy',
      testimonial: 'Finally, we can measure our environmental impact in real-time.',
      date: '2025-12-12'
    },
    { 
      client: 'Regional Arts Council', 
      title: 'Grant Management System', 
      impactMetrics: '$8.4M distributed, +60% processing speed',
      testimonial: 'The grant process went from weeks to days. Artists are getting funded faster.',
      date: '2025-11-28'
    },
    { 
      client: 'Tech for Good', 
      title: 'Volunteer Coordination App', 
      impactMetrics: '2,400 volunteers, 98% satisfaction',
      testimonial: 'Volunteer engagement has never been this easy. Adoption was instant.',
      date: '2025-11-15'
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Success</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client success stories and testimonials</p>
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

          {/* Success Stories Table */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Success Stories</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client testimonials and impact metrics</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                + Add Story
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Story Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Impact Metrics</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Testimonial</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {successStories.map((story, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{story.client}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{story.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="max-w-xs truncate">{story.impactMetrics}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="max-w-md truncate italic">&ldquo;{story.testimonial}&rdquo;</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
