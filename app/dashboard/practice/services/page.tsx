/**
 * PRACTICE - Service Lines
 * Phoenix Philanthropy Group's 11 nonprofit consulting service lines + 2026 AI
 */

'use client';

import { SetPageTitle } from '@/components/SetPageTitle';

export default function ServiceLinesPage() {
  const serviceLines = [
    { name: 'Campaign Fundraising', revenue: '$1.2M', engagements: 8, margin: '42%', trend: 'up' },
    { name: 'Volunteer Leadership (Board Development)', revenue: '$580K', engagements: 12, margin: '38%', trend: 'stable' },
    { name: 'Executive Coaching', revenue: '$340K', engagements: 15, margin: '52%', trend: 'up' },
    { name: 'Mergers & Acquisitions', revenue: '$420K', engagements: 3, margin: '35%', trend: 'down' },
    { name: 'Operational Fundraising', revenue: '$290K', engagements: 9, margin: '40%', trend: 'stable' },
    { name: 'Relationship Management', revenue: '$380K', engagements: 11, margin: '44%', trend: 'up' },
    { name: 'Interim Management', revenue: '$520K', engagements: 4, margin: '30%', trend: 'stable' },
    { name: 'Philanthropy Advisory', revenue: '$270K', engagements: 7, margin: '48%', trend: 'up' },
    { name: 'Strategic Planning', revenue: '$680K', engagements: 14, margin: '41%', trend: 'up' },
    { name: 'Alumni Relations', revenue: '$310K', engagements: 6, margin: '36%', trend: 'stable' },
    { name: 'Advancement Academy', revenue: '$180K', engagements: 22, margin: '55%', trend: 'up' },
    { name: '2026 AI Line of Service', revenue: '$95K', engagements: 3, margin: '58%', trend: 'up', badge: 'NEW' },
  ];

  return (
    <div className="h-full flex flex-col">
      <SetPageTitle title="Service Lines" />
      
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Service Lines</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Phoenix Philanthropy Groups 11 nonprofit consulting service lines + 2026 AI offerings
        </p>
        
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Total Revenue</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">$5.26M</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Service Lines</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">12</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Active Engagements</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">114</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Avg Margin</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">42.5%</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Top Service</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">Campaign</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Service Lines - Performance by Offering</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Service Line</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Revenue</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Engagements</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Margin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {serviceLines.map((service, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          {service.name}
                          {service.badge && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                              {service.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{service.revenue}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{service.engagements}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{service.margin}</td>
                      <td className="px-4 py-3">
                        <span className={'inline-flex px-2 py-1 text-xs font-medium rounded-full ' + (
                          service.trend === 'up'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : service.trend === 'down'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                        )}>
                          {service.trend}
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
  );
}
