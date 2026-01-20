/**
 * P Landing Page Component
 * Reusable template for 6 P's landing pages
 * Shows P title, description, and quick links to sub-pages
 */

import Link from 'next/link';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/src/types/ps-edge/six-ps.types';
import { getPNavigation } from '@/src/config/navigation.config';
import * as RadixIcons from '@radix-ui/react-icons';

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`mb-8 p-6 rounded-lg ${pConfig.bgColor} ${pConfig.borderColor} border-2`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-lg ${pConfig.bgColor} ${pConfig.borderColor} border-2 flex items-center justify-center`}>
            <IconComponent className={`w-8 h-8 ${pConfig.color}`} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${pConfig.color}`}>
              {pConfig.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {pConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pNav.pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`p-4 rounded-lg border ${pConfig.borderColor} ${pConfig.bgColor} hover:shadow-md ${pConfig.hoverShadow} transition-all group`}
            >
              <h3 className={`font-semibold ${pConfig.color} group-hover:underline mb-1`}>
                {page.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {page.description}
              </p>
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
  );
}
