/**
 * PLATFORM - Tenant Management
 */

'use client';

export default function TenantsPage() {
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
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">🚧 Migrated to PLATFORM</h2>
            <p className="text-gray-600 dark:text-gray-400">Tenant Management now under PLATFORM section</p>
          </div>
        </div>
      </div>
    </div>
  );
}
