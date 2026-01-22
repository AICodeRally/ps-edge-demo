/**
 * NP-Edge Brand Configuration (AFFCF)
 * Single source of truth for brand colors and gradients
 *
 * Arizona Friends of Foster Children Foundation
 * Color theme: Green (growth, hope) → Teal (community, support)
 *
 * HOW TO CHANGE BRAND COLORS:
 * 1. Update the gradient colors in BRAND_CONFIG.gradient (from, to)
 * 2. Update the module colors to match your nonprofit's brand
 * 3. The entire app will automatically update:
 *    - Top left AF logo
 *    - Arizona Friends of Foster Children Foundation header text
 *    - All module tiles (colors, borders, backgrounds, hover effects)
 */

export const BRAND_CONFIG = {
  // Main brand gradient (used in logo, headers)
  gradient: {
    from: 'green-600',
    via: 'teal-600',
    to: 'teal-600',
    // CSS classes for gradient
    bgClass: 'bg-gradient-to-r from-green-600 to-teal-600',
    bgClassBr: 'bg-gradient-to-br from-green-600 to-teal-600',
    textClass: 'bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent',
  },

  // Nonprofit Module Colors (green/teal theme)
  // Cohesive color system for AFFCF operations
  modules: {
    programs: {
      name: 'Programs',
      color: 'green-600',         // Main brand color
      textClass: 'text-green-600',
      bgClass: 'bg-green-50 dark:bg-green-900/10',
      borderClass: 'border-green-200 dark:border-green-800',
      hoverShadow: 'hover:shadow-green-600/20',
    },
    fundraising: {
      name: 'Fundraising',
      color: 'teal-600',          // Secondary brand color
      textClass: 'text-teal-600',
      bgClass: 'bg-teal-50 dark:bg-teal-900/10',
      borderClass: 'border-teal-200 dark:border-teal-800',
      hoverShadow: 'hover:shadow-teal-600/20',
    },
    volunteers: {
      name: 'Volunteers',
      color: 'blue-600',          // Community/people
      textClass: 'text-blue-600',
      bgClass: 'bg-blue-50 dark:bg-blue-900/10',
      borderClass: 'border-blue-200 dark:border-blue-800',
      hoverShadow: 'hover:shadow-blue-600/20',
    },
    beneficiaries: {
      name: 'Beneficiaries',
      color: 'purple-600',        // Impact/people served
      textClass: 'text-purple-600',
      bgClass: 'bg-purple-50 dark:bg-purple-900/10',
      borderClass: 'border-purple-200 dark:border-purple-800',
      hoverShadow: 'hover:shadow-purple-600/20',
    },
    compliance: {
      name: 'Compliance',
      color: 'gray-600',          // Governance/documentation
      textClass: 'text-gray-600',
      bgClass: 'bg-gray-50 dark:bg-gray-900/10',
      borderClass: 'border-gray-200 dark:border-gray-800',
      hoverShadow: 'hover:shadow-gray-600/20',
    },
    events: {
      name: 'Events',
      color: 'orange-600',        // Activity/engagement
      textClass: 'text-orange-600',
      bgClass: 'bg-orange-50 dark:bg-orange-900/10',
      borderClass: 'border-orange-200 dark:border-orange-800',
      hoverShadow: 'hover:shadow-orange-600/20',
    },
  },

  // Legacy sixPs kept for backward compatibility (maps to modules)
  sixPs: {
    people: {
      name: 'Volunteers',
      color: 'blue-600',
      textClass: 'text-blue-600',
      bgClass: 'bg-blue-50 dark:bg-blue-900/10',
      borderClass: 'border-blue-200 dark:border-blue-800',
      hoverShadow: 'hover:shadow-blue-600/20',
    },
    process: {
      name: 'Programs',
      color: 'green-600',
      textClass: 'text-green-600',
      bgClass: 'bg-green-50 dark:bg-green-900/10',
      borderClass: 'border-green-200 dark:border-green-800',
      hoverShadow: 'hover:shadow-green-600/20',
    },
    practice: {
      name: 'Compliance',
      color: 'gray-600',
      textClass: 'text-gray-600',
      bgClass: 'bg-gray-50 dark:bg-gray-900/10',
      borderClass: 'border-gray-200 dark:border-gray-800',
      hoverShadow: 'hover:shadow-gray-600/20',
    },
    performance: {
      name: 'Beneficiaries',
      color: 'purple-600',
      textClass: 'text-purple-600',
      bgClass: 'bg-purple-50 dark:bg-purple-900/10',
      borderClass: 'border-purple-200 dark:border-purple-800',
      hoverShadow: 'hover:shadow-purple-600/20',
    },
    pipeline: {
      name: 'Fundraising',
      color: 'teal-600',
      textClass: 'text-teal-600',
      bgClass: 'bg-teal-50 dark:bg-teal-900/10',
      borderClass: 'border-teal-200 dark:border-teal-800',
      hoverShadow: 'hover:shadow-teal-600/20',
    },
    purpose: {
      name: 'Events',
      color: 'orange-600',
      textClass: 'text-orange-600',
      bgClass: 'bg-orange-50 dark:bg-orange-900/10',
      borderClass: 'border-orange-200 dark:border-orange-800',
      hoverShadow: 'hover:shadow-orange-600/20',
    },
  },
} as const;

// Helper function to get gradient CSS
export function getBrandGradientClass(type: 'bg' | 'bgBr' | 'text' = 'bg'): string {
  switch (type) {
    case 'bgBr':
      return BRAND_CONFIG.gradient.bgClassBr;
    case 'text':
      return BRAND_CONFIG.gradient.textClass;
    default:
      return BRAND_CONFIG.gradient.bgClass;
  }
}

// Helper to get module config by key
export function getModuleConfig(key: keyof typeof BRAND_CONFIG.modules) {
  return BRAND_CONFIG.modules[key];
}

// Helper to get 6P config by key (legacy - maps to modules)
export function getSixPConfig(key: keyof typeof BRAND_CONFIG.sixPs) {
  return BRAND_CONFIG.sixPs[key];
}
