/**
 * PS-Edge Brand Configuration
 * Single source of truth for brand colors and gradients
 *
 * HOW TO CHANGE BRAND COLORS:
 * 1. Update the gradient colors in BRAND_CONFIG.gradient (from, via, to)
 * 2. Update the 6 sixPs colors to interpolate across your new gradient
 * 3. That's it! The entire app will automatically update:
 *    - Top left PS logo
 *    - Phoenix Philanthropy Group header text
 *    - All 6P dashboard tiles (colors, borders, backgrounds, hover effects)
 *
 * Example: To change to blue → green → cyan:
 * - gradient.from: 'blue-600'
 * - gradient.via: 'green-600'
 * - gradient.to: 'cyan-600'
 * - Then update sixPs colors to interpolate across blue → green → cyan
 */

export const BRAND_CONFIG = {
  // Main brand gradient (used in logo, headers)
  gradient: {
    from: 'purple-600',
    via: 'fuchsia-600',
    to: 'yellow-600',
    // CSS classes for gradient
    bgClass: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-yellow-600',
    bgClassBr: 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-yellow-600',
    textClass: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-yellow-600 bg-clip-text text-transparent',
  },

  // 6P Colors derived from gradient (interpolated across the gradient spectrum)
  // These automatically create a cohesive color system
  sixPs: {
    people: {
      name: 'People',
      color: 'purple-600',        // Start of gradient
      textClass: 'text-purple-600',
      bgClass: 'bg-purple-50 dark:bg-purple-900/10',
      borderClass: 'border-purple-200 dark:border-purple-800',
      hoverShadow: 'hover:shadow-purple-600/20',
    },
    process: {
      name: 'Process',
      color: 'violet-600',        // Purple → Fuchsia transition
      textClass: 'text-violet-600',
      bgClass: 'bg-violet-50 dark:bg-violet-900/10',
      borderClass: 'border-violet-200 dark:border-violet-800',
      hoverShadow: 'hover:shadow-violet-600/20',
    },
    platform: {
      name: 'Platform',
      color: 'fuchsia-600',       // Middle of gradient
      textClass: 'text-fuchsia-600',
      bgClass: 'bg-fuchsia-50 dark:bg-fuchsia-900/10',
      borderClass: 'border-fuchsia-200 dark:border-fuchsia-800',
      hoverShadow: 'hover:shadow-fuchsia-600/20',
    },
    performance: {
      name: 'Performance',
      color: 'pink-600',          // Fuchsia → Yellow transition
      textClass: 'text-pink-600',
      bgClass: 'bg-pink-50 dark:bg-pink-900/10',
      borderClass: 'border-pink-200 dark:border-pink-800',
      hoverShadow: 'hover:shadow-pink-600/20',
    },
    profit: {
      name: 'Profit',
      color: 'orange-600',        // Yellow approach
      textClass: 'text-orange-600',
      bgClass: 'bg-orange-50 dark:bg-orange-900/10',
      borderClass: 'border-orange-200 dark:border-orange-800',
      hoverShadow: 'hover:shadow-orange-600/20',
    },
    purpose: {
      name: 'Purpose',
      color: 'yellow-600',        // End of gradient
      textClass: 'text-yellow-600',
      bgClass: 'bg-yellow-50 dark:bg-yellow-900/10',
      borderClass: 'border-yellow-200 dark:border-yellow-800',
      hoverShadow: 'hover:shadow-yellow-600/20',
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

// Helper to get 6P config by key
export function getSixPConfig(key: keyof typeof BRAND_CONFIG.sixPs) {
  return BRAND_CONFIG.sixPs[key];
}
