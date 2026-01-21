/**
 * P Landing Page Component
 * Reusable template for 6 P's landing pages
 * Shows P title, key metrics, and quick links to sub-pages
 */

import Link from 'next/link';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/src/types/ps-edge/six-ps.types';
import { getPNavigation } from '@/src/config/navigation.config';
import { AGGREGATE_SIX_PS } from '@/src/data/ps-edge/six-ps.data';
import * as RadixIcons from '@radix-ui/react-icons';
import { ArrowUpIcon, ArrowDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface PLandingPageProps {
  category: SixPCategory;
}

export function PLandingPage({ category }: PLandingPageProps) {
  const pConfig = SIX_PS_DEFINITIONS[category];
  const pNav = getPNavigation(category);

  if (!pNav) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">Navigation configuration not found for {category}</p>
      </div>
    );
  }

  // Get the icon component dynamically
  const IconComponent = (RadixIcons as any)[pConfig.iconName] || RadixIcons.QuestionMarkIcon;

  // Get metrics for this P from the aggregate data
  const metricsMap: Record<SixPCategory, any> = {
    PEOPLE: AGGREGATE_SIX_PS.people,
    PROCESS: AGGREGATE_SIX_PS.process,
    PLATFORM: AGGREGATE_SIX_PS.platform,
    PERFORMANCE: AGGREGATE_SIX_PS.performance,
    PROFIT: AGGREGATE_SIX_PS.profit,
    PURPOSE: AGGREGATE_SIX_PS.purpose,
  };

  const metrics = metricsMap[category]?.metrics || [];

  return (
    <div className="h-full flex flex-col">
      {/* Header Bar */}
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${pConfig.bgColor} ${pConfig.borderColor} border flex items-center justify-center`}>
            <IconComponent className={`w-5 h-5 ${pConfig.color}`} />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${pConfig.color}`}>
              {pConfig.title}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {pConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Key Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metrics.map((metric: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${pConfig.borderColor} ${pConfig.bgColor} hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </span>
                    {metric.trend && (
                      <div className={`flex items-center gap-1 text-xs ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {metric.trend === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                        {metric.trend === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                        {metric.trendValue && <span>{metric.trendValue}</span>}
                      </div>
                    )}
                  </div>
                  <div className={`text-2xl font-bold ${pConfig.color}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pNav.pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`p-4 rounded-lg border ${pConfig.borderColor} ${pConfig.bgColor} hover:shadow-md ${pConfig.hoverShadow} transition-all group flex items-center justify-between`}
                >
                  <div>
                    <h3 className={`font-semibold ${pConfig.color} group-hover:underline mb-1`}>
                      {page.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRightIcon className={`w-4 h-4 ${pConfig.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Coming Soon Section (if needed) */}
          {pNav.pages.some((page) => !page.legacyHref) && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                🚧 Pages in Development
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                {pNav.pages
                  .filter((page) => !page.legacyHref)
                  .map((page) => (
                    <li key={page.href}>• {page.name}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
