/**
 * PERFORMANCE - Benchmarks
 */

'use client';

const benchmarks = [
  { category: 'Revenue Growth', metric: '25%', target: '20%', industry: '18%', status: 'above', trend: '+5%' },
  { category: 'Client Retention', metric: '94%', target: '90%', industry: '87%', status: 'above', trend: '+4%' },
  { category: 'Utilization Rate', metric: '78%', target: '75%', industry: '72%', status: 'above', trend: '+3%' },
  { category: 'Project Margin', metric: '42%', target: '40%', industry: '38%', status: 'above', trend: '+2%' },
  { category: 'Client Satisfaction', metric: '4.6', target: '4.5', industry: '4.2', status: 'above', trend: '+0.3' },
  { category: 'Time to Invoice', metric: '5d', target: '7d', industry: '9d', status: 'above', trend: '-2d' },
  { category: 'Proposal Win Rate', metric: '68%', target: '65%', industry: '58%', status: 'above', trend: '+8%' },
  { category: 'Avg Deal Size', metric: '$85K', target: '$75K', industry: '$70K', status: 'above', trend: '+$10K' },
  { category: 'Response Time', metric: '142ms', target: '150ms', industry: '180ms', status: 'above', trend: '-8ms' },
  { category: 'Employee NPS', metric: '72', target: '70', industry: '65', status: 'above', trend: '+7' },
  { category: 'Revenue per FTE', metric: '$185K', target: '$175K', industry: '$160K', status: 'above', trend: '+$10K' },
  { category: 'Days Sales Out', metric: '32d', target: '35d', industry: '42d', status: 'above', trend: '-3d' },
];

export default function BenchmarksPage() {
  const totalBenchmarks = benchmarks.length;
  const aboveTarget = benchmarks.filter(b => b.status === 'above').length;
  const belowTarget = benchmarks.filter(b => b.status === 'below').length;
  const avgPerformance = ((aboveTarget / totalBenchmarks) * 100).toFixed(0);
  const industryRank = 'Top 15%';

  const metrics = [
    { label: 'Benchmarks Tracked', value: totalBenchmarks, unit: 'metrics', trend: '+2', trendUp: true, color: 'bg-pink-500' },
    { label: 'Above Target', value: aboveTarget, unit: 'metrics', trend: '+3', trendUp: true, color: 'bg-rose-500' },
    { label: 'Below Target', value: belowTarget, unit: 'metrics', trend: '-1', trendUp: true, color: 'bg-orange-500' },
    { label: 'Avg Performance', value: avgPerformance, unit: '%', trend: '+8%', trendUp: true, color: 'bg-red-500' },
    { label: 'Industry Rank', value: industryRank, unit: '', trend: '↗', trendUp: true, color: 'bg-pink-600' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Benchmarks</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Industry benchmarks and comparisons</p>
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

          {/* Benchmarks Table */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance Benchmarks</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Our Metric</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Target</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Industry Avg</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Trend</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((benchmark) => (
                  <tr key={benchmark.category} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{benchmark.category}</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">{benchmark.metric}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{benchmark.target}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">{benchmark.industry}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        benchmark.status === 'above' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>{benchmark.status === 'above' ? 'Above' : 'Below'}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-green-600 dark:text-green-400">{benchmark.trend}</td>
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
