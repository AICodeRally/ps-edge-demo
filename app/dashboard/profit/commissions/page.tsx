/**
 * PROFIT - Commissions
 */

'use client';

export default function CommissionsPage() {
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
          <div className="card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">🚧 Migrated to PROFIT</h2>
            <p className="text-gray-600 dark:text-gray-400">Commissions now under PROFIT section</p>
          </div>
        </div>
      </div>
    </div>
  );
}
