import { z } from 'zod';

/**
 * Data Type Classification (PS-Edge)
 *
 * Distinguishes between different data sources:
 * - demo: Sample data for demonstrations (orange badge in navbar)
 * - template: Baseline documents/frameworks (teal badge)
 * - client: Real client data (green badge or no badge)
 */
export const DataTypeSchema = z.enum(['demo', 'template', 'client']);
export type DataType = z.infer<typeof DataTypeSchema>;

/**
 * Demo Metadata Schema
 *
 * Optional metadata for demo items to provide context
 * (year, business unit, division, category).
 */
export const DemoMetadataSchema = z.object({
  year: z.number().optional(),
  bu: z.string().optional(), // Business unit
  division: z.string().optional(),
  category: z.string().optional(),
  scenario: z.string().optional(), // Demo scenario name
}).optional().nullable();

export type DemoMetadata = z.infer<typeof DemoMetadataSchema>;

/**
 * Helper to check if data type should show a badge
 */
export function shouldShowBadge(dataType: DataType): boolean {
  return dataType === 'demo' || dataType === 'template';
}

/**
 * Helper to get badge color class for data type
 */
export function getDataTypeBadgeClass(dataType: DataType): string {
  switch (dataType) {
    case 'demo':
      return 'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400';
    case 'template':
      return 'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-400';
    case 'client':
      return 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400';
    default:
      return '';
  }
}

/**
 * Helper to get badge text for data type
 */
export function getDataTypeBadgeText(dataType: DataType): string {
  switch (dataType) {
    case 'demo':
      return 'Demo Data';
    case 'template':
      return 'Template';
    case 'client':
      return 'Live Data';
    default:
      return '';
  }
}
