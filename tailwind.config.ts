import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PRIMARY BRAND (Teal - Phoenix Philanthropy Group)
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

        // 6 P's COLORS
        people: {
          DEFAULT: '#7c3aed',      // Purple
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        process: {
          DEFAULT: '#8b5cf6',      // Violet
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        platform: {
          DEFAULT: '#c026d3',      // Fuchsia
          light: '#e879f9',
          dark: '#a21caf',
        },
        performance: {
          DEFAULT: '#db2777',      // Pink
          light: '#f472b6',
          dark: '#be185d',
        },
        profit: {
          DEFAULT: '#f97316',      // Orange
          light: '#fb923c',
          dark: '#ea580c',
        },
        purpose: {
          DEFAULT: '#facc15',      // Yellow
          light: '#fde047',
          dark: '#eab308',
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

        // SEMANTIC COLORS
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',

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

      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
