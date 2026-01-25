import { z } from 'zod';

/**
 * Client Signal Contract - Telemetry Signals
 *
 * Represents signals emitted from NP-Edge client deployments
 */

export const SignalSeveritySchema = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
export type SignalSeverity = z.infer<typeof SignalSeveritySchema>;

export const SignalCategorySchema = z.enum([
  'CLIENT_HEALTH',
  'FEATURE_ADOPTION',
  'USER_ENGAGEMENT',
  'DATA_QUALITY',
  'COMPLIANCE_RISK',
  'REVENUE_OPPORTUNITY',
  'CHURN_RISK',
]);
export type SignalCategory = z.infer<typeof SignalCategorySchema>;

export const ClientSignalSchema = z.object({
  id: z.string(),
  tenantId: z.string(), // PPG's tenant ID

  // Source
  clientTenantId: z.string(),
  npEdgeTenantId: z.string(),

  // Signal Details
  category: SignalCategorySchema,
  severity: SignalSeveritySchema,
  title: z.string().min(1).max(200),
  description: z.string(),

  // Context
  affectedModule: z.string().optional(),
  detectedValue: z.number().optional(),
  thresholdValue: z.number().optional(),

  // Action
  suggestedAction: z.string().optional(),
  isResolved: z.boolean().default(false),
  resolvedAt: z.coerce.date().optional(),
  resolvedBy: z.string().optional(),

  // Metadata
  metadata: z.record(z.string(), z.any()).optional(),

  emittedAt: z.coerce.date(),
  expiresAt: z.coerce.date().optional(),
});

export type ClientSignal = z.infer<typeof ClientSignalSchema>;

export const CreateClientSignalSchema = ClientSignalSchema.omit({
  id: true,
});

export type CreateClientSignal = z.infer<typeof CreateClientSignalSchema>;

export const ClientSignalFiltersSchema = z.object({
  tenantId: z.string().optional(),
  clientTenantId: z.string().optional(),
  category: SignalCategorySchema.optional(),
  severity: SignalSeveritySchema.optional(),
  isResolved: z.boolean().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
}).partial();

export type ClientSignalFilters = z.infer<typeof ClientSignalFiltersSchema>;

// Display labels
export const SIGNAL_CATEGORY_LABELS: Record<SignalCategory, string> = {
  CLIENT_HEALTH: 'Client Health',
  FEATURE_ADOPTION: 'Feature Adoption',
  USER_ENGAGEMENT: 'User Engagement',
  DATA_QUALITY: 'Data Quality',
  COMPLIANCE_RISK: 'Compliance Risk',
  REVENUE_OPPORTUNITY: 'Revenue Opportunity',
  CHURN_RISK: 'Churn Risk',
};
