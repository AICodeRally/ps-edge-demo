/**
 * PROFIT - Commissions
 */

'use client';

export default function CommissionsPage() {
  const commissions = [
    { consultant: 'Sarah Chen', client: 'Global Giving Foundation', amount: 12400, period: 'Q4 2025', status: 'Paid', paidDate: 'Jan 15, 2026', rate: '8%' },
    { consultant: 'Marcus Webb', client: 'Community Impact Network', amount: 9800, period: 'Q4 2025', status: 'Paid', paidDate: 'Jan 15, 2026', rate: '7%' },
    { consultant: 'Emily Rodriguez', client: 'Youth Development Alliance', amount: 11200, period: 'Q4 2025', status: 'Pending', paidDate: '-', rate: '8%' },
    { consultant: 'David Kim', client: 'Education First Collaborative', amount: 8500, period: 'Q4 2025', status: 'Pending', paidDate: '-', rate: '6.5%' },
    { consultant: 'Jennifer Walsh', client: 'Health Access Partners', amount: 10100, period: 'Q4 2025', status: 'Paid', paidDate: 'Jan 15, 2026', rate: '7.5%' },
    { consultant: 'Robert Taylor', client: 'Global Giving Foundation', amount: 7300, period: 'Q4 2025', status: 'Pending', paidDate: '-', rate: '6%' },
    { consultant: 'Lisa Anderson', client: 'Arts & Culture Initiative', amount: 9400, period: 'Q4 2025', status: 'Paid', paidDate: 'Jan 15, 2026', rate: '7%' },
    { consultant: 'Michael Brooks', client: 'Community Impact Network', amount: 6800, period: 'Q4 2025', status: 'Pending', paidDate: '-', rate: '5.5%' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Commissions</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Partner commissions and payouts</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Total Commissions</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$142K</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Pending</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">$28K</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Paid This Month</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">$34K</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-wide">Top Earner</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">$12K</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <div className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wide">Avg Commission</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-100 mt-1">$4.2K</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Commission Payouts</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Partner commission details and payment status</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Consultant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Period</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Paid Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {commissions.map((commission, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{commission.consultant}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{commission.client}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">${commission.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{commission.rate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{commission.period}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          commission.status === 'Paid' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{commission.paidDate}</td>
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
