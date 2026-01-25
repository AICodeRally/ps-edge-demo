import { z } from 'zod';

/**
 * Deliverable Contract - Project Deliverables
 *
 * Represents deliverables produced during engagements
 */

export const DeliverableTypeSchema = z.enum([
  'STRATEGY_DOCUMENT',
  'FEASIBILITY_REPORT',
  'TRAINING_MATERIALS',
  'CAMPAIGN_PLAN',
  'BOARD_MATERIALS',
  'PROGRESS_REPORT',
]);
export type DeliverableType = z.infer<typeof DeliverableTypeSchema>;

export const DeliverableStatusSchema = z.enum([
  'PLANNED',
  'IN_PROGRESS',
  'REVIEW',
  'DELIVERED',
  'APPROVED',
]);
export type DeliverableStatus = z.infer<typeof DeliverableStatusSchema>;

export const DeliverableSchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Basics
  name: z.string().min(1).max(200),
  deliverableType: DeliverableTypeSchema,
  engagementId: z.string(),

  // Timeline
  dueDate: z.coerce.date(),
  deliveredDate: z.coerce.date().optional(),
  approvedDate: z.coerce.date().optional(),

  // Status
  status: DeliverableStatusSchema,
  completionPercentage: z.number().min(0).max(100),

  // Content
  description: z.string().optional(),
  documentUrl: z.string().url().optional(),

  // Ownership
  ownerIds: z.array(z.string()),
  reviewerId: z.string().optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Deliverable = z.infer<typeof DeliverableSchema>;

export const CreateDeliverableSchema = DeliverableSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateDeliverable = z.infer<typeof CreateDeliverableSchema>;

export const UpdateDeliverableSchema = DeliverableSchema.partial().required({ id: true });
export type UpdateDeliverable = z.infer<typeof UpdateDeliverableSchema>;

export const DeliverableFiltersSchema = z.object({
  tenantId: z.string().optional(),
  engagementId: z.string().optional(),
  deliverableType: DeliverableTypeSchema.optional(),
  status: DeliverableStatusSchema.optional(),
  ownerId: z.string().optional(),
}).partial();

export type DeliverableFilters = z.infer<typeof DeliverableFiltersSchema>;

// Display labels
export const DELIVERABLE_TYPE_LABELS: Record<DeliverableType, string> = {
  STRATEGY_DOCUMENT: 'Strategy Document',
  FEASIBILITY_REPORT: 'Feasibility Report',
  TRAINING_MATERIALS: 'Training Materials',
  CAMPAIGN_PLAN: 'Campaign Plan',
  BOARD_MATERIALS: 'Board Materials',
  PROGRESS_REPORT: 'Progress Report',
};
