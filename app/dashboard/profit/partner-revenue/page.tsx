/**
 * PROFIT - Partner Revenue
 * Track revenue sharing with channel partners
 */

'use client';

const mockPartners = [
  { name: 'TechBridge Partners', revenue: 47500, commission: 7125, rate: '15%', status: 'Active', deals: 8 },
  { name: 'Nonprofit Tech Advisors', revenue: 32000, commission: 4800, rate: '15%', status: 'Active', deals: 5 },
  { name: 'Community Solutions Group', revenue: 28700, commission: 4305, rate: '15%', status: 'Active', deals: 6 },
  { name: 'Impact Consulting Network', revenue: 19200, commission: 2880, rate: '15%', status: 'Active', deals: 3 },
];

export default function PartnerRevenuePage() {
  const stats = {
    totalRevenue: mockPartners.reduce((sum, p) => sum + p.revenue, 0),
    totalCommissions: mockPartners.reduce((sum, p) => sum + p.commission, 0),
    activePartners: mockPartners.filter(p => p.status === 'Active').length,
    avgCommissionRate: 15,
    totalDeals: mockPartners.reduce((sum, p) => sum + p.deals, 0),
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Partner Revenue</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Revenue sharing with channel partners</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Partner Revenue</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">
              ${(stats.totalRevenue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Commissions</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">
              ${(stats.totalCommissions / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Active Partners</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">{stats.activePartners}</div>
          </div>
          <div className="bg-lime-50 dark:bg-lime-900/20 rounded-lg p-3">
            <div className="text-xs text-lime-600 dark:text-lime-400 uppercase tracking-wide">Avg Rate</div>
            <div className="text-lg font-bold text-lime-900 dark:text-lime-100 mt-1">{stats.avgCommissionRate}%</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Deals</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{stats.totalDeals}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Partner Performance</h2>
              <button className="btn-primary text-sm">+ Add Partner</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Partner Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Commission</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Deals</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPartners.map((partner, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary cursor-pointer"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{partner.name}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      ${partner.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-orange-600">
                      ${partner.commission.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{partner.rate}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{partner.deals}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        {partner.status}
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
  );
}
