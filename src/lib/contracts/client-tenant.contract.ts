import { z } from 'zod';

/**
 * Client Tenant Contract - Channel Partner Management
 *
 * Represents NP-Edge client tenants managed through the Partner Portal
 */

export const TenantHealthLevelSchema = z.enum(['CRITICAL', 'POOR', 'FAIR', 'GOOD', 'EXCELLENT']);
export type TenantHealthLevel = z.infer<typeof TenantHealthLevelSchema>;

export const TenantTierSchema = z.enum(['STARTER', 'GROWTH', 'ENTERPRISE']);
export type TenantTier = z.infer<typeof TenantTierSchema>;

export const ClientTenantSchema = z.object({
  id: z.string(),
  tenantId: z.string(), // PPG's tenant ID

  // NP-Edge Tenant Info
  npEdgeTenantId: z.string(),
  organizationName: z.string().min(1).max(200),

  // Subscription
  tier: TenantTierSchema,
  monthlyFee: z.number().positive(),
  goLiveDate: z.coerce.date(),
  renewalDate: z.coerce.date().optional(),

  // PPG Relationship
  managingClientId: z.string(), // Links to Client model
  accountOwnerId: z.string(), // PPG staff

  // Health Metrics (from telemetry)
  healthScore: z.number().min(0).max(100).optional(),
  healthLevel: TenantHealthLevelSchema.optional(),
  lastHealthCheck: z.coerce.date().optional(),

  // Usage Metrics
  activeUsers: z.number().int().optional(),
  storageUsedGB: z.number().optional(),
  apiCallsThisMonth: z.number().int().optional(),

  // Status
  isActive: z.boolean(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ClientTenant = z.infer<typeof ClientTenantSchema>;

export const CreateClientTenantSchema = ClientTenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateClientTenant = z.infer<typeof CreateClientTenantSchema>;

export const UpdateClientTenantSchema = ClientTenantSchema.partial().required({ id: true });
export type UpdateClientTenant = z.infer<typeof UpdateClientTenantSchema>;

export const ClientTenantFiltersSchema = z.object({
  tenantId: z.string().optional(),
  tier: TenantTierSchema.optional(),
  healthLevel: TenantHealthLevelSchema.optional(),
  accountOwnerId: z.string().optional(),
  isActive: z.boolean().optional(),
}).partial();

export type ClientTenantFilters = z.infer<typeof ClientTenantFiltersSchema>;

// Health level calculation helper
export function calculateHealthLevel(score: number): TenantHealthLevel {
  if (score >= 90) return 'EXCELLENT';
  if (score >= 75) return 'GOOD';
  if (score >= 60) return 'FAIR';
  if (score >= 40) return 'POOR';
  return 'CRITICAL';
}
