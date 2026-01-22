/**
 * PRACTICE - Methodologies
 * PPG's consulting frameworks and approaches for nonprofit sector
 */

'use client';

import { SetPageTitle } from '@/src/components/SetPageTitle';

export default function MethodologiesPage() {
  const methodologies = [
    { name: 'Campaign Planning Framework', adoptionRate: '100%', avgSuccess: '94%', clients: 23 },
    { name: 'Board Governance Assessment', adoptionRate: '95%', avgSuccess: '91%', clients: 18 },
    { name: 'Strategic Planning Methodology', adoptionRate: '98%', avgSuccess: '96%', clients: 31 },
    { name: 'Donor Pyramid Analysis', adoptionRate: '92%', avgSuccess: '89%', clients: 27 },
    { name: 'Feasibility Study Protocol', adoptionRate: '88%', avgSuccess: '93%', clients: 12 },
  ];

  return (
    <div className="h-full flex flex-col">
      <SetPageTitle title="Methodologies" />
      
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Consulting Methodologies</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Proven frameworks and approaches for nonprofit consulting excellence
        </p>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Methodologies</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">5</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Avg Adoption</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">94.6%</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Avg Success Rate</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">92.6%</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Clients Using</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">111</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Methodologies</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Methodology</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Adoption Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Avg Success</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Clients</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {methodologies.map((method, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{method.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{method.adoptionRate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{method.avgSuccess}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{method.clients}</td>
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
