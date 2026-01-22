/**
 * PIPELINE - Revenue Forecasting
 * Sales forecasting and revenue targets
 */

'use client';

export default function RevenueForecastingPage() {
  const revenueByClient = [
    { client: 'Global Giving Foundation', revenue: 487200, percentage: 20.3, contracts: 3, avgDeal: 162400 },
    { client: 'Education First Collaborative', revenue: 423800, percentage: 17.7, contracts: 2, avgDeal: 211900 },
    { client: 'Community Impact Network', revenue: 356900, percentage: 14.9, contracts: 4, avgDeal: 89225 },
    { client: 'Health Access Partners', revenue: 289400, percentage: 12.1, contracts: 2, avgDeal: 144700 },
    { client: 'Youth Development Alliance', revenue: 247600, percentage: 10.3, contracts: 3, avgDeal: 82533 },
    { client: 'Arts & Culture Initiative', revenue: 198300, percentage: 8.3, contracts: 2, avgDeal: 99150 },
    { client: 'Phoenix Internal Projects', revenue: 156800, percentage: 6.5, contracts: 1, avgDeal: 156800 },
    { client: 'Other Clients', revenue: 239000, percentage: 9.9, contracts: 8, avgDeal: 29875 },
  ];

  // PPG's 11 Service Lines + AI Line of Service
  const revenueByService = [
    { service: 'Strategic Planning', revenue: 522000, percentage: 21.8, color: 'bg-violet-500' },
    { service: 'Campaign Fundraising', revenue: 422000, percentage: 17.6, color: 'bg-fuchsia-500' },
    { service: 'Board Development', revenue: 333000, percentage: 13.9, color: 'bg-pink-500' },
    { service: 'Grant Writing', revenue: 264000, percentage: 11.0, color: 'bg-orange-500' },
    { service: 'Executive Coaching', revenue: 209000, percentage: 8.7, color: 'bg-amber-500' },
    { service: 'Advancement Academy', revenue: 185000, percentage: 7.7, color: 'bg-yellow-500' },
    { service: 'Operational Fundraising', revenue: 162000, percentage: 6.8, color: 'bg-lime-500' },
    { service: 'AI Readiness Assessments', revenue: 96000, percentage: 4.0, color: 'bg-purple-500' },
    { service: 'Feasibility Studies', revenue: 72000, percentage: 3.0, color: 'bg-emerald-500' },
    { service: 'Relationship Management', revenue: 60000, percentage: 2.5, color: 'bg-teal-500' },
    { service: 'Alumni Relations', revenue: 32000, percentage: 1.3, color: 'bg-cyan-500' },
    { service: 'Interim Management', revenue: 26000, percentage: 1.1, color: 'bg-sky-500' },
    { service: 'M&A Advisory', revenue: 17000, percentage: 0.7, color: 'bg-blue-500' },
  ];

  const monthlyRevenue = [
    { month: 'Jul 2025', revenue: 234800, growth: 8.2 },
    { month: 'Aug 2025', revenue: 247200, growth: 5.3 },
    { month: 'Sep 2025', revenue: 268900, growth: 8.8 },
    { month: 'Oct 2025', revenue: 289400, growth: 7.6 },
    { month: 'Nov 2025', revenue: 312700, growth: 8.1 },
    { month: 'Dec 2025', revenue: 284300, growth: -9.1 },
    { month: 'Jan 2026', revenue: 298600, growth: 5.0 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Revenue Forecasting</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sales forecasting and revenue targets</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Total Revenue</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$2.4M</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">This Month</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">$284K</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Forecast (Q1)</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">$850K</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Growth Rate</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">+18.5%</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Avg Deal Size</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$47K</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Revenue by Client */}
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue by Client</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Top revenue-generating clients</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">% of Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Contracts</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Avg Deal Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {revenueByClient.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.client}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${item.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.percentage}%</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.contracts}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${item.avgDeal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Revenue by Service Type */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue by Service Type</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Breakdown by service offering</p>
              </div>
              <div className="p-4 space-y-4">
                {revenueByService.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-900 dark:text-gray-100">{item.service}</span>
                      <span className="text-gray-600 dark:text-gray-400">${(item.revenue / 1000).toFixed(0)}K</span>
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

            {/* Monthly Revenue Trend */}
            <div className="card">
              <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue Trend</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 7 months performance</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Month</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                    {monthlyRevenue.map((month, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{month.month}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${month.revenue.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            month.growth >= 0 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }`}>
                            {month.growth >= 0 ? '+' : ''}{month.growth}%
                          </span>
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
    </div>
  );
}
