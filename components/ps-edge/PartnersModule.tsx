'use client';

/**
 * Channel Portal Module (7th P - Horizontal Toggleable)
 * Manages PPG's nonprofit clients who also use NP-Edge software
 * Displays horizontally below the main 6 P grid when enabled
 */

import Link from 'next/link';
import { Share2Icon, LightningBoltIcon } from '@radix-ui/react-icons';
import { PARTNERS_NAVIGATION } from '@/config/navigation.config';

// Card styling with gradients
const CARD_STYLES: Record<string, { gradient: string; border: string; aiSuggestion?: string }> = {
  'Client Tenants': {
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    border: 'border-blue-200 dark:border-blue-800/50',
  },
  'Signals Inbox': {
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    border: 'border-purple-200 dark:border-purple-800/50',
    aiSuggestion: '3 consulting opportunities',
  },
  'Benchmarks': {
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    border: 'border-green-200 dark:border-green-800/50',
    aiSuggestion: '5 at-risk clients',
  },
  'Usage Analytics': {
    gradient: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    border: 'border-orange-200 dark:border-orange-800/50',
  },
  'Commissions': {
    gradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    border: 'border-violet-200 dark:border-violet-800/50',
  },
  'Partner Revenue': {
    gradient: 'bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-800/50',
  },
};

export function PartnersModule() {
  return (
    <>
      {/* Separator */}
      <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-700 my-8" />

      {/* 7th P: PARTNERS - Horizontal Module */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-blue-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/50 p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Share2Icon className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Channel Portal
                </h2>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                  NP-Edge Tenant Management
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Nonprofit NP-Edge tenant monitoring, telemetry, and channel revenue tracking
              </p>
            </div>
          </div>
          <Link
            href={PARTNERS_NAVIGATION.landingPageHref}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md font-medium"
          >
            View Channel Portal →
          </Link>
        </div>

        {/* Quick Links (Horizontal Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PARTNERS_NAVIGATION.pages.map((page) => {
            const styles = CARD_STYLES[page.name] || {
              gradient: 'bg-white dark:bg-gray-800',
              border: 'border-gray-200 dark:border-gray-700',
            };

            return (
              <Link
                key={page.href}
                href={page.href}
                className={`group relative p-4 rounded-lg hover:shadow-md transition-all border ${styles.border} ${styles.gradient}`}
              >
                {/* AI Suggestion Badge */}
                {styles.aiSuggestion && (
                  <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                    <LightningBoltIcon className="w-3 h-3" />
                    {styles.aiSuggestion}
                  </div>
                )}

                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {page.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {page.description}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/50">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>💡 Toggle this module in Settings → Business Modules</span>
            <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
              <LightningBoltIcon className="w-3 h-3" />
              AI-powered consulting opportunity detection
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
