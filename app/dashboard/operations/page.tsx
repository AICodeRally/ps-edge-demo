/**
 * Operations Dashboard
 * Central hub for system operations, data management, integrations, and AI configuration
 */

'use client';

import Link from 'next/link';
import {
  ArchiveIcon,
  RocketIcon,
  LightningBoltIcon,
  FileTextIcon,
  ReaderIcon,
  BarChartIcon,
  GearIcon,
  CheckCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

interface OperationCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  stats?: { label: string; value: string }[];
}

const operationCards: OperationCard[] = [
  {
    title: 'Data Management',
    description: 'Import, export, and manage client, engagement, and consultant data',
    href: '/dashboard/operations/data',
    icon: ArchiveIcon,
    color: 'blue',
    stats: [
      { label: 'Records', value: '2,547' },
      { label: 'Last Import', value: '2 days ago' },
    ],
  },
  {
    title: 'Integration Hub',
    description: 'Monitor connections to QuickBooks, PSA software, and databases',
    href: '/dashboard/operations/integrations',
    icon: RocketIcon,
    color: 'purple',
    stats: [
      { label: 'Active', value: '8/12' },
      { label: 'Health', value: '94%' },
    ],
  },
  {
    title: 'AI Management',
    description: 'Configure AI assistants, prompts, and knowledge sources',
    href: '/dashboard/operations/ai',
    icon: LightningBoltIcon,
    color: 'yellow',
    stats: [
      { label: 'Models', value: '2 Active' },
      { label: 'Requests', value: '1,234' },
    ],
  },
  {
    title: 'Document Library',
    description: 'Manage templates, contracts, proposals, and deliverables',
    href: '/dashboard/operations/documents',
    icon: FileTextIcon,
    color: 'green',
    stats: [
      { label: 'Templates', value: '156' },
      { label: 'Downloads', value: '3,421' },
    ],
  },
  {
    title: 'Knowledge Library',
    description: 'Methodologies, playbooks, and onboarding resources',
    href: '/dashboard/operations/knowledge',
    icon: ReaderIcon,
    color: 'teal',
    stats: [
      { label: 'Assets', value: '248' },
      { label: 'Views', value: '12.5K' },
    ],
  },
  {
    title: 'Agent Control Center',
    description: 'Manage Claude Code agents, runtime AI agents, and custom agents',
    href: '/aicc/acc',
    icon: PersonIcon,
    color: 'fuchsia',
    stats: [
      { label: 'Apps', value: '3' },
      { label: 'Agents', value: 'Sync' },
    ],
  },
];

const systemHealth = [
  { metric: 'System Uptime', value: '99.97%', status: 'excellent' },
  { metric: 'API Response Time', value: '142ms', status: 'good' },
  { metric: 'Database Performance', value: '98%', status: 'excellent' },
  { metric: 'Integration Health', value: '94%', status: 'good' },
];

export default function OperationsDashboard() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Operations
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            System management, data operations, and platform configuration
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* System Health */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                System Health
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemHealth.map((item) => (
                <div
                  key={item.metric}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg-tertiary border border-gray-200 dark:border-dark-border-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.metric}
                    </span>
                    {item.status === 'excellent' && (
                      <CheckCircledIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Modules */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Operation Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {operationCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="card p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-${card.color}-50 dark:bg-${card.color}-900/10 border-2 border-${card.color}-200 dark:border-${card.color}-800 flex items-center justify-center text-${card.color}-600 dark:text-${card.color}-400 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {card.description}
                        </p>
                        {card.stats && (
                          <div className="flex gap-4">
                            {card.stats.map((stat) => (
                              <div key={stat.label}>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {stat.label}
                                </div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {stat.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
