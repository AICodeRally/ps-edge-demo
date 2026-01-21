'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PersonIcon,
  GearIcon,
  CubeIcon,
  BarChartIcon,
  DashboardIcon,
  TargetIcon,
  ArrowRightIcon,
  LayersIcon,
} from '@radix-ui/react-icons';
import type { DepartmentSixPs, SixPSection, SixPCategory } from '@/src/types/ps-edge/six-ps.types';
import { SIX_PS_DEFINITIONS } from '@/src/types/ps-edge/six-ps.types';
import { getSixPsOrder } from '@/src/lib/config/sixps-order';

// Icon mapping
const ICON_MAP = {
  PersonIcon,
  GearIcon,
  CubeIcon,
  BarChartIcon,
  DashboardIcon,
  TargetIcon,
  LayersIcon,
};

interface SixPsDashboardProps {
  data: DepartmentSixPs;
  title?: string;
  subtitle?: string;
}

export function SixPsDashboard({ data, title, subtitle }: SixPsDashboardProps) {
  const [pOrder, setPOrder] = useState<SixPCategory[]>(getSixPsOrder());

  // Listen for order changes from settings
  useEffect(() => {
    const handleOrderChange = () => {
      setPOrder(getSixPsOrder());
    };

    window.addEventListener('sixps-order-changed', handleOrderChange);
    return () => window.removeEventListener('sixps-order-changed', handleOrderChange);
  }, []);

  // Map categories to sections using the configured order
  const pMap: Record<SixPCategory, SixPSection> = {
    PURPOSE: data.purpose,
    PEOPLE: data.people,
    PROCESS: data.process,
    PLATFORM: data.platform,
    PERFORMANCE: data.performance,
    PROFIT: data.profit,
  };

  const sections = pOrder.map((category) => pMap[category]);

  return (
    <div className="space-y-2">
      {/* Title only (show before grid) */}
      {title && (
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5">
            {title}
          </h2>
        </div>
      )}

      {/* 6Ps Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {sections.map((section) => (
          <SixPCard key={section.category} section={section} />
        ))}
      </div>

      {/* Subtitle after grid */}
      {subtitle && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}

function SixPCard({ section }: { section: SixPSection }) {
  const definition = SIX_PS_DEFINITIONS[section.category];
  const Icon = ICON_MAP[definition.iconName as keyof typeof ICON_MAP];

  // Get route for this P (category is like "PEOPLE", convert to "people")
  const pRoute = `/dashboard/${section.category.toLowerCase()}`;

  return (
    <div className={`relative p-3 rounded-lg border-2 ${definition.borderColor} ${definition.bgColor} transition-all duration-300 hover:shadow-lg ${definition.hoverShadow} group`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-10 h-10 flex items-center justify-center ${definition.bgColor} ${definition.borderColor} border rounded-lg ${definition.color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold ${definition.color} truncate`}>
            {definition.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {definition.description}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        {section.metrics.map((metric, idx) => (
          <div key={idx} className={`border-t ${definition.borderColor} pt-1.5 first:border-t-0 first:pt-0`}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs text-gray-600 dark:text-gray-400 truncate pr-2">
                {metric.label}
              </span>
              {metric.trend && (
                <div className={`flex items-center gap-0.5 text-xs shrink-0 ${
                  metric.trend === 'up' ? 'text-green-600' :
                  metric.trend === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {metric.trend === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                  {metric.trend === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                  {metric.trendValue && <span className="text-xs">{metric.trendValue}</span>}
                </div>
              )}
            </div>
            <div className={`text-base font-bold ${definition.color}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* View Button */}
      <Link
        href={pRoute}
        className={`mt-3 flex items-center justify-center gap-2 px-3 py-1.5 rounded text-xs font-semibold ${definition.color} ${definition.bgColor} ${definition.borderColor} border hover:shadow-md transition-all`}
      >
        View
        <ArrowRightIcon className="w-3 h-3" />
      </Link>
    </div>
  );
}
