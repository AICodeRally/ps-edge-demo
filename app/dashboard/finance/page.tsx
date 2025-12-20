/**
 * Finance Department Dashboard
 * Shows Finance-specific 6Ps metrics
 */

import { SixPsDashboard } from '@/src/components/ps-edge/SixPsDashboard';
import { FINANCE_SIX_PS } from '@/src/data/ps-edge/six-ps.data';

export default function FinanceDashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-dept-finance rounded-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dept-finance">
              Finance Department
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Timesheets, Invoices & Financial Health
            </p>
          </div>
        </div>
      </div>

      {/* 6Ps Dashboard - Finance Specific */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <SixPsDashboard
            data={FINANCE_SIX_PS}
            title="Finance 6Ps Performance"
            subtitle="Key metrics for revenue, margins, cash flow, and financial stewardship"
          />
        </div>
      </div>
    </div>
  );
}
