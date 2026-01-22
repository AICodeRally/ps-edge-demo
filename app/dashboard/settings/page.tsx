'use client';

import Link from 'next/link';
import { PersonIcon, MixerHorizontalIcon, LightningBoltIcon } from '@radix-ui/react-icons';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Profile',
      description: 'Manage your personal information and preferences',
      href: '/dashboard/settings/profile',
      icon: PersonIcon,
    },
    {
      title: 'Brand Customization',
      description: 'Configure 6 Ps colors and gradient themes',
      href: '/dashboard/settings/brand',
      icon: MixerHorizontalIcon,
    },
    {
      title: 'AI Features',
      description: 'Control AI orb visibility and feature toggles',
      href: '/dashboard/settings/ai',
      icon: LightningBoltIcon,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-bg-secondary">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {settingsSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="flex items-center gap-4 p-6 bg-white dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-default hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-bg-tertiary">
                  <section.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
