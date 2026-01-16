import { z } from 'zod';

/**
 * Engagement Contract - Project/Engagement Management
 *
 * Represents consulting engagements with clients
 */

export const EngagementTypeSchema = z.enum([
  'CAPITAL_CAMPAIGN',
  'STRATEGIC_PLANNING',
  'BOARD_DEVELOPMENT',
  'GRANT_WRITING',
  'FEASIBILITY_STUDY',
  'FUNDRAISING_STRATEGY',
  'TRAINING_WORKSHOP',
  'NPEDGE_IMPLEMENTATION',
]);
export type EngagementType = z.infer<typeof EngagementTypeSchema>;

export const EngagementStatusSchema = z.enum([
  'PLANNING',
  'IN_PROGRESS',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
]);
export type EngagementStatus = z.infer<typeof EngagementStatusSchema>;

export const BillingTypeSchema = z.enum(['FIXED_FEE', 'HOURLY', 'RETAINER']);
export type BillingType = z.infer<typeof BillingTypeSchema>;

export const EngagementSchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Basics
  engagementName: z.string().min(1).max(200),
  engagementType: EngagementTypeSchema,
  status: EngagementStatusSchema,
  description: z.string(),
  objectives: z.array(z.string()),

  // Client Relationship
  clientId: z.string(),
  contractId: z.string().optional(),

  // Timeline
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  estimatedHours: z.number().positive(),
  actualHours: z.number().positive().optional(),

  // Team
  projectManagerId: z.string(),
  teamMemberIds: z.array(z.string()),

  // Financials
  contractValue: z.number().positive(),
  billingType: BillingTypeSchema,
  hourlyRate: z.number().positive().optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Engagement = z.infer<typeof EngagementSchema>;

export const CreateEngagementSchema = EngagementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEngagement = z.infer<typeof CreateEngagementSchema>;

export const UpdateEngagementSchema = EngagementSchema.partial().required({ id: true });
export type UpdateEngagement = z.infer<typeof UpdateEngagementSchema>;

export const EngagementFiltersSchema = z.object({
  tenantId: z.string().optional(),
  clientId: z.string().optional(),
  engagementType: EngagementTypeSchema.optional(),
  status: EngagementStatusSchema.optional(),
  projectManagerId: z.string().optional(),
  search: z.string().optional(),
}).partial();

export type EngagementFilters = z.infer<typeof EngagementFiltersSchema>;

// Display labels
export const ENGAGEMENT_TYPE_LABELS: Record<EngagementType, string> = {
  CAPITAL_CAMPAIGN: 'Capital Campaign',
  STRATEGIC_PLANNING: 'Strategic Planning',
  BOARD_DEVELOPMENT: 'Board Development',
  GRANT_WRITING: 'Grant Writing',
  FEASIBILITY_STUDY: 'Feasibility Study',
  FUNDRAISING_STRATEGY: 'Fundraising Strategy',
  TRAINING_WORKSHOP: 'Training Workshop',
  NPEDGE_IMPLEMENTATION: 'NP-Edge Implementation',
};
