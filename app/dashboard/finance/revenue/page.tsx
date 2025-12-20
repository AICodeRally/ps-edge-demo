/**
 * Finance - Revenue Page
 * Track revenue by client, engagement type, and consultant
 */

'use client';

import { ArrowUpIcon } from '@radix-ui/react-icons';

const revenueByClient = [
  { client: 'Hopewell Community Foundation', revenue: 128400, engagements: 3, growth: 18.5 },
  { client: 'Education Excellence Fund', revenue: 94200, engagements: 2, growth: 12.3 },
  { client: 'Heritage Preservation Society', revenue: 76800, engagements: 2, growth: 8.7 },
  { client: 'Community Arts Alliance', revenue: 68500, engagements: 2, growth: -2.4 },
  { client: 'Youth Development Network', revenue: 54300, engagements: 1, growth: 22.1 },
];

const revenueByType = [
  { type: 'Capital Campaign', revenue: 185600, percent: 35.2 },
  { type: 'Strategic Planning', revenue: 142300, percent: 27.0 },
  { type: 'Board Development', revenue: 98700, percent: 18.7 },
  { type: 'Grant Writing', revenue: 67400, percent: 12.8 },
  { type: 'Training Workshop', revenue: 33200, percent: 6.3 },
];

export default function RevenuePage() {
  const totalRevenue = revenueByClient.reduce((sum, c) => sum + c.revenue, 0);
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Revenue Analytics</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track revenue by client and engagement type</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue (YTD)</div>
              <div className="text-3xl font-bold text-green-600">${(totalRevenue / 1000).toFixed(0)}k</div>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <ArrowUpIcon className="w-4 h-4" />
                <span>+14.2%</span>
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Clients</div>
              <div className="text-3xl font-bold text-blue-600">{revenueByClient.length}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Revenue/Client</div>
              <div className="text-3xl font-bold text-purple-600">${(totalRevenue / revenueByClient.length / 1000).toFixed(0)}k</div>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue by Client</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Engagements</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Growth</th>
                </tr>
              </thead>
              <tbody>
                {revenueByClient.map((item) => (
                  <tr key={item.client} className="border-b border-gray-100 dark:border-dark-border-default">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{item.client}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">${item.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.engagements}</td>
                    <td className="py-3 px-4 text-sm font-semibold" style={{ color: item.growth > 0 ? '#10b981' : '#ef4444' }}>
                      {item.growth > 0 ? '+' : ''}{item.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue by Engagement Type</h2>
            <div className="space-y-4">
              {revenueByType.map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.type}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">${item.revenue.toLocaleString()} ({item.percent}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
