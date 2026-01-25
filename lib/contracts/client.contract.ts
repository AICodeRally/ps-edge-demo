import { z } from 'zod';

/**
 * Client Contract - Professional Services Client Management
 *
 * Represents clients of the consulting firm (nonprofits, foundations, etc.)
 */

export const ClientTypeSchema = z.enum(['NONPROFIT', 'FOUNDATION', 'GOVERNMENT', 'CORPORATE']);
export type ClientType = z.infer<typeof ClientTypeSchema>;

export const ClientStatusSchema = z.enum(['PROSPECT', 'ACTIVE', 'INACTIVE', 'CHURNED']);
export type ClientStatus = z.infer<typeof ClientStatusSchema>;

export const ClientSchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Basic Info
  name: z.string().min(1).max(200),
  clientType: ClientTypeSchema,
  status: ClientStatusSchema,
  taxId: z.string().optional(),
  website: z.string().url().optional(),

  // Business Context
  annualRevenue: z.number().optional(),
  staffSize: z.number().int().positive().optional(),
  focusAreas: z.array(z.string()),

  // Relationship
  primaryContactId: z.string(),
  accountOwnerId: z.string(),
  acquisitionDate: z.coerce.date().optional(),
  firstEngagementDate: z.coerce.date().optional(),

  // Channel Partner Flag
  isNPEdgeClient: z.boolean().default(false),
  npEdgeTenantId: z.string().optional(),
  npEdgeGoLiveDate: z.coerce.date().optional(),

  // Metadata
  tags: z.array(z.string()),
  customFields: z.record(z.string(), z.any()).optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdBy: z.string(),
});

export type Client = z.infer<typeof ClientSchema>;

export const CreateClientSchema = ClientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateClient = z.infer<typeof CreateClientSchema>;

export const UpdateClientSchema = ClientSchema.partial().required({ id: true });
export type UpdateClient = z.infer<typeof UpdateClientSchema>;

export const ClientFiltersSchema = z.object({
  tenantId: z.string().optional(),
  clientType: ClientTypeSchema.optional(),
  status: ClientStatusSchema.optional(),
  accountOwnerId: z.string().optional(),
  isNPEdgeClient: z.boolean().optional(),
  search: z.string().optional(),
}).partial();

export type ClientFilters = z.infer<typeof ClientFiltersSchema>;
