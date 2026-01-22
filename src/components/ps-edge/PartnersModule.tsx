'use client';

/**
 * NP-Edge Clients Module (7th P - Horizontal Toggleable)
 * Channel Partner Management for nonprofit NP-Edge tenants
 * Displays horizontally below the main 6 P grid when enabled
 */

import Link from 'next/link';
import { Share2Icon } from '@radix-ui/react-icons';
import { PARTNERS_NAVIGATION } from '@/src/config/navigation.config';

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
                  Partners
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
            View NP-Edge Clients →
          </Link>
        </div>

        {/* Quick Links (Horizontal Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PARTNERS_NAVIGATION.pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {page.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {page.description}
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            💡 This module can be toggled on/off in Settings → Business Modules
          </p>
        </div>
      </div>
    </>
  );
}
