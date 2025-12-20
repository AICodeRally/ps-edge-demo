/**
 * Delivery Department Dashboard
 * Shows Delivery-specific 6Ps metrics
 */

import { SixPsDashboard } from '@/src/components/ps-edge/SixPsDashboard';
import { DELIVERY_SIX_PS } from '@/src/data/ps-edge/six-ps.data';

export default function DeliveryDashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-dept-delivery rounded-lg">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dept-delivery">
              Delivery Department
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Engagements, Deliverables & Team Performance
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          {/* 6Ps Dashboard - Delivery Specific */}
          <div>
            <SixPsDashboard
              data={DELIVERY_SIX_PS}
              title="Delivery 6Ps Performance"
              subtitle="Key metrics for delivery team utilization, project success, and client satisfaction"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
