import { z } from 'zod';

/**
 * Time Entry Contract - Time Tracking
 *
 * Represents billable and non-billable time entries
 */

export const ActivityTypeSchema = z.enum([
  'CLIENT_MEETING',
  'RESEARCH',
  'DELIVERABLE_PREP',
  'TRAVEL',
  'ADMIN',
  'TRAINING',
]);
export type ActivityType = z.infer<typeof ActivityTypeSchema>;

export const TimeEntrySchema = z.object({
  id: z.string(),
  tenantId: z.string(),

  // Who/What/When
  consultantId: z.string(),
  engagementId: z.string(),
  clientId: z.string(),

  // Time
  date: z.coerce.date(),
  hours: z.number().positive().max(24),

  // Activity
  activityType: ActivityTypeSchema,
  description: z.string(),

  // Billing
  isBillable: z.boolean(),
  billingRate: z.number().positive().optional(),
  invoiceId: z.string().optional(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TimeEntry = z.infer<typeof TimeEntrySchema>;

export const CreateTimeEntrySchema = TimeEntrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTimeEntry = z.infer<typeof CreateTimeEntrySchema>;

export const UpdateTimeEntrySchema = TimeEntrySchema.partial().required({ id: true });
export type UpdateTimeEntry = z.infer<typeof UpdateTimeEntrySchema>;

export const TimeEntryFiltersSchema = z.object({
  tenantId: z.string().optional(),
  consultantId: z.string().optional(),
  engagementId: z.string().optional(),
  clientId: z.string().optional(),
  activityType: ActivityTypeSchema.optional(),
  isBillable: z.boolean().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
}).partial();

export type TimeEntryFilters = z.infer<typeof TimeEntryFiltersSchema>;

// Activity type labels
export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  CLIENT_MEETING: 'Client Meeting',
  RESEARCH: 'Research',
  DELIVERABLE_PREP: 'Deliverable Prep',
  TRAVEL: 'Travel',
  ADMIN: 'Administrative',
  TRAINING: 'Training',
};
