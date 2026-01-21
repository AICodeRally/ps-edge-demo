/**
 * PLATFORM - Tenant Management
 */

'use client';

export default function TenantsPage() {
  const tenants = [
    { name: 'Phoenix Philanthropy Group', tenantId: 'ppg-main', status: 'Active', seats: 24, plan: 'Enterprise', created: '2024-01-15' },
    { name: 'Global Giving Foundation', tenantId: 'ggf-2024', status: 'Active', seats: 12, plan: 'Professional', created: '2024-02-20' },
    { name: 'Community Impact Network', tenantId: 'cin-org', status: 'Active', seats: 8, plan: 'Professional', created: '2024-03-10' },
    { name: 'Youth Development Alliance', tenantId: 'yda-main', status: 'Trial', seats: 5, plan: 'Trial', created: '2026-01-10' },
    { name: 'Education First Collaborative', tenantId: 'efc-2024', status: 'Active', seats: 15, plan: 'Enterprise', created: '2024-04-05' },
    { name: 'Health Access Partners', tenantId: 'hap-org', status: 'Active', seats: 7, plan: 'Professional', created: '2024-05-12' },
    { name: 'Arts & Culture Initiative', tenantId: 'aci-main', status: 'Trial', seats: 3, plan: 'Trial', created: '2026-01-12' },
    { name: 'Environmental Action Group', tenantId: 'eag-2024', status: 'Churned', seats: 6, plan: 'Professional', created: '2024-06-01' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tenant Management</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Multi-tenant client management</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Total Tenants</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">34</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Active</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">28</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3">
            <div className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wide">Trial</div>
            <div className="text-lg font-bold text-pink-900 dark:text-pink-100 mt-1">4</div>
          </div>
          <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-3">
            <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Churned</div>
            <div className="text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100 mt-1">2</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Seats</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">8.4</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="card">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border-default">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Tenants</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Multi-tenant client organizations</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg-tertiary border-b border-gray-200 dark:border-dark-border-default">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tenant ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Seats</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border-default">
                  {tenants.map((tenant, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{tenant.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono text-xs">{tenant.tenantId}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          tenant.status === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : tenant.status === 'Trial'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{tenant.seats}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{tenant.plan}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{tenant.created}</td>
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
