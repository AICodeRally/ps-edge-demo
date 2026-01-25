/**
 * PS-Edge Theme Configuration
 *
 * Defines the 4-color SPARCC gradient system and department colors
 */

/**
 * SPARCC 4-color gradient definition
 */
export interface SPARCCGradient {
  start: string;     // Primary/brand color
  mid1: string;      // First transition color
  mid2: string;      // Second transition color
  end: string;       // Accent color
}

/**
 * Department color configuration
 */
export interface DepartmentColors {
  sales: string;
  delivery: string;
  clientSuccess: string;
  finance: string;
  operations: string;
  partnerPortal: string;
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  name: string;
  gradient: SPARCCGradient;
  departments: DepartmentColors;
}

/**
 * PS-Edge default gradient (Purple -> Fuchsia -> Pink -> Yellow)
 */
export const PS_EDGE_GRADIENT: SPARCCGradient = {
  start: '#9333ea',    // Purple
  mid1: '#c026d3',     // Fuchsia
  mid2: '#db2777',     // Pink
  end: '#facc15',      // Yellow
};

/**
 * PS-Edge department colors
 */
export const PS_EDGE_DEPARTMENTS: DepartmentColors = {
  sales: '#f97316',        // Orange
  delivery: '#3b82f6',     // Blue
  clientSuccess: '#10b981', // Green/Emerald
  finance: '#9333ea',      // Purple (matches brand)
  operations: '#6b7280',   // Gray
  partnerPortal: '#14b8a6', // Teal
};

/**
 * Default PS-Edge theme configuration
 */
export const PS_EDGE_THEME: ThemeConfig = {
  name: 'PS-Edge',
  gradient: PS_EDGE_GRADIENT,
  departments: PS_EDGE_DEPARTMENTS,
};

/**
 * Generate CSS gradient string from SPARCC gradient config
 */
export function generateGradientCSS(gradient: SPARCCGradient, direction: string = '135deg'): string {
  return `linear-gradient(${direction}, ${gradient.start}, ${gradient.mid1}, ${gradient.mid2}, ${gradient.end})`;
}

/**
 * Generate horizontal gradient (for borders, progress bars)
 */
export function generateHorizontalGradient(gradient: SPARCCGradient): string {
  return generateGradientCSS(gradient, '90deg');
}

/**
 * Get department color by key
 */
export function getDepartmentColor(department: keyof DepartmentColors): string {
  return PS_EDGE_DEPARTMENTS[department];
}

/**
 * Get all department colors as array (for charts, etc.)
 */
export function getDepartmentColorArray(): string[] {
  return Object.values(PS_EDGE_DEPARTMENTS);
}
