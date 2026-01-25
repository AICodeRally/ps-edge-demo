import { z } from 'zod';
import { EngagementTypeSchema, BillingTypeSchema } from './engagement.contract';

/**
 * Proposal Contract - Sales Proposals
 *
 * Represents proposals sent to clients
 */

export const ProposalStatusSchema = z.enum([
  'DRAFT',
  'SUBMITTED',
  'NEGOTIATING',
  'WON',
  'LOST',
]);
export type ProposalStatus = z.infer<typeof ProposalStatusSchema>;

export const ProposalSchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Basics
  proposalNumber: z.string(),
  title: z.string().min(1).max(200),
  clientId: z.string(),

  // Scope
  engagementType: EngagementTypeSchema,
  scopeOfWork: z.string(),
  assumptions: z.array(z.string()),
  exclusions: z.array(z.string()),

  // Pricing
  proposedValue: z.number().positive(),
  billingType: BillingTypeSchema,
  estimatedHours: z.number().positive(),
  hourlyRate: z.number().positive().optional(),

  // Timeline
  proposedStartDate: z.coerce.date(),
  proposedDuration: z.number().positive(), // weeks

  // Lifecycle
  status: ProposalStatusSchema,
  submittedDate: z.coerce.date().optional(),
  decisionDate: z.coerce.date().optional(),
  lostReason: z.string().optional(),

  // Documents
  documentUrl: z.string().url().optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdBy: z.string(),
});

export type Proposal = z.infer<typeof ProposalSchema>;

export const CreateProposalSchema = ProposalSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateProposal = z.infer<typeof CreateProposalSchema>;

export const UpdateProposalSchema = ProposalSchema.partial().required({ id: true });
export type UpdateProposal = z.infer<typeof UpdateProposalSchema>;

export const ProposalFiltersSchema = z.object({
  tenantId: z.string().optional(),
  clientId: z.string().optional(),
  status: ProposalStatusSchema.optional(),
  engagementType: EngagementTypeSchema.optional(),
  createdBy: z.string().optional(),
  search: z.string().optional(),
}).partial();

export type ProposalFilters = z.infer<typeof ProposalFiltersSchema>;
