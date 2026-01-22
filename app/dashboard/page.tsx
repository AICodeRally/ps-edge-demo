/**
 * PS-Edge Home Dashboard
 * Main dashboard showing aggregated 6Ps metrics across all departments
 * (Purpose, People, Process, Practice, Pipeline, Profit)
 * + Optional 7th P: Partners (Channel Partner Module - toggleable)
 */

'use client';

import { SixPsDashboard } from '@/src/components/ps-edge/SixPsDashboard';
import { PartnersModule } from '@/src/components/ps-edge/PartnersModule';
import { AGGREGATE_SIX_PS } from '@/src/data/ps-edge/six-ps.data';
import { BRAND_CONFIG } from '@/src/config/brand.config';
import { SetPageTitle } from '@/src/components/SetPageTitle';
import { usePartnersEnabled } from '@/src/contexts/ModulesContext';

export default function Dashboard() {
  const partnersEnabled = usePartnersEnabled();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className={`text-xl font-bold ${BRAND_CONFIG.gradient.textClass}`}>
            {partnersEnabled ? '6P + Partners Dashboard' : '6P Performance Dashboard'}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {partnersEnabled
              ? 'Purpose, People, Process, Practice, Pipeline, Profit + Channel Partners'
              : 'Purpose, People, Process, Practice, Pipeline, Profit'
            }
          </p>
        </div>
      </div>

      {/* 6Ps Dashboard - Aggregated View */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <SixPsDashboard
            data={AGGREGATE_SIX_PS}
            title=""
            subtitle="Aggregated metrics across all departments - Select 'View' from each panel to enter the P of your choice"
          />

          {/* 7th P: PARTNERS - Horizontal Module (Toggleable) */}
          {partnersEnabled && <PartnersModule />}
        </div>
      </div>
    </div>
  );
}
