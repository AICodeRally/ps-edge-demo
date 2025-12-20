/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PRIMARY BRAND (Teal)
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },

        // DEPARTMENT COLORS
        dept: {
          sales: '#f97316',          // Orange
          delivery: '#3b82f6',       // Blue
          clientSuccess: '#10b981',  // Green
          finance: '#9333ea',        // Purple
          partnerPortal: '#14b8a6',  // Teal
        },

        // SIGNAL SEVERITY COLORS
        signal: {
          critical: '#dc2626',  // Red
          high: '#f97316',      // Orange
          medium: '#eab308',    // Yellow
          low: '#3b82f6',       // Blue
        },

        // HEALTH LEVEL COLORS
        health: {
          excellent: '#10b981',  // Green
          good: '#84cc16',       // Lime
          fair: '#eab308',       // Yellow
          poor: '#f97316',       // Orange
          critical: '#dc2626',   // Red
        },

        // DARK MODE COLORS
        dark: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#121212',
            tertiary: '#1e1e1e',
          },
          border: {
            default: '#3a3a3a',
          },
        },
      },

      fontSize: {
        // Display sizes (headers)
        'display-2xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],

        // Body sizes (content)
        'body-xl': ['1.25rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],

        // Label sizes (form labels)
        'label-lg': ['0.875rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-md': ['0.75rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.25', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
