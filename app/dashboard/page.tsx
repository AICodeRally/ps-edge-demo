/**
 * PS-Edge Home Dashboard
 * Main dashboard showing aggregated 6Ps metrics across all departments
 * (People, Process, Platform, Performance, Profit, Purpose)
 */

import { SixPsDashboard } from '@/src/components/ps-edge/SixPsDashboard';
import { AGGREGATE_SIX_PS } from '@/src/data/ps-edge/six-ps.data';
import { BRAND_CONFIG } from '@/src/config/brand.config';

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className={`text-xl font-bold ${BRAND_CONFIG.gradient.textClass}`}>
            Phoenix Philanthropy Group
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            6P Performance Dashboard
          </p>
        </div>
      </div>

      {/* 6Ps Dashboard - Aggregated View */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <SixPsDashboard
            data={AGGREGATE_SIX_PS}
            title="Your live view of Purpose, People, Product, Process, Pipeline, Profit"
            subtitle="Aggregated metrics across all departments - Select a P from the footer navigation for detailed views"
          />
        </div>
      </div>
    </div>
  )
}
