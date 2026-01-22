'use client';

/**
 * Settings - Business Modules
 * Toggle optional business modules (like Partners/Channel Portal)
 */

import { useModules } from '@/src/contexts/ModulesContext';
import { SetPageTitle } from '@/src/components/SetPageTitle';
import { Share2Icon } from '@radix-ui/react-icons';

export default function ModulesSettingsPage() {
  const { partnersEnabled, setPartnersEnabled } = useModules();

  return (
    <div className="h-full flex flex-col">
      <SetPageTitle title="Business Modules" />

      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Business Modules</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enable or disable optional business modules
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Channel Partner Module
              </h3>

              <div className="flex items-start justify-between">
                <div className="flex-1 mr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600"><Share2Icon className="w-5 h-5" /></span>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Partners (7th P)
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Enable nonprofit NP-Edge tenant management, telemetry monitoring, and channel revenue tracking. 
                    When enabled, a horizontal Partners module appears below the main 6 P grid on the dashboard.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                    <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">
                      Includes 6 Channel Management Pages:
                    </div>
                    <ul className="text-blue-800 dark:text-blue-300 text-xs space-y-0.5 ml-4">
                      <li>Client Tenants - Nonprofit NP-Edge customer monitoring</li>
                      <li>Signals Inbox - Real-time health alerts from deployments</li>
                      <li>Benchmarks - Portfolio-wide performance analytics</li>
                      <li>Usage Analytics - API usage and performance tracking</li>
                      <li>Commissions - Revenue sharing and vendor costs</li>
                      <li>Partner Revenue - MRR, ARR, and revenue streams</li>
                    </ul>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Use Case: Toggle off for pure consulting demos, toggle on for channel partner capabilities.
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => setPartnersEnabled(!partnersEnabled)}
                    className={'relative inline-flex h-8 w-14 items-center rounded-full transition-colors ' + (
                      partnersEnabled
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-700'
                    )}
                    role="switch"
                    aria-checked={partnersEnabled}
                  >
                    <span
                      className={'inline-block h-6 w-6 transform rounded-full bg-white transition-transform ' + (
                        partnersEnabled ? 'translate-x-7' : 'translate-x-1'
                      )}
                    />
                  </button>
                  <span className={'text-sm font-medium ' + (
                    partnersEnabled
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  )}>
                    {partnersEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card opacity-50">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Additional Modules
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Future business modules will appear here. Examples: Products, Training, Research, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
