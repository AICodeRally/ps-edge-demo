'use client';

import { BRAND_CONFIG } from '@/config/brand.config';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';

export default function BrandPage() {
  const sixPsColors = Object.entries(BRAND_CONFIG.sixPs);

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Brand Customization</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Configure 6 P's colors and gradient themes
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Gradient */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Brand Gradient
            </h2>
            <div
              className="h-32 rounded-xl mb-4"
              style={{
                background: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-600" />
                  <span className="text-sm font-mono">#9333ea</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mid</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-600" />
                  <span className="text-sm font-mono">#c026d3</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">End</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500" />
                  <span className="text-sm font-mono">#facc15</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Ps Color Distribution */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              6 Ps Color Distribution
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Colors automatically distributed from brand gradient across the 6 Ps
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sixPsColors.map(([key, config]) => (
                <div key={key} className="border-2 border-gray-200 dark:border-dark-border-default rounded-lg p-4">
                  <div
                    className={`h-24 rounded-lg mb-3 ${config.bgClass}`}
                  />
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 capitalize">
                    {config.name}
                  </p>
                  <p className="text-xs font-mono text-gray-600 dark:text-gray-400">{config.color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <MixerHorizontalIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Brand Customization
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                  <li>• Brand gradient flows from Purple → Fuchsia → Yellow</li>
                  <li>• 6 Ps colors automatically interpolate across the gradient</li>
                  <li>• Changes update across entire application instantly</li>
                  <li>• Edit brand.config.ts to customize colors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
