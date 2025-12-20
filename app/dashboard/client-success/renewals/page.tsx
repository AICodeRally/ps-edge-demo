/**
 * Client Success - Renewals Pipeline
 * Track contract renewals and upcoming expirations
 */

'use client';

const renewals = [
  { client: 'Heritage Preservation', currentARR: 76800, renewalDate: '2025-02-15', daysUntil: 27, likelihood: 'High', status: 'Negotiating' },
  { client: 'Community Arts', currentARR: 68500, renewalDate: '2025-03-01', daysUntil: 41, likelihood: 'Medium', status: 'Pending' },
  { client: 'Youth Development', currentARR: 54300, renewalDate: '2025-03-20', daysUntil: 60, likelihood: 'High', status: 'Pending' },
  { client: 'Animal Rescue', currentARR: 16000, renewalDate: '2025-04-10', daysUntil: 81, likelihood: 'Low', status: 'At Risk' },
  { client: 'Seniors Support', currentARR: 32400, renewalDate: '2025-05-05', daysUntil: 106, likelihood: 'Low', status: 'At Risk' },
];

export default function RenewalsPage() {
  const totalARR = renewals.reduce((sum, r) => sum + r.currentARR, 0);
  const atRisk = renewals.filter(r => r.likelihood === 'Low').length;
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Renewals Pipeline</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track upcoming contract renewals</p>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">ARR at Risk</div>
              <div className="text-3xl font-bold text-green-600">${(totalARR / 1000).toFixed(0)}k</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due in 30 Days</div>
              <div className="text-3xl font-bold text-yellow-600">1</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">At Risk</div>
              <div className="text-3xl font-bold text-red-600">{atRisk}</div>
            </div>
          </div>
          <div className="card p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border-default">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Current ARR</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Renewal Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Days Until</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Likelihood</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((renewal) => (
                  <tr key={renewal.client} className="border-b border-gray-100 dark:border-dark-border-default hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">{renewal.client}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">${renewal.currentARR.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{renewal.renewalDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{renewal.daysUntil} days</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        renewal.likelihood === 'High' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                        renewal.likelihood === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>{renewal.likelihood}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        renewal.status === 'Negotiating' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                        renewal.status === 'Pending' ? 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>{renewal.status}</span>
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
