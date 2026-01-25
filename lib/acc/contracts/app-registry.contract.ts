import { z } from 'zod';

/**
 * App Registry Contract
 *
 * Tracks registered applications/demos that can have agent infrastructure.
 * Examples: spot, sgm-summit-demo, ps-edge-demo
 */

// ============================================================================
// ENUMS
// ============================================================================

export const AppTierSchema = z.enum([
  'core',       // Core platform apps
  'demo',       // Demo applications
  'external',   // External/third-party
]);
export type AppTier = z.infer<typeof AppTierSchema>;

export const AppStatusSchema = z.enum([
  'active',     // Currently in use
  'inactive',   // Temporarily disabled
  'archived',   // No longer maintained
]);
export type AppStatus = z.infer<typeof AppStatusSchema>;

export const SyncStatusSchema = z.enum([
  'success',    // Last sync succeeded
  'failed',     // Last sync failed
  'pending',    // Sync in progress
  'never',      // Never synced
]);
export type SyncStatus = z.infer<typeof SyncStatusSchema>;

// ============================================================================
// MAIN CONTRACT
// ============================================================================

export const AppRegistrySchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),

  // Repository Info
  repoPath: z.string().nullable().optional(),  // Local filesystem path
  repoUrl: z.string().url().nullable().optional(),  // GitHub URL
  port: z.number().int().min(1).max(65535).nullable().optional(),
  hostname: z.string().nullable().optional(),

  // Classification
  tier: AppTierSchema.default('demo'),
  status: AppStatusSchema.default('active'),

  // Sync Status
  lastSyncAt: z.coerce.date().nullable().optional(),
  lastSyncStatus: SyncStatusSchema.nullable().optional(),

  // Extensibility
  config: z.record(z.string(), z.any()).default({}),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type AppRegistry = z.infer<typeof AppRegistrySchema>;

// ============================================================================
// CRUD SCHEMAS
// ============================================================================

export const CreateAppRegistrySchema = AppRegistrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastSyncAt: true,
  lastSyncStatus: true,
});
export type CreateAppRegistry = z.infer<typeof CreateAppRegistrySchema>;

export const UpdateAppRegistrySchema = AppRegistrySchema.partial().required({
  id: true,
});
export type UpdateAppRegistry = z.infer<typeof UpdateAppRegistrySchema>;

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const AppRegistryFiltersSchema = z.object({
  tier: AppTierSchema.optional(),
  status: AppStatusSchema.optional(),
  search: z.string().optional(),
}).partial();

export type AppRegistryFilters = z.infer<typeof AppRegistryFiltersSchema>;

// ============================================================================
// SYNC SCHEMAS
// ============================================================================

export const SyncRequestSchema = z.object({
  appId: z.string().optional(),  // If not provided, sync all apps
  direction: z.enum(['pull', 'push', 'both']).default('pull'),
  force: z.boolean().default(false),  // Ignore hash comparison
});

export type SyncRequest = z.infer<typeof SyncRequestSchema>;

export const SyncResultSchema = z.object({
  appId: z.string(),
  appSlug: z.string(),
  status: SyncStatusSchema,
  agentsProcessed: z.number(),
  agentsCreated: z.number(),
  agentsUpdated: z.number(),
  agentsDeleted: z.number(),
  errors: z.array(z.string()),
  duration: z.number(),  // milliseconds
});

export type SyncResult = z.infer<typeof SyncResultSchema>;
